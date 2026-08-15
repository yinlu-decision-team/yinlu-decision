import { ROUTE_LABELS, STAGE_CONFIG } from "./stage-data.js";

const body = document.body;
const root = body.dataset.root || "../";
const page = body.dataset.page || body.dataset.stage || "home";
const stage = STAGE_CONFIG[body.dataset.stage] || null;
const stageRoutes = Object.values(STAGE_CONFIG).map((config) => config.route);
const routeParams = new URLSearchParams(window.location.search);

// The original app already contains the complete shared shell and every
// feature view. Legacy route pages now hand navigation back to that shell so
// they cannot replace it with a reduced, second layout.
const legacyRouteView = {
  home: "home",
  schools: "experience",
  "school-detail": "school-detail",
  questions: "questions",
  candidates: "compare",
  trust: "trust",
  answerer: "answerer",
  workspace: "home",
  identity: "home"
}[page] || (stage ? "home" : "");
if (legacyRouteView) {
  const targetParams = new URLSearchParams(routeParams);
  targetParams.set("view", legacyRouteView);
  if (stage?.stageKey) targetParams.set("stage", stage.stageKey);
  window.location.replace(`${root}index.html?${targetParams.toString()}`);
  await new Promise(() => {});
}
const storedStage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return stageRoutes.includes(value) ? value : fallback;
  } catch (error) {
    return fallback;
  }
};
const requestedPlannerStageRoute = Object.values(STAGE_CONFIG).find((config) => config.stageKey === routeParams.get("stage"))?.route;
const plannerStageRoute = stage?.route || requestedPlannerStageRoute || storedStage("yinlu_planner_stage", "gaokao");
const answererStageRoute = stageRoutes.includes(routeParams.get("answerStage"))
  ? routeParams.get("answerStage")
  : storedStage("yinlu_answerer_stage", "gaokao");
const plannerStageIndex = stageRoutes.indexOf(plannerStageRoute);
const answerableStageRoutes = new Set(stageRoutes.slice(0, Math.max(plannerStageIndex, 0)));
const effectiveAnswererStageRoute = answerableStageRoutes.has(answererStageRoute) ? answererStageRoute : [...answerableStageRoutes][0] || "";
const answererStageConfig = STAGE_CONFIG[answererStageRoute] || null;
const ROUTE_THEME_OPTIONS = [
  ["apple", "苹果爱丽丝", "#5ba9d8"],
  ["spring", "春野同行", "#65a88f"],
  ["night", "夜航星光", "#5e628f"],
  ["iceglass", "碎冰琉璃", "#73b9c4"]
];
const ROUTE_PET_AVATARS = {
  egret: ["鹭小引", "pet-t-egret-guide.svg?v=20260815"],
  deer: ["不迷鹿", "pet-s-never-lost-deer.svg?v=20260815"],
  koi: ["小锦鲤", "pet-v-lucky-koi.svg?v=20260815"],
  sheep: ["向前羊", "pet-w-sailing-sheep.svg?v=20260815"],
  turtle: ["慢途龟", "pet-z-homebound-turtle.svg?v=20260815"]
};
try {
  if (stage || requestedPlannerStageRoute) localStorage.setItem("yinlu_planner_stage", plannerStageRoute);
  if (page === "answerer" && answerableStageRoutes.has(routeParams.get("answerStage"))) localStorage.setItem("yinlu_answerer_stage", routeParams.get("answerStage"));
} catch (error) {}

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

function href(route, params = {}) {
  const routePaths = { "schools/detail": "schools/detail.html", 404: "404.html" };
  const path = routePaths[route] || (route === "home" ? "index.html" : `${route}/index.html`);
  const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== "" && value != null));
  return `${root}${path}${query.toString() ? `?${query}` : ""}`;
}

function legacyView(view, params = {}) {
  const routeMap = { experience: "schools", questions: "questions", compare: "candidates", trust: "trust", home: "home" };
  return href(routeMap[view] || "home", params);
}

function navItems() {
  return [
    ["home", "compass", "首页"],
    ["schools", "library", "院校与经验"],
    ["questions", "message-circle-question", "问答中心"],
    ["candidates", "square-kanban", "我的候选"],
    ["trust", "badge-check", "信任与认证"]
  ];
}

