import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ChangeEvent, Dispatch, DragEvent, FormEvent, SetStateAction } from "react";
import { flushSync } from "react-dom";
import { copy } from "../content";
import { fallbackProducts, productProfiles as staticProductProfiles } from "../productCatalog";
import {
  type AdminProductProfileRow,
  type AdminProductRow,
  type AdminInquiryRow,
  type AdminInquirySummary,
  type AdminInquiryStatus,
  type AdminSectionKey,
  type AdminSectionRow,
  deleteAdminInquiry,
  fetchAdminInquiries,
  fetchAdminProductCatalog,
  fetchAdminSections,
  loginAdmin,
  saveAdminProductCatalog,
  saveAdminSection,
  updateAdminInquiryStatus,
  uploadAdminMedia,
  buildImageUrl,
} from "../lib/api";
import type { ProductNode, ProductProfile } from "../types";

const tokenStorageKey = "dawnrisecamp-admin-token";
const sidebarCollapsedStorageKey = "dawnrisecamp-admin-sidebar-collapsed";
const activeSectionStorageKey = "dawnrisecamp-admin-active-section";
const activeModuleStorageKey = "dawnrisecamp-admin-active-module";

function getStoredAdminToken() {
  return localStorage.getItem(tokenStorageKey) ?? sessionStorage.getItem(tokenStorageKey) ?? "";
}

const sections: {
  key: AdminSectionKey;
  label: string;
  modules: string[];
}[] = [
  { key: "home", label: "首页 Home", modules: ["nav", "hero", "featuredProducts", "homeSourcing", "qualityService", "newsletter"] },
  { key: "about", label: "关于 About", modules: ["about", "newsletter"] },
  { key: "products", label: "产品 Products", modules: ["products", "trekkingPole", "featuredProducts", "newsletter"] },
  { key: "quality", label: "品控 Quality", modules: ["quality", "qualityService", "newsletter"] },
  { key: "news", label: "资讯 News", modules: ["news", "newsletter"] },
  { key: "contact", label: "联系 Contact", modules: ["contact"] },
];

type LocaleContent = Record<string, unknown>;
type FieldPath = (string | number)[];

function getAdminSectionConfig(sectionKey: AdminSectionKey) {
  return sections.find((section) => section.key === sectionKey) ?? sections[0];
}

function isAdminSectionKey(value: string | null): value is AdminSectionKey {
  return sections.some((section) => section.key === value);
}

function getInitialAdminSection(): AdminSectionKey {
  const storedSection = localStorage.getItem(activeSectionStorageKey);
  return isAdminSectionKey(storedSection) ? storedSection : "products";
}

function getInitialAdminModule(sectionKey: AdminSectionKey) {
  const storedModule = localStorage.getItem(activeModuleStorageKey);
  const sectionConfig = getAdminSectionConfig(sectionKey);
  return storedModule && sectionConfig.modules.includes(storedModule) ? storedModule : sectionConfig.modules[0];
}

