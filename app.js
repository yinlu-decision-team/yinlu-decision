const experiences = [
  { id: "fjnu-cs", school: "福建师范大学", major: "计算机科学与技术", city: "福州", level: "已认证 · 2023级", source: "student", consensus: { recommend: 9, total: 12 }, text: "课程强调理论与工程实践的结合，作业量中等偏上，适合喜欢系统性学习的同学。", tags: ["作业", "实践"], dimensions: ["课程学习"] },
  { id: "fzu-econ", school: "福州大学", major: "经济学", city: "福州", level: "已认证 · 2022级", source: "student", consensus: { recommend: 8, total: 9 }, text: "考研氛围浓，建议提前准备数学与专业课，社团与实践机会较多。", tags: ["考研", "生活"], dimensions: ["课程学习", "城市环境"] },
  { id: "xmu-news", school: "厦门大学", major: "新闻传播学", city: "厦门", level: "已认证 · 2024级", source: "student", consensus: { recommend: 14, total: 17 }, text: "课程里有不少实战项目，适合想做媒体与内容生产的同学，实习机会较多。", tags: ["实习", "项目"], dimensions: ["课程学习", "就业去向"] },
  { id: "hqu-med", school: "华侨大学", major: "临床医学", city: "泉州", level: "已认证 · 2021级", source: "student", consensus: { recommend: 2, total: 2 }, text: "专业学习周期长，临床实践密集，对体力与耐心要求高。", tags: ["临床", "实践"], dimensions: ["课程学习"] },
  { id: "fafu-land", school: "福建农林大学", major: "风景园林", city: "福州", level: "已认证 · 2023级", source: "student", consensus: { recommend: 6, total: 8 }, text: "项目制作业较多，利于作品集准备，适合偏向设计/景观方向的同学。", tags: ["设计", "作品集"], dimensions: ["课程学习", "就业去向"] },
  { id: "jmu-nautical", school: "集美大学", major: "航海技术", city: "厦门", level: "已认证 · 2022级", source: "student", consensus: { recommend: 1, total: 1 }, text: "专业路径比较明确，但需要适应海上实训与体能训练。", tags: ["实训", "体能"], dimensions: ["课程学习", "城市环境"] },
  { id: "fjnu-cs-campus", school: "福建师范大学", major: "计算机科学与技术", city: "福州", level: "已认证 · 2023级", source: "student", consensus: { recommend: 7, total: 10 }, text: "宿舍条件和校区安排需要结合具体学院确认，公共学习空间比较方便，建议提前了解宿舍分配规则。", tags: ["宿舍", "校区"], dimensions: ["宿舍生活"] },
  { id: "fjnu-education", school: "福建师范大学", major: "教育学", city: "福州", level: "已认证 · 2022级", source: "student", consensus: { recommend: 10, total: 13 }, text: "课程阅读和课堂讨论占比不低，想走教师教育方向的同学可以关注实习安排和教育实践机会。", tags: ["阅读", "教育实践"], dimensions: ["课程学习", "就业去向"] },
  { id: "fjnu-city", school: "福建师范大学", major: "汉语言文学", city: "福州", level: "已认证 · 2021级", source: "student", consensus: { recommend: 8, total: 11 }, text: "福州生活节奏适中，学校周边日常配套较完整，通勤和生活成本仍要按校区与个人习惯估算。", tags: ["生活成本", "通勤"], dimensions: ["城市环境"] },
  { id: "fzu-econ-campus", school: "福州大学", major: "经济学", city: "福州", level: "已认证 · 2022级", source: "student", consensus: { recommend: 6, total: 9 }, text: "课程中需要持续阅读和整理案例，期末阶段任务集中，平时做好笔记会比临时突击轻松。", tags: ["案例", "期末"], dimensions: ["课程学习"] },
  { id: "fzu-engineering", school: "福州大学", major: "机械设计制造及其自动化", city: "福州", level: "已认证 · 2023级", source: "student", consensus: { recommend: 5, total: 7 }, text: "实验和课程设计需要投入连续时间，喜欢动手和工程实践的同学更容易找到学习节奏。", tags: ["实验", "工程实践"], dimensions: ["课程学习", "就业去向"] },
  { id: "fzu-career", school: "福州大学", major: "经济学", city: "福州", level: "已认证 · 2021级", source: "student", consensus: { recommend: 7, total: 8 }, text: "实习和考研是比较常见的选择，最好在大二前后确定更偏向数据分析、金融或公共部门的方向。", tags: ["实习", "考研"], dimensions: ["就业去向"] },
  { id: "xmu-news-campus", school: "厦门大学", major: "新闻传播学", city: "厦门", level: "已认证 · 2024级", source: "student", consensus: { recommend: 12, total: 15 }, text: "课程展示和小组项目较多，宿舍与课堂之间的安排需要留出机动时间，适合愿意主动表达和协作的同学。", tags: ["小组项目", "表达"], dimensions: ["宿舍生活", "课程学习"] },
  { id: "hqu-med-career", school: "华侨大学", major: "临床医学", city: "泉州", level: "已认证 · 2021级", source: "student", consensus: { recommend: 2, total: 3 }, text: "后续升学和规培规划需要较早了解，专业学习投入时间长，不能只用本科阶段的课程数量来判断压力。", tags: ["升学", "规培"], dimensions: ["就业去向"] },
  { id: "fafu-land-campus", school: "福建农林大学", major: "风景园林", city: "福州", level: "已认证 · 2023级", source: "student", consensus: { recommend: 5, total: 7 }, text: "图纸、模型和软件练习可能集中在同一阶段，宿舍里需要注意桌面空间和作息安排。", tags: ["模型", "作息"], dimensions: ["宿舍生活", "课程学习"] },
  { id: "jmu-nautical-career", school: "集美大学", major: "航海技术", city: "厦门", level: "已认证 · 2022级", source: "student", consensus: { recommend: 2, total: 3 }, text: "行业路径相对明确，但工作地点和轮班方式与普通办公室岗位不同，报考前应把职业生活方式一起考虑。", tags: ["行业路径", "轮班"], dimensions: ["就业去向"] },
  { id: "fjnu-data", school: "福建师范大学", major: "计算机科学与技术", city: "福州", source: "data", title: "招生与录取数据入口", value: "录取位次 · 招生计划 · 专业目录", text: "用于查看公开招生计划、历年录取信息和专业目录，具体数据以当年度发布页面为准。", tags: ["公开数据", "年度更新"], dimensions: ["录取信息"], sourceName: "阳光高考信息平台", sourceUrl: "https://gaokao.chsi.com.cn/" },
  { id: "fjnu-official", school: "福建师范大学", major: "计算机科学与技术", city: "福州", source: "official", title: "学校官方招生与培养信息", value: "招生简章 · 培养方案 · 校方通知", text: "学校官网提供招生政策、院系介绍和培养相关信息，适合与学生经验对照阅读。", tags: ["官方发布", "学校信息"], dimensions: ["课程学习", "录取信息"], sourceName: "福建师范大学官网", sourceUrl: "https://www.fjnu.edu.cn/" },
  { id: "fzu-official", school: "福州大学", major: "经济学", city: "福州", source: "official", title: "学校官方招生信息", value: "招生政策 · 院校介绍 · 官方通知", text: "优先查看学校公开发布的招生与院校信息，具体专业要求以当年度官方页面为准。", tags: ["官方发布", "招生信息"], dimensions: ["录取信息"], sourceName: "福州大学官网", sourceUrl: "https://www.fzu.edu.cn/" },
  { id: "career-expert", school: "福建师范大学", major: "计算机科学与技术", city: "福州", source: "expert", title: "计算机专业就业能力从哪里开始积累？", value: "课程基础 · 项目实践 · 岗位要求", text: "从业视角更关注技能如何对应真实岗位，建议把课程、项目和实习经历放在一起判断。", tags: ["职业路径", "技能要求"], dimensions: ["就业去向"], sourceName: "人力资源和社会保障部", sourceUrl: "https://www.mohrss.gov.cn/" }
];