function renderNav() {
  const items = page === "answerer"
    ? [["questions", "message-circle-question", "问答中心"], ["identity", "user-round-cog", "身份选择"], ["trust", "badge-check", "信任与认证"]]
    : navItems();
  return items.map(([route, icon, label]) => {
    const active = route === page || (route === "home" && page === "home") || (route === "schools" && page === "school-detail");
    const stageKey = stage?.stageKey || answererStageConfig?.stageKey || "";
    const target = route === "schools" ? href("schools", { stage: stageKey })
      : route === "questions" ? href("questions", { stage: stageKey })
        : route === "candidates" ? href("candidates", { stage: stageKey })
          : route === "trust" ? href("trust", { stage: stageKey }) : href(route);
    return `<a class="route-nav-item${active ? " active" : ""}" href="${target}"${active ? ' aria-current="page"' : ""}><i data-lucide="${icon}"></i><span>${label}</span></a>`;
  }).join("");
}

function renderRouteUtilities() {
  return `<div class="route-top-actions">
    <button class="route-utility-link" type="button" data-route-pet-toggle title="打开电子宠物" aria-label="打开电子宠物" aria-expanded="false"><i data-lucide="sparkles"></i></button>
    <button class="route-utility-link" type="button" data-route-guide-toggle title="查看新手指导" aria-label="查看新手指导"><i data-lucide="book-open"></i></button>
    <div class="route-theme-control"><button class="route-utility-link" type="button" data-route-theme-toggle title="切换主题" aria-label="切换主题" aria-expanded="false"><i data-lucide="palette"></i></button><div class="route-theme-popover" id="routeThemePopover" hidden><strong>界面主题</strong>${ROUTE_THEME_OPTIONS.map(([value, label, color]) => `<button type="button" data-route-theme="${value}"><span style="--route-theme-swatch:${color}"></span>${label}<i data-lucide="check"></i></button>`).join("")}</div></div>
    <a class="route-calendar-link" href="${href("home", { calendar: "1" })}" title="设置决策日历"><i data-lucide="calendar-days"></i><span>决策日历</span></a>
    <a class="route-avatar" href="${href("identity")}" aria-label="打开身份选择"><i data-lucide="user-round-cog"></i></a>
  </div>`;
}

function renderRouteAssistants() {
  const storedAvatar = (() => { try { return localStorage.getItem("yinlu_pet_avatar") || "egret"; } catch (error) { return "egret"; } })();
  const [petName, petSrc] = ROUTE_PET_AVATARS[storedAvatar] || ROUTE_PET_AVATARS.egret;
  const stageKey = stage?.stageKey || answererStageConfig?.stageKey || "";
  return `<div class="route-guide-backdrop" id="routeGuide" hidden><section class="route-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="routeGuideTitle"><button type="button" data-route-guide-close aria-label="关闭新手指导"><i data-lucide="x"></i></button><span>当前页面指引</span><h2 id="routeGuideTitle">先确认阶段，再进入具体功能</h2><ol><li><b>01</b>顶部阶段线切换当前决策阶段</li><li><b>02</b>侧栏进入院校、问答、候选与认证</li><li><b>03</b>右上角随时打开工具与身份选择</li></ol></section></div>
  <aside class="route-pet" id="routePet"><section class="route-pet-panel" id="routePetPanel" hidden><header><img src="${root}${petSrc}" alt=""><div><strong>${petName}</strong><small>你的决策助手</small></div><button type="button" data-route-pet-close aria-label="收起电子宠物"><i data-lucide="x"></i></button></header><p id="routePetReply">我会跟着你留在每个阶段页面。现在可以从一个具体问题开始。</p><div class="route-pet-actions"><a href="${href("questions", { stage: stageKey })}">我想问问</a><a href="${href("schools", { stage: stageKey })}">查院校经验</a><a href="${href("candidates", { stage: stageKey })}">看我的候选</a></div><form id="routePetForm"><label class="route-sr-only" for="routePetInput">向小引提问</label><input id="routePetInput" maxlength="120" placeholder="说说你现在纠结的选择"><button type="submit" aria-label="发送"><i data-lucide="send"></i></button></form><small>AI 接口后续接入，当前为前端交互示例</small></section><button class="route-pet-toggle" type="button" data-route-pet-toggle aria-label="打开${petName}" aria-expanded="false"><img src="${root}${petSrc}" alt="${petName}"></button></aside>`;
}

function renderLegacyStageSwitcher() {
  return `<nav class="route-stage-switcher" aria-label="决策阶段">${Object.values(STAGE_CONFIG).map((config, index) => {
    const active = stage?.route === config.route;
    const connector = index ? '<span class="route-stage-connector" aria-hidden="true"></span>' : "";
    return `${connector}<a class="route-stage-switch-link${active ? " active" : ""}" href="${href(config.route)}"${active ? ' aria-current="page"' : ""}><span class="route-stage-node">${String(index + 1).padStart(2, "0")}</span><span>${config.name}</span></a>`;
  }).join("")}</nav>`;
}