export function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(() => Boolean(localStorage.getItem(tokenStorageKey)));
  const [token, setToken] = useState(() => getStoredAdminToken());
  const [activeSection, setActiveSection] = useState<AdminSectionKey>(() => getInitialAdminSection());
  const [activeModule, setActiveModule] = useState(() => getInitialAdminModule(getInitialAdminSection()));
  const [englishDrafts, setEnglishDrafts] = useState<Record<AdminSectionKey, LocaleContent>>(() => buildDefaultDrafts("en"));
  const [chineseDrafts, setChineseDrafts] = useState<Record<AdminSectionKey, LocaleContent>>(() => buildDefaultDrafts("zh"));
  const [status, setStatus] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    () => localStorage.getItem(sidebarCollapsedStorageKey) === "true",
  );
  const [productRows, setProductRows] = useState<AdminProductRow[]>([]);
  const [profileRows, setProfileRows] = useState<AdminProductProfileRow[]>([]);
  const [inquiryRows, setInquiryRows] = useState<AdminInquiryRow[]>([]);
  const [inquirySummary, setInquirySummary] = useState<AdminInquirySummary>({ total: 0, today: 0, zh: 0, en: 0 });

  const activeConfig = useMemo(
    () => sections.find((section) => section.key === activeSection) ?? sections[0],
    [activeSection],
  );
  const activeModuleKey = activeConfig.modules.includes(activeModule) ? activeModule : activeConfig.modules[0];

  useEffect(() => {
    if (!token) return;

    setIsBusy(true);
    fetchAdminSections(token)
      .then((rows) => {
        applySavedSections(rows, setEnglishDrafts, setChineseDrafts);
      })
      .catch(() => {
        localStorage.removeItem(tokenStorageKey);
        sessionStorage.removeItem(tokenStorageKey);
        setToken("");
        setStatus("登录已过期，请重新登录。");
      })
      .finally(() => setIsBusy(false));

    fetchAdminProductCatalog(token)
      .then((catalog) => {
        const products = catalog.products.length ? catalog.products : buildProductRowsFromFallback();
        setProductRows(products);
        setProfileRows(mergeProfileRows(products, catalog.profiles));
      })
      .catch(() => {
        setProductRows(buildProductRowsFromFallback());
        setProfileRows(mergeProfileRows(buildProductRowsFromFallback(), []));
      });

    refreshInquiries(token).catch(() => {
      setInquiryRows([]);
      setInquirySummary({ total: 0, today: 0, zh: 0, en: 0 });
    });
  }, [token]);

  async function refreshInquiries(nextToken = token) {
    const payload = await fetchAdminInquiries(nextToken);
    setInquiryRows(payload.inquiries);
    setInquirySummary(payload.summary);
  }

  async function handleDeleteInquiry(inquiryId: number) {
    setIsBusy(true);
    setStatus("");

    try {
      await deleteAdminInquiry(token, inquiryId);
      await refreshInquiries();
      setStatus("留言已删除。");
    } catch {
      setStatus("删除失败，请稍后重试。");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleUpdateInquiryStatus(inquiryId: number, nextStatus: AdminInquiryStatus) {
    setIsBusy(true);
    setStatus("");

    try {
      await updateAdminInquiryStatus(token, inquiryId, nextStatus);
      setInquiryRows((rows) => rows.map((row) => (row.id === inquiryId ? { ...row, status: nextStatus } : row)));
      setStatus(`留言状态已更新为「${nextStatus}」。`);
    } catch {
      setStatus("状态更新失败，请稍后重试。");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);
    setStatus("");

    try {
      const nextToken = await loginAdmin(password);
      const persistentStorage = rememberLogin ? localStorage : sessionStorage;
      const temporaryStorage = rememberLogin ? sessionStorage : localStorage;
      persistentStorage.setItem(tokenStorageKey, nextToken);
      temporaryStorage.removeItem(tokenStorageKey);
      setToken(nextToken);
      setPassword("");
      setStatus("登录成功。");
    } catch {
      setStatus("密码错误，请重新输入。");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleSave() {
    setIsBusy(true);
    setStatus("");

    try {
      if (activeSection === "products") {
        await saveAdminProductCatalog(token, normalizeProductRows(productRows), profileRows);
        setStatus("产品分类、商品列表和商品详情已保存到云端。");
        return;
      }

      await saveAdminSection(token, activeSection, englishDrafts[activeSection], chineseDrafts[activeSection]);
      setStatus(`${activeConfig.label} 已保存到云端。`);
    } catch (error) {
      setStatus(error instanceof Error ? "保存失败，请稍后重试。" : "保存失败。");
    } finally {
      setIsBusy(false);
    }
  }

  if (!token) {
    return (
      <main className="admin-page admin-login-panel">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <div className="admin-login-heading">
            <p className="admin-kicker">Dawnrise Camp CMS</p>
            <h1>Welcome back</h1>
            <span>Secure staff access</span>
          </div>

          <label className="admin-login-field">
            <span>管理密码</span>
            <span className="admin-login-input">
              <AdminLoginIcon name="lock" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="请输入管理密码"
                required
              />
            </span>
          </label>

          <div className="admin-login-options">
            <label className="admin-login-check">
              <input
                type="checkbox"
                checked={rememberLogin}
                onChange={(event) => setRememberLogin(event.target.checked)}
              />
              <span>记住登录</span>
            </label>
            <a href="mailto:sales@dawnrisecamp.com">联系管理员</a>
          </div>

          <button className="button button-primary admin-login-submit" type="submit" disabled={isBusy}>
            <AdminLoginIcon name="key" />
            {isBusy ? "登录中..." : "进入后台"}
          </button>

          <div className="admin-login-secure">
            <AdminLoginIcon name="shield" />
            <span>Secure staff access</span>
          </div>
          {status ? (
            <p className={status.includes("失败") || status.includes("过期") || status.includes("密码错误") ? "admin-status error" : "admin-status success"}>
              {status}
            </p>
          ) : null}
        </form>
      </main>
    );
  }

  return (
    <main className={isSidebarCollapsed ? "admin-console sidebar-collapsed" : "admin-console"}>
      <aside className="admin-console-sidebar" aria-label="后台主菜单">
        <div className="admin-console-brand">
          <MountainLogo />
          <strong>DAWNRISE CAMP</strong>
        </div>
        <nav>
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              className={section.key === activeSection ? "active" : ""}
              onClick={() => {
                localStorage.setItem(activeSectionStorageKey, section.key);
                localStorage.setItem(activeModuleStorageKey, section.modules[0]);
                setActiveSection(section.key);
                setActiveModule(section.modules[0]);
              }}
              title={isSidebarCollapsed ? getAdminMenuLabel(section.key) : undefined}
            >
              <AdminNavIcon name={section.key} />
              <span>{getAdminMenuLabel(section.key)}</span>
            </button>
          ))}
        </nav>
        <button
          className="admin-collapse"
          type="button"
          aria-expanded={!isSidebarCollapsed}
          aria-label={isSidebarCollapsed ? "展开菜单" : "收起菜单"}
          onClick={() => {
            setIsSidebarCollapsed((current) => {
              const next = !current;
              localStorage.setItem(sidebarCollapsedStorageKey, String(next));
              return next;
            });
          }}
          title={isSidebarCollapsed ? "展开菜单" : undefined}
        >
          <span aria-hidden="true">{isSidebarCollapsed ? "≫" : "≪"}</span>
          <b>{isSidebarCollapsed ? "展开菜单" : "收起菜单"}</b>
        </button>
      </aside>

      <section className="admin-console-main">
        <header className="admin-console-topbar">
          <h1>网站内容后台</h1>
          <div className="admin-console-actions">
            <button className="admin-bell" type="button" aria-label="通知">
              <span>3</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg>
            </button>
            <button
              type="button"
              className="admin-logout"
              onClick={() => {
                localStorage.removeItem(tokenStorageKey);
                sessionStorage.removeItem(tokenStorageKey);
                setToken("");
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l4 2" /></svg>
              退出登录
            </button>
          </div>
        </header>

        <div className="admin-console-content">
          {activeSection === "products" ? (
            <ProductCatalogEditor
              token={token}
              products={productRows}
              profiles={profileRows}
              onProductsChange={setProductRows}
              onProfilesChange={setProfileRows}
              onSave={handleSave}
              isBusy={isBusy}
              status={status}
            />
          ) : activeSection === "contact" ? (
            <ContactAdminPanel
              englishDraft={englishDrafts.contact}
              chineseDraft={chineseDrafts.contact}
              inquiries={inquiryRows}
              summary={inquirySummary}
              status={status}
              isBusy={isBusy}
              onSave={handleSave}
              onRefresh={() => refreshInquiries()}
              onDeleteInquiry={handleDeleteInquiry}
              onUpdateInquiryStatus={handleUpdateInquiryStatus}
              onEnglishChange={(path, value) => {
                setEnglishDrafts((drafts) => updateSectionDraft(drafts, "contact", path, value));
              }}
              onChineseChange={(path, value) => {
                setChineseDrafts((drafts) => updateSectionDraft(drafts, "contact", path, value));
              }}
            />
          ) : (
            <div className="admin-editor admin-editor-muted">
              <div className="admin-editor-head">
                <div>
                  <p className="admin-kicker">当前板块</p>
                  <h2>{activeConfig.label}</h2>
                </div>
                <button className="button button-primary" type="button" onClick={handleSave} disabled={isBusy}>
                  {isBusy ? "处理中..." : "保存板块"}
                </button>
              </div>
              <div className="admin-module-tabs" aria-label="页面模块">
                {activeConfig.modules.map((moduleKey) => (
                  <button
                    key={moduleKey}
                    type="button"
                    className={moduleKey === activeModuleKey ? "active" : ""}
                    onClick={() => {
                      localStorage.setItem(activeModuleStorageKey, moduleKey);
                      setActiveModule(moduleKey);
                    }}
                  >
                    {formatLabel(moduleKey)}
                  </button>
                ))}
              </div>

              <div className="admin-module-editor">
                <ModuleEditor
                  label={formatLabel(activeModuleKey)}
                  path={[activeModuleKey]}
                  englishValue={englishDrafts[activeSection][activeModuleKey]}
                  chineseValue={chineseDrafts[activeSection][activeModuleKey]}
                  uploadedUrl=""
                  onEnglishChange={(path, value) => {
                    setEnglishDrafts((drafts) => updateSectionDraft(drafts, activeSection, path, value));
                  }}
                  onChineseChange={(path, value) => {
                    setChineseDrafts((drafts) => updateSectionDraft(drafts, activeSection, path, value));
                  }}
                />
              </div>
              {status ? <p className="admin-status">{status}</p> : null}
            </div>
          )}
        </div>

      </section>
    </main>
  );
}

function ContactAdminPanel({
  englishDraft,
  chineseDraft,
  inquiries,
  summary,
  status,
  isBusy,
  onSave,
  onRefresh,
  onDeleteInquiry,
  onUpdateInquiryStatus,
  onEnglishChange,
  onChineseChange,
}: {
  englishDraft: LocaleContent;
  chineseDraft: LocaleContent;
  inquiries: AdminInquiryRow[];
  summary: AdminInquirySummary;
  status: string;
  isBusy: boolean;
  onSave: () => void;
  onRefresh: () => void;
  onDeleteInquiry: (inquiryId: number) => void;
  onUpdateInquiryStatus: (inquiryId: number, status: AdminInquiryStatus) => void;
  onEnglishChange: (path: FieldPath, value: unknown) => void;
  onChineseChange: (path: FieldPath, value: unknown) => void;
}) {
  const [deleteInquiryId, setDeleteInquiryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<"30" | "7" | "all">("30");
  const [currentPage, setCurrentPage] = useState(1);
  const englishContact = getContactDraft(englishDraft);
  const chineseContact = getContactDraft(chineseDraft);
  const englishSupportItems = getSupportItems(englishContact, "en");
  const chineseSupportItems = getSupportItems(chineseContact, "zh");
  const activeContact = chineseContact;
  const activeSupportItems = chineseSupportItems;
  const deleteInquiry = inquiries.find((inquiry) => inquiry.id === deleteInquiryId);
  const pendingCount = inquiries.filter((inquiry) => getInquiryStatus(inquiry) === "待处理").length;
  const filteredInquiries = inquiries.filter((inquiry) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch = normalizedSearch
      ? [inquiry.name, inquiry.email, inquiry.company, inquiry.message]
          .some((value) => value.toLowerCase().includes(normalizedSearch))
      : true;
    const matchesDate = isInquiryWithinRange(inquiry.created_at, dateFilter);

    return matchesSearch && matchesDate;
  });
  const inquiryPageSize = 10;
  const totalInquiryPages = Math.max(1, Math.ceil(filteredInquiries.length / inquiryPageSize));
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * inquiryPageSize,
    currentPage * inquiryPageSize,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, inquiries.length]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalInquiryPages));
  }, [totalInquiryPages]);

  function updateSupportEmail(index: number, value: string) {
    const nextEnglishItems = englishSupportItems.map((item, itemIndex) => (
      itemIndex === index ? { ...item, email: value } : item
    ));
    const nextChineseItems = chineseSupportItems.map((item, itemIndex) => (
      itemIndex === index ? { ...item, email: value } : item
    ));

    onEnglishChange(["contact", "supportItems"], nextEnglishItems);
    onChineseChange(["contact", "supportItems"], nextChineseItems);
  }

  function exportInquiries() {
    const rows = filteredInquiries.map((inquiry) => [
      formatInquiryDate(inquiry.created_at),
      inquiry.name,
      inquiry.email,
      inquiry.locale === "zh" ? "中文页面" : "English Page",
      inquiry.company,
      inquiry.message,
      getInquiryStatus(inquiry),
    ]);
    const csv = [
      ["时间", "客户", "邮箱", "来源", "公司", "留言内容", "状态"],
      ...rows,
    ]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `dawnrise-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="admin-editor contact-admin-panel contact-admin-redesign">
      <div className="contact-admin-hero">
        <MountainLogo />
        <div>
          <h2>联系我们管理</h2>
        </div>
        <div className="contact-admin-actions">
          <span className="contact-sync-chip"><ContactAdminIcon name="cloud" /> 已同步云端</span>
          <button className="contact-secondary-button" type="button" onClick={onRefresh} disabled={isBusy}>
            <ContactAdminIcon name="refresh" /> 刷新留言
          </button>
          <button className="contact-primary-button" type="button" onClick={onSave} disabled={isBusy}>
            <ContactAdminIcon name="check" /> {isBusy ? "处理中..." : "保存设置"}
          </button>
        </div>
      </div>

      <div className="contact-admin-overview">
        <section className="contact-config-panel">
          <div className="contact-section-head">
            <h3><ContactAdminIcon name="settings" /> 联系方式配置</h3>
          </div>

          <div className="contact-config-fields">
            <ContactConfigField
              icon="phone"
              label="电话"
              value={stringifyEditableValue(activeContact.phone)}
              onChange={(value) => onChineseChange(["contact", "phone"], value)}
            />
            <ContactConfigField
              icon="clock"
              label="工作时间"
              value={stringifyEditableValue(activeContact.hours)}
              onChange={(value) => onChineseChange(["contact", "hours"], value)}
            />
            {activeSupportItems.map((item, index) => (
              <ContactConfigField
                key={item.title}
                icon={index === 0 ? "mail" : index === 1 ? "headset" : "partner"}
                label={`${item.title}邮箱`}
                type="email"
                value={item.email}
                onChange={(value) => updateSupportEmail(index, value)}
              />
            ))}
          </div>

        </section>

        <section className="contact-insights-panel">
          <div className="contact-section-head">
            <h3><ContactAdminIcon name="trend" /> 留言概览</h3>
            <div className="contact-sparkline" aria-hidden="true">
              <span style={{ "--spark": "24%" } as CSSProperties} />
              <span style={{ "--spark": "42%" } as CSSProperties} />
              <span style={{ "--spark": "48%" } as CSSProperties} />
              <span style={{ "--spark": "61%" } as CSSProperties} />
              <span style={{ "--spark": "52%" } as CSSProperties} />
              <span style={{ "--spark": "72%" } as CSSProperties} />
              <span style={{ "--spark": "86%" } as CSSProperties} />
            </div>
          </div>

          <div className="contact-metric-grid">
            <ContactMetric icon="message" label="总留言" value={summary.total} meta="近7天" trend="↑ 18%" />
            <ContactMetric icon="leaf" label="今日新增" value={summary.today} meta="较昨日" trend={`↑ ${Math.max(0, summary.today)}`} />
            <ContactMetric icon="hourglass" label="待跟进" value={pendingCount} meta="需处理" trend={`↑ ${Math.min(pendingCount, summary.today)}`} tone="clay" />
            <ContactMetric icon="globe" label="英文询盘" value={summary.en} meta={`占比 ${formatPercent(summary.en, summary.total)}`} />
          </div>

        </section>
      </div>

      <section className="contact-inquiry-panel">
        <div className="contact-inquiry-head">
          <h3><ContactAdminIcon name="message" /> 客户留言</h3>
          <div>
            <span>共 {filteredInquiries.length} 条留言</span>
            <button type="button" onClick={exportInquiries}><ContactAdminIcon name="download" /> 导出</button>
          </div>
        </div>

        <div className="contact-inquiry-toolbar">
          <label>
            <ContactAdminIcon name="search" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="搜索姓名、邮箱或留言内容"
            />
          </label>
          <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value as "30" | "7" | "all")}>
            <option value="30">最近30天</option>
            <option value="7">最近7天</option>
            <option value="all">全部时间</option>
          </select>
        </div>

        <div className="inquiry-table contact-inquiry-table" role="table" aria-label="用户留言列表">
          <div className="inquiry-table-row inquiry-table-head" role="row">
            <span>时间</span>
            <span>客户</span>
            <span>邮箱</span>
            <span>来源</span>
            <span>主题</span>
            <span>留言摘要</span>
            <span>状态</span>
            <span>操作</span>
          </div>
          {paginatedInquiries.length ? paginatedInquiries.map((inquiry) => (
            <div className="inquiry-table-row" role="row" key={inquiry.id}>
              <time>{formatInquiryDate(inquiry.created_at)}</time>
              <strong>{inquiry.name}</strong>
              <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
              <span>{inquiry.locale === "zh" ? "中文页面" : "English Page"}</span>
              <span>{getInquiryTopic(inquiry)}</span>
              <p>{inquiry.message}</p>
              <b className={`inquiry-status-tag ${getInquiryStatusClass(getInquiryStatus(inquiry))}`}>
                {getInquiryStatus(inquiry)}
              </b>
              <div className="inquiry-row-actions">
                <a href={`mailto:${inquiry.email}`}><ContactAdminIcon name="mail" /> 回复</a>
                <button
                  type="button"
                  onClick={() => onUpdateInquiryStatus(inquiry.id, getNextInquiryStatus(getInquiryStatus(inquiry)))}
                  disabled={isBusy}
                  title={`更改为${getNextInquiryStatus(getInquiryStatus(inquiry))}`}
                >
                  <ContactAdminIcon name="refresh" /> 改状态
                </button>
                <button
                  className="inquiry-delete-button"
                  type="button"
                  onClick={() => setDeleteInquiryId(inquiry.id)}
                  disabled={isBusy}
                >
                  <ContactAdminIcon name="trash" /> 删除
                </button>
              </div>
            </div>
          )) : (
            <p className="inquiry-empty">当前筛选条件下没有留言。</p>
          )}
        </div>

        <div className="contact-inquiry-pagination">
          <span>每页显示 {inquiryPageSize} 条</span>
          <div>
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>
              上一页
            </button>
            {Array.from({ length: totalInquiryPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button
                  type="button"
                  key={page}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalInquiryPages, page + 1))}
              disabled={currentPage === totalInquiryPages}
            >
              下一页
            </button>
          </div>
        </div>
      </section>

      {status ? <p className="admin-status">{status}</p> : null}
      {deleteInquiry ? (
        <div className="admin-confirm-backdrop" role="presentation" onMouseDown={() => setDeleteInquiryId(null)}>
          <div
            className="admin-confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-inquiry-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h3 id="delete-inquiry-title">删除留言</h3>
            <p>确定删除「{deleteInquiry.name}」的这条留言吗？删除后不可恢复。</p>
            <div className="admin-confirm-actions">
              <button type="button" className="admin-confirm-cancel" onClick={() => setDeleteInquiryId(null)}>
                取消
              </button>
              <button
                type="button"
                className="admin-confirm-danger"
                disabled={isBusy}
                onClick={() => {
                  const inquiryId = deleteInquiry.id;
                  setDeleteInquiryId(null);
                  onDeleteInquiry(inquiryId);
                }}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ContactConfigField({
  icon,
  label,
  value,
  type = "text",
  onChange,
}: {
  icon: ContactAdminIconName;
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="contact-config-field">
      <span><ContactAdminIcon name={icon} /> {label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ContactMetric({
  icon,
  label,
  value,
  meta,
  trend,
  tone = "green",
}: {
  icon: ContactAdminIconName;
  label: string;
  value: number;
  meta: string;
  trend?: string;
  tone?: "green" | "clay";
}) {
  return (
    <div className={`contact-metric ${tone}`}>
      <i><ContactAdminIcon name={icon} /></i>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <small>{meta}</small>
      {trend ? <em>{trend}</em> : null}
    </div>
  );
}

function ProductCatalogEditor({
  token,
  products,
  profiles,
  onProductsChange,
  onProfilesChange,
  onSave,
  isBusy,
  status,
}: {
  token: string;
  products: AdminProductRow[];
  profiles: AdminProductProfileRow[];
  onProductsChange: (products: AdminProductRow[]) => void;
  onProfilesChange: (profiles: AdminProductProfileRow[]) => void;
  onSave: () => void;
  isBusy: boolean;
  status: string;
}) {
  const topCategories = sortProductRows(products.filter((product) => !product.parent_slug));
  const [selectedTopSlug, setSelectedTopSlug] = useState(topCategories[0]?.slug ?? "");
  const secondCategories = sortProductRows(products.filter((product) => product.parent_slug === selectedTopSlug));
  const [selectedSecondSlug, setSelectedSecondSlug] = useState(secondCategories[0]?.slug ?? "");
  const productItems = sortProductRows(products.filter((product) => product.parent_slug === selectedSecondSlug));
  const [selectedProductSlug, setSelectedProductSlug] = useState(productItems[0]?.slug ?? "");
  const selectedTop = products.find((product) => product.slug === selectedTopSlug) ?? topCategories[0];
  const selectedSecond = products.find((product) => product.slug === selectedSecondSlug) ?? secondCategories[0];
  const selectedProduct = products.find((product) => product.slug === selectedProductSlug) ?? productItems[0];
  const selectedProfile = selectedProduct ? profiles.find((profile) => profile.slug === selectedProduct.slug) : undefined;
  const [deleteRequest, setDeleteRequest] = useState<{ slug: string; kind: "category" | "product" } | null>(null);
  const deleteTargetSlug = deleteRequest?.slug ?? "";
  const deleteTargetRow = products.find((product) => product.slug === deleteTargetSlug);
  const deleteChildCount = deleteTargetRow ? getDescendantSlugs(products, deleteTargetRow.slug).length : 0;
  const deleteTargetLabel = deleteTargetRow ? deleteTargetRow.name_zh || deleteTargetRow.name_en || deleteTargetRow.slug : "";

  useEffect(() => {
    if ((!selectedTopSlug || !topCategories.some((product) => product.slug === selectedTopSlug)) && topCategories[0]) {
      setSelectedTopSlug(topCategories[0].slug);
    }
  }, [selectedTopSlug, topCategories]);

  useEffect(() => {
    const nextSecond = products.find((product) => product.parent_slug === selectedTopSlug);
    setSelectedSecondSlug((current) =>
      current && products.some((product) => product.slug === current && product.parent_slug === selectedTopSlug)
        ? current
        : nextSecond?.slug ?? "",
    );
  }, [products, selectedTopSlug]);

  useEffect(() => {
    const nextProduct = products.find((product) => product.parent_slug === selectedSecondSlug);
    setSelectedProductSlug((current) =>
      current && products.some((product) => product.slug === current && product.parent_slug === selectedSecondSlug)
        ? current
        : nextProduct?.slug ?? "",
    );
  }, [products, selectedSecondSlug]);

  function updateProduct(slug: string, patch: Partial<AdminProductRow>) {
    onProductsChange(products.map((product) => (product.slug === slug ? { ...product, ...patch } : product)));
  }

  function updateProfile(slug: string, patch: Partial<AdminProductProfileRow>) {
    onProfilesChange(
      profiles.map((profile) => (profile.slug === slug ? { ...profile, ...patch } : profile)),
    );
  }

  function addRow(parentSlug: string | null, levelProducts: AdminProductRow[], label: string) {
    const slug = uniqueSlug(slugify(label), products.map((product) => product.slug));
    onProductsChange([
      ...products,
      {
        slug,
        parent_slug: parentSlug,
        sort_order: getNextSortOrder(levelProducts, parentSlug),
        name_en: label,
        name_zh: label,
        is_listed: 1,
      },
    ]);
    return slug;
  }

  function addProduct() {
    if (!selectedSecondSlug) return;
    const slug = addRow(selectedSecondSlug, productItems, "New Product");
    onProfilesChange([...profiles, createBlankProfile(slug)]);
    setSelectedProductSlug(slug);
  }

  function deleteProductBranch(slug: string) {
    const removedSlugs = new Set([slug, ...getDescendantSlugs(products, slug)]);
    onProductsChange(products.filter((product) => !removedSlugs.has(product.slug)));
    onProfilesChange(profiles.filter((profile) => !removedSlugs.has(profile.slug)));
    setDeleteRequest(null);
  }

  function deleteProductOnly(slug: string) {
    onProductsChange(products.filter((product) => product.slug !== slug));
    onProfilesChange(profiles.filter((profile) => profile.slug !== slug));
    setDeleteRequest(null);
  }

  function toggleProductListing(slug: string) {
    const product = products.find((item) => item.slug === slug);
    if (!product) return;
    updateProduct(slug, { is_listed: product.is_listed === 0 ? 1 : 0 });
  }

  function reorderProducts(dragSlug: string, targetSlug: string) {
    if (dragSlug === targetSlug) return;

    const dragged = products.find((product) => product.slug === dragSlug);
    const target = products.find((product) => product.slug === targetSlug);
    if (!dragged || !target || (dragged.parent_slug ?? null) !== (target.parent_slug ?? null)) return;

    const parentSlug = dragged.parent_slug ?? null;
    const siblingSlugs = sortProductRows(products.filter((product) => (product.parent_slug ?? null) === parentSlug))
      .map((product) => product.slug);
    const fromIndex = siblingSlugs.indexOf(dragSlug);
    const toIndex = siblingSlugs.indexOf(targetSlug);
    if (fromIndex < 0 || toIndex < 0) return;

    siblingSlugs.splice(fromIndex, 1);
    siblingSlugs.splice(toIndex, 0, dragSlug);

    const nextSortOrders = new Map(siblingSlugs.map((slug, index) => [slug, (index + 1) * 10]));
    onProductsChange(
      products.map((product) => (
        nextSortOrders.has(product.slug)
          ? { ...product, sort_order: nextSortOrders.get(product.slug) ?? product.sort_order }
          : product
      )),
    );
  }

  return (
    <div className="product-admin">
      <section className="product-admin-column">
        <ProductAdminList
          title="一级分类"
          items={topCategories}
          countResolver={(item) => products.filter((product) => product.parent_slug === item.slug).length}
          selectedSlug={selectedTop?.slug ?? ""}
          onSelect={setSelectedTopSlug}
          onAdd={() => setSelectedTopSlug(addRow(null, topCategories, "New Category"))}
          onReorder={reorderProducts}
          selectedItem={selectedTop}
          onItemChange={updateProduct}
          onItemDelete={(slug) => setDeleteRequest({ slug, kind: "category" })}
        />
      </section>

      <section className="product-admin-column">
        <ProductAdminList
          title="二级分类"
          items={secondCategories}
          countResolver={(item) => products.filter((product) => product.parent_slug === item.slug).length}
          selectedSlug={selectedSecond?.slug ?? ""}
          onSelect={setSelectedSecondSlug}
          onAdd={() => selectedTop && setSelectedSecondSlug(addRow(selectedTop.slug, secondCategories, "New Subcategory"))}
          onReorder={reorderProducts}
          selectedItem={selectedSecond}
          onItemChange={updateProduct}
          onItemDelete={(slug) => setDeleteRequest({ slug, kind: "category" })}
        />
      </section>

      <section className="product-admin-column product-admin-products">
        <ProductListPanel
          products={productItems}
          profiles={profiles}
          selectedSlug={selectedProduct?.slug ?? ""}
          onSelect={setSelectedProductSlug}
          onAdd={addProduct}
          onReorder={reorderProducts}
        />
      </section>

      <section className="product-admin-detail">
        {selectedProduct && selectedProfile ? (
          <ProductDetailEditor
            token={token}
            product={selectedProduct}
            profile={selectedProfile}
            onProductChange={updateProduct}
            onProfileChange={updateProfile}
            onSave={onSave}
            isBusy={isBusy}
            onDelete={() => setDeleteRequest({ slug: selectedProduct.slug, kind: "product" })}
            onToggleListing={() => toggleProductListing(selectedProduct.slug)}
          />
        ) : null}
        {status ? <p className="admin-floating-status">{status}</p> : null}
      </section>
      {deleteTargetRow && deleteRequest ? (
        <div className="admin-confirm-backdrop" role="presentation" onMouseDown={() => setDeleteRequest(null)}>
          <div
            className="admin-confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h3 id="delete-category-title">{deleteRequest.kind === "product" ? "删除商品" : "删除分类"}</h3>
            <p>
              {deleteRequest.kind === "category" && deleteChildCount > 0
                ? `确定删除「${deleteTargetLabel}」及其下级 ${deleteChildCount} 项内容吗？`
                : `确定删除「${deleteTargetLabel}」吗？`}
            </p>
            <div className="admin-confirm-actions">
              <button type="button" className="admin-confirm-cancel" onClick={() => setDeleteRequest(null)}>
                取消
              </button>
              <button
                type="button"
                className="admin-confirm-danger"
                onClick={() => {
                  if (deleteRequest.kind === "product") {
                    deleteProductOnly(deleteTargetRow.slug);
                  } else {
                    deleteProductBranch(deleteTargetRow.slug);
                  }
                }}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProductAdminList({
  title,
  items,
  countResolver,
  selectedSlug,
  onSelect,
  onAdd,
  onReorder,
  selectedItem,
  onItemChange,
  onItemDelete,
}: {
  title: string;
  items: AdminProductRow[];
  countResolver?: (item: AdminProductRow) => number;
  selectedSlug: string;
  onSelect: (slug: string) => void;
  onAdd: () => void;
  onReorder: (dragSlug: string, targetSlug: string) => void;
  selectedItem?: AdminProductRow;
  onItemChange: (slug: string, patch: Partial<AdminProductRow>) => void;
  onItemDelete: (slug: string) => void;
}) {
  const [draggingSlug, setDraggingSlug] = useState("");
  const [dragOverSlug, setDragOverSlug] = useState("");

  function getDropClass(slug: string) {
    if (!draggingSlug || !dragOverSlug || slug !== dragOverSlug || slug === draggingSlug) return "";

    const draggingIndex = items.findIndex((item) => item.slug === draggingSlug);
    const targetIndex = items.findIndex((item) => item.slug === slug);
    if (draggingIndex < 0 || targetIndex < 0) return "";

    return targetIndex > draggingIndex ? " drop-after" : " drop-before";
  }

  function handleDrop(event: DragEvent<HTMLElement>, targetSlug: string) {
    event.preventDefault();
    event.stopPropagation();
    const dragSlug = event.dataTransfer.getData("text/plain") || draggingSlug;
    if (!dragSlug) {
      setDraggingSlug("");
      setDragOverSlug("");
      return;
    }

    runViewTransition(() => {
      onReorder(dragSlug, targetSlug);
      setDraggingSlug("");
      setDragOverSlug("");
    });
  }

  return (
    <div
      className="product-admin-list"
      onDragOver={(event) => {
        if (draggingSlug && dragOverSlug) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
        }
      }}
      onDrop={(event) => {
        if (draggingSlug && dragOverSlug) {
          handleDrop(event, dragOverSlug);
        }
      }}
    >
      <div className="product-admin-panel-head">
        <h3>{title}</h3>
        <button type="button" onClick={onAdd}><span>＋</span> 新建</button>
      </div>
      {items.map((item) => (
        <button
          key={item.slug}
          type="button"
          draggable
          style={{ viewTransitionName: getProductViewTransitionName(item.slug) } as CSSProperties}
          className={`${item.slug === selectedSlug ? "active" : ""}${item.slug === draggingSlug ? " dragging" : ""}${getDropClass(item.slug)}`}
          onClick={() => onSelect(item.slug)}
          onDragStart={(event) => {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", item.slug);
            event.dataTransfer.setDragImage(event.currentTarget, 18, 18);
            window.setTimeout(() => setDraggingSlug(item.slug), 0);
          }}
          onDragEnd={() => {
            setDraggingSlug("");
            setDragOverSlug("");
          }}
          onDragEnter={() => {
            if (item.slug !== draggingSlug) {
              setDragOverSlug(item.slug);
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            if (item.slug !== draggingSlug) {
              setDragOverSlug(item.slug);
            }
          }}
          onDrop={(event) => handleDrop(event, item.slug)}
        >
          <DragDots />
          <span className="product-admin-category-name">
            <strong title={item.name_zh}>{item.name_zh || item.name_en}</strong>
            <small title={item.name_en}>{item.name_en || item.name_zh}</small>
          </span>
          <em>{countResolver?.(item) ?? 0}</em>
        </button>
      ))}
      {selectedItem ? (
        <div className="product-category-editor">
          <label>
            中文名称
            <input
              value={selectedItem.name_zh}
              onChange={(event) => onItemChange(selectedItem.slug, { name_zh: event.target.value })}
            />
          </label>
          <label>
            英文名称
            <input
              value={selectedItem.name_en}
              onChange={(event) => onItemChange(selectedItem.slug, { name_en: event.target.value })}
            />
          </label>
          <button type="button" className="product-category-delete" onClick={() => onItemDelete(selectedItem.slug)}>
            删除分类
          </button>
        </div>
      ) : null}
      <p className="product-admin-hint">拖拽可调整排序</p>
    </div>
  );
}

function ProductListPanel({
  products,
  profiles,
  selectedSlug,
  onSelect,
  onAdd,
  onReorder,
}: {
  products: AdminProductRow[];
  profiles: AdminProductProfileRow[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  onAdd: () => void;
  onReorder: (dragSlug: string, targetSlug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [draggingSlug, setDraggingSlug] = useState("");
  const [dragOverSlug, setDragOverSlug] = useState("");
  const filteredProducts = products.filter((product) => {
    const profile = profiles.find((item) => item.slug === product.slug);
    const haystack = `${product.name_zh} ${product.name_en} ${profile?.code ?? ""}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  function getDropClass(slug: string) {
    if (!draggingSlug || !dragOverSlug || slug !== dragOverSlug || slug === draggingSlug) return "";

    const draggingIndex = filteredProducts.findIndex((product) => product.slug === draggingSlug);
    const targetIndex = filteredProducts.findIndex((product) => product.slug === slug);
    if (draggingIndex < 0 || targetIndex < 0) return "";

    return targetIndex > draggingIndex ? " drop-after" : " drop-before";
  }

  function handleDrop(event: DragEvent<HTMLElement>, targetSlug: string) {
    event.preventDefault();
    event.stopPropagation();
    const dragSlug = event.dataTransfer.getData("text/plain") || draggingSlug;
    if (!dragSlug) {
      setDraggingSlug("");
      setDragOverSlug("");
      return;
    }

    runViewTransition(() => {
      onReorder(dragSlug, targetSlug);
      setDraggingSlug("");
      setDragOverSlug("");
    });
  }

  return (
    <div className="product-admin-list product-list-panel">
      <div className="product-admin-panel-head">
        <h3>产品列表</h3>
        <button type="button" onClick={onAdd}><span>＋</span> 新建</button>
      </div>
      <label className="admin-product-search">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索产品名称或型号" />
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
      </label>
      <div
        className="product-list-scroll"
        onDragOver={(event) => {
          if (draggingSlug && dragOverSlug) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
          }
        }}
        onDrop={(event) => {
          if (draggingSlug && dragOverSlug) {
            handleDrop(event, dragOverSlug);
          }
        }}
      >
        {filteredProducts.map((product) => {
          const profile = profiles.find((item) => item.slug === product.slug);
          const gallery = parseGallery(profile?.gallery_json ?? "{}");
          const thumbnail = gallery.studio || gallery.lifestyle || "/images/products.webp";
          return (
            <button
              key={product.slug}
              type="button"
              draggable
              style={{ viewTransitionName: getProductViewTransitionName(product.slug) } as CSSProperties}
              className={`product-list-row${product.slug === selectedSlug ? " active" : ""}${product.slug === draggingSlug ? " dragging" : ""}${product.is_listed === 0 ? " unlisted" : ""}${getDropClass(product.slug)}`}
              onClick={() => onSelect(product.slug)}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", product.slug);
                event.dataTransfer.setDragImage(event.currentTarget, 24, 24);
                window.setTimeout(() => setDraggingSlug(product.slug), 0);
              }}
              onDragEnd={() => {
                setDraggingSlug("");
                setDragOverSlug("");
              }}
              onDragEnter={() => {
                if (product.slug !== draggingSlug) {
                  setDragOverSlug(product.slug);
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                if (product.slug !== draggingSlug) {
                  setDragOverSlug(product.slug);
                }
              }}
              onDrop={(event) => handleDrop(event, product.slug)}
            >
              <img src={buildImageUrl(thumbnail)} alt="" />
              <span>
                <strong title={product.name_zh || product.name_en}>{product.name_zh || product.name_en}</strong>
                <small>
                  {profile?.code || product.slug}
                  {product.is_listed === 0 ? <b>已下架</b> : null}
                </small>
              </span>
            </button>
          );
        })}
      </div>
      <p className="product-admin-hint">共 {products.length} 个产品</p>
    </div>
  );
}