const institutions = [
  {
    id: "fjnu",
    school: "福建师范大学",
    englishName: "Fujian Normal University",
    city: "福州",
    type: "公办本科 · 师范类院校",
    founded: "1907年",
    educationLevel: "本科 / 研究生教育",
    campuses: "旗山校区、仓山校区",
    updatedAt: "2026年8月",
    intro: "学校以教师教育为特色，同时覆盖文、理、工、经、管等多个学科方向。平台先把学校概况、招生线索和专业培养信息整理成摘要，方便你建立整体认识。",
    majors: ["计算机科学与技术", "汉语言文学", "教育学"],
    majorPrograms: [
      { name: "计算机科学与技术", school: "计算机与网络空间安全学院", category: "工学", level: "本科", note: "关注计算机基础、软件开发与工程实践。", officialUrl: "http://ccs.fjnu.edu.cn/" },
      { name: "汉语言文学", school: "文学院", category: "文学", level: "本科", note: "关注语言文学基础、阅读研究与表达能力。", officialUrl: "http://wxy.fjnu.edu.cn/" },
      { name: "教育学", school: "教育学院", category: "教育学", level: "本科", note: "关注教育理论、教育研究与实践能力。", officialUrl: "http://jyxy.fjnu.edu.cn/" },
      { name: "数学与应用数学", school: "数学与统计学院", category: "理学", level: "本科", note: "关注数学基础、逻辑训练与应用分析。", officialUrl: "http://math.fjnu.edu.cn/" },
      { name: "地理科学", school: "地理科学学院", category: "理学", level: "本科", note: "关注自然与人文地理、空间分析和教学实践。", officialUrl: "http://geo.fjnu.edu.cn/" }
    ],
    highlights: ["教师教育特色", "多学科协同", "福州城市环境"],
    dataSummary: "可查招生计划、专业目录与历年录取位次等公开数据，具体批次和分数以当年度发布内容为准。",
    admissionBrief: "招生信息需要结合年份、省份、科类与专业组查看。平台将学校官方章程与公开录取数据分开标注，避免不同统计口径混用。",
    admissionYears: ["2026", "2025", "2024"],
    admissionProvinces: ["福建", "全国"],
    admissionSubjects: ["物理类", "历史类", "不限科类"],
    admissionResources: [
      { icon: "clipboard-list", title: "招生计划", description: "分省、分科类和分专业的招生名额", sourceType: "学校官方发布", sourceName: "福建师范大学官网", year: "2026", status: "待接入", url: "https://www.fjnu.edu.cn/" },
      { icon: "chart-no-axes-column-increasing", title: "历年分数与位次", description: "按省份、批次和专业查看公开录取信息", sourceType: "公开数据平台", sourceName: "阳光高考信息平台", year: "近三年", status: "待接入", url: "https://gaokao.chsi.com.cn/" },
      { icon: "file-text", title: "招生章程", description: "查看报考条件、录取规则与专业要求", sourceType: "学校官方发布", sourceName: "福建师范大学官网", year: "2026", status: "查看来源", url: "https://www.fjnu.edu.cn/" }
    ],
    latestUpdates: [
      { type: "招生政策", title: "年度招生政策与章程", summary: "关注报考条件、选考科目、录取规则和专业限制是否发生变化。", date: "发布日期待接入", publisher: "福建师范大学官方发布", status: "原文待接入", url: "https://www.fjnu.edu.cn/" },
      { type: "专业调整", title: "招生专业与培养方向调整", summary: "关注新增、停招、合并专业及培养方向变化，具体信息以当年度目录为准。", date: "发布日期待接入", publisher: "福建师范大学官方发布", status: "原文待接入", url: "https://www.fjnu.edu.cn/" },
      { type: "培养政策", title: "转专业与培养安排通知", summary: "关注转专业条件、培养方案、实践学期和校区安排等最新通知。", date: "发布日期待接入", publisher: "福建师范大学官方发布", status: "原文待接入", url: "https://www.fjnu.edu.cn/" }
    ],
    postgraduateRecommendation: { value: "待接入可靠数据", year: "待确认", recommendedCount: "待接入", graduateScope: "待接入", methodology: "推免人数 ÷ 对应届本科毕业生统计范围；以学校公示口径为准", source: "学校推免公示及年度就业质量报告", updatedAt: "待确认" },
    officialSummary: "可查学校简介、招生简章、院系介绍和培养方案等官方资料。",
    campusSummary: "校区位于福州，城市生活与教育资源较集中，具体校园安排需结合校区和专业确认。",
    campusDetails: [
      { name: "旗山校区", location: "福州市大学城片区", colleges: "学院分布待接入学校官方资料", transport: "公交、地铁及校内交通信息待核实", status: "主要校区" },
      { name: "仓山校区", location: "福州市仓山区", colleges: "学院分布待接入学校官方资料", transport: "周边公共交通信息待核实", status: "历史校区" }
    ],
    cityReferences: [
      { icon: "train-front", label: "跨城交通", value: "高铁、机场等城市交通信息", note: "具体通勤时间待接入地图数据" },
      { icon: "cloud-sun", label: "气候环境", value: "亚热带季风气候", note: "生活体验结合本校评论查看" },
      { icon: "briefcase-business", label: "实习环境", value: "省会城市就业与实习资源", note: "岗位数量和行业分布待可靠来源" },
      { icon: "wallet-cards", label: "生活费用", value: "待接入可靠数据", note: "不使用未经核实的费用估算" }
    ],
    campusMedia: [
      { icon: "circle-play", title: "官方视频", description: "校园宣传片、校区介绍与官方讲座", status: "待接入官方素材", url: "https://www.fjnu.edu.cn/" },
      { icon: "images", title: "校园相册", description: "教学楼、图书馆、宿舍与公共空间", status: "待接入官方素材", url: "https://www.fjnu.edu.cn/" },
      { icon: "map", title: "校区地图", description: "查看校区位置、学院分布与交通入口", status: "待接入地图数据", url: "https://www.fjnu.edu.cn/" }
    ],
    careerSummary: "不同专业的升学、教师教育和行业就业路径差异较大，建议结合专业课程与认证经验一起判断。",
    officialSource: "福建师范大学官网",
    officialUrl: "https://www.fjnu.edu.cn/",
    dataSource: "阳光高考信息平台",
    dataUrl: "https://gaokao.chsi.com.cn/",
    dimensions: ["课程学习", "录取信息", "城市环境", "就业去向"]
  },
  {
    id: "fzu",
    school: "福州大学",
    englishName: "Fuzhou University",
    city: "福州",
    type: "公办本科 · 综合类院校",
    founded: "1958年",
    educationLevel: "本科 / 研究生教育",
    campuses: "旗山校区等",
    updatedAt: "2026年8月",
    intro: "学校是一所以工为主、理工结合，兼有经济、管理、人文等学科的综合性大学。平台将院校层面的基本信息与具体专业经验分开呈现，避免只看到一个官网入口。",
    majors: ["经济学", "机械设计制造及其自动化", "计算机科学与技术"],
    majorPrograms: [
      { name: "经济学", school: "经济与管理学院", category: "经济学", level: "本科", note: "关注经济理论、数据分析与社会经济问题。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=jgxy&type=w" },
      { name: "机械设计制造及其自动化", school: "机械工程及自动化学院", category: "工学", level: "本科", note: "关注机械设计、制造技术与工程实践。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=jxxy&type=w" },
      { name: "计算机科学与技术", school: "计算机与大数据学院", category: "工学", level: "本科", note: "关注计算机系统、程序设计与应用开发。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=ccds&type=w" },
      { name: "电气工程及其自动化", school: "电气工程与自动化学院", category: "工学", level: "本科", note: "关注电力系统、控制技术与工程应用。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=dqxy&type=w" },
      { name: "化学工程与工艺", school: "化工学院", category: "工学", level: "本科", note: "关注化工原理、工艺设计与实验实践。", officialUrl: "https://www.fzu.edu.cn/system/resource/link.jsp?bmmc=che&type=w" }
    ],
    highlights: ["理工特色明显", "综合学科布局", "福州城市环境"],
    dataSummary: "可查招生政策、招生计划、专业目录和公开录取信息，年份、地区与专业口径需要在查询时进一步确认。",
    admissionBrief: "招生计划和录取结果会因省份、科类与专业组而变化。平台只在来源与统计口径明确时展示具体数值。",
    admissionYears: ["2026", "2025", "2024"],
    admissionProvinces: ["福建", "全国"],
    admissionSubjects: ["物理类", "历史类", "不限科类"],
    admissionResources: [
      { icon: "clipboard-list", title: "招生计划", description: "分省、分科类和分专业的招生名额", sourceType: "学校官方发布", sourceName: "福州大学官网", year: "2026", status: "待接入", url: "https://www.fzu.edu.cn/" },
      { icon: "chart-no-axes-column-increasing", title: "历年分数与位次", description: "按省份、批次和专业查看公开录取信息", sourceType: "公开数据平台", sourceName: "阳光高考信息平台", year: "近三年", status: "待接入", url: "https://gaokao.chsi.com.cn/" },
      { icon: "file-text", title: "招生章程", description: "查看报考条件、录取规则与专业要求", sourceType: "学校官方发布", sourceName: "福州大学官网", year: "2026", status: "查看来源", url: "https://www.fzu.edu.cn/" }
    ],
    latestUpdates: [
      { type: "招生政策", title: "年度招生政策与章程", summary: "关注报考条件、选考科目、录取规则和专业限制是否发生变化。", date: "发布日期待接入", publisher: "福州大学官方发布", status: "原文待接入", url: "https://www.fzu.edu.cn/" },
      { type: "专业调整", title: "招生专业与培养方向调整", summary: "关注新增、停招、合并专业及培养方向变化，具体信息以当年度目录为准。", date: "发布日期待接入", publisher: "福州大学官方发布", status: "原文待接入", url: "https://www.fzu.edu.cn/" },
      { type: "培养政策", title: "转专业与培养安排通知", summary: "关注转专业条件、培养方案、实践学期和校区安排等最新通知。", date: "发布日期待接入", publisher: "福州大学官方发布", status: "原文待接入", url: "https://www.fzu.edu.cn/" }
    ],
    postgraduateRecommendation: { value: "待接入可靠数据", year: "待确认", recommendedCount: "待接入", graduateScope: "待接入", methodology: "推免人数 ÷ 对应届本科毕业生统计范围；以学校公示口径为准", source: "学校推免公示及年度就业质量报告", updatedAt: "待确认" },
    officialSummary: "可查学校概况、招生简章、院系通知和专业培养相关资料。",
    campusSummary: "学校位于福州，校园与城市生活信息会因校区和专业不同而变化，平台后续可继续补充认证经验。",
    campusDetails: [
      { name: "旗山校区", location: "福州市大学城片区", colleges: "学院分布待接入学校官方资料", transport: "公交、地铁及校内交通信息待核实", status: "主要校区" },
      { name: "其他校区", location: "具体校区信息以学校官方发布为准", colleges: "学院分布待接入学校官方资料", transport: "交通信息待核实", status: "待完善" }
    ],
    cityReferences: [
      { icon: "train-front", label: "跨城交通", value: "高铁、机场等城市交通信息", note: "具体通勤时间待接入地图数据" },
      { icon: "cloud-sun", label: "气候环境", value: "亚热带季风气候", note: "生活体验结合本校评论查看" },
      { icon: "briefcase-business", label: "实习环境", value: "省会城市就业与实习资源", note: "岗位数量和行业分布待可靠来源" },
      { icon: "wallet-cards", label: "生活费用", value: "待接入可靠数据", note: "不使用未经核实的费用估算" }
    ],
    campusMedia: [
      { icon: "circle-play", title: "官方视频", description: "校园宣传片、校区介绍与官方讲座", status: "待接入官方素材", url: "https://www.fzu.edu.cn/" },
      { icon: "images", title: "校园相册", description: "教学楼、图书馆、宿舍与公共空间", status: "待接入官方素材", url: "https://www.fzu.edu.cn/" },
      { icon: "map", title: "校区地图", description: "查看校区位置、学院分布与交通入口", status: "待接入地图数据", url: "https://www.fzu.edu.cn/" }
    ],
    careerSummary: "经济、工科和计算机等专业的课程结构及就业方向不同，应结合目标专业的培养方案和行业信息比较。",
    officialSource: "福州大学官网",
    officialUrl: "https://www.fzu.edu.cn/",
    dataSource: "阳光高考信息平台",
    dataUrl: "https://gaokao.chsi.com.cn/",
    dimensions: ["课程学习", "录取信息", "城市环境", "就业去向"]
  }
];