function renderUnrestrictedStageSwitcher() {
  return `<nav class="route-stage-switcher" aria-label="决策阶段"><div class="route-stage-track">${Object.values(STAGE_CONFIG).map((config, index) => {
    const plannerActive = plannerStageRoute === config.route;
    const answererActive = answererStageRoute === config.route;
    return `<div class="route-stage-stop"><a class="route-stage-switch-link${plannerActive ? " active" : ""}" href="${href(config.route)}"${stage?.route === config.route ? ' aria-current="page"' : ""}><span class="route-stage-flag" aria-hidden="true">${plannerActive ? '<i data-lucide="flag"></i>' : ""}</span><span class="route-stage-node">${String(index + 1).padStart(2, "0")}</span><span>${config.name}</span></a><a class="route-answer-stage-link${answererActive ? " active" : ""}" href="${href("answerer", { answerStage: config.route })}" title="以${config.name}回答问题" aria-label="以${config.name}回答问题"><i data-lucide="message-circle"></i><span class="route-sr-only">回答${config.name}</span></a></div>`;
  }).join("")}</div></nav>`;
}

function renderStageSwitcher() {
  return `<nav class="route-stage-switcher" aria-label="决策阶段"><div class="route-stage-track">${Object.values(STAGE_CONFIG).map((config, index) => {
    const plannerActive = plannerStageRoute === config.route;
    const answererAllowed = answerableStageRoutes.has(config.route);
    const answererActive = answererAllowed && effectiveAnswererStageRoute === config.route;
    const answererControl = answererAllowed
      ? `<a class="route-answer-stage-link${answererActive ? " active" : ""}" href="${href("answerer", { answerStage: config.route })}" title="以${config.name}回答问题" aria-label="以${config.name}回答问题"><i data-lucide="message-circle"></i><span class="route-sr-only">回答${config.name}</span></a>`
      : `<span class="route-answer-stage-link disabled" title="当前阶段尚不能回答${config.name}问题" aria-label="当前阶段尚不能回答${config.name}问题" aria-disabled="true"><i data-lucide="message-circle"></i></span>`;
    return `<div class="route-stage-stop"><a class="route-stage-switch-link${plannerActive ? " active" : ""}" href="${href(config.route)}"${stage?.route === config.route ? ' aria-current="page"' : ""}><span class="route-stage-flag" aria-hidden="true">${plannerActive ? '<i data-lucide="flag"></i>' : ""}</span><span class="route-stage-node">${String(index + 1).padStart(2, "0")}</span><span>${config.name}</span></a>${answererControl}</div>`;
  }).join("")}</div></nav>`;
}

