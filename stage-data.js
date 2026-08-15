export const STAGE_CONFIG = {
  gaokao: {
    name: "高考志愿",
    route: "gaokao",
    stageKey: "gaokao",
    eyebrow: "高中到大学",
    summary: "从地区、专业和招生资料开始，逐步建立自己的院校候选。",
    accent: "blue",
    focus: [
      { icon: "school", title: "院校范围", text: "先看城市、层次和办学特色，再缩小学校范围。" },
      { icon: "book-open", title: "专业方向", text: "对照课程、培养方案和学生经验，判断是否适合自己。" },
      { icon: "file-text", title: "招生资料", text: "关注招生章程、录取数据和当年政策变化。" }
    ],
    next: ["确定地区与专业优先级", "收藏 2-3 所待了解院校", "把仍然不确定的问题写进问答中心"]
  },
  kaoyan: {
    name: "考研择校",
    route: "kaoyan",
    stageKey: "graduate",
    eyebrow: "大学到深造",
    summary: "从专业方向、考试科目和培养特点出发，比较适合自己的深造路径。",
    accent: "teal",
    focus: [
      { icon: "book-open", title: "专业培养", text: "关注研究方向、课程安排和导师团队的实际差异。" },
      { icon: "trending-up", title: "升学参考", text: "结合考试科目、报考难度和公开招生资料判断。" },
      { icon: "messages-square", title: "课程体验", text: "用同专业学生的真实经验补充官方信息。" }
    ],
    next: ["明确目标专业和考试科目", "比较不同学校的培养差异", "向同专业学生追问具体细节"]
  },
  jiuye: {
    name: "就业选择",
    route: "jiuye",
    stageKey: "career",
    eyebrow: "大学到工作",
    summary: "把专业学习、行业视角和真实岗位要求放在一起，理解不同选择的代价。",
    accent: "amber",
    focus: [
      { icon: "briefcase-business", title: "职业方向", text: "先区分工作内容、成长方式和生活节奏。" },
      { icon: "users", title: "从业视角", text: "参考教师和从业者对技能、岗位和行业变化的判断。" },
      { icon: "git-compare-arrows", title: "路径比较", text: "把继续深造、实习和直接就业放到同一张决策桌面。" }
    ],
    next: ["记录感兴趣的工作内容", "查看相关专业与从业经验", "整理需要进一步验证的岗位问题"]
  }
};

export const ROUTE_LABELS = {
  home: "首页",
  schools: "院校与经验",
  questions: "问答中心",
  candidates: "我的候选",
  trust: "信任与认证",
  workspace: "综合规划",
  answerer: "回答者工作台",
  identity: "身份选择"
};
