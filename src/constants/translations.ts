import type { LanguageCode } from './languages'

type TranslationKey = 
  // 导航栏
  | 'nav.findJobs'
  | 'nav.dashboard'
  | 'nav.profile'
  | 'nav.settings'
  | 'nav.signIn'
  | 'nav.signUp'
  | 'nav.signOut'
  
  // 主页
  | 'hero.title'
  | 'hero.subtitle'
  | 'platform.title'
  | 'platform.subtitle'
  | 'ai.title'
  | 'ai.subtitle'
  | 'ai.feature1.title'
  | 'ai.feature1.description'
  | 'ai.feature2.title'
  | 'ai.feature2.description'
  | 'translation.title'
  | 'translation.subtitle'
  | 'translation.resume.title'
  | 'translation.resume.description'
  | 'translation.message.title'
  | 'translation.message.description'
  | 'translation.interview.title'
  | 'translation.interview.description'
  | 'cost.title'
  | 'cost.subtitle'
  | 'cost.saving.title'
  | 'cost.saving.description'
  | 'cost.time.title'
  | 'cost.time.description'
  | 'cta.title'
  | 'cta.try'
  | 'cta.contact'
  | 'footer.slogan'
  | 'footer.contact'
  | 'footer.copyright'

  // 搜索相关
  | 'search.placeholder.keyword'
  | 'search.placeholder.location'
  | 'search.button'
  | 'search.results.title'
  | 'search.results.showing'
  | 'search.results.of'
  | 'search.results.for'
  | 'search.results.in'
  | 'search.pagination.previous'
  | 'search.pagination.next'

  // AI相关
  | 'ai.candidate.a.title'
  | 'ai.candidate.a.position'
  | 'ai.candidate.b.title'
  | 'ai.candidate.b.position'
  | 'ai.match.rate'

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  'en': {
    // 导航栏
    'nav.findJobs': 'Find Jobs',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.signIn': 'Sign In',
    'nav.signUp': 'Sign Up',
    'nav.signOut': 'Sign Out',

    // 主页
    'hero.title': 'Find Your Next Career Move',
    'hero.subtitle': 'Connect with top companies and opportunities. Your dream job is just a search away.',
    'platform.title': 'One Platform, All Possibilities',
    'platform.subtitle': 'Post once, reach candidates everywhere',
    'ai.title': 'AI-Powered Smart Matching',
    'ai.subtitle': 'Improve recruitment efficiency',
    'ai.feature1.title': 'Smart Scoring System',
    'ai.feature1.description': 'Automatically analyze resume and job matching, helping companies find the most suitable candidates',
    'ai.feature2.title': '50% Efficiency Boost',
    'ai.feature2.description': 'Reduce resume screening time, let HR focus on communicating with quality candidates',
    'translation.title': 'Break Language Barriers',
    'translation.subtitle': 'Real-time translation for resumes, messages, and video interviews',
    'translation.resume.title': 'Resume Translation',
    'translation.resume.description': 'Automatically detect and translate resumes while maintaining professional terminology accuracy',
    'translation.message.title': 'Real-time Message Translation',
    'translation.message.description': 'Automatic translation of communications with candidates, supporting multiple languages',
    'translation.interview.title': 'Video Interview Translation',
    'translation.interview.description': 'Real-time voice translation during interviews for smooth cross-language communication',
    'cost.title': 'Reduce Costs, Improve Efficiency',
    'cost.subtitle': 'Smart recruitment solution',
    'cost.saving.title': 'Reduce Recruitment Costs',
    'cost.saving.description': 'Save 40% recruitment costs through AI matching and multi-platform integration',
    'cost.time.title': 'Shorten Recruitment Cycle',
    'cost.time.description': 'Automated processes and smart screening reduce recruitment time by 50%',
    'cta.title': 'Ready to Get Started?',
    'cta.try': 'Try for Free',
    'cta.contact': 'Contact Us',
    'footer.slogan': 'Glint - Making Global Recruitment Simple',
    'footer.contact': 'Contact us: contact@glintapp.com',
    'footer.copyright': '© 2023 Glint. All rights reserved.',

    // 搜索相关
    'search.placeholder.keyword': 'Job title, keywords, or company',
    'search.placeholder.location': 'City, state, or remote',
    'search.button': 'Search',
    'search.results.title': 'Jobs Found',
    'search.results.showing': 'Showing',
    'search.results.of': 'of',
    'search.results.for': 'for',
    'search.results.in': 'in',
    'search.pagination.previous': 'Previous',
    'search.pagination.next': 'Next',

    // AI相关
    'ai.candidate.a.title': 'Candidate A',
    'ai.candidate.a.position': 'Software Engineer',
    'ai.candidate.b.title': 'Candidate B',
    'ai.candidate.b.position': 'Frontend Developer',
    'ai.match.rate': 'Match',
  },

  'zh-CN': {
    // 导航栏
    'nav.findJobs': '找工作',
    'nav.dashboard': '控制台',
    'nav.profile': '个人资料',
    'nav.settings': '设置',
    'nav.signIn': '登录',
    'nav.signUp': '注册',
    'nav.signOut': '退出',

    // 主页
    'hero.title': '一站式全球招聘平台',
    'hero.subtitle': '多平台职位同步 · 跨语言沟通 · 智能匹配',
    'platform.title': '多平台集成',
    'platform.subtitle': '一键发布，全网同步',
    'ai.title': 'AI智能匹配',
    'ai.subtitle': '高效精准',
    'ai.feature1.title': '智能评分',
    'ai.feature1.description': '自动分析简历，快速匹配人才',
    'ai.feature2.title': '效率翻倍',
    'ai.feature2.description': '智能筛选，专注优质沟通',
    'translation.title': '无障碍沟通',
    'translation.subtitle': '简历、消息、面试实时翻译',
    'translation.resume.title': '简历翻译',
    'translation.resume.description': '自动翻译，专业术语准确',
    'translation.message.title': '消息翻译',
    'translation.message.description': '多语言实时互译',
    'translation.interview.title': '面试翻译',
    'translation.interview.description': '视频面试实时翻译',
    'cost.title': '降本增效',
    'cost.subtitle': '智能解决方案',
    'cost.saving.title': '成本优化',
    'cost.saving.description': 'AI匹配，节省40%成本',
    'cost.time.title': '周期缩短',
    'cost.time.description': '智能筛选，效率提升50%',
    'cta.title': '开启全球招聘之旅',
    'cta.try': '免费体验',
    'cta.contact': '联系我们',
    'footer.slogan': '让全球招聘更简单',
    'footer.contact': '联系我们：contact@glintapp.com',
    'footer.copyright': '© 2023 Glint',

    // 搜索相关
    'search.placeholder.keyword': '职位名称、关键词或公司名',
    'search.placeholder.location': '城市、州或远程',
    'search.button': '搜索',
    'search.results.title': '个职位',
    'search.results.showing': '显示',
    'search.results.of': '共',
    'search.results.for': '搜索',
    'search.results.in': '在',
    'search.pagination.previous': '上一页',
    'search.pagination.next': '下一页',

    // AI相关
    'ai.candidate.a.title': '候选人 A',
    'ai.candidate.a.position': '软件工程师',
    'ai.candidate.b.title': '候选人 B',
    'ai.candidate.b.position': '前端开发',
    'ai.match.rate': '匹配度',
  },

  'es': {
    // 导航栏
    'nav.findJobs': 'Buscar Trabajos',
    'nav.dashboard': 'Panel de Control',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'nav.signIn': 'Iniciar Sesión',
    'nav.signUp': 'Registrarse',
    'nav.signOut': 'Cerrar Sesión',

    // 主页
    'hero.title': 'Encuentra tu próximo paso profesional',
    'hero.subtitle': 'Conéctate con las mejores empresas y oportunidades. Tu trabajo soñado está a solo una búsqueda.',
    'platform.title': 'Una plataforma, todas las posibilidades',
    'platform.subtitle': 'Publica una vez, llega a candidatos en todas partes',
    'ai.title': 'Emparejamiento inteligente con IA',
    'ai.subtitle': 'Mejora la eficiencia del reclutamiento',
    'ai.feature1.title': 'Sistema de puntuación inteligente',
    'ai.feature1.description': 'Analiza automáticamente la coincidencia entre currículum y trabajo, ayudando a las empresas a encontrar los candidatos más adecuados',
    'ai.feature2.title': 'Aumento de eficiencia del 50%',
    'ai.feature2.description': 'Reduce el tiempo de revisión de currículums, permite que RRHH se centre en comunicarse con candidatos de calidad',
    'translation.title': 'Rompe las barreras del idioma',
    'translation.subtitle': 'Traducción en tiempo real para currículums, mensajes y entrevistas por video',
    'translation.resume.title': 'Traducción de currículums',
    'translation.resume.description': 'Detecta y traduce automáticamente los currículums manteniendo la precisión de la terminología profesional',
    'translation.message.title': 'Traducción de mensajes en tiempo real',
    'translation.message.description': 'Traducción automática de comunicaciones con candidatos, compatible con varios idiomas',
    'translation.interview.title': 'Traducción de entrevistas por video',
    'translation.interview.description': 'Traducción de voz en tiempo real durante las entrevistas para una comunicación fluida entre idiomas',
    'cost.title': 'Reduce costos, mejora la eficiencia',
    'cost.subtitle': 'Solución inteligente de reclutamiento',
    'cost.saving.title': 'Reduce costos de reclutamiento',
    'cost.saving.description': 'Ahorra 40% en costos de reclutamiento mediante emparejamiento con IA e integración multiplataforma',
    'cost.time.title': 'Acorta el ciclo de reclutamiento',
    'cost.time.description': 'Procesos automatizados y selección inteligente reducen el tiempo de reclutamiento en un 50%',
    'cta.title': '¿Listo para empezar?',
    'cta.try': 'Prueba gratis',
    'cta.contact': 'Contáctanos',
    'footer.slogan': 'Glint - Simplificando el reclutamiento global',
    'footer.contact': 'Contáctanos: contact@glintapp.com',
    'footer.copyright': '© 2023 Glint. Todos los derechos reservados.',

    // 搜索相关
    'search.placeholder.keyword': 'Título, palabras clave o empresa',
    'search.placeholder.location': 'Ciudad, estado o remoto',
    'search.button': 'Buscar',
    'search.results.title': 'Trabajos encontrados',
    'search.results.showing': 'Mostrando',
    'search.results.of': 'de',
    'search.results.for': 'para',
    'search.results.in': 'en',
    'search.pagination.previous': 'Anterior',
    'search.pagination.next': 'Siguiente',

    // AI相关
    'ai.candidate.a.title': 'Candidato A',
    'ai.candidate.a.position': 'Ingeniero de Software',
    'ai.candidate.b.title': 'Candidato B',
    'ai.candidate.b.position': 'Desarrollador Frontend',
    'ai.match.rate': 'Coincidencia',
  },

  'ja': {
    // 导航栏
    'nav.findJobs': '求人検索',
    'nav.dashboard': 'ダッシュボード',
    'nav.profile': 'プロフィール',
    'nav.settings': '設定',
    'nav.signIn': 'ログイン',
    'nav.signUp': '新規登録',
    'nav.signOut': 'ログアウト',

    // 主页
    'hero.title': '次のキャリアステップを見つけよう',
    'hero.subtitle': 'トップ企業と機会につながる。夢の仕事は検索するだけ。',
    'platform.title': '1つのプラットフォーム、すべての可能性',
    'platform.subtitle': '1回の投稿で、すべての候補者にリーチ',
    'ai.title': 'AI搭載スマートマッチング',
    'ai.subtitle': '採用効率の向上',
    'ai.feature1.title': 'スマートスコアリングシステム',
    'ai.feature1.description': '履歴書と求人のマッチング度を自動分析し、企業が最適な候補者を見つけるのを支援',
    'ai.feature2.title': '効率50%アップ',
    'ai.feature2.description': '履歴書のスクリーニング時間を削減し、優秀な候補者とのコミュニケーションに集中',
    'translation.title': '言語の壁を超える',
    'translation.subtitle': '履歴書、メッセージ、ビデオ面接のリアルタイム翻訳',
    'translation.resume.title': '履歴書翻訳',
    'translation.resume.description': '履歴書の言語を自動検出し、専門用語の正確性を保ちながら目標言語に翻訳',
    'translation.message.title': 'リアルタイムメッセージ翻訳',
    'translation.message.description': '候補者とのコミュニケーションを自動翻訳、多言語対応',
    'translation.interview.title': 'ビデオ面接翻訳',
    'translation.interview.description': '面接中のリアルタイム音声翻訳で、スムーズな異言語コミュニケーションを実現',
    'cost.title': 'コスト削減と効率向上',
    'cost.subtitle': 'スマート採用ソリューション',
    'cost.saving.title': '採用コストの削減',
    'cost.saving.description': 'AIマッチングとマルチプラットフォーム統合により、採用コストを40%削減',
    'cost.time.title': '採用期間の短縮',
    'cost.time.description': '自動化プロセスとスマートスクリーニングにより、採用時間を50%短縮',
    'cta.title': '始めましょう',
    'cta.try': '無料トライアル',
    'cta.contact': 'お問い合わせ',
    'footer.slogan': 'Glint - グローバル採用をシンプルに',
    'footer.contact': 'お問い合わせ：contact@glintapp.com',
    'footer.copyright': '© 2023 Glint. All rights reserved.',

    // 搜索相关
    'search.placeholder.keyword': '職種、キーワード、または企業名',
    'search.placeholder.location': '都市、州、またはリモート',
    'search.button': '検索',
    'search.results.title': '求人が見つかりました',
    'search.results.showing': '表示中',
    'search.results.of': 'の',
    'search.results.for': '検索',
    'search.results.in': 'で',
    'search.pagination.previous': '前のページ',
    'search.pagination.next': '次のページ',

    // AI相关
    'ai.candidate.a.title': '候補者 A',
    'ai.candidate.a.position': 'ソフトウェアエンジニア',
    'ai.candidate.b.title': '候補者 B',
    'ai.candidate.b.position': 'フロントエンド開発者',
    'ai.match.rate': 'マッチ度',
  },

  'zh-TW': {
    // 导航栏
    'nav.findJobs': '找工作',
    'nav.dashboard': '控制台',
    'nav.profile': '個人資料',
    'nav.settings': '帳號設置',
    'nav.signIn': '登入',
    'nav.signUp': '註冊',
    'nav.signOut': '登出',

    // 主页
    'hero.title': '找工作，發招聘，一站搞定',
    'hero.subtitle': '不用再在各個招聘網站來回切換��，在Glint就能管理所有平台的招聘信息',
    'platform.title': '一次發布，多平台同步',
    'platform.subtitle': '支持主流招聘平台的職位同步與管理',
    'ai.title': 'AI智能匹配，提高招聘效率',
    'ai.subtitle': '讓招聘更智能，更高效',
    'ai.feature1.title': '智能评分系统',
    'ai.feature1.description': '自動分析簡歷與職位的匹配度，幫助企業快速找到最合適的候選人',
    'ai.feature2.title': '效率提升50%',
    'ai.feature2.description': '減少篩選簡歷的時間，讓HR專注於與優質候選人的溝通',
    'translation.title': '跨語言溝通無障礙',
    'translation.subtitle': '簡歷、消息、視頻面試，全程實時翻譯',
    'translation.resume.title': '簡歷翻譯',
    'translation.resume.description': '自動識別簡歷語言並翻譯成目標語言，保留專業術語準確性',
    'translation.message.title': '實時消息翻譯',
    'translation.message.description': '與候選人的溝通消息自動翻譯，支持多種語言互譯',
    'translation.interview.title': '視頻面試翻譯',
    'translation.interview.description': '面試過程中的實時語音翻譯，讓跨語言面試更順暢',
    'cost.title': '降低招聘成本，提高招聘效率',
    'cost.subtitle': '智能招聘解決方案',
    'cost.saving.title': '降低招聘成本',
    'cost.saving.description': '通過AI智能匹配和多平台整合，幫助企業節省40%招聘成本',
    'cost.time.title': '縮短招聘周期',
    'cost.time.description': '自動化流程和智能篩選，將招聘時間縮短50%',
    'cta.title': '準備好開始了嗎？',
    'cta.try': '免費試用',
    'cta.contact': '聯繫我們',
    'footer.slogan': 'Glint - 讓全球招聘變得簡單',
    'footer.contact': '聯繫我們：contact@glintapp.com',
    'footer.copyright': '© 2023 Glint. All rights reserved.',

    // 搜索相关
    'search.placeholder.keyword': '職位名稱、關鍵詞或公司名',
    'search.placeholder.location': '城市、州或遠程',
    'search.button': '搜索',
    'search.results.title': '個職位',
    'search.results.showing': '顯示',
    'search.results.of': '共',
    'search.results.for': '搜索',
    'search.results.in': '在',
    'search.pagination.previous': '上一頁',
    'search.pagination.next': '下一頁',

    // AI相关
    'ai.candidate.a.title': '候選人 A',
    'ai.candidate.a.position': '軟件工程師',
    'ai.candidate.b.title': '候選人 B',
    'ai.candidate.b.position': '前端開發',
    'ai.match.rate': '匹配度',
  }
}

export function getTranslation(language: LanguageCode, key: TranslationKey): string {
  return translations[language]?.[key] || translations['en'][key]
} 