function ProductRowFields({
  product,
  onChange,
}: {
  product: AdminProductRow;
  onChange: (slug: string, patch: Partial<AdminProductRow>) => void;
}) {
  return (
    <div className="product-admin-fields">
      <label>Slug<input value={product.slug} readOnly /></label>
      <label>排序<input type="number" value={product.sort_order} onChange={(event) => onChange(product.slug, { sort_order: Number(event.target.value) })} /></label>
      <label>英文名称<input value={product.name_en} onChange={(event) => onChange(product.slug, { name_en: event.target.value })} /></label>
      <label>中文名称<input value={product.name_zh} onChange={(event) => onChange(product.slug, { name_zh: event.target.value })} /></label>
    </div>
  );
}

function ProductDetailEditor({
  token,
  product,
  profile,
  onProductChange,
  onProfileChange,
  onSave,
  isBusy,
  onDelete,
  onToggleListing,
}: {
  token: string;
  product: AdminProductRow;
  profile: AdminProductProfileRow;
  onProductChange: (slug: string, patch: Partial<AdminProductRow>) => void;
  onProfileChange: (slug: string, patch: Partial<AdminProductProfileRow>) => void;
  onSave: () => void;
  isBusy: boolean;
  onDelete: () => void;
  onToggleListing: () => void;
}) {
  return (
    <div className="product-detail-admin">
      <div className="product-detail-admin-head">
        <h2>商品详情</h2>
        {product.is_listed === 0 ? <span>已下架</span> : null}
      </div>
      <div className="product-detail-form">
        <label className="span-2">商品名称（中文）<input value={product.name_zh} onChange={(event) => onProductChange(product.slug, { name_zh: event.target.value })} /></label>
        <label>型号<input value={profile.code} onChange={(event) => onProfileChange(profile.slug, { code: event.target.value })} /></label>
        <label>英文副标题<input value={profile.subtitle_en} onChange={(event) => onProfileChange(profile.slug, { subtitle_en: event.target.value })} /></label>
        <label>中文副标题<input value={profile.subtitle_zh} onChange={(event) => onProfileChange(profile.slug, { subtitle_zh: event.target.value })} /></label>
        <label className="span-2">卖点（每行一个）<textarea value={linesFromJson(profile.highlights_zh)} onChange={(event) => onProfileChange(profile.slug, { highlights_zh: jsonFromLines(event.target.value) })} /></label>
        <label className="span-2">规格参数（名称: 值，每行一个）<textarea value={specLinesFromJson(profile.specs_zh)} onChange={(event) => onProfileChange(profile.slug, { specs_zh: specsJsonFromLines(event.target.value) })} /></label>
        <GalleryFields token={token} profile={profile} onProfileChange={onProfileChange} />
      </div>
      <div className="product-detail-actions">
        <button type="button" className="admin-delete-button" onClick={onDelete}>删除商品</button>
        <button type="button" className="admin-cancel-button" onClick={onToggleListing}>
          {product.is_listed === 0 ? "重新上架" : "下架商品"}
        </button>
        <button type="button" className="admin-save-button" onClick={onSave} disabled={isBusy}>
          {isBusy ? "保存中" : "保存修改"}
        </button>
      </div>
    </div>
  );
}