function renderStagePage(config) {
  const focus = config.focus.map((item) => `<article class="route-focus-card"><span class="route-focus-icon"><i data-lucide="${item.icon}"></i></span><div><strong>${item.title}</strong><p>${item.text}</p></div></article>`).join("");
  const next = config.next.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${item}</li>`).join("");
  return `<section class="route-page route-stage-page" data-stage-page="${config.route}">
    <div class="route-page-header"><div><span class="route-kicker"><i data-lucide="route"></i>${config.eyebrow}</span><h1>${config.name}</h1><p>${config.summary}</p></div><span class="route-stage-badge ${config.accent}">${config.route === "gaokao" ? "01" : config.route === "kaoyan" ? "02" : "03"}</span></div>
    <div class="route-stage-layout"><section class="route-panel route-primary-panel"><div class="route-panel-heading"><div><span class="route-kicker">当前阶段</span><h2>先把问题拆开，再做选择</h2></div><span class="route-status"><i data-lucide="circle-check"></i>阶段页已建立</span></div><div class="route-focus-grid">${focus}</div><div class="route-action-grid"><a class="route-action primary" href="${legacyView("experience", { stage: config.stageKey, tab: "institution" })}"><i data-lucide="search"></i><span><strong>查看院校与经验</strong><small>从官方资料和真实经验开始</small></span></a><a class="route-action" href="${legacyView("questions", { stage: config.stageKey })}"><i data-lucide="message-square-plus"></i><span><strong>整理一个具体问题</strong><small>把还不确定的地方继续追问</small></span></a><a class="route-action" href="${legacyView("compare", { stage: config.stageKey })}"><i data-lucide="square-kanban"></i><span><strong>进入我的候选</strong><small>保存需要进一步比较的选择</small></span></a></div></section><aside class="route-panel route-next-panel"><span class="route-kicker">建议顺序</span><h2>下一步做什么</h2><ol>${next}</ol><a class="route-text-link" href="${href("workspace")}">进入综合规划工作台 <i data-lucide="arrow-up-right"></i></a></aside></div>
    <section class="route-panel route-context-panel"><div><span class="route-kicker">阶段上下文</span><h2>你可以随时切换到其他阶段</h2><p>阶段页面保留在独立 URL 中，刷新、分享和浏览器前进后退都不会丢失当前路径。</p></div><div class="route-stage-links"><a href="${href("gaokao")}" class="${config.route === "gaokao" ? "active" : ""}">高考志愿</a><a href="${href("kaoyan")}" class="${config.route === "kaoyan" ? "active" : ""}">考研择校</a><a href="${href("jiuye")}" class="${config.route === "jiuye" ? "active" : ""}">就业选择</a></div></section>
  </section>`;
}

function renderWorkspacePage() {
  return `<section class="route-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="layout-dashboard"></i>跨阶段规划</span><h1>综合规划工作台</h1><p>把当前阶段、候选、问题和关键时间点放在一起查看。</p></div><span class="route-stage-badge teal">工作台</span></div><div class="route-dashboard-grid"><article class="route-panel route-dashboard-card"><span class="route-kicker">当前进度</span><h2>从高考志愿开始整理</h2><p>阶段信息会随着你的选择逐步补充，先完成一个最重要的小判断。</p><a class="route-action primary" href="${href("gaokao")}"><i data-lucide="arrow-right"></i><span><strong>继续高考阶段</strong><small>回到阶段入口</small></span></a></article><article class="route-panel route-dashboard-card"><span class="route-kicker">我的候选</span><h2>等待进一步比较</h2><p>登录后可以保存学校、专业和问答，形成自己的选择记录。</p><a class="route-text-link" href="${legacyView("compare")}">查看我的候选 <i data-lucide="arrow-up-right"></i></a></article><article class="route-panel route-dashboard-card"><span class="route-kicker">决策时间</span><h2>日历仍在原工作台</h2><p>从首页顶部日历设置报名、考试和其他关键时间点。</p><a class="route-text-link" href="${href("home", { calendar: "1" })}">打开首页日历 <i data-lucide="calendar-days"></i></a></article></div></section>`;
}

function renderAnswererPage() {
  return `<section class="route-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="messages-square"></i>认证回答者</span><h1>回答者工作台</h1><p>查看待回答问题、历史回答和需要补充的真实经验。</p></div><span class="route-stage-badge amber">回答端</span></div><div class="route-dashboard-grid"><article class="route-panel route-dashboard-card"><span class="route-kicker">待回答问题</span><h2>按你的经历筛选问题</h2><p>系统后续会根据学校、专业和阶段匹配更适合回答的问题。</p><a class="route-action primary" href="${legacyView("questions")}"><i data-lucide="inbox"></i><span><strong>查看问题池</strong><small>进入问答中心处理问题</small></span></a></article><article class="route-panel route-dashboard-card"><span class="route-kicker">回答记录</span><h2>真实经历需要具体边界</h2><p>回答时标注学校、专业、年级和时间，方便提问者判断信息是否适用。</p><a class="route-text-link" href="${legacyView("questions")}">回到问答中心 <i data-lucide="arrow-up-right"></i></a></article><article class="route-panel route-dashboard-card"><span class="route-kicker">身份状态</span><h2>认证信息待接入</h2><p>后端认证完成后，这里将展示可回答范围和历史贡献。</p><a class="route-text-link" href="${legacyView("trust")}">查看信任与认证 <i data-lucide="badge-check"></i></a></article></div></section>`;
}

function featureStageKey() {
  const requested = routeParams.get("stage");
  if (["gaokao", "graduate", "career"].includes(requested)) return requested;
  return stage?.stageKey || "gaokao";
}