const demoQuestions = [
  { title: "计算机专业每天都要写代码吗？", topic: "课程学习", status: "已回答", meta: "2 个认证回答 · 3 天前" },
  { title: "福州读研的生活成本大概怎么样？", topic: "城市环境", status: "等待回答", meta: "已匹配 1 位学长 · 昨天", waiting: true },
  { title: "这个专业毕业后真的只能考公吗？", topic: "就业去向", status: "已回答", meta: "4 个认证回答 · 6 天前" }
];

const demoAnswers = [
  { title: "转专业需要提前准备哪些课程？", topic: "课程学习", status: "已发布", meta: "收到 2 次感谢 · 5 天前" },
  { title: "大学宿舍生活和高中想象差别大吗？", topic: "宿舍生活", status: "已发布", meta: "收到 1 次追问 · 2 周前" }
];

const stageNames = { gaokao: "高考志愿", graduate: "考研择校", career: "职业选择", adapt: "大学适应" };
const stageOrder = ["gaokao", "graduate", "career", "adapt"];
const STORE = { users: "yinlu_users", session: "yinlu_session", questions: "yinlu_questions", answers: "yinlu_answers", favorites: "yinlu_favorites", family: "yinlu_family", verification: "yinlu_verification" };
let currentStage = "gaokao";
let currentSchoolSearch = "";
let currentMajorSearch = "";
let currentDimensionFilter = "all";
let currentSourceFilter = "all";
let currentScopeFilter = "all";
let currentSearch = "";
let currentSchoolDetail = "fjnu";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = (prefix = "id") => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const currentUser = () => { const id = localStorage.getItem(STORE.session); return read(STORE.users, []).find((user) => user.id === id) || null; };
const userFavorites = () => { const user = currentUser(); return user ? read(STORE.favorites, {})[user.id] || [] : []; };
const initials = (name = "访客") => name.trim().slice(0, 1) || "访";

function hydrateIcons() { if (window.lucide) window.lucide.createIcons(); }

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  $("span", toast).textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); window.setTimeout(() => $("#questionInput")?.focus?.(), 300); }
function closeModal(id) { const modal = $(`#${id}`); if (!modal) return; modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }

function switchView(name) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${name}`));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const active = $(`.nav-item[data-view="${name}"]`);
  $("#breadcrumbTitle").textContent = name === "school-detail" ? `${institutions.find((item) => item.id === currentSchoolDetail)?.school || "学校详情"}` : active?.querySelector("span")?.textContent || "首页";
  $("#sidebar")?.classList.remove("open");
  if (name === "experience") renderExperiences();
  if (name === "questions") renderQuestions();
  if (name === "compare") { renderCompare(); renderFamily(); }
  if (name === "trust") renderTrust();
  if (name === "school-detail") renderSchoolDetail();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setStage(stage) {
  if (!stageOrder.includes(stage)) return;
  currentStage = stage;
  const activeIndex = stageOrder.indexOf(stage);
  const previousIndex = (activeIndex - 1 + stageOrder.length) % stageOrder.length;
  const nextIndex = (activeIndex + 1) % stageOrder.length;
  $$(".stage-slide").forEach((slide) => {
    const slideIndex = stageOrder.indexOf(slide.dataset.stage);
    slide.classList.toggle("active", slideIndex === activeIndex);
    slide.classList.toggle("previous", slideIndex === previousIndex);
    slide.classList.toggle("next", slideIndex === nextIndex);
    slide.classList.toggle("hidden-stage", ![activeIndex, previousIndex, nextIndex].includes(slideIndex));
    slide.setAttribute("aria-hidden", slideIndex === activeIndex ? "false" : "true");
    slide.inert = slideIndex !== activeIndex;
  });
  $$("[data-stage-dot]").forEach((button) => {
    const active = button.dataset.stageDot === stage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const position = $("#stagePosition");
  if (position) position.textContent = `${activeIndex + 1} / ${stageOrder.length}`;
}

function moveStage(direction) {
  const currentIndex = stageOrder.indexOf(currentStage);
  setStage(stageOrder[(currentIndex + direction + stageOrder.length) % stageOrder.length]);
}

function setExperienceFilters({ scope = "all", dimension = "all", source = "all" } = {}) {
  currentScopeFilter = scope;
  currentDimensionFilter = dimension;
  currentSourceFilter = source;
  $$('[data-scope-filter]').forEach((item) => item.classList.toggle("active", item.dataset.scopeFilter === scope));
  $$('[data-dimension-filter]').forEach((item) => item.classList.toggle("active", item.dataset.dimensionFilter === dimension));
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item.dataset.sourceFilter === source));
}

function runStageSearch(slide) {
  const input = $("[data-stage-search]", slide);
  currentSearch = input?.value.trim() || "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  setExperienceFilters();
  switchView("experience");
}

function runStageTask(task) {
  const questionTasks = ["ask", "ask-student"];
  if (questionTasks.includes(task)) {
    switchView("questions");
    switchQaTab("ask");
    const stageSelect = $("#questionStagePreview");
    if (stageSelect) stageSelect.value = stageNames[currentStage];
    $("#questionInputPreview")?.focus();
    return;
  }
  const taskFilters = {
    school: { scope: "school" },
    major: { scope: "major" },
    admission: { scope: "school", source: "official" },
    progression: { scope: "school", source: "official" },
    course: { dimension: "课程学习" },
    career: { dimension: "就业去向" },
    expert: { source: "expert" },
    dorm: { dimension: "宿舍生活" },
    city: { dimension: "城市环境" }
  };
  currentSearch = "";
  currentSchoolSearch = "";
  currentMajorSearch = "";
  setExperienceFilters(taskFilters[task] || {});
  switchView("experience");
}

function renderExperiences() {
  const grid = $("#experienceGrid");
  if (!grid) return;
  const institutionSection = $(".institution-section");
  const experienceSection = $(".experience-section");
  const showInstitutions = currentSourceFilter === "all" || currentSourceFilter === "data" || currentSourceFilter === "official";
  const showExperiences = currentSourceFilter === "all" || currentSourceFilter === "student" || currentSourceFilter === "expert";
  institutionSection?.classList.toggle("hidden", !showInstitutions);
  experienceSection?.classList.toggle("hidden", !showExperiences);
  const experienceSectionCopy = {
    all: { kicker: "经验与职业视角", heading: "来自学生、教师与从业者的真实补充", empty: "当前筛选下暂无匹配的经验或职业视角内容" },
    student: { kicker: "学生经验", heading: "来自在读学生的真实经历", empty: "当前筛选下暂无匹配的在读学生经验" },
    expert: { kicker: "专业与职业视角", heading: "来自教师与从业者的经验判断", empty: "当前筛选下暂无匹配的教师或从业者内容" }
  };
  const sectionCopy = experienceSectionCopy[currentSourceFilter] || experienceSectionCopy.all;
  const experienceSectionKicker = $("#experienceSectionKicker");
  const experienceHeading = $("#experienceHeading");
  if (experienceSectionKicker) experienceSectionKicker.textContent = sectionCopy.kicker;
  if (experienceHeading) experienceHeading.textContent = sectionCopy.heading;
  const query = currentSearch.trim().toLowerCase();
  const schoolQuery = currentSchoolSearch.trim().toLowerCase();
  const majorQuery = currentMajorSearch.trim().toLowerCase();
  const sameSchool = $("#sameSchoolToggle")?.checked;
  const matchesFilters = (item) => {
    const dimensions = Array.isArray(item.dimensions) ? item.dimensions : [];
    const itemTags = Array.isArray(item.tags) ? item.tags.join("") : "";
    const schoolText = `${item.school || ""}${item.city || ""}`.toLowerCase();
    const majorText = (item.major || "").toLowerCase();
    const schoolMatches = !schoolQuery || schoolText.includes(schoolQuery);
    const majorMatches = !majorQuery || majorText.includes(majorQuery);
    const matchesScope = currentScopeFilter === "school" ? schoolMatches : currentScopeFilter === "major" ? majorMatches : currentScopeFilter === "both" ? schoolMatches && majorMatches : schoolMatches && majorMatches;
    const matchesDimension = currentDimensionFilter === "all" || dimensions.includes(currentDimensionFilter);
    const matchesSource = currentSourceFilter === "all" || item.source === currentSourceFilter;
    const matchesSearch = !query || `${item.school || ""}${item.major || ""}${item.city || ""}${item.text || ""}${itemTags}${dimensions.join("")}`.toLowerCase().includes(query);
    return matchesScope && matchesDimension && matchesSource && matchesSearch;
  };
  const filtered = experiences.filter((item) => (item.source === "student" || item.source === "expert") && matchesFilters(item));
  const filteredInstitutions = institutions.filter((item) => {
    const dimensions = Array.isArray(item.dimensions) ? item.dimensions : [];
    const schoolText = `${item.school || ""}${item.city || ""}`.toLowerCase();
    const majorText = (item.majors || []).join("").toLowerCase();
    const schoolMatches = !schoolQuery || schoolText.includes(schoolQuery);
    const majorMatches = !majorQuery || majorText.includes(majorQuery);
    const matchesScope = currentScopeFilter === "school" ? schoolMatches : currentScopeFilter === "major" ? majorMatches : currentScopeFilter === "both" ? schoolMatches && majorMatches : schoolMatches && majorMatches;
    const matchesDimension = currentDimensionFilter === "all" || dimensions.includes(currentDimensionFilter);
    const matchesSource = currentSourceFilter === "all" || currentSourceFilter === "data" || currentSourceFilter === "official";
    const matchesSearch = !query || `${item.school}${item.city}${item.type}${item.intro}${item.majors.join("")}${item.highlights.join("")}`.toLowerCase().includes(query);
    return matchesScope && matchesDimension && matchesSource && matchesSearch;
  });
  const institutionGrid = $("#institutionGrid");
  if (institutionGrid) {
    institutionGrid.innerHTML = filteredInstitutions.length ? filteredInstitutions.map(renderInstitutionCard).join("") : `<div class="empty-state institution-empty"><i data-lucide="building-2"></i><p>当前筛选下暂无匹配的院校信息</p></div>`;
    $("#institutionResultNote") && ($("#institutionResultNote").textContent = `${filteredInstitutions.length} 所学校`);
  }
  $("#experienceResultNote") && ($("#experienceResultNote").textContent = `${filtered.length} 条内容`);
  const ordered = sameSchool ? [...filtered].sort((a, b) => ((a.school || "").includes("师范") ? -1 : 0) - ((b.school || "").includes("师范") ? -1 : 0)) : filtered;
  const favorites = userFavorites();
  const sourceLabels = { student: { cls: "level-student", icon: "user-check", text: "在读认证" }, official: { cls: "level-official", icon: "landmark", text: "官方信息" }, data: { cls: "level-data", icon: "database", text: "客观数据" }, expert: { cls: "level-expert", icon: "users", text: "教师/从业者" } };
  grid.innerHTML = ordered.length ? ordered.map((item) => {
    const src = sourceLabels[item.source] || sourceLabels.student;
    const saved = favorites.includes(item.id);
    const tagsHtml = Array.isArray(item.tags) ? item.tags.map((tag) => `<span class="content-tag">${tag}</span>`).join("") : "";
    const dimensionsHtml = Array.isArray(item.dimensions) ? item.dimensions.map((dimension) => `<span class="content-tag">${dimension}</span>`).join("") : "";
    const sourceDetail = item.sourceUrl ? `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>查看来源 · ${item.sourceName}</a>` : `<span class="source-link source-link-muted"><i data-lucide="shield-check"></i>平台认证记录 · ${item.level || "身份已核验"}</span>`;
    const valueHtml = item.value ? `<div class="source-value"><strong>${item.value}</strong><small>来源内容摘要</small></div>` : "";
    const titleHtml = item.title ? `<h3 class="experience-card-title">${item.title}</h3>` : "";
    return `<article class="experience-card">
      <div class="experience-top"><span class="school-avatar">${(item.school || "").slice(0, 1)}</span><div class="experience-school"><strong>${item.school || "未命名学校"}</strong><small>${item.major || "未分类专业"} · ${item.city || "未标注城市"}</small></div><span class="source-level-tag ${src.cls}">${src.text}</span></div>
      <div class="experience-divider"></div>
      ${valueHtml}${titleHtml}
      <p>${item.text || ""}</p>
      <div class="tag-row">${dimensionsHtml}${tagsHtml}</div>
      <div class="experience-card-footer">${sourceDetail}<button class="save-experience ${saved ? "saved" : ""}" data-favorite="${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button></div>
    </article>`;
  }).join("") : `<div class="empty-state"><i data-lucide="search-x"></i><p>${sectionCopy.empty}</p><button class="quiet-button" data-clear-search>清空筛选</button></div>`;
  hydrateIcons();
}

function renderQuestions() {
  const user = currentUser();
  const list = $("#questionList");
  if (!list) return;
  if (!user) {
    list.innerHTML = demoQuestions.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status ${item.waiting ? "waiting" : ""}">${item.status}</span></header><p>${item.meta}</p></article>`).join("");
  } else {
    const mine = read(STORE.questions, []).filter((item) => item.userId === user.id);
    list.innerHTML = mine.length ? mine.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status ${item.status === "已回答" ? "" : "waiting"}">${item.status}</span></header><p>${item.meta || `${item.topic || "未分类"} · 发布于 ${new Date(item.createdAt).toLocaleDateString("zh-CN")}`}</p></article>`).join("") : `<p>你还没有发布问题</p>`;
  }
  $("#questionsCount") && ($("#questionsCount").textContent = user ? read(STORE.questions, []).filter((item) => item.userId === user.id).length : "示例");
  hydrateIcons();
}

function renderInstitutionCard(item) {
  const saved = userFavorites().includes(`school-${item.id}`);
  const majorHtml = item.majors.map((major) => `<span class="content-tag">${major}</span>`).join("");
  const highlightHtml = item.highlights.map((highlight) => `<span class="institution-highlight">${highlight}</span>`).join("");
  return `<article class="institution-card">
    <div class="institution-card-top"><div class="institution-mark">${item.school.slice(0, 1)}</div><div><span class="source-level-tag level-institution">院校信息</span><h3>${item.school}</h3><p>${item.city} · ${item.type}</p></div></div>
    <p class="institution-intro">${item.intro}</p>
    <div class="institution-highlights">${highlightHtml}</div>
    <div class="institution-card-block"><span>重点关注专业</span><div class="tag-row">${majorHtml}</div></div>
    <div class="institution-evidence"><span><i data-lucide="database"></i>客观数据已整理</span><span><i data-lucide="landmark"></i>官方资料已整理</span></div>
    <div class="institution-card-footer"><span class="institution-note">平台摘要 · 来源可核验</span><div class="institution-card-actions"><button class="text-button" data-school-detail="${item.id}">全面了解 <i data-lucide="arrow-up-right"></i></button><button class="save-experience ${saved ? "saved" : ""}" data-favorite="school-${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入候选"}</button></div></div>
  </article>`;
}