function GalleryFields({
  token,
  profile,
  onProfileChange,
}: {
  token: string;
  profile: AdminProductProfileRow;
  onProfileChange: (slug: string, patch: Partial<AdminProductProfileRow>) => void;
}) {
  const gallery = parseGallery(profile.gallery_json);
  const imageLines = (gallery.images ?? []).join("\n");
  const updateGallery = (patch: Partial<ProductProfile["gallery"]>) => {
    onProfileChange(profile.slug, { gallery_json: JSON.stringify({ ...gallery, ...patch }) });
  };
  async function uploadImage(event: ChangeEvent<HTMLInputElement>, kind: "studio" | "lifestyle" | "images") {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    try {
      const url = await uploadAdminMedia(token, file);
      if (kind === "images") {
        updateGallery({ images: [...(gallery.images ?? []), url] });
      } else {
        updateGallery({ [kind]: url });
      }
    } finally {
      event.currentTarget.value = "";
    }
  }

  return (
    <div className="gallery-admin span-2">
      <ImageUploadBox title="主图" image={gallery.studio} buttonLabel="上传主图" onUpload={(event) => uploadImage(event, "studio")} />
      <ImageUploadBox title="场景图" image={gallery.lifestyle} buttonLabel="上传场景图" onUpload={(event) => uploadImage(event, "lifestyle")} />
      <label className="gallery-lines">详情图列表（可拖拽调整顺序）<textarea value={imageLines} onChange={(event) => updateGallery({ images: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) })} /></label>
      <label className="gallery-add">
        <input type="file" accept="image/*" onChange={(event) => uploadImage(event, "images")} />
        <span>＋<br />添加图片</span>
      </label>
    </div>
  );
}