function renderSchoolsPage() {
  const stageKey = featureStageKey();
  const schools = [
    { id: "fjnu", name: "福建师范大学", city: "福州", tags: "师范特色 · 综合学科", text: "查看学校简介、专业方向、校园设施布局和本校学生经验。" },
    { id: "fzu", name: "福州大学", city: "福州", tags: "工科优势 · 双一流", text: "从官方招生资料和专业培养方向开始，再补充真实学习体验。" },
    { id: "fafu", name: "福建农林大学", city: "福州", tags: "农林特色 · 生态相关", text: "了解专业课程、实践环境、校园生活和后续合作信息。" }
  ];
  return `<section class="route-page route-feature-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="library"></i>信息检索</span><h1>院校与经验</h1><p>先看平台整理的学校信息，再用官方来源和学生经验核对具体细节。</p></div><a class="route-action" href="${href("candidates", { stage: stageKey })}"><i data-lucide="square-kanban"></i><span><strong>我的候选</strong><small>查看已保存的学校与专业</small></span></a></div><div class="route-filter-strip"><label><i data-lucide="search"></i><span class="route-sr-only">搜索学校</span><input type="search" placeholder="搜索学校名称"></label><a class="route-filter-link" href="${href("schools", { stage: stageKey, tab: "official" })}">官方信息</a><a class="route-filter-link active" href="${href("schools", { stage: stageKey, tab: "experience" })}">经验内容</a><span class="route-filter-note">当前阶段：${stageKey === "graduate" ? "考研择校" : stageKey === "career" ? "就业选择" : "高考志愿"}</span></div><div class="route-feature-grid">${schools.map((school) => `<article class="route-panel route-school-card"><div class="route-school-card-top"><span class="route-school-mark">${school.name.slice(0, 1)}</span><div><span class="route-kicker">院校信息</span><h2>${school.name}</h2><small>${school.city} · 平台示例数据</small></div></div><p>${school.text}</p><div class="route-school-tags"><span>${school.tags.split(" · ")[0]}</span><span>${school.tags.split(" · ")[1]}</span></div><footer><span><i data-lucide="clock-3"></i>资料持续更新</span><a class="route-text-link" href="${href("schools/detail", { school: school.id, stage: stageKey })}">查看详情 <i data-lucide="arrow-up-right"></i></a></footer></article>`).join("")}</div></section>`;
}

function renderQuestionsPage() {
  const stageKey = featureStageKey();
  const answering = routeParams.get("tab") === "answer";
  const questions = answering
    ? ["这个专业的课程强度和实际学习节奏怎么样？", "学校不同校区的生活便利程度有什么差别？", "毕业后第一份工作通常需要提前准备什么？"]
    : ["想了解这个专业每天的课程和作业安排。", "学校宿舍距离食堂、快递站和教学楼方便吗？", "考研择校时，专业课难度应该怎么判断？"];
  return `<section class="route-page route-feature-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="message-circle-question"></i>经验交流</span><h1>问答中心</h1><p>把问题说具体，让同校、同专业或同阶段的人补充真实细节。</p></div><a class="route-action primary" href="${href("answerer", { answerStage: stageKey === "graduate" ? "kaoyan" : stageKey === "career" ? "jiuye" : "gaokao" })}"><i data-lucide="messages-square"></i><span><strong>进入回答者工作台</strong><small>查看可回答的阶段问题</small></span></a></div><div class="route-tabs"><a class="${answering ? "" : "active"}" href="${href("questions", { stage: stageKey })}">我要提问</a><a class="${answering ? "active" : ""}" href="${href("questions", { stage: stageKey, tab: "answer" })}">我要回答</a></div><div class="route-question-layout"><section class="route-panel route-question-compose"><span class="route-kicker">${answering ? "待回答问题" : "匿名提问"}</span><h2>${answering ? "选择你真正经历过的问题" : "把想了解的细节写下来"}</h2><p>${answering ? "回答时请标注学校、专业和经历发生的时间。" : "可以继续追问之前的问题，也可以补充学校、专业和关注维度。"}</p><textarea placeholder="${answering ? "选择问题后补充你的真实经历" : "例如：福建农林大学风景园林专业的大一课程和实践安排是什么样？"}"></textarea><button class="primary-button" type="button"><i data-lucide="send"></i>${answering ? "开始回答" : "发布匿名问题"}</button></section><section class="route-panel route-question-list"><div class="panel-heading"><h2>${answering ? "适合你的问题" : "历史问题"}</h2><span class="count-badge">${questions.length} 条</span></div><div class="route-question-items">${questions.map((question, index) => `<article><div><strong>${question}</strong><small>${stageKey === "graduate" ? "考研择校" : stageKey === "career" ? "就业选择" : "高考志愿"} · ${index + 1} 个关注维度</small></div><a class="route-text-link" href="${answering ? href("questions", { stage: stageKey, tab: "answer" }) : href("questions", { stage: stageKey })}">${answering ? "回答" : "查看"} <i data-lucide="arrow-up-right"></i></a></article>`).join("")}</div></section></div></section>`;
}