function renderSchoolComment(comment) {
  return `<article class="school-comment">
    <header><span class="comment-avatar"><i data-lucide="user-round-check"></i></span><div><strong>本校认证学生</strong><small>${comment.grade || "年级已核验"} · ${comment.major || "专业已核验"}</small></div><button class="icon-button comment-report" data-report-comment aria-label="举报评论" title="举报评论"><i data-lucide="flag"></i></button></header>
    <p>${comment.text}</p>
    <footer><span class="content-tag">${comment.dimension || "校园体验"}</span><time>${comment.date || "近期"}</time></footer>
  </article>`;
}

const schoolCommentExamples = {
  fjnu: [
    { id: "fjnu-campus-route", major: "地理科学", grade: "2023级", dimension: "校园环境", text: "不同学院上课地点可能分布在不同教学楼，排课出来后可以先确认楼栋位置，再估算课间通行时间。", date: "示例内容" },
    { id: "fjnu-dorm-detail", major: "汉语言文学", grade: "2022级", dimension: "宿舍生活", text: "宿舍条件会因校区和楼栋不同而变化，了解时最好同时确认住宿校区、楼栋设施和当年分配通知。", date: "示例内容" },
    { id: "fjnu-practice-detail", major: "教育学", grade: "2022级", dimension: "培养安排", text: "关注师范方向时，除了课程名称，还可以向学院确认教育见习、实习学期和合作学校的具体安排。", date: "示例内容" }
  ],
  fzu: [
    { id: "fzu-campus-route", major: "经济学", grade: "2022级", dimension: "校园环境", text: "查看校区信息时要继续确认学院所在区域和常用教学楼，只看学校总地址不一定能判断每天的通行安排。", date: "示例内容" },
    { id: "fzu-lab-detail", major: "机械设计制造及其自动化", grade: "2023级", dimension: "培养安排", text: "了解工科专业时可以进一步确认实验课、课程设计和实训场地分别安排在哪些学期与校区。", date: "示例内容" },
    { id: "fzu-dorm-detail", major: "计算机科学与技术", grade: "2023级", dimension: "宿舍生活", text: "宿舍设施与分配安排可能按年份调整，报考前可以把官方住宿通知和在校生当年的实际补充放在一起看。", date: "示例内容" }
  ]
};

function renderSchoolCommentSection(item) {
  const seedComments = schoolCommentExamples[item.id] || [];
  const composer = `<form class="school-comment-form" id="schoolCommentForm"><label for="schoolCommentInput">补充你的本校经历</label><textarea id="schoolCommentInput" maxlength="300" placeholder="写下具体事实，例如课程安排、宿舍生活或实习准备。"></textarea><div><select id="schoolCommentDimension" aria-label="评论维度"><option>课程学习</option><option>宿舍生活</option><option>城市环境</option><option>就业去向</option></select><button class="primary-button" type="submit"><i data-lucide="send"></i>匿名发布</button></div><small>仅本校认证学生可发布，正式版本由后端校验校园身份。</small></form>`;
  return `<section class="detail-experience-panel school-comment-panel school-detail-anchor" id="school-comments"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="messages-square"></i>本校学生补充</span><h2>院校细节补充</h2></div><span class="comment-count">${seedComments.length} 条</span></div><p class="school-comment-intro">用于补充官方资料难以覆盖的具体体验，院校信息仍以学校发布内容为准。</p>${composer}<div class="school-comment-list">${seedComments.length ? seedComments.map(renderSchoolComment).join("") : `<div class="detail-empty">暂时还没有本校学生补充</div>`}</div></section>`;
}

function renderMajorPrograms(item, query = "") {
  const list = Array.isArray(item.majorPrograms) ? item.majorPrograms : [];
  const keyword = query.trim().toLowerCase();
  const filtered = list.filter((program) => !keyword || `${program.name}${program.school}${program.category}${program.note}`.toLowerCase().includes(keyword));
  return filtered.length ? filtered.map((program) => {
    const content = `<div class="major-program-title"><span class="major-program-icon"><i data-lucide="book-open"></i></span><div><strong>${program.name}</strong><small>${program.school}</small></div><i data-lucide="arrow-up-right"></i></div><div class="major-program-meta"><span>${program.level}</span><span>${program.category}</span></div><p>${program.note}</p><div class="major-program-source"><i data-lucide="landmark"></i><span>${program.officialUrl ? "查看学院官网" : "官方链接待补充"}</span></div>`;
    return program.officialUrl ? `<a class="major-program-item" href="${program.officialUrl}" target="_blank" rel="noopener noreferrer" aria-label="查看${item.school}${program.school}官网：${program.name}">${content}</a>` : `<article class="major-program-item pending" aria-label="${program.name}官方链接待补充">${content}</article>`;
  }).join("") : `<div class="major-program-empty"><i data-lucide="search-x"></i><p>没有找到匹配的专业</p></div>`;
}

function renderAdmissionResources(item) {
  return item.admissionResources.map((resource) => `<a class="admission-resource-card" href="${resource.url}" target="_blank" rel="noopener noreferrer"><span class="admission-resource-icon"><i data-lucide="${resource.icon}"></i></span><div><span class="admission-resource-type">${resource.sourceType}</span><strong>${resource.title}</strong><p>${resource.description}</p><small>${resource.year} · ${resource.sourceName}</small></div><span class="admission-resource-status ${resource.status === "待接入" ? "pending" : ""}">${resource.status}</span><i data-lucide="arrow-up-right"></i></a>`).join("");
}

function renderLatestUpdates(item) {
  const updates = Array.isArray(item.latestUpdates) ? item.latestUpdates : [];
  const updateCards = updates.map((update) => `<article class="latest-update-card"><div class="latest-update-meta"><span>${update.type}</span><time>${update.date}</time></div><h3>${update.title}</h3><p>${update.summary}</p><footer><div><span>${update.publisher}</span><small>${update.status}</small></div><a href="${update.url}" target="_blank" rel="noopener noreferrer" aria-label="前往${update.publisher}核验${update.title}">前往官网核验<i data-lucide="arrow-up-right"></i></a></footer></article>`).join("");
  return `<article class="detail-panel latest-updates-panel school-detail-anchor" id="school-updates"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="newspaper"></i>最新资讯</span><h2>政策变化先核对发布时间</h2></div><span class="source-level-tag level-official">官方发布入口</span></div><p>集中查看可能随年份变化的学校政策。当前为前端结构示例，接入具体通知前不展示未经核验的发布日期和政策结论。</p><div class="latest-update-list">${updateCards}</div><div class="latest-update-note"><i data-lucide="history"></i><span>正式接入后，每条资讯保留发布单位、发布日期与原始页面，旧政策不覆盖，便于比较历年变化。</span></div></article>`;
}

function renderCampusSection(item) {
  const campusCards = item.campusDetails.map((campus) => `<article class="campus-card"><header><span class="campus-icon"><i data-lucide="school"></i></span><div><strong>${campus.name}</strong><small>${campus.location}</small></div><span>${campus.status}</span></header><dl><div><dt>学院分布</dt><dd>${campus.colleges}</dd></div><div><dt>交通参考</dt><dd>${campus.transport}</dd></div></dl></article>`).join("");
  const cityCards = item.cityReferences.map((reference) => `<article class="city-reference-card"><i data-lucide="${reference.icon}"></i><span>${reference.label}</span><strong>${reference.value}</strong><small>${reference.note}</small></article>`).join("");
  const mediaCards = item.campusMedia.map((media) => `<a class="campus-media-card" href="${media.url}" target="_blank" rel="noopener noreferrer"><span class="campus-media-preview"><i data-lucide="${media.icon}"></i></span><div><strong>${media.title}</strong><p>${media.description}</p><span>${media.status}</span></div><i data-lucide="arrow-up-right"></i></a>`).join("");
  return `<article class="detail-panel campus-panel school-detail-anchor" id="school-campus"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="map-pin"></i>校园与城市</span><h2>先确认校区，再判断生活环境</h2></div><span class="source-level-tag level-institution">平台整理</span></div><p>${item.campusSummary}</p><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>校区概览</strong><small>学院和交通安排以学校最新发布为准</small></div><span>${item.campusDetails.length} 个校区条目</span></div><div class="campus-grid">${campusCards}</div></section><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>${item.city}城市参考</strong><small>不填写未经核实的时间和费用数字</small></div></div><div class="city-reference-grid">${cityCards}</div></section><section class="campus-subsection"><div class="campus-subsection-heading"><div><strong>校园媒体</strong><small>仅接入学校官方或明确授权的素材</small></div><span>来源：${item.officialSource}</span></div><div class="campus-media-grid">${mediaCards}</div></section><div class="admission-disclaimer"><i data-lucide="clock-3"></i><span>校园资料更新：${item.updatedAt}。具体校区、宿舍和交通安排需按专业及当年通知确认。</span></div></article>`;
}

