const body = document.body;
const answerStage = body.dataset.answerStage;
const root = new URL(body.dataset.root || "../../", window.location.href);
const stageRoutes = new Set(["gaokao", "kaoyan", "jiuye"]);
const plannerStageByRoute = { gaokao: "gaokao", kaoyan: "graduate", jiuye: "career" };

if (!stageRoutes.has(answerStage)) {
  window.location.replace(new URL("answerer/index.html", root));
} else {
  const params = new URLSearchParams(window.location.search);
  let plannerStage = params.get("stage");

  if (!new Set(Object.values(plannerStageByRoute)).has(plannerStage)) {
    try {
      plannerStage = plannerStageByRoute[localStorage.getItem("yinlu_planner_stage")] || "graduate";
    } catch (error) {
      plannerStage = "graduate";
    }
  }

  try {
    localStorage.setItem("yinlu_answerer_stage", answerStage);
    localStorage.setItem("yinlu_identity_mode", "answerer");
  } catch (error) {}

  params.set("stage", plannerStage);
  params.set("answerStage", answerStage);
  params.set("identity", "answerer");
  if (!["answerer", "questions", "trust"].includes(params.get("view"))) params.set("view", "answerer");
  window.history.replaceState(null, "", `${window.location.pathname}?${params}`);

  try {
    const response = await fetch(new URL("index.html", root));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const source = await response.text();
    const shellDocument = new DOMParser().parseFromString(source, "text/html");
    shellDocument.body.querySelectorAll("script").forEach((script) => script.remove());

    body.innerHTML = shellDocument.body.innerHTML;
    body.className = shellDocument.body.className;
    body.dataset.answererStandalone = "true";
    body.dataset.answerStage = answerStage;

    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(src, root);
      script.onload = resolve;
      script.onerror = reject;
      document.body.append(script);
    });

    await loadScript("lib/lucide-lite.js");
    await loadScript("app.js?v=20260816-career-reference-3");
  } catch (error) {
    body.innerHTML = `<main class="route-load-error"><h1>回答中心暂时无法打开</h1><p>请返回决策工作台后重新进入。</p><a href="${new URL("index.html", root)}">返回决策工作台</a></main>`;
  }
}