function renderCandidatesPage() {
  const stageKey = featureStageKey();
  return `<section class="route-page route-feature-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="square-kanban"></i>整理选择</span><h1>我的候选</h1><p>把学校和专业放在一起，比较真正会影响决策的差异。</p></div><a class="route-action" href="${href("schools", { stage: stageKey })}"><i data-lucide="plus"></i><span><strong>继续添加</strong><small>回到院校与经验</small></span></a></div><div class="route-candidate-summary"><span><strong>3</strong> 个示例院校</span><span><strong>2</strong> 个重点专业</span><span>当前阶段：${stageKey === "graduate" ? "考研择校" : stageKey === "career" ? "就业选择" : "高考志愿"}</span></div><section class="route-panel route-comparison-board"><div class="panel-heading"><div><span class="route-kicker">院校优先比较</span><h2>先看学校差异，再进入专业比较</h2></div><span class="count-badge">示例对比</span></div><div class="route-compare-table"><div class="route-compare-row route-compare-head"><span>比较方向</span><strong>福建师范大学</strong><strong>福州大学</strong><strong>福建农林大学</strong></div><div class="route-compare-row"><span>学校类型</span><b>师范特色</b><b>工科优势</b><b>农林特色</b></div><div class="route-compare-row"><span>重点关注</span><b>培养方向、校园氛围</b><b>专业实力、实践资源</b><b>设施布局、实践环境</b></div><div class="route-compare-row"><span>下一步</span><a href="${href("schools/detail", { school: "fjnu", stage: stageKey })}">看学校详情</a><a href="${href("schools/detail", { school: "fzu", stage: stageKey })}">看学校详情</a><a href="${href("schools/detail", { school: "fafu", stage: stageKey })}">看学校详情</a></div></div></section><div class="route-next-actions"><a class="route-action primary" href="${href("schools", { stage: stageKey })}"><i data-lucide="search"></i><span><strong>继续找学校</strong><small>回到院校与经验页面</small></span></a><a class="route-action" href="${href("questions", { stage: stageKey })}"><i data-lucide="message-circle-question"></i><span><strong>为候选提问</strong><small>把不确定的差异继续问清楚</small></span></a></div></section>`;
}

function renderTrustPage() {
  return `<section class="route-page route-feature-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="badge-check"></i>信息边界</span><h1>信任与认证</h1><p>平台区分官方资料、客观数据和个人经验，帮助你判断每条内容适不适用。</p></div><span class="route-stage-badge teal"><i data-lucide="shield-check"></i></span></div><div class="route-trust-grid"><section class="route-panel route-verify-card"><span class="route-kicker">回答者身份</span><h2>认证标签只说明来源，不替代判断</h2><div class="route-progress"><span style="width:66%"></span></div><ol><li class="done"><b>01</b>提交学校与专业信息</li><li class="done"><b>02</b>补充经历时间和身份边界</li><li><b>03</b>后台完成核验后展示标签</li></ol><button class="primary-button" type="button"><i data-lucide="badge-check"></i>开始认证</button></section><section class="route-panel route-trust-principles"><article><i data-lucide="landmark"></i><div><strong>官方信息</strong><p>学校官网、招生简章和公开通知用于核对原始来源。</p></div></article><article><i data-lucide="database"></i><div><strong>客观数据</strong><p>录取、保研和公开统计数据标注年份与数据口径。</p></div></article><article><i data-lucide="messages-square"></i><div><strong>学生经验</strong><p>个人经历会标注学校、专业和时间，不显示虚假的共识度。</p></div></article></section></div></section>`;
}