function renderSchoolDetail() {
  const panel = $("#schoolDetailContent");
  const item = institutions.find((school) => school.id === currentSchoolDetail) || institutions[0];
  if (!panel || !item) return;
  const saved = userFavorites().includes(`school-${item.id}`);
  const schoolCommentSection = renderSchoolCommentSection(item);
  const latestUpdatesSection = renderLatestUpdates(item);
  const campusSection = renderCampusSection(item);
  panel.innerHTML = `<div class="school-detail-topbar"><button class="quiet-button" data-view-target="experience"><i data-lucide="arrow-left"></i>返回院校与经验</button><div class="school-detail-top-actions"><a class="quiet-button" href="${item.officialUrl}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>学校官网</a><button class="primary-button" data-favorite="school-${item.id}"><i data-lucide="${saved ? "bookmark-check" : "bookmark-plus"}"></i>${saved ? "已加入候选" : "加入我的候选"}</button></div></div>
    <header class="school-profile-header"><div class="institution-mark school-profile-mark">${item.school.slice(0, 1)}</div><div class="school-profile-copy"><span class="section-kicker">学校详情 · 平台整理</span><h1>${item.school}</h1><p class="school-english-name">${item.englishName}</p><div class="school-profile-tags"><span><i data-lucide="map-pin"></i>${item.city}</span><span><i data-lucide="landmark"></i>${item.type}</span>${item.highlights.map((highlight) => `<span>${highlight}</span>`).join("")}</div></div></header>
    <nav class="school-section-nav" aria-label="学校详情目录"><button data-school-anchor="school-overview" class="active">学校概况</button><button data-school-anchor="school-updates">最新资讯</button><button data-school-anchor="school-majors">专业列表</button><button data-school-anchor="school-admission">招生录取</button><button data-school-anchor="school-campus">校园与城市</button><button data-school-anchor="school-progression">升学参考</button><button data-school-anchor="school-comments">本校评论</button></nav>
    <div class="school-detail-grid">
      <section class="school-detail-main">
        <article class="detail-panel detail-overview school-detail-anchor" id="school-overview"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="notebook-tabs"></i>学校概况</span><h2>先建立整体认识</h2></div><span class="source-level-tag level-institution">平台整理</span></div><p>${item.intro}</p><dl class="school-facts"><div><dt>中文名称</dt><dd>${item.school}</dd></div><div><dt>英文名称</dt><dd>${item.englishName}</dd></div><div><dt>办学类型</dt><dd>${item.type}</dd></div><div><dt>办学层次</dt><dd>${item.educationLevel}</dd></div><div><dt>创办时间</dt><dd>${item.founded}</dd></div><div><dt>主要校区</dt><dd>${item.campuses}</dd></div></dl><div class="school-source-note"><span><i data-lucide="clock-3"></i>资料更新：${item.updatedAt}</span><a href="${item.officialUrl}" target="_blank" rel="noopener noreferrer">来源：${item.officialSource}<i data-lucide="external-link"></i></a></div></article>
        ${latestUpdatesSection}
        <article class="detail-panel major-program-panel school-detail-anchor" id="school-majors"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="book-open"></i>专业列表</span><h2>查看专业与培养方向</h2></div><span class="source-level-tag level-official">官方信息</span></div><p>${item.officialSummary}</p><div class="major-program-search"><i data-lucide="search"></i><input id="schoolMajorSearch" type="search" placeholder="搜索专业名称、学院或学科门类" autocomplete="off"><span id="majorProgramCount">${item.majorPrograms.length} 个示例专业</span></div><div class="major-program-list" id="majorProgramList">${renderMajorPrograms(item)}</div><div class="major-program-foot"><span>当前为页面结构示例，完整目录以学校官方发布为准。</span><a class="source-link" href="${item.officialUrl}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>查看 ${item.officialSource}</a></div></article>
        <article class="detail-panel admission-panel school-detail-anchor" id="school-admission"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="graduation-cap"></i>招生与录取</span><h2>按年份和报考条件查资料</h2></div><span class="source-level-tag level-data">公开资料</span></div><p>${item.admissionBrief}</p><div class="admission-filter-bar"><label><span>年份</span><select id="admissionYear">${item.admissionYears.map((year) => `<option>${year}</option>`).join("")}</select></label><label><span>省份</span><select id="admissionProvince">${item.admissionProvinces.map((province) => `<option>${province}</option>`).join("")}</select></label><label><span>科类</span><select id="admissionSubject">${item.admissionSubjects.map((subject) => `<option>${subject}</option>`).join("")}</select></label></div><div class="admission-selection-note"><i data-lucide="filter"></i><span id="admissionSelectionNote">当前条件：${item.admissionYears[0]} · ${item.admissionProvinces[0]} · ${item.admissionSubjects[0]}</span><small>前端结构示例，真实查询待数据接口接入</small></div><div class="admission-resource-list">${renderAdmissionResources(item)}</div><div class="admission-disclaimer"><i data-lucide="info"></i><span>${item.dataSummary}</span></div></article>
        ${campusSection}
        <article class="detail-panel progression-panel school-detail-anchor" id="school-progression"><div class="detail-panel-heading"><div><span class="subsection-kicker"><i data-lucide="trending-up"></i>升学参考</span><h2>保研率先看统计口径</h2></div><span class="source-level-tag level-data">待核验数据</span></div><p>${item.careerSummary}</p><div class="recommendation-summary"><div><span>保研率</span><strong>${item.postgraduateRecommendation.value}</strong><small>数据年份：${item.postgraduateRecommendation.year}</small></div><div><span>推免人数</span><strong>${item.postgraduateRecommendation.recommendedCount}</strong><small>需对应学校公示名单</small></div><div><span>毕业生统计范围</span><strong>${item.postgraduateRecommendation.graduateScope}</strong><small>需明确分母范围</small></div></div><dl class="recommendation-method"><div><dt>建议计算口径</dt><dd>${item.postgraduateRecommendation.methodology}</dd></div><div><dt>建议来源</dt><dd>${item.postgraduateRecommendation.source}</dd></div><div><dt>更新时间</dt><dd>${item.postgraduateRecommendation.updatedAt}</dd></div></dl><div class="admission-disclaimer warning"><i data-lucide="triangle-alert"></i><span>不同学院、专业和年份的推免情况可能不同，正式展示时必须保留原始来源与统计范围。</span></div></article>
      </section>
      <aside class="school-detail-side"><section class="detail-source-panel"><span class="subsection-kicker"><i data-lucide="shield-check"></i>信息凭证</span><h2>每条摘要都有来源入口</h2><p>平台负责整理和解释，官方页面与公开数据用于核验具体细节。</p><a class="detail-source-row" href="${item.officialUrl}" target="_blank" rel="noopener noreferrer"><span class="source-icon official-icon"><i data-lucide="landmark"></i></span><span><strong>${item.officialSource}</strong><small>学校简介 · 招生简章 · 培养信息</small></span><i data-lucide="external-link"></i></a><a class="detail-source-row" href="${item.dataUrl}" target="_blank" rel="noopener noreferrer"><span class="source-icon data-icon"><i data-lucide="database"></i></span><span><strong>${item.dataSource}</strong><small>招生计划 · 专业目录 · 公开录取信息</small></span><i data-lucide="external-link"></i></a></section>${schoolCommentSection}</aside>
    </div>`;
  hydrateIcons();
}

function renderAnswerHistory() {
  const list = $("#answerList");
  if (!list) return;
  const user = currentUser();
  const history = user ? read(STORE.answers, []).filter((item) => item.userId === user.id) : demoAnswers;
  list.innerHTML = history.length ? history.map((item) => `<article class="question-list-item"><header><strong>${item.title}</strong><span class="question-status">${item.status}</span></header><p>${item.meta || `${item.topic || "未分类"} · 已完成回答`}</p></article>`).join("") : `<div class="qa-empty"><i data-lucide="message-square-off"></i><p>你还没有回答过问题</p><span>完成认证后，可以从左侧问题池选择自己真正经历过的问题。</span></div>`;
  hydrateIcons();
}

function renderCompare() {
  const panel = $("#compareContent");
  if (!panel) return;
  const savedIds = userFavorites();
  const savedExperiences = experiences.filter((item) => savedIds.includes(item.id));
  const savedInstitutions = institutions.filter((item) => savedIds.includes(`school-${item.id}`));
  const saved = [...savedInstitutions.map((item) => ({ ...item, candidateType: "school" })), ...savedExperiences.map((item) => ({ ...item, candidateType: "experience" }))];
  if (!currentUser()) {
    panel.innerHTML = `<div class="compare-empty"><i data-lucide="bookmark"></i><strong>登录后保存你的候选清单</strong><p>先浏览经验，遇到值得比较的学校或专业再登录保存。</p></div>`;
  } else {
    panel.innerHTML = saved.length ? `<div class="compare-toolbar"><div><strong>我的候选</strong><span>已收藏 ${saved.length} 项</span></div><button class="icon-button" data-share-candidates>分享候选</button></div><div class="compare-list">${saved.map((s) => `<div class="compare-item"><strong>${s.school}</strong><small>${s.candidateType === "school" ? "院校信息" : `${s.major} · ${s.city}`}</small></div>`).join("")}</div>` : `<div class="compare-empty"><i data-lucide="bookmark"></i><strong>你还没有收藏任何候选</strong><p>去信息库收藏感兴趣的学校和专业。</p></div>`;
  }
  hydrateIcons();
}