function ImageUploadBox({
  title,
  image,
  buttonLabel,
  onUpload,
}: {
  title: string;
  image: string | undefined;
  buttonLabel: string;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="image-upload-box">
      <span>{title}</span>
      <div>
        {image ? <img src={buildImageUrl(image)} alt="" /> : <i />}
        <label>
          <input type="file" accept="image/*" onChange={onUpload} />
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></svg>
          {buttonLabel}
        </label>
      </div>
    </div>
  );
}

function AdminLoginIcon({ name }: { name: "key" | "lock" | "shield" }) {
  const paths: Record<"key" | "lock" | "shield", string[]> = {
    key: ["M15 7a4 4 0 1 0-3.4 6.1L4 20l3-1 1-3 3-1 1.2-1.2A4 4 0 0 0 15 7Z", "M17 5l2 2"],
    lock: ["M7 11V8a5 5 0 0 1 10 0v3", "M6 11h12v10H6V11Z", "M12 15v2"],
    shield: ["M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z", "m9 12 2 2 4-5"],
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name].map((path) => <path d={path} key={path} />)}
    </svg>
  );
}

function MountainLogo() {
  return (
    <svg viewBox="0 0 74 52" aria-hidden="true" className="admin-logo-mark">
      <path d="M4 46 24 11l13 22 8-13 25 26H4Z" />
      <path d="m24 11 3 21 10 1" />
      <path d="m45 20 2 16 10-1" />
    </svg>
  );
}