function renderSchoolDetailPage() {
  const stageKey = featureStageKey();
  const schoolMap = {
    fjnu: { name: "福建师范大学", city: "福州", type: "师范特色综合院校", summary: "平台整理学校简介、重点专业、校园设施布局和学生经验，具体招生信息以学校官方发布为准。", majors: ["计算机科学与技术", "汉语言文学", "教育学"] },
    fzu: { name: "福州大学", city: "福州", type: "工科优势综合大学", summary: "围绕专业培养、实践资源、招生资料和校园生活，提供一份便于比较的学校信息入口。", majors: ["计算机科学与技术", "机械设计制造及其自动化", "化学工程与工艺"] },
    fafu: { name: "福建农林大学", city: "福州", type: "农林特色综合院校", summary: "重点展示农林、生态、食品等方向的专业信息、设施布局和相关经验。", majors: ["风景园林", "食品科学与工程", "植物保护"] }
  };
  const school = schoolMap[routeParams.get("school")] || schoolMap.fjnu;
  return `<section class="route-page route-feature-page route-school-detail-page"><a class="route-back-link" href="${href("schools", { stage: stageKey })}"><i data-lucide="arrow-left"></i>返回院校与经验</a><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="school"></i>${school.city} · 院校详情</span><h1>${school.name}</h1><p>${school.summary}</p></div><span class="route-stage-badge blue">学校</span></div><div class="route-detail-grid"><section class="route-panel route-detail-main"><div class="route-detail-facts"><span><small>学校类型</small><strong>${school.type}</strong></span><span><small>重点校区</small><strong>${school.city}校区</strong></span><span><small>资料更新</small><strong>持续核验</strong></span></div><section class="route-detail-section"><div class="panel-heading"><div><span class="route-kicker">官方信息与客观数据</span><h2>先核对学校，再看个人经验</h2></div><a class="route-text-link" href="https://www.${school.name.includes("福州大学") ? "fzu" : school.name.includes("农林") ? "fafu" : "fjnu"}.edu.cn/" target="_blank" rel="noopener noreferrer">访问官网 <i data-lucide="external-link"></i></a></div><p>这里展示学校简介、招生简章、专业目录、保研与公开数据的摘要入口。真实数据接入后，将继续保留原始链接和更新时间。</p></section><section class="route-detail-section"><div class="panel-heading"><div><span class="route-kicker">专业信息</span><h2>选择一个专业继续了解</h2></div><span class="count-badge">${school.majors.length} 个示例</span></div><div class="route-major-list">${school.majors.map((major) => `<a href="${href("schools", { stage: stageKey, q: major })}"><span><i data-lucide="book-open"></i><strong>${major}</strong><small>查看培养方向与官方信息</small></span><i data-lucide="arrow-up-right"></i></a>`).join("")}</div></section></section><aside class="route-detail-side"><section class="route-panel route-detail-source"><span class="route-kicker"><i data-lucide="messages-square"></i>本校学生经验</span><h2>经验是辅助判断</h2><p>只展示来自本校学生的经历内容，并标注专业、年级和时间。</p><a class="route-action" href="${href("questions", { stage: stageKey })}"><i data-lucide="message-circle-question"></i><span><strong>去问答中心追问</strong><small>把学校细节问得更具体</small></span></a></section><section class="route-panel route-detail-source"><span class="route-kicker"><i data-lucide="map"></i>设施布局</span><h2>校园生活信息</h2><p>后续补充校区、宿舍、食堂、快递站和教学楼的距离与分布。</p></section></aside></div></section>`;
}

function renderFeaturePage() {
  if (page === "schools") return renderSchoolsPage();
  if (page === "school-detail") return renderSchoolDetailPage();
  if (page === "questions") return renderQuestionsPage();
  if (page === "candidates") return renderCandidatesPage();
  if (page === "trust") return renderTrustPage();
  return `<section class="route-page route-feature-page"><h1>页面暂未找到</h1><a class="route-action primary" href="${href("home")}">返回首页</a></section>`;
}

function renderIdentityPage() {
  return `<section class="route-page route-identity-page"><div class="route-page-header"><div><span class="route-kicker"><i data-lucide="user-round-cog"></i>进入工作区</span><h1>身份选择</h1><p>选择你现在要使用的工作方式，之后仍然可以随时切换。</p></div><span class="route-stage-badge teal"><i data-lucide="shuffle"></i></span></div><div class="route-identity-grid"><a class="route-panel route-identity-card planner" href="${href("workspace")}"><span class="route-identity-icon"><i data-lucide="compass"></i></span><span class="route-kicker">规划者</span><h2>综合规划工作台</h2><p>整理当前阶段、学校与专业候选、问答记录和关键时间点，把信息变成自己的决策路径。</p><span class="route-identity-link">进入规划工作台 <i data-lucide="arrow-up-right"></i></span></a><a class="route-panel route-identity-card answerer" href="${href("answerer")}"><span class="route-identity-icon"><i data-lucide="messages-square"></i></span><span class="route-kicker">经验贡献者</span><h2>回答者工作台</h2><p>查看适合自己经历的问题，补充带有学校、专业和时间边界的真实经验。</p><span class="route-identity-link">进入回答者工作台 <i data-lucide="arrow-up-right"></i></span></a></div><div class="route-identity-note"><i data-lucide="info"></i><span>身份只决定你当前看到的工作入口，不会改变你已经保存的候选、问题和经验记录。</span></div></section>`;
}