function renderFamily() {
  const user = currentUser();
  const main = $("#familyMainContent");
  if (!main) return;
  if (!user) {
    main.innerHTML = `<div class="family-empty"><i data-lucide="link-2"></i><strong>登录后生成家庭邀请码</strong><span>家庭协作只共享你主动授权的候选内容。</span></div>`;
  } else {
    const family = read(STORE.family, {})[user.id];
    main.innerHTML = family ? `<div class="family-linked"><div class="linked-code"><span>家庭邀请码</span><strong>${family.code}</strong><button class="icon-button" data-copy-code="${family.code}">复制</button></div></div>` : `<div class="family-empty"><p>还未创建家庭邀请码，点击生成。</p><button class="cyan-button" data-family-invite>生成邀请码</button></div>`;
  }
  hydrateIcons();
}

function renderTrust() {
  const user = currentUser();
  const status = user ? (read(STORE.verification, {})[user.id] || {}).status : null;
  const card = $("#verificationContent");
  if (!card) return;
  card.innerHTML = `<div class="verification-status"><span class="status-icon"><i data-lucide="shield-check"></i></span><div><span>当前身份</span><strong>${user ? `${user.role} · ${status ? status : "未认证"}` : "未登录"}</strong></div></div>`;
  hydrateIcons();
}

function updateAccountHeader() {
  const user = currentUser();
  const accountButton = $("#accountButton");
  if (accountButton) accountButton.textContent = initials(user?.nickname);
  const profileNameEl = $("#profileName");
  if (profileNameEl) profileNameEl.textContent = user ? user.nickname : "访客浏览";
  renderQuestions(); renderAnswerHistory(); renderExperiences(); renderCompare(); renderFamily(); renderTrust();
}

function showAccount() {
  const user = currentUser();
  const authPanel = $("#authPanel");
  const profilePanel = $("#profilePanel");
  if (authPanel) authPanel.classList.toggle("hidden", Boolean(user));
  if (profilePanel) profilePanel.classList.toggle("hidden", !user);
  if (!user) {
    $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.authTab === "login"));
    $("#loginForm")?.classList.remove("hidden");
    $("#registerForm")?.classList.add("hidden");
  }
  if (user) {
    $("#profileSummaryName") && ($("#profileSummaryName").textContent = user.nickname);
    $("#profileSummaryMeta") && ($("#profileSummaryMeta").textContent = `${user.role} · ${user.email}`);
    $("#profileAvatarLarge") && ($("#profileAvatarLarge").textContent = initials(user.nickname));
    $("#profileNameInput") && ($("#profileNameInput").value = user.nickname);
    $("#profileRoleInput") && ($("#profileRoleInput").value = user.role);
    $("#profileStageInput") && ($("#profileStageInput").value = user.stage);
    $("#profileQuestionCount") && ($("#profileQuestionCount").textContent = read(STORE.questions, []).filter((item) => item.userId === user.id).length);
    $("#profileFavoriteCount") && ($("#profileFavoriteCount").textContent = userFavorites().length);
    $("#profileFamilyCode") && ($("#profileFamilyCode").textContent = read(STORE.family, {})[user.id]?.code || "未生成");
  }
  openModal("accountModal"); hydrateIcons();
}

function requireAuth(message = "登录后才能使用这个功能") { if (currentUser()) return true; showAccount(); showToast(message); return false; }

function register(event) {
  event.preventDefault(); const name = $("#registerName")?.value.trim() || ""; const email = $("#registerEmail").value.trim().toLowerCase(); const password = $("#registerPassword").value;
  const users = read(STORE.users, []);
  if (users.some((user) => user.email === email)) { showToast("这个邮箱已经注册，请直接登录"); $("[data-auth-tab=login]")?.click(); $("#loginEmail").value = email; return; }
  const user = { id: uid("user"), nickname: name || `用户${Date.now()}`, email, password, role: $("#registerRole")?.value || "学生", stage: $("#registerStage")?.value || "高考志愿", createdAt: new Date().toISOString() };
  write(STORE.users, [...users, user]); localStorage.setItem(STORE.session, user.id); $("#registerForm")?.reset(); closeModal("accountModal"); updateAccountHeader(); showToast(`欢迎加入引路，${user.nickname}`);
}

function login(event) {
  event.preventDefault(); const email = $("#loginEmail").value.trim().toLowerCase(); const password = $("#loginPassword").value; const user = read(STORE.users, []).find((item) => item.email === email && item.password === password);
  if (!user) { showToast("邮箱或密码不正确，请检查后重试"); return; }
  localStorage.setItem(STORE.session, user.id); closeModal("accountModal"); updateAccountHeader(); showToast(`欢迎回来，${user.nickname}`);
}

function submitQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInput"); const value = input?.value.trim() || ""; if (value.length < 8) { showToast("请把问题写得再具体一点"); input?.focus(); return; }
  const user = currentUser(); const all = read(STORE.questions, []); all.unshift({ id: uid("question"), userId: user.id, title: value, topic: $("#questionTopic")?.value || "未分类", stage: $("#questionStage")?.value || "高考志愿", status: "等待回答", createdAt: new Date().toISOString() }); write(STORE.questions, all);
  input.value = ""; closeModal("questionModal"); renderQuestions(); showToast("匿名问题已发布，正在匹配认证回答者");
}

function submitInlineQuestion() {
  if (!requireAuth("登录后才能发布匿名问题")) return;
  const input = $("#questionInputPreview");
  const value = input?.value.trim() || "";
  if (value.length < 8) {
    showToast("请把问题写得再具体一点");
    input?.focus();
    return;
  }
  const user = currentUser();
  const all = read(STORE.questions, []);
  all.unshift({
    id: uid("question"),
    userId: user.id,
    title: value,
    topic: $("#questionTopicPreview")?.value || "未分类",
    stage: $("#questionStagePreview")?.value || "高考志愿",
    status: "等待回答",
    createdAt: new Date().toISOString()
  });
  write(STORE.questions, all);
  input.value = "";
  renderQuestions();
  switchQaTab("ask");
  showToast("匿名问题已发布，正在匹配认证回答者");
}

function toggleFavorite(id) {
  if (!requireAuth("登录后才能保存候选")) return;
  const user = currentUser(); const all = read(STORE.favorites, {}); const list = all[user.id] || []; all[user.id] = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]; write(STORE.favorites, all); renderExperiences(); renderCompare(); if ($("#view-school-detail")?.classList.contains("active")) renderSchoolDetail(); showToast(all[user.id].includes(id) ? "已加入候选" : "已从候选移除");
}

function generateFamilyInvite() {
  if (!requireAuth("登录后才能创建家庭关联")) return;
  const user = currentUser(); const all = read(STORE.family, {}); if (!all[user.id]) all[user.id] = { code: `YL-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}` , createdAt: new Date().toISOString() }; write(STORE.family, all); renderFamily(); showToast("家庭邀请码已生成");
}

function requestVerification() {
  if (!requireAuth("登录后才能提交认证申请")) return;
  const user = currentUser(); const all = read(STORE.verification, {}); if (!all[user.id]) all[user.id] = { status: "申请中", submittedAt: new Date().toISOString() }; write(STORE.verification, all); renderTrust(); showToast("认证申请已提交");
}

function submitSchoolComment(event) {
  event.preventDefault();
  showToast("正式版本将由后端校验本校身份后发布评论");
}

function copyText(value) { navigator.clipboard?.writeText(value).then(() => showToast("邀请码已复制")).catch(() => showToast(`邀请码：${value}`)); }

