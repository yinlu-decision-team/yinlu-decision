(() => {
  "use strict";

  const STORAGE_KEY = "yinlu_planning_workspace_v1";
  const PAGE_NAMES = {
    overview: "综合规划",
    builder: "路径编排",
    simulator: "AI 路径模拟器",
    region: "地域与职业地图",
    graph: "知识图谱",
    plan: "我的计划",
    review: "决策复盘",
    data: "数据与依据"
  };

  const PAGE_GROUPS = [
    { label: "规划总览", items: [{ id: "overview", icon: "layout-dashboard", label: "综合规划" }, { id: "builder", icon: "git-branch", label: "路径编排" }] },
    { label: "探索工具", items: [{ id: "simulator", icon: "sparkles", label: "AI 路径模拟器" }, { id: "region", icon: "map-pinned", label: "地域与职业地图" }, { id: "graph", icon: "network", label: "知识图谱" }] },
    { label: "执行与复盘", items: [{ id: "plan", icon: "list-checks", label: "我的计划" }, { id: "review", icon: "history", label: "决策复盘" }] }
  ];

  const DEFAULT_BRANCHES = [
    { id: "domestic", stage: "国内硕士 A", subtitle: "考研备选 1", direction: "AI 方向", year: "2027", jobDirection: "算法工程师", region: "上海", score: 82, tone: "teal" },
    { id: "overseas", stage: "海外硕士 B", subtitle: "申请备选 2", direction: "数据科学", year: "2027", jobDirection: "AI 产品", region: "上海", score: 76, tone: "blue" },
    { id: "direct", stage: "直接就业", subtitle: "求职备选 3", direction: "先工作再深造", year: "2026", jobDirection: "应用开发", region: "上海", score: 69, tone: "cyan" }
  ];

  function makePlan(id, name) {
    return {
      id,
      name,
      branches: DEFAULT_BRANCHES.map((branch) => ({ ...branch })),
      selectedBranch: "overseas",
      updatedAt: new Date().toISOString()
    };
  }

  const DEFAULT_STATE = {
    page: "overview",
    activePlanId: "plan-1",
    plans: [makePlan("plan-1", "规划一"), makePlan("plan-2", "规划二")],
    simulatorSteps: ["国内硕士 · AI 方向", "就业 · 上海 · 算法工程师", "职业晋升 / 海外深造（可选）"],
    selectedCity: "上海",
    lastAnalysisAt: "",
    pendingSuggestion: false,
    candidateSelection: {},
    expandedCandidateId: ""
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || !Array.isArray(saved.plans) || !saved.plans.length) return structuredClone(DEFAULT_STATE);
      return { ...structuredClone(DEFAULT_STATE), ...saved };
    } catch (error) {
      return structuredClone(DEFAULT_STATE);
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function activePlan() {
    return state.plans.find((plan) => plan.id === state.activePlanId) || state.plans[0];
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
  }

  function formatTime(value) {
    if (!value) return "尚未分析";
    return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
  }

  function notify(message) {
    if (typeof window.showToast === "function") window.showToast(message);
    else {
      const status = document.querySelector("#planningStatus");
      if (status) status.textContent = message;
    }
  }

  function planningCandidates() {
    const items = window.YinluCandidateBridge?.list?.() || [];
    if (!state.candidateSelection || typeof state.candidateSelection !== "object") state.candidateSelection = {};
    let changed = false;
    items.forEach((item) => {
      if (!Object.hasOwn(state.candidateSelection, item.id)) {
        state.candidateSelection[item.id] = true;
        changed = true;
      }
    });
    if (changed) saveState();
    return items;
  }

  function selectedCandidateCount(items = planningCandidates()) {
    return items.filter((item) => state.candidateSelection[item.id] !== false).length;
  }

  function candidateStageMarkup(stage, label, tone, items) {
    const stageItems = items.filter((item) => item.stage === stage);
    const selected = selectedCandidateCount(stageItems);
    return `<section class="planning-candidate-stage tone-${tone}"><header><div><strong>${label}</strong><span>${selected} / ${stageItems.length} 条用于规划</span></div><a href="./index.html?view=experience&stage=${stage}">添加候选<i data-lucide="arrow-up-right"></i></a></header><div class="planning-candidate-list">${stageItems.length ? stageItems.map((item) => {
      const checked = state.candidateSelection[item.id] !== false;
      const expanded = state.expandedCandidateId === item.id;
      return `<article class="planning-candidate-item ${checked ? "selected" : ""}"><div class="planning-candidate-row"><label class="planning-candidate-check"><input type="checkbox" data-planning-candidate-select="${escapeHtml(item.id)}"${checked ? " checked" : ""}><span aria-hidden="true"></span><b>用于规划</b></label><button type="button" class="planning-candidate-main" data-planning-action="toggle-candidate-detail" data-candidate-id="${escapeHtml(item.id)}" aria-expanded="${expanded}"><small>${escapeHtml(item.kindLabel)}</small><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span></button><button type="button" class="planning-candidate-remove" data-planning-action="remove-candidate" data-candidate-id="${escapeHtml(item.id)}" aria-label="同步移除${escapeHtml(item.title)}" title="同步移除候选"><i data-lucide="trash-2"></i></button></div>${expanded ? `<div class="planning-candidate-detail"><p>${escapeHtml(item.description)}</p>${item.meta ? `<span>${escapeHtml(item.meta)}</span>` : ""}<div><button type="button" data-planning-action="open-candidate" data-candidate-id="${escapeHtml(item.id)}">打开原页面<i data-lucide="arrow-up-right"></i></button><button type="button" data-planning-action="remove-candidate" data-candidate-id="${escapeHtml(item.id)}">同步移除</button></div></div>` : ""}</article>`;
    }).join("") : `<div class="planning-candidate-empty"><i data-lucide="bookmark-plus"></i><span>暂时没有已保存候选</span></div>`}</div></section>`;
  }

  function candidateManagerMarkup() {
    const items = planningCandidates();
    const selected = selectedCandidateCount(items);
    return `<section class="planning-candidate-bridge"><header><div><h2>从三个阶段带入的候选数据</h2><p>勾选决定是否用于当前规划；同步移除会同时更新原阶段候选。</p></div><strong>${selected} / ${items.length} 条已选择</strong></header><div class="planning-candidate-stage-grid">${candidateStageMarkup("gaokao", "高考志愿", "red", items)}${candidateStageMarkup("graduate", "考研择校", "teal", items)}${candidateStageMarkup("career", "就业选择", "amber", items)}</div></section>`;
  }

  function pageHeader(kicker, title, description, note = "") {
    return `<header class="planning-page-header"><div><span class="planning-kicker">${kicker}</span><h1 id="planningPageTitle">${title}</h1><p>${description}</p></div>${note ? `<span class="planning-page-note">${note}</span>` : ""}</header>`;
  }

  function navMarkup() {
    return PAGE_GROUPS.map((group) => `<div class="planning-nav-group"><span>${group.label}</span><nav aria-label="${group.label}">${group.items.map((item) => `<button type="button" class="planning-nav-item ${state.page === item.id ? "active" : ""}" data-planning-page="${item.id}" ${state.page === item.id ? 'aria-current="page"' : ""}><i data-lucide="${item.icon}"></i><span>${item.label}</span></button>`).join("")}</nav></div>`).join("");
  }

  function shell(content) {
    return `<div class="planning-workspace"><aside class="planning-sidebar"><div class="planning-brand"><svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><path class="brand-mark-body" d="M13 9H30C34 9 37 12 37 16V37L25 30L13 37V9Z"/><path class="brand-mark-fold" d="M13 9H25C29 9 32 12 32 16V27"/><path class="brand-mark-gap" d="M25 16V29"/><circle class="brand-mark-dot" cx="25" cy="16" r="3"/></svg><div><strong>引路</strong><small>青年生涯决策信息平台</small></div></div><div class="planning-workspace-name"><strong>人生规划工作台</strong><small>探索、执行，并随时校正方向</small></div>${navMarkup()}<div class="planning-nav-utility"><button type="button" class="${state.page === "data" ? "active" : ""}" data-planning-page="data" ${state.page === "data" ? 'aria-current="page"' : ""}><i data-lucide="database"></i>数据与依据</button><button type="button" data-planning-action="return-home"><i data-lucide="corner-up-left"></i>返回阶段首页</button></div><div class="planning-autosave"><i></i><span id="planningStatus">规划草案已自动保存</span></div></aside><main class="planning-main"><div class="planning-content">${content}</div></main></div>`;
  }

  function routeCard(label, title, score, path, items, tone) {
    return `<article class="planning-route-card tone-${tone}"><span>${label}</span><strong>${score} 分</strong><h3>${title}</h3><p>${path}</p><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul><button type="button" data-planning-page="simulator">查看完整分析<i data-lucide="arrow-right"></i></button></article>`;
  }

  function overviewPage() {
    return `${pageHeader("人生规划 · 综合规划", "把下一步，变成一条可以被验证的路", "从你现在的位置出发，把升学、就业、地域和真实经历放在同一张规划桌上。", "规划草案")}
      <section class="planning-profile-strip"><div><span>当前身份</span><strong>本科毕业 · 方向探索中</strong></div><div><span>已有经历</span><strong>计算机科学 · 2 段项目</strong></div><div><span>规划目标</span><strong>硕士深造 / 上海就业</strong></div><button type="button" data-planning-page="builder">编辑路径<i data-lucide="arrow-right"></i></button></section>
      ${candidateManagerMarkup()}
      <div class="planning-section-heading"><div><h2>AI 整理出的三条完整组合</h2><p>分数用于比较当前输入，不是录取率或成功概率。</p></div><button type="button" data-planning-page="simulator">调整分析条件</button></div>
      <div class="planning-route-grid">${routeCard("路径 A", "国内硕士 → 上海算法", 82, "本科毕业 → 国内 AI 硕士 → 上海就业", ["专业基础衔接较好", "需要补充科研或竞赛经历", "上海算法岗位学历门槛偏高"], "red")}${routeCard("路径 B", "海外硕士 → 上海 AI 产品", 76, "本科毕业 → 海外数据科学 → 上海就业", ["跨学科方向可行", "语言与资金成本需要提前准备", "上海平台与外企岗位较多"], "teal")}${routeCard("路径 C", "直接就业 → 在职深造", 69, "本科毕业 → 上海应用开发 → 在职硕士", ["可以尽快积累真实项目", "本科可进入的应用岗位更多", "需要评估工作与学习时间"], "blue")}</div>
      <div class="planning-overview-lower"><section><header><div><h2>你的路径关系</h2><p>阶段、方向和地域分别设置，再组合成路线。</p></div><button type="button" data-planning-page="graph">打开知识图谱</button></header><div class="planning-flow"><span>计算机本科</span><i></i><span>硕士 / 就业</span><i></i><span>上海 · AI 方向</span></div></section><section><header><h2>下一步建议</h2></header><ul class="planning-next-list"><li><i data-lucide="circle"></i><span><strong>补齐一段真实经历</strong><small>参加项目，验证自己更喜欢研究还是落地。</small></span></li><li><i data-lucide="circle"></i><span><strong>比较两条路线成本</strong><small>同时查看时间、资金和替代方案。</small></span></li><li><i data-lucide="circle"></i><span><strong>保存规划版本</strong><small>把不同方案分别保存，避免互相覆盖。</small></span></li></ul></section></div>`;
  }

  function branchNode(branch) {
    return `<div class="planning-branch-row" data-branch-row="${branch.id}"><button type="button" class="planning-map-node education tone-${branch.tone} ${activePlan().selectedBranch === branch.id ? "selected" : ""}" data-planning-action="select-branch" data-branch-id="${branch.id}"><span>${escapeHtml(branch.stage)}</span><small>${escapeHtml(branch.subtitle)}</small><em>${escapeHtml(branch.direction)} · ${escapeHtml(branch.year)}</em></button><span class="planning-branch-line" aria-hidden="true"></span><button type="button" class="planning-map-node employment" data-planning-action="select-branch" data-branch-id="${branch.id}"><span>就业</span><small>${escapeHtml(branch.region)} · ${escapeHtml(branch.jobDirection)}</small><em>AI 参考 ${branch.score} 分</em></button><button type="button" class="planning-node-remove" data-planning-action="remove-branch" data-branch-id="${branch.id}" aria-label="删除${escapeHtml(branch.stage)}分支" title="删除分支"><i data-lucide="x"></i></button></div>`;
  }

  function builderPage() {
    const plan = activePlan();
    const selected = plan.branches.find((branch) => branch.id === plan.selectedBranch) || plan.branches[0];
    return `${pageHeader("人生规划 · 路径编排", "像制作思维导图一样，搭出你的人生路线", "阶段可以增删、分支和汇合；方向、地域、行业与时间作为属性挂在节点上。", "自由编辑模式")}
      <div class="planning-version-bar" role="tablist" aria-label="规划版本">${state.plans.map((item) => `<button type="button" role="tab" aria-selected="${item.id === state.activePlanId}" class="${item.id === state.activePlanId ? "active" : ""}" data-planning-action="select-plan" data-plan-id="${item.id}">${escapeHtml(item.name)}</button>`).join("")}<button type="button" data-planning-action="new-plan"><i data-lucide="plus"></i>新建规划</button><button type="button" data-planning-action="copy-plan"><i data-lucide="copy"></i>复制当前规划</button><button type="button" class="planning-ai-button" data-planning-action="analyze-plan"><i data-lucide="sparkles"></i>AI 分析此规划</button><span>已保存 · ${formatTime(plan.updatedAt)}</span></div>
      <div class="planning-studio"><aside class="planning-element-library"><h2>选择元素</h2><p>点击元素添加到当前分支</p><div class="planning-element-group"><strong>教育阶段</strong><div><button type="button" data-planning-add="国内硕士">国内硕士</button><button type="button" data-planning-add="海外硕士">海外硕士</button><button type="button" data-planning-add="博士 / 博后">博士 / 博后</button><button type="button" data-planning-add="交换学习">交换学习</button></div></div><div class="planning-element-group work"><strong>就业阶段</strong><div><button type="button" data-planning-add="直接就业">直接就业</button><button type="button" data-planning-add="转行">转行</button><button type="button" data-planning-add="创业">创业</button><button type="button" data-planning-add="在职深造">在职深造</button></div></div><div class="planning-element-group attr"><strong>可挂载属性</strong><div><button type="button" data-planning-add="岗位方向">岗位方向</button><button type="button" data-planning-add="地域城市">地域城市</button><button type="button" data-planning-add="行业领域">行业领域</button><button type="button" data-planning-add="公司类型">公司类型</button><button type="button" data-planning-add="时间节点">时间节点</button><button type="button" data-planning-add="薪资目标">薪资目标</button></div></div><div class="planning-element-group evidence"><strong>能力与依据</strong><div><button type="button" data-planning-add="技能">技能</button><button type="button" data-planning-add="证书">证书</button><button type="button" data-planning-add="项目 / 实习">项目 / 实习</button><button type="button" data-planning-add="条件判断">条件判断</button></div></div></aside>
      <section class="planning-canvas" aria-label="规划路径画布"><div class="planning-canvas-toolbar"><button type="button" data-planning-action="add-branch" aria-label="增加分支" title="增加分支"><i data-lucide="plus"></i></button><button type="button" aria-label="缩小画布" title="缩小"><i data-lucide="minus"></i></button><button type="button" aria-label="撤销" title="撤销"><i data-lucide="undo-2"></i></button></div><div class="planning-root-node"><span>本科 · 计算机</span><small>固定起点 · 已完成</small><em><i data-lucide="lock-keyhole"></i>福州 · 2026</em></div><div class="planning-branch-stack">${plan.branches.map(branchNode).join("")}</div><button type="button" class="planning-add-branch" data-planning-action="add-branch"><i data-lucide="git-branch-plus"></i>从本科节点增加一个分支</button></section>
      <aside class="planning-inspector"><h2>编辑当前分支</h2><p>地域和方向并行，不额外占用人生阶段。</p><label><span>教育或就业阶段</span><input type="text" data-planning-field="stage" value="${escapeHtml(selected.stage)}"></label><div class="planning-dual-field"><label><span>岗位方向</span><input type="text" data-planning-field="jobDirection" value="${escapeHtml(selected.jobDirection)}"></label><label><span>地域城市</span><input type="text" data-planning-field="region" value="${escapeHtml(selected.region)}"></label></div><label><span>方向领域</span><input type="text" data-planning-field="direction" value="${escapeHtml(selected.direction)}"></label><label><span>目标时间</span><input type="text" data-planning-field="year" value="${escapeHtml(selected.year)}"></label><button type="button" class="planning-primary-action" data-planning-action="save-branch"><i data-lucide="save"></i>保存节点设置</button><button type="button" class="planning-secondary-action" data-planning-action="add-branch"><i data-lucide="git-branch-plus"></i>从这里添加分支</button><section class="planning-ai-preview"><header><h3>AI 可行性预览</h3><strong>${selected.score} 分</strong></header><div>${plan.branches.map((branch) => `<span><b>${escapeHtml(branch.stage)} → ${escapeHtml(branch.region)}</b><em>${branch.score}</em></span>`).join("")}</div><p>AI 只生成待确认建议，不会自动修改节点。</p><button type="button" data-planning-action="open-simulator">在模拟器中查看完整分析<i data-lucide="arrow-right"></i></button><button type="button" data-planning-action="analyze-branch">只分析当前分支</button></section></aside></div>`;
  }

  function simulatorPage() {
    return `${pageHeader("人生规划 · AI 路径模拟器", "从现在开始，可以规划任意多步", "载入已保存规划，或从当前身份开始逐步添加目标；所有后续阶段都可以选填。", "不限规划步数")}
      <section class="planning-sync-strip"><div><strong>已载入：${escapeHtml(activePlan().name)}</strong><span>${activePlan().branches.length * 2 + 1} 个节点 · ${activePlan().branches.length} 条分支 · 最近分析 ${formatTime(state.lastAnalysisAt)}</span></div><div><button type="button" data-planning-action="new-plan">另存为新规划</button><button type="button" class="primary" data-planning-action="sync-suggestion">把建议同步回${escapeHtml(activePlan().name)}</button></div></section>
      <div class="planning-simulator-layout"><aside class="planning-simulator-form"><h2>你的路径起点</h2><label><span>当前身份</span><select><option>本科毕业</option><option>本科在读</option><option>研究生在读</option><option>研究生毕业</option><option>在职 / 转行</option></select></label><label><span>已有学历与经历</span><input value="计算机本科 · 2 段项目"></label><div class="planning-step-list">${state.simulatorSteps.map((step, index) => `<div><span>${index + 1}</span><input data-planning-step="${index}" value="${escapeHtml(step)}" aria-label="第${index + 1}阶段目标"><button type="button" data-planning-action="remove-step" data-step-index="${index}" aria-label="删除第${index + 1}阶段"><i data-lucide="x"></i></button></div>`).join("")}</div><button type="button" class="planning-add-step" data-planning-action="add-step"><i data-lucide="plus"></i>继续添加下一阶段</button><button type="button" class="planning-primary-action" data-planning-action="run-analysis"><i data-lucide="sparkles"></i>分析整条路径</button><p class="planning-info-note">步骤没有固定数量。研究生、在职者或转行用户都可以从自己的当前位置开始。</p></aside><section class="planning-simulator-results"><header><div><h2>三种完整组合的可行性参考</h2><p>分析学历衔接、时间资金、地域机会和岗位要求。</p></div></header><div class="planning-route-grid">${routeCard("路径 A", "国内硕士 → 上海算法", 82, "本科毕业 → 国内 AI 硕士 → 上海就业", ["专业基础匹配", "上海算法岗位较多", "建议补充科研或竞赛经历"], "red")}${routeCard("路径 B", "海外硕士 → 上海 AI 产品", 76, "本科毕业 → 海外数据科学 → 上海就业", ["跨学科可行", "外企与平台岗位较多", "需要准备语言与资金方案"], "teal")}${routeCard("路径 C", "直接就业 → 在职深造", 69, "本科毕业 → 上海应用开发 → 在职硕士", ["尽快积累真实项目", "本科可进入岗位较多", "评估工作与学习成本"], "blue")}</div><div class="planning-analysis-scope"><strong>分析范围</strong><span>学历衔接</span><span>申请门槛</span><span>时间与资金</span><span>地域机会</span><span>岗位学历要求</span><span>替代路线</span></div></section></div>`;
  }

  const CITY_DATA = {
    上海: { companies: "1,860+", employment: "91%", education: "硕士", minimum: "本科", note: "研发、平台和外企岗位密集" },
    杭州: { companies: "1,120+", employment: "88%", education: "本科 / 硕士", minimum: "本科", note: "平台型公司与 AI 应用较多" },
    深圳: { companies: "1,430+", employment: "89%", education: "本科", minimum: "本科", note: "硬件、工程与产品机会突出" }
  };

  function regionPage() {
    return `${pageHeader("人生规划 · 地域与职业地图", "先看机会在哪里，再决定要走哪条路", "把城市、行业、岗位和学历门槛放在同一张地图里比较。", "演示数据")}
      <div class="planning-region-layout"><div><section class="planning-region-panel"><header><div><h2>目标地域比较</h2><p>选择与你组合路径相匹配的城市。</p></div><button type="button"><i data-lucide="plus"></i>添加城市</button></header><div class="planning-region-filters"><button class="active">AI / 软件方向</button><button>硕士毕业</button><button>应届求职</button><button>不限户籍</button></div><div class="planning-city-grid">${Object.entries(CITY_DATA).map(([city, info]) => `<button type="button" class="planning-city-card ${state.selectedCity === city ? "active" : ""}" data-planning-action="select-city" data-city="${city}"><strong>${city}</strong><small>${info.note}</small><span>相关公司<b>${info.companies}</b></span><span>普遍就业率<b>${info.employment}</b></span><span>常见学历<b>${info.education}</b></span><span>最低门槛<b>${info.minimum}</b></span></button>`).join("")}</div></section><section class="planning-region-panel"><header><div><h2>${state.selectedCity} · 可关注的岗位</h2><p>岗位数量、学历门槛和成长方向一起看。</p></div></header><div class="planning-job-table"><div class="head"><span>岗位方向</span><span>演示岗位数</span><span>常见学历</span><span>起薪参考</span></div><div><strong>算法工程师</strong><span>420</span><span>硕士</span><span>18–30K</span></div><div><strong>AI 应用开发</strong><span>315</span><span>本科</span><span>15–25K</span></div><div><strong>数据分析师</strong><span>268</span><span>本科</span><span>12–20K</span></div><div><strong>技术产品经理</strong><span>176</span><span>本科 / 硕士</span><span>15–28K</span></div></div><p class="planning-data-warning"><i data-lucide="triangle-alert"></i>当前数字仅用于演示页面结构，不代表真实就业统计。正式数据需标注统计时间、样本范围和来源。</p></section></div><aside><section><h2>${state.selectedCity} · AI / 软件</h2><p>与你当前组合的参考匹配度较高。</p><ul><li><span>大厂与平台</span><b>680+</b></li><li><span>AI 创业公司</span><b>230+</b></li><li><span>研究院所</span><b>96</b></li><li><span>外企研发中心</span><b>140+</b></li></ul><button type="button" class="planning-primary-action" data-planning-action="apply-city">把${state.selectedCity}加入路径</button></section><section><h2>学历门槛提醒</h2><ul class="planning-findings"><li>算法研究类：硕士更常见</li><li>应用开发类：本科可进入</li><li>技术产品类：更看重项目经历</li></ul></section></aside></div>`;
  }

  function graphPage() {
    return `${pageHeader("人生规划 · 知识图谱", "看见一条选择背后的关系网络", "从学校、专业和技能连接到职业与城市，点击节点继续探索。", "可探索")}
      <div class="planning-graph-layout"><section class="planning-knowledge-canvas"><header><div><h2>计算机科学与技术 · 关系图谱</h2><p>关系用于发现线索，不直接作为结论。</p></div></header><div class="planning-knowledge-map"><span class="line one"></span><span class="line two"></span><span class="line three"></span><button class="main">计算机科学与技术<small>当前专业</small></button><button class="n1">国内硕士<small>教育阶段</small></button><button class="n2">机器学习<small>技能方向</small></button><button class="n3">上海<small>目标地域</small></button><button class="n4">算法工程师<small>职业方向</small></button><button class="n5">AI 项目<small>验证经历</small></button></div></section><aside class="planning-graph-detail"><span><i data-lucide="brain-circuit"></i></span><h2>AI 方向</h2><p>职业领域 · 12 个关联节点</p><div><button>岗位要求</button><button>真实经验</button><button>薪资区间</button><button>成长路径</button></div><button type="button" class="planning-primary-action" data-planning-page="plan">保存为行动计划</button><small>每条关系都应标注来源和更新时间。</small></aside></div>`;
  }

  function planPage() {
    return `${pageHeader("人生规划 · 我的计划", "保存选择，也允许未来的你重新修改", "把选中的方向拆成阶段、任务和复盘记录；规划不是一次性答案。", "已自动保存")}
      <div class="planning-plan-layout"><div><section class="planning-plan-summary"><header><div><h2>AI 方向探索计划</h2><p>目标：在 2027 年前完成方向验证，并确定深造或就业路线。</p></div><span>进行中</span></header><div class="planning-progress-label"><span>当前进度</span><b>38%</b></div><div class="planning-progress"><i></i></div><div class="planning-timeline"><span class="done"><b>确认兴趣</b><small>已完成</small></span><span class="active"><b>积累技能</b><small>进行中</small></span><span><b>验证选择</b><small>下一阶段</small></span><span><b>做出决策</b><small>待开始</small></span></div></section><section class="planning-board"><header><div><h2>行动看板</h2><p>按时间安排，不用单一人生模板限制你。</p></div><button><i data-lucide="plus"></i>添加任务</button></header><div><article><h3>本月重点</h3><p><strong>完成一次 AI 方向访谈</strong><small>联系一位算法工程师或研究生</small></p><p><strong>补齐 Python 基础</strong><small>完成课程第 1–4 章</small></p></article><article><h3>接下来验证</h3><p><strong>参加一个真实项目</strong><small>记录喜欢和不喜欢的部分</small></p><p><strong>比较深造与就业成本</strong><small>时间、资金和机会成本</small></p></article><article><h3>等待信息</h3><p><strong>研究生学姐的回答</strong><small>已发送匿名提问</small></p><p><strong>目标岗位招聘要求</strong><small>等待补充官方来源</small></p></article></div></section></div><aside><section><h2>备选方案</h2><article><strong>国内科研线</strong><small>若更喜欢研究环境，转为读研准备。</small></article><article><strong>产品与工程线</strong><small>若更喜欢落地实践，优先寻找实习。</small></article></section><section><h2>最近复盘</h2><p><b>8 月 16 日</b><span>新增“先做项目再决定”作为验证步骤。</span></p><p><b>8 月 10 日</b><span>将考研从唯一方案改为备选路线。</span></p></section></aside></div>`;
  }

  function reviewPage() {
    return `${pageHeader("人生规划 · 决策复盘", "方向可以改变，但每次改变都应该看得见原因", "把当初的判断与现在的新证据放在一起，决定继续、微调，还是换一条路。", "建议每月复盘一次")}
      <div class="planning-review-layout"><div><section><header><div><h2>这条计划发生了什么变化</h2><p>AI 方向探索计划 · 第 2 次复盘</p></div><span>待确认</span></header><div class="planning-review-compare"><article><small>8 月 1 日的判断</small><strong>优先准备国内读研</strong><p>认为科研路线更稳定，集中准备专业课与导师联系。</p></article><i data-lucide="arrow-right"></i><article class="current"><small>最新判断</small><strong>先做项目，再决定深造</strong><p>项目体验显示自己偏好落地实践，需要补充就业路线信息。</p></article></div></section><section><header><div><h2>哪些依据发生了变化</h2><p>区分事实、感受和限制条件。</p></div><button>补充一条依据</button></header><div class="planning-evidence-list"><article><strong>真实经历</strong><span>完成 2 周 AI 项目，更喜欢工程落地与团队协作。</span><em>支持调整</em></article><article><strong>个人偏好</strong><span>对纯理论研究兴趣下降，但仍希望保留技术深度。</span><em>需要验证</em></article><article><strong>外部条件</strong><span>部分目标岗位不强制研究生学历，更看重项目经历。</span><em>新信息</em></article></div></section></div><aside><section><h2>本次复盘结论</h2><p>选择如何处理当前路线。</p><button type="button" class="planning-primary-action" data-planning-action="review-choice" data-choice="微调当前路线">微调当前路线</button><button type="button" class="planning-secondary-action" data-planning-action="review-choice" data-choice="保持原计划">保持原计划</button><button type="button" class="planning-secondary-action" data-planning-action="review-choice" data-choice="创建替代路线">创建一条替代路线</button></section><section><h2>决策记录</h2><ol><li><strong>8 月 16 日 · 等待确认</strong><span>拟改为“项目验证 + 双线收集信息”。</span></li><li><strong>8 月 10 日 · 已保存</strong><span>将国内读研改为优先方案。</span></li><li><strong>8 月 1 日 · 创建计划</strong><span>建立 AI 方向探索计划。</span></li></ol></section></aside></div>`;
  }

  function dataPage() {
    return `${pageHeader("人生规划 · 数据与依据", "让每一条建议都能回到它的来源", "查看规划使用了哪些候选、经验、公开数据和个人条件。", "透明说明")}
      <div class="planning-data-grid"><section><i data-lucide="bookmark-check"></i><h2>阶段候选</h2><p>来自高考、考研和就业页面中由用户主动保存的候选。</p><strong>${selectedCandidateCount()} 条已选择</strong></section><section><i data-lucide="messages-square"></i><h2>真实经验</h2><p>带有身份边界和发生时间的学生、教师及从业者经历。</p><strong>随候选同步</strong></section><section><i data-lucide="landmark"></i><h2>公开信息</h2><p>院校官网、招生简章和公开招聘要求等可核验来源。</p><strong>待接入真实接口</strong></section><section><i data-lucide="database"></i><h2>地域与岗位数据</h2><p>正式版本应显示统计时间、样本范围、采集方式和更新时间。</p><strong>当前为演示数据</strong></section></div>${candidateManagerMarkup()}<section class="planning-data-principles"><h2>AI 分析边界</h2><ul><li>可行性分数只用于比较当前输入，不是录取率、就业率或成功概率。</li><li>AI 建议不会自动修改规划，写回节点前必须由用户确认。</li><li>个人兴趣和经历变化后，应重新分析并保留历史复盘记录。</li><li>地域、薪资和岗位数字过期后必须明显提示，不与最新数据混用。</li></ul></section>`;
  }

  function pageContent() {
    return ({ overview: overviewPage, builder: builderPage, simulator: simulatorPage, region: regionPage, graph: graphPage, plan: planPage, review: reviewPage, data: dataPage }[state.page] || overviewPage)();
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "planning");
    if (state.page === "overview") url.searchParams.delete("planPage");
    else url.searchParams.set("planPage", state.page);
    window.history.pushState(null, "", url);
  }

  function render() {
    const root = document.querySelector("#planningApp");
    if (!root) return;
    const requested = new URLSearchParams(window.location.search).get("planPage");
    if (PAGE_NAMES[requested]) state.page = requested;
    root.innerHTML = shell(pageContent());
    root.onchange = handleChange;
    document.querySelector("#breadcrumbTitle").textContent = `人生规划 · ${PAGE_NAMES[state.page] || PAGE_NAMES.overview}`;
    const topbarTitle = document.querySelector("#planningTopbarTitle");
    if (topbarTitle) topbarTitle.textContent = PAGE_NAMES[state.page] || PAGE_NAMES.overview;
    window.lucide?.createIcons();
  }

  function setPage(page, { push = true } = {}) {
    if (!PAGE_NAMES[page]) return;
    state.page = page;
    saveState();
    if (push) updateUrl();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function createPlan(copyCurrent = false) {
    const number = state.plans.length + 1;
    const next = makePlan(`plan-${Date.now()}`, `规划${number}`);
    if (copyCurrent) next.branches = activePlan().branches.map((branch) => ({ ...branch, id: `${branch.id}-${Date.now()}` }));
    state.plans.push(next);
    state.activePlanId = next.id;
    saveState();
    render();
    notify(copyCurrent ? `已复制为${next.name}` : `已创建${next.name}`);
  }

  function addBranch(label = "新规划阶段") {
    const plan = activePlan();
    const count = plan.branches.length + 1;
    plan.branches.push({ id: `branch-${Date.now()}`, stage: label, subtitle: `备选 ${count}`, direction: "方向待设置", year: "待设置", jobDirection: "岗位待设置", region: state.selectedCity || "地域待设置", score: 60, tone: count % 2 ? "teal" : "blue" });
    plan.selectedBranch = plan.branches.at(-1).id;
    plan.updatedAt = new Date().toISOString();
    saveState();
    render();
    notify(`已添加“${label}”分支`);
  }

  function handleChange(event) {
    const candidateId = event.target.dataset.planningCandidateSelect;
    if (candidateId) {
      state.candidateSelection[candidateId] = event.target.checked;
      saveState();
      render();
      notify(event.target.checked ? "已纳入当前规划" : "已从当前规划暂时隐藏");
      return;
    }
    const branch = activePlan().branches.find((item) => item.id === activePlan().selectedBranch);
    if (!branch) return;
    const field = event.target.dataset.planningField;
    if (field) {
      branch[field] = event.target.value.trim() || branch[field];
      activePlan().updatedAt = new Date().toISOString();
      saveState();
      notify("节点内容已自动保存");
      return;
    }
    const stepIndex = Number(event.target.dataset.planningStep);
    if (Number.isInteger(stepIndex) && stepIndex >= 0) {
      state.simulatorSteps[stepIndex] = event.target.value.trim() || "未命名阶段";
      saveState();
    }
  }

  function handleClick(event) {
    const root = event.target.closest("#planningApp");
    if (!root) return false;
    const pageButton = event.target.closest("[data-planning-page]");
    if (pageButton) {
      event.preventDefault();
      setPage(pageButton.dataset.planningPage);
      return true;
    }
    const candidateAction = event.target.closest("[data-planning-action][data-candidate-id]");
    if (candidateAction) {
      event.preventDefault();
      const candidateId = candidateAction.dataset.candidateId;
      const action = candidateAction.dataset.planningAction;
      if (action === "toggle-candidate-detail") {
        state.expandedCandidateId = state.expandedCandidateId === candidateId ? "" : candidateId;
        saveState();
        render();
      }
      if (action === "open-candidate") window.YinluCandidateBridge?.open?.(candidateId);
      if (action === "remove-candidate") {
        delete state.candidateSelection[candidateId];
        if (state.expandedCandidateId === candidateId) state.expandedCandidateId = "";
        saveState();
        window.YinluCandidateBridge?.remove?.(candidateId);
        render();
      }
      return true;
    }
    const addElement = event.target.closest("[data-planning-add]");
    if (addElement) {
      addBranch(addElement.dataset.planningAdd);
      return true;
    }
    const actionButton = event.target.closest("[data-planning-action]");
    if (!actionButton) return false;
    event.preventDefault();
    const action = actionButton.dataset.planningAction;
    if (action === "return-home") window.location.href = "./index.html?view=home";
    if (action === "select-plan") { state.activePlanId = actionButton.dataset.planId; saveState(); render(); }
    if (action === "new-plan") createPlan(false);
    if (action === "copy-plan") createPlan(true);
    if (action === "add-branch") addBranch();
    if (action === "select-branch") { activePlan().selectedBranch = actionButton.dataset.branchId; saveState(); render(); }
    if (action === "remove-branch") {
      const plan = activePlan();
      if (plan.branches.length <= 1) notify("至少保留一条规划分支");
      else { plan.branches = plan.branches.filter((branch) => branch.id !== actionButton.dataset.branchId); plan.selectedBranch = plan.branches[0].id; plan.updatedAt = new Date().toISOString(); saveState(); render(); notify("已删除分支"); }
    }
    if (action === "save-branch") { activePlan().updatedAt = new Date().toISOString(); saveState(); render(); notify("节点设置已保存"); }
    if (["analyze-plan", "run-analysis"].includes(action)) { state.lastAnalysisAt = new Date().toISOString(); saveState(); if (action === "analyze-plan") setPage("simulator"); else { render(); notify("已完成演示分析"); } }
    if (action === "analyze-branch") { state.lastAnalysisAt = new Date().toISOString(); saveState(); notify("当前分支已完成演示分析"); render(); }
    if (action === "open-simulator") setPage("simulator");
    if (action === "add-step") { state.simulatorSteps.push("新阶段（可选）"); saveState(); render(); }
    if (action === "remove-step") { state.simulatorSteps.splice(Number(actionButton.dataset.stepIndex), 1); saveState(); render(); }
    if (action === "sync-suggestion") { state.pendingSuggestion = true; saveState(); notify(`建议已同步到${activePlan().name}，等待确认`); }
    if (action === "select-city") { state.selectedCity = actionButton.dataset.city; saveState(); render(); }
    if (action === "apply-city") { const branch = activePlan().branches.find((item) => item.id === activePlan().selectedBranch); if (branch) branch.region = state.selectedCity; activePlan().updatedAt = new Date().toISOString(); saveState(); notify(`已把${state.selectedCity}写入当前分支`); }
    if (action === "review-choice") notify(`已记录复盘结论：${actionButton.dataset.choice}`);
    return true;
  }

  window.YinluPlanning = { render, handleClick, setPage };
})();