function renderShell() {
  const featurePages = new Set(["schools", "school-detail", "questions", "candidates", "trust"]);
  const breadcrumb = page === "workspace" ? "综合规划" : page === "answerer" ? "回答者工作台" : page === "identity" ? "身份选择" : page === "school-detail" ? "学校详情" : stage?.name || ROUTE_LABELS[page] || "页面";
  const pageContent = stage ? renderStagePage(stage) : page === "workspace" ? renderWorkspacePage() : page === "answerer" ? renderAnswererPage() : page === "identity" ? renderIdentityPage() : featurePages.has(page) ? renderFeaturePage() : renderFeaturePage();
  const routeIdentityEntry = page === "answerer" ? "" : `<div class="route-sidebar-divider"></div><span class="route-sidebar-label">工作方式</span><a class="route-workspace-link route-identity-link${page === "identity" ? " active" : ""}" href="${href("identity")}"><i data-lucide="user-round-cog"></i>身份选择</a>`;
  document.title = `引路 | ${breadcrumb}`;
  document.querySelector("#routeApp").innerHTML = `<div class="route-shell"><aside class="route-sidebar" id="routeSidebar"><div class="route-brand"><div class="route-brand-mark">引</div><div><strong>引路</strong><small>让每个学生找到自己人</small></div></div><nav class="route-nav" aria-label="主导航">${renderNav()}</nav>${routeIdentityEntry}<div class="route-sidebar-footer"><span></span>前端结构预览</div></aside><div class="route-main"><header class="route-topbar"><button class="route-menu-button" id="routeMenuButton" type="button" aria-label="打开导航"><i data-lucide="menu"></i></button><div class="route-breadcrumb"><a href="${href("home")}">我的引路</a><span>/</span><strong>${escapeHtml(breadcrumb)}</strong></div>${renderStageSwitcher()}${renderRouteUtilities()}</header><main class="route-content">${pageContent}</main></div>${renderRouteAssistants()}</div>`;
  window.lucide?.createIcons();
  if (page === "identity") {
    const note = document.querySelector(".route-identity-note span");
    if (note) note.textContent = "规划者和回答者可以同时使用，两个工作台互不覆盖。";
  }
  if (page === "answerer") {
    const answererStage = STAGE_CONFIG[effectiveAnswererStageRoute];
    const intro = document.querySelector(".route-page-header p");
    if (intro && answererStage) intro.textContent = `当前回答方向：${answererStage.name}。查看适合自己经历的问题，补充带有学校、专业和时间边界的真实经验。`;
  }
}

renderShell();

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest("#routeMenuButton");
  if (menuButton) { document.querySelector("#routeSidebar")?.classList.toggle("open"); return; }
  if (event.target.closest("[data-route-pet-toggle]")) { setRoutePetOpen(document.querySelector("#routePetPanel")?.hidden !== false); return; }
  if (event.target.closest("[data-route-pet-close]")) { setRoutePetOpen(false); return; }
  if (event.target.closest("[data-route-guide-toggle]")) { document.querySelector("#routeGuide")?.removeAttribute("hidden"); return; }
  if (event.target.closest("[data-route-guide-close]") || event.target.id === "routeGuide") { document.querySelector("#routeGuide")?.setAttribute("hidden", ""); return; }
  const themeToggle = event.target.closest("[data-route-theme-toggle]");
  if (themeToggle) {
    const menu = document.querySelector("#routeThemePopover");
    const open = menu?.hidden !== false;
    if (menu) menu.hidden = !open;
    themeToggle.setAttribute("aria-expanded", String(open));
    return;
  }
  const themeOption = event.target.closest("[data-route-theme]");
  if (themeOption) {
    applyRouteTheme(themeOption.dataset.routeTheme);
    document.querySelector("#routeThemePopover")?.setAttribute("hidden", "");
    document.querySelector("[data-route-theme-toggle]")?.setAttribute("aria-expanded", "false");
    return;
  }
  if (!event.target.closest(".route-theme-control")) document.querySelector("#routeThemePopover")?.setAttribute("hidden", "");
  if (!event.target.closest("#routeSidebar") && !event.target.closest("#routeMenuButton")) document.querySelector("#routeSidebar")?.classList.remove("open");
});

function setRoutePetOpen(open) {
  const panel = document.querySelector("#routePetPanel");
  if (panel) panel.hidden = !open;
  document.querySelectorAll("[data-route-pet-toggle]").forEach((button) => button.setAttribute("aria-expanded", String(open)));
  if (open) document.querySelector("#routePetInput")?.focus();
}

function applyRouteTheme(theme) {
  if (!ROUTE_THEME_OPTIONS.some(([value]) => value === theme)) return;
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("yinlu_theme", theme); } catch (error) {}
  document.querySelectorAll("[data-route-theme]").forEach((button) => button.classList.toggle("active", button.dataset.routeTheme === theme));
}

document.querySelector("#routePetForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#routePetInput");
  const reply = document.querySelector("#routePetReply");
  const question = input?.value.trim();
  if (!question || !reply) return;
  reply.textContent = `已记下：“${question}”。后续接入 AI 后，我会结合当前阶段继续追问。`;
  input.value = "";
});

applyRouteTheme(document.documentElement.dataset.theme || "apple");