function scrollToAnchor(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function switchQaTab(name) {
  const ask = $("#qaAskSection");
  const answer = $("#qaAnswerSection");
  const active = name === "answer" ? "answer" : "ask";
  ask?.classList.toggle("hidden", active !== "ask");
  answer?.classList.toggle("hidden", active !== "answer");
  $$(".auth-tab[data-qa-tab]").forEach((button) => button.classList.toggle("active", button.dataset.qaTab === name));
  if (active === "answer") renderAnswerHistory();
}

// 事件委托保留，但同时安全绑定核心按钮以避免空引用错误
document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]"); if (nav) { switchView(nav.dataset.view); return; }
  const targetView = event.target.closest("[data-view-target]"); if (targetView) { switchView(targetView.dataset.viewTarget); return; }
  const schoolDetail = event.target.closest("[data-school-detail]"); if (schoolDetail) { currentSchoolDetail = schoolDetail.dataset.schoolDetail; switchView("school-detail"); return; }
  const schoolAnchor = event.target.closest("[data-school-anchor]"); if (schoolAnchor) { scrollToAnchor(schoolAnchor.dataset.schoolAnchor); $$("[data-school-anchor]").forEach((button) => button.classList.toggle("active", button === schoolAnchor)); return; }
  const modalTrigger = event.target.closest("[data-open-modal]"); if (modalTrigger) { openModal(modalTrigger.dataset.openModal); return; }
  if (event.target.closest("[data-open-account]")) { showAccount(); return; }
  const modalCloser = event.target.closest("[data-close-modal]"); if (modalCloser) { closeModal(modalCloser.dataset.closeModal); return; }
  if (event.target.classList.contains("modal-backdrop")) closeModal(event.target.id);
  const favorite = event.target.closest("[data-favorite]"); if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
  if (event.target.closest("[data-family-invite]")) { generateFamilyInvite(); return; }
  const code = event.target.closest("[data-copy-code]"); if (code) { copyText(code.dataset.copyCode); return; }
  if (event.target.closest("[data-start-verify]")) { requestVerification(); return; }
  if (event.target.closest("[data-report-comment]")) { showToast("已记录举报，正式版本将进入内容审核流程"); return; }
  if (event.target.closest("[data-share-candidates]")) { showToast("候选清单分享功能将在正式后端版本开放"); return; }
  if (event.target.closest("[data-clear-search]")) { currentSearch = ""; $$("[data-stage-search]").forEach((input) => { input.value = ""; }); renderExperiences(); return; }
  const authTab = event.target.closest("[data-auth-tab]"); if (authTab) { $$(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab === authTab)); $("#loginForm").classList.toggle("hidden"); $("#registerForm").classList.toggle("hidden"); return; }
  const qaTab = event.target.closest("[data-qa-tab]"); if (qaTab) { switchQaTab(qaTab.dataset.qaTab); return; }
});

document.addEventListener("input", (event) => {
  if (event.target.id !== "schoolMajorSearch") return;
  const item = institutions.find((school) => school.id === currentSchoolDetail);
  if (!item) return;
  const query = event.target.value;
  const list = $("#majorProgramList");
  const count = $("#majorProgramCount");
  const matches = item.majorPrograms.filter((program) => !query.trim() || `${program.name}${program.school}${program.category}${program.note}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (list) list.innerHTML = renderMajorPrograms(item, query);
  if (count) count.textContent = `${matches.length} 个匹配专业`;
  hydrateIcons();
});

document.addEventListener("change", (event) => {
  if (!["admissionYear", "admissionProvince", "admissionSubject"].includes(event.target.id)) return;
  const note = $("#admissionSelectionNote");
  if (note) note.textContent = `当前条件：${$("#admissionYear")?.value || "年份"} · ${$("#admissionProvince")?.value || "省份"} · ${$("#admissionSubject")?.value || "科类"}`;
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "schoolCommentForm") submitSchoolComment(event);
});

// 安全绑定核心交互（检查元素存在后绑定）
const menuButton = $("#menuButton"); if (menuButton) menuButton.addEventListener("click", () => $("#sidebar").classList.toggle("open"));
const accountButton = $("#accountButton"); if (accountButton) accountButton.addEventListener("click", showAccount);
const notifyButton = $("#notifyButton"); if (notifyButton) notifyButton.addEventListener("click", () => showToast(currentUser() ? "暂无新的认证回答" : "登录后可查看你的通知"));
const sameSchoolToggle = $("#sameSchoolToggle"); if (sameSchoolToggle) sameSchoolToggle.addEventListener("change", renderExperiences);
const submitQuestionBtn = $("#submitQuestion"); if (submitQuestionBtn) submitQuestionBtn.addEventListener("click", submitQuestion);
const inviteFamilyBtn = $("#inviteFamily"); if (inviteFamilyBtn) inviteFamilyBtn.addEventListener("click", generateFamilyInvite);
const submitPreviewQuestion = $("#submitPreviewQuestion"); if (submitPreviewQuestion) submitPreviewQuestion.addEventListener("click", submitInlineQuestion);
const loginFormEl = $("#loginForm"); if (loginFormEl) loginFormEl.addEventListener("submit", login);
const registerFormEl = $("#registerForm"); if (registerFormEl) registerFormEl.addEventListener("submit", register);
const profileFormEl = $("#profileForm"); if (profileFormEl) profileFormEl.addEventListener("submit", (event) => { event.preventDefault(); const users = read(STORE.users, []); const id = localStorage.getItem(STORE.session); const updated = users.map((u) => u.id === id ? { ...u, nickname: $("#profileNameInput")?.value || u.nickname, role: $("#profileRoleInput")?.value || u.role, stage: $("#profileStageInput")?.value || u.stage } : u); write(STORE.users, updated); showToast("已保存个人信息"); updateAccountHeader(); });
const logoutButton = $("#logoutButton"); if (logoutButton) logoutButton.addEventListener("click", () => { localStorage.removeItem(STORE.session); closeModal("accountModal"); updateAccountHeader(); showToast("已退出当前账号，可继续访客浏览"); });
const continueGuestBtn = $("#continueGuest"); if (continueGuestBtn) continueGuestBtn.addEventListener("click", () => { localStorage.setItem("yinlu_guest_seen", "1"); closeModal("accountModal"); showToast("已进入访客试用，可随时注册保存数据"); });

// stage & init
$("#previousStage")?.addEventListener("click", () => moveStage(-1));
$("#nextStage")?.addEventListener("click", () => moveStage(1));
$$("[data-stage-dot]").forEach((button) => button.addEventListener("click", () => setStage(button.dataset.stageDot)));
$$("[data-stage-search-submit]").forEach((button) => button.addEventListener("click", () => runStageSearch(button.closest(".stage-slide"))));
$$("[data-stage-search]").forEach((input) => input.addEventListener("keydown", (event) => { if (event.key === "Enter") runStageSearch(input.closest(".stage-slide")); }));
$$("[data-stage-task]").forEach((button) => button.addEventListener("click", () => runStageTask(button.dataset.stageTask)));
const stageCarousel = $("#stageCarousel");
if (stageCarousel) {
  stageCarousel.addEventListener("keydown", (event) => {
    if (event.target.matches("input, button")) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); moveStage(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveStage(1); }
  });
  let touchStartX = 0;
  stageCarousel.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0]?.clientX || 0; }, { passive: true });
  stageCarousel.addEventListener("touchend", (event) => {
    const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(distance) < 45) return;
    moveStage(distance > 0 ? -1 : 1);
  }, { passive: true });
}
$$('[data-dimension-filter]').forEach((button) => button.addEventListener("click", () => {
  currentDimensionFilter = button.dataset.dimensionFilter;
  $$('[data-dimension-filter]').forEach((item) => item.classList.toggle("active", item === button));
  renderExperiences();
}));
$$('[data-source-filter]').forEach((button) => button.addEventListener("click", () => {
  currentSourceFilter = button.dataset.sourceFilter;
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item === button));
  renderExperiences();
}));
$$('[data-scope-filter]').forEach((button) => button.addEventListener("click", () => {
  currentScopeFilter = button.dataset.scopeFilter;
  $$('[data-scope-filter]').forEach((item) => item.classList.toggle("active", item === button));
  renderExperiences();
}));
const experienceSchoolSearch = $("#experienceSchoolSearch"); if (experienceSchoolSearch) experienceSchoolSearch.addEventListener("input", (event) => { currentSchoolSearch = event.target.value; renderExperiences(); });
const experienceMajorSearch = $("#experienceMajorSearch"); if (experienceMajorSearch) experienceMajorSearch.addEventListener("input", (event) => { currentMajorSearch = event.target.value; renderExperiences(); });
const clearExperienceFilters = $("#clearExperienceFilters"); if (clearExperienceFilters) clearExperienceFilters.addEventListener("click", () => {
  currentSchoolSearch = "";
  currentMajorSearch = "";
  currentDimensionFilter = "all";
  currentSourceFilter = "all";
  currentScopeFilter = "all";
  if (experienceSchoolSearch) experienceSchoolSearch.value = "";
  if (experienceMajorSearch) experienceMajorSearch.value = "";
  $$('[data-dimension-filter]').forEach((item) => item.classList.toggle("active", item.dataset.dimensionFilter === "all"));
  $$('[data-source-filter]').forEach((item) => item.classList.toggle("active", item.dataset.sourceFilter === "all"));
  $$('[data-scope-filter]').forEach((item) => item.classList.toggle("active", item.dataset.scopeFilter === "all"));
  renderExperiences();
});

document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeModal("questionModal"); closeModal("accountModal"); } });

setStage(currentStage); updateAccountHeader(); hydrateIcons();
switchQaTab("ask");
if (!currentUser() && !localStorage.getItem("yinlu_guest_seen")) window.setTimeout(showAccount, 500);