function AdminNavIcon({ name }: { name: AdminSectionKey }) {
  const paths: Record<AdminSectionKey, string[]> = {
    home: ["M4 11 12 4l8 7", "M6 10v10h12V10"],
    products: ["M12 3 4 7v10l8 4 8-4V7l-8-4Z", "M4 7l8 4 8-4", "M12 11v10"],
    about: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4 21a8 8 0 0 1 16 0"],
    quality: ["M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z", "m9 12 2 2 4-5"],
    news: ["M6 3h9l3 3v15H6V3Z", "M14 3v4h4", "M9 11h6", "M9 15h6"],
    contact: ["M3 6h18v12H3V6Z", "m3 7 9 7 9-7"],
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name].map((path) => <path d={path} key={path} />)}
    </svg>
  );
}

type ContactAdminIconName =
  | "check"
  | "clock"
  | "cloud"
  | "download"
  | "eye"
  | "globe"
  | "headset"
  | "hourglass"
  | "leaf"
  | "mail"
  | "message"
  | "partner"
  | "phone"
  | "refresh"
  | "search"
  | "settings"
  | "trash"
  | "trend";

function ContactAdminIcon({ name }: { name: ContactAdminIconName }) {
  const paths: Record<ContactAdminIconName, string[]> = {
    check: ["m5 12 4 4L19 6"],
    clock: ["M12 6v6l4 2", "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],
    cloud: ["M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.3-2A5 5 0 0 0 7 18Z"],
    download: ["M12 4v11", "m8 11 4 4 4-4", "M5 20h14"],
    eye: ["M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
    globe: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z", "M3.6 9h16.8", "M3.6 15h16.8", "M12 3a14 14 0 0 1 0 18", "M12 3a14 14 0 0 0 0 18"],
    headset: ["M4 13v-1a8 8 0 0 1 16 0v1", "M4 13h4v6H4v-6Z", "M16 13h4v4a4 4 0 0 1-4 4h-3", "M16 13v6"],
    hourglass: ["M6 3h12", "M6 21h12", "M8 3c0 5 8 5 8 9s-8 4-8 9", "M16 3c0 5-8 5-8 9s8 4 8 9"],
    leaf: ["M5 19c7 0 13-6 14-14-8 1-14 7-14 14Z", "M5 19c3-5 7-8 12-10"],
    mail: ["M3 6h18v12H3V6Z", "m3 7 9 6 9-6"],
    message: ["M4 5h16v11H8l-4 4V5Z", "M8 9h8", "M8 13h5"],
    partner: ["M8 12 5 9a3 3 0 0 1 4-4l3 3", "m16 12 3-3a3 3 0 0 0-4-4l-3 3", "m8 12 4 4 4-4", "m10 18 2 2 2-2"],
    phone: ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z"],
    refresh: ["M20 6v5h-5", "M4 18v-5h5", "M18 11a6 6 0 0 0-10-4l-4 4", "M6 13a6 6 0 0 0 10 4l4-4"],
    search: ["M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z", "m21 21-4.3-4.3"],
    settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M19.4 15a7.8 7.8 0 0 0 .1-1.1 7.8 7.8 0 0 0-.1-1.1l2-1.5-2-3.4-2.4 1a7.6 7.6 0 0 0-1.8-1l-.3-2.6h-4l-.3 2.6a7.6 7.6 0 0 0-1.8 1l-2.4-1-2 3.4 2 1.5a7.8 7.8 0 0 0-.1 1.1c0 .4 0 .8.1 1.1l-2 1.5 2 3.4 2.4-1a7.6 7.6 0 0 0 1.8 1l.3 2.6h4l.3-2.6a7.6 7.6 0 0 0 1.8-1l2.4 1 2-3.4-2-1.5Z"],
    trash: ["M4 7h16", "M10 11v6", "M14 11v6", "M6 7l1 14h10l1-14", "M9 7V4h6v3"],
    trend: ["M4 16 9 11l4 4 7-8", "M16 7h4v4"],
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name].map((path) => <path d={path} key={path} />)}
    </svg>
  );
}

function DragDots() {
  return (
    <svg viewBox="0 0 12 18" aria-hidden="true" className="admin-drag-dots">
      <circle cx="3" cy="3" r="1.4" /><circle cx="9" cy="3" r="1.4" />
      <circle cx="3" cy="9" r="1.4" /><circle cx="9" cy="9" r="1.4" />
      <circle cx="3" cy="15" r="1.4" /><circle cx="9" cy="15" r="1.4" />
    </svg>
  );
}

function getAdminMenuLabel(key: AdminSectionKey) {
  const labels: Record<AdminSectionKey, string> = {
    home: "首页",
    products: "产品管理",
    about: "关于我们",
    quality: "品质保障",
    news: "资讯",
    contact: "联系",
  };

  return labels[key];
}

function ModuleEditor({
  label,
  path,
  englishValue,
  chineseValue,
  uploadedUrl,
  onEnglishChange,
  onChineseChange,
}: {
  label: string;
  path: FieldPath;
  englishValue: unknown;
  chineseValue: unknown;
  uploadedUrl: string;
  onEnglishChange: (path: FieldPath, value: unknown) => void;
  onChineseChange: (path: FieldPath, value: unknown) => void;
}) {
  if (Array.isArray(englishValue) || Array.isArray(chineseValue)) {
    const englishItems = Array.isArray(englishValue) ? englishValue : [];
    const chineseItems = Array.isArray(chineseValue) ? chineseValue : [];
    const itemCount = Math.max(englishItems.length, chineseItems.length);

    return (
      <section className="admin-fieldset">
        <div className="admin-fieldset-head">
          <h3>{label}</h3>
          <button
            type="button"
            onClick={() => {
              onEnglishChange(path, [...englishItems, createBlankValue(englishItems[0])]);
              onChineseChange(path, [...chineseItems, createBlankValue(chineseItems[0])]);
            }}
          >
            添加一项
          </button>
        </div>
        <div className="admin-list-editor">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div className="admin-list-item" key={`${path.join(".")}-${index}`}>
              <div className="admin-list-item-head">
                <strong>{label} #{index + 1}</strong>
                <button
                  type="button"
                  onClick={() => {
                    onEnglishChange(path, englishItems.filter((__, itemIndex) => itemIndex !== index));
                    onChineseChange(path, chineseItems.filter((__, itemIndex) => itemIndex !== index));
                  }}
                >
                  删除
                </button>
              </div>
              <ModuleEditor
                label={`${label} ${index + 1}`}
                path={[...path, index]}
                englishValue={englishItems[index]}
                chineseValue={chineseItems[index]}
                uploadedUrl={uploadedUrl}
                onEnglishChange={onEnglishChange}
                onChineseChange={onChineseChange}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isPlainObject(englishValue) || isPlainObject(chineseValue)) {
    const keys = Array.from(
      new Set([
        ...Object.keys(isPlainObject(englishValue) ? englishValue : {}),
        ...Object.keys(isPlainObject(chineseValue) ? chineseValue : {}),
      ]),
    );

    return (
      <section className="admin-fieldset">
        <h3>{label}</h3>
        <div className="admin-field-grid">
          {keys.map((key) => (
            <ModuleEditor
              key={[...path, key].join(".")}
              label={formatLabel(key)}
              path={[...path, key]}
              englishValue={isPlainObject(englishValue) ? englishValue[key] : ""}
              chineseValue={isPlainObject(chineseValue) ? chineseValue[key] : ""}
              uploadedUrl={uploadedUrl}
              onEnglishChange={onEnglishChange}
              onChineseChange={onChineseChange}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="admin-field-row">
      <div className="admin-field-label">
        <span>{label}</span>
        {uploadedUrl && isImageField(path) ? (
          <button
            type="button"
            onClick={() => {
              onEnglishChange(path, uploadedUrl);
              onChineseChange(path, uploadedUrl);
            }}
          >
            使用上传图片
          </button>
        ) : null}
      </div>
      <div className="admin-language-grid">
        <label>
          英文
          {shouldUseTextarea(path, englishValue) ? (
            <textarea value={stringifyEditableValue(englishValue)} onChange={(event) => onEnglishChange(path, event.target.value)} />
          ) : (
            <input value={stringifyEditableValue(englishValue)} onChange={(event) => onEnglishChange(path, event.target.value)} />
          )}
        </label>
        <label>
          中文
          {shouldUseTextarea(path, chineseValue) ? (
            <textarea value={stringifyEditableValue(chineseValue)} onChange={(event) => onChineseChange(path, event.target.value)} />
          ) : (
            <input value={stringifyEditableValue(chineseValue)} onChange={(event) => onChineseChange(path, event.target.value)} />
          )}
        </label>
      </div>
    </div>
  );
}

function buildDefaultDrafts(locale: "en" | "zh"): Record<AdminSectionKey, LocaleContent> {
  return sections.reduce(
    (drafts, section) => ({
      ...drafts,
      [section.key]: pickFields(copy[locale] as LocaleContent, section.modules),
    }),
    {} as Record<AdminSectionKey, LocaleContent>,
  );
}

function pickFields(source: LocaleContent, fields: string[]) {
  return fields.reduce<LocaleContent>((picked, field) => {
    picked[field] = source[field];
    return picked;
  }, {});
}

function applySavedSections(
  rows: AdminSectionRow[],
  setEnglishDrafts: Dispatch<SetStateAction<Record<AdminSectionKey, LocaleContent>>>,
  setChineseDrafts: Dispatch<SetStateAction<Record<AdminSectionKey, LocaleContent>>>,
) {
  rows.forEach((row) => {
    setEnglishDrafts((drafts) => ({ ...drafts, [row.section_key]: parseSavedContent(row.content_en, drafts[row.section_key]) }));
    setChineseDrafts((drafts) => ({ ...drafts, [row.section_key]: parseSavedContent(row.content_zh, drafts[row.section_key]) }));
  });
}

function parseSavedContent(rawContent: string, fallback: LocaleContent) {
  try {
    const parsed = JSON.parse(rawContent);
    return isPlainObject(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function updateSectionDraft(
  drafts: Record<AdminSectionKey, LocaleContent>,
  sectionKey: AdminSectionKey,
  path: FieldPath,
  value: unknown,
) {
  return {
    ...drafts,
    [sectionKey]: setValueAtPath(drafts[sectionKey], path, value),
  };
}

function setValueAtPath(source: unknown, path: FieldPath, value: unknown): LocaleContent {
  if (path.length === 0) {
    return isPlainObject(value) ? value : {};
  }

  return setNestedValue(source, path, value) as LocaleContent;
}

function setNestedValue(source: unknown, path: FieldPath, value: unknown): unknown {
  const [head, ...rest] = path;

  if (head === undefined) {
    return value;
  }

  if (typeof head === "number") {
    const nextArray = Array.isArray(source) ? [...source] : [];
    nextArray[head] = setNestedValue(nextArray[head], rest, value);
    return nextArray;
  }

  const nextObject = isPlainObject(source) ? { ...source } : {};
  nextObject[head] = setNestedValue(nextObject[head], rest, value);
  return nextObject;
}

function isPlainObject(value: unknown): value is LocaleContent {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getContactDraft(draft: LocaleContent): LocaleContent {
  return isPlainObject(draft.contact) ? draft.contact : {};
}

function getSupportItems(contact: LocaleContent, locale: "en" | "zh") {
  const fallback =
    locale === "zh"
      ? [
          { title: "产品咨询", note: "请发送邮件至", email: "sales@dawnrisecamp.com" },
          { title: "订单支持", note: "请发送邮件至", email: "sales@dawnrisecamp.com" },
          { title: "商务合作", note: "请发送邮件至", email: "sales@dawnrisecamp.com" },
        ]
      : [
          { title: "Product Consultation", note: "Please send email to", email: "sales@dawnrisecamp.com" },
          { title: "Order Support", note: "Please send email to", email: "sales@dawnrisecamp.com" },
          { title: "Business Inquiry", note: "Please send email to", email: "sales@dawnrisecamp.com" },
        ];
  const items = Array.isArray(contact.supportItems) ? contact.supportItems : [];

  return fallback.map((fallbackItem, index) => {
    const item = items[index];
    return isPlainObject(item)
      ? {
          title: String(item.title ?? fallbackItem.title),
          note: String(item.note ?? fallbackItem.note),
          email: String(item.email ?? fallbackItem.email),
        }
      : fallbackItem;
  });
}

function formatInquiryDate(value: string) {
  const date = new Date(value.endsWith("Z") ? value : `${value}Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function parseInquiryDate(value: string) {
  const date = new Date(value.endsWith("Z") ? value : `${value}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isInquiryWithinRange(value: string, range: "30" | "7" | "all") {
  if (range === "all") return true;

  const date = parseInquiryDate(value);
  if (!date) return true;

  const days = Number(range);
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return date.getTime() >= cutoff;
}

function getInquiryTopic(inquiry: AdminInquiryRow) {
  const text = `${inquiry.company} ${inquiry.message}`.toLowerCase();

  if (text.includes("trekking") || text.includes("登山杖")) return "Trekking Poles Inquiry";
  if (text.includes("sample") || text.includes("样品")) return "样品申请";
  if (text.includes("ship") || text.includes("delivery") || text.includes("发货") || text.includes("交期")) return "Shipping Time";
  if (text.includes("partner") || text.includes("合作")) return "商务合作";
  if (text.includes("tent") || text.includes("帐篷")) return "双人帐篷推荐";

  return inquiry.locale === "zh" ? "产品咨询" : "Product Inquiry";
}

function getInquiryStatus(inquiry: AdminInquiryRow): AdminInquiryStatus {
  return inquiry.status ?? "待处理";
}

function getNextInquiryStatus(status: AdminInquiryStatus): AdminInquiryStatus {
  if (status === "待处理") return "已回复";
  if (status === "已回复") return "已合作";
  return "待处理";
}

function getInquiryStatusClass(status: AdminInquiryStatus) {
  if (status === "已回复") return "replied";
  if (status === "已合作") return "cooperated";
  return "pending";
}

function formatPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 1000) / 10}%`;
}

function createBlankValue(template: unknown): unknown {
  if (Array.isArray(template)) {
    return [];
  }

  if (isPlainObject(template)) {
    return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, createBlankValue(value)]));
  }

  return "";
}

function stringifyEditableValue(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
}

function shouldUseTextarea(path: FieldPath, value: unknown) {
  const fieldName = String(path[path.length - 1] ?? "").toLowerCase();
  return fieldName.includes("body") || fieldName.includes("excerpt") || stringifyEditableValue(value).length > 80;
}

function isImageField(path: FieldPath) {
  const fieldName = String(path[path.length - 1] ?? "").toLowerCase();
  return fieldName.includes("image") || fieldName === "studio" || fieldName === "lifestyle";
}

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildProductRowsFromFallback() {
  const rows: AdminProductRow[] = [];
  const zhBySlug = new Map<string, ProductNode>();
  flattenProductNodes(fallbackProducts.zh).forEach((node) => zhBySlug.set(node.slug, node));

  function visit(nodes: ProductNode[], parentSlug: string | null, baseSort: number) {
    nodes.forEach((node, index) => {
      rows.push({
        slug: node.slug,
        parent_slug: parentSlug,
        sort_order: baseSort + index + 1,
        name_en: node.name,
        name_zh: zhBySlug.get(node.slug)?.name ?? node.name,
        is_listed: 1,
      });
      visit(node.children, node.slug, (baseSort + index + 1) * 10);
    });
  }

  visit(fallbackProducts.en, null, 0);
  return rows;
}

function flattenProductNodes(nodes: ProductNode[]): ProductNode[] {
  return nodes.flatMap((node) => [node, ...flattenProductNodes(node.children)]);
}

function mergeProfileRows(products: AdminProductRow[], savedProfiles: AdminProductProfileRow[]) {
  const savedBySlug = new Map(savedProfiles.map((profile) => [profile.slug, profile]));
  const parentSlugs = new Set(products.map((product) => product.parent_slug).filter(Boolean));

  return products
    .filter((product) => !parentSlugs.has(product.slug))
    .map((product) => savedBySlug.get(product.slug) ?? createProfileFromStatic(product.slug));
}

function createProfileFromStatic(slug: string): AdminProductProfileRow {
  const en = staticProductProfiles.en[slug];
  const zh = staticProductProfiles.zh[slug];

  return {
    slug,
    code: en?.code ?? zh?.code ?? "",
    subtitle_en: en?.subtitle ?? "",
    subtitle_zh: zh?.subtitle ?? en?.subtitle ?? "",
    highlights_en: JSON.stringify(en?.highlights ?? []),
    highlights_zh: JSON.stringify(zh?.highlights ?? en?.highlights ?? []),
    feature_title_en: en?.featureTitle ?? "",
    feature_title_zh: zh?.featureTitle ?? en?.featureTitle ?? "",
    feature_body_en: en?.featureBody ?? "",
    feature_body_zh: zh?.featureBody ?? en?.featureBody ?? "",
    specs_en: JSON.stringify(en?.specs ?? []),
    specs_zh: JSON.stringify(zh?.specs ?? en?.specs ?? []),
    gallery_json: JSON.stringify(en?.gallery ?? zh?.gallery ?? { studio: "", lifestyle: "", images: [] }),
  };
}

function normalizeProductRows(products: AdminProductRow[]) {
  return products
    .filter((product) => product.slug.trim() && product.name_en.trim() && product.name_zh.trim())
    .map((product) => ({
      ...product,
      slug: product.slug.trim(),
      parent_slug: product.parent_slug || null,
      name_en: product.name_en.trim(),
      name_zh: product.name_zh.trim(),
      sort_order: Number(product.sort_order) || 0,
      is_listed: product.is_listed === 0 ? 0 : 1,
    }));
}

function sortProductRows(products: AdminProductRow[]) {
  return [...products].sort((left, right) => {
    const sortDiff = (Number(left.sort_order) || 0) - (Number(right.sort_order) || 0);
    if (sortDiff !== 0) return sortDiff;
    return left.slug.localeCompare(right.slug);
  });
}

function runViewTransition(update: () => void) {
  const startViewTransition = (
    document as Document & { startViewTransition?: (callback: () => void) => void }
  ).startViewTransition;

  if (!startViewTransition) {
    update();
    return;
  }

  startViewTransition.call(document, () => {
    flushSync(update);
  });
}

function getProductViewTransitionName(slug: string) {
  return `product-row-${slug.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function getDescendantSlugs(products: AdminProductRow[], parentSlug: string): string[] {
  const directChildren = products.filter((product) => product.parent_slug === parentSlug);
  return directChildren.flatMap((child) => [child.slug, ...getDescendantSlugs(products, child.slug)]);
}

function createBlankProfile(slug: string): AdminProductProfileRow {
  return {
    slug,
    code: "",
    subtitle_en: "",
    subtitle_zh: "",
    highlights_en: "[]",
    highlights_zh: "[]",
    feature_title_en: "",
    feature_title_zh: "",
    feature_body_en: "",
    feature_body_zh: "",
    specs_en: "[]",
    specs_zh: "[]",
    gallery_json: JSON.stringify({ studio: "", lifestyle: "", images: [] }),
  };
}

function getNextSortOrder(items: AdminProductRow[], parentSlug: string | null) {
  const maxSort = items.reduce((max, item) => Math.max(max, Number(item.sort_order) || 0), 0);
  if (maxSort > 0) {
    return maxSort + 1;
  }

  return parentSlug ? 100 : 10;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

function uniqueSlug(baseSlug: string, existingSlugs: string[]) {
  let nextSlug = baseSlug;
  let index = 2;
  while (existingSlugs.includes(nextSlug)) {
    nextSlug = `${baseSlug}-${index}`;
    index += 1;
  }
  return nextSlug;
}

function parseJsonList(raw: string): unknown[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function linesFromJson(raw: string) {
  return parseJsonList(raw).map((item) => String(item)).join("\n");
}

function jsonFromLines(value: string) {
  return JSON.stringify(value.split("\n").map((line) => line.trim()).filter(Boolean));
}

function specLinesFromJson(raw: string) {
  return parseJsonList(raw)
    .map((item) => {
      if (isPlainObject(item)) {
        return `${item.label ?? ""}: ${item.value ?? ""}`;
      }
      return String(item);
    })
    .join("\n");
}

function specsJsonFromLines(value: string) {
  return JSON.stringify(
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split(":");
        return { label: label.trim(), value: rest.join(":").trim() };
      }),
  );
}

function parseGallery(raw: string): ProductProfile["gallery"] {
  try {
    const parsed = JSON.parse(raw);
    if (isPlainObject(parsed)) {
      return {
        studio: String(parsed.studio ?? ""),
        lifestyle: String(parsed.lifestyle ?? ""),
        images: Array.isArray(parsed.images) ? parsed.images.map((image) => String(image)) : [],
      };
    }
  } catch {
    // Fall through to the empty gallery below.
  }

  return { studio: "", lifestyle: "", images: [] };
}
