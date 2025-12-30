export type Language = 'en' | 'om' | 'am';

export interface Translations {
  // Navigation
  dashboard: string;
  home: string;
  about: string;
  works: string;
  festivals: string;
  galleries: string;
  events: string;
  services: string;
  contact: string;
  products: string;
  talents: string;
  users: string;
  settings: string;
  logout: string;
  
  // Auth
  login: string;
  email: string;
  password: string;
  signIn: string;
  welcomeBack: string;
  loginDescription: string;
  invalidCredentials: string;
  
  // Dashboard
  totalUsers: string;
  totalEvents: string;
  totalProducts: string;
  totalServices: string;
  recentActivity: string;
  viewAll: string;
  
  // Common
  search: string;
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  loading: string;
  noData: string;
  actions: string;
  status: string;
  date: string;
  name: string;
  description: string;
  image: string;
  title: string;
  
  // Languages
  english: string;
  afaanOromo: string;
  amharic: string;
  language: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    home: 'Home',
    about: 'About',
    works: 'Works',
    festivals: 'Festivals',
    galleries: 'Galleries',
    events: 'Events',
    services: 'Services',
    contact: 'Contact',
    products: 'Products',
    talents: 'Talents',
    users: 'Users',
    settings: 'Settings',
    logout: 'Logout',
    
    // Auth
    login: 'Login',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    welcomeBack: 'Welcome Back',
    loginDescription: 'Enter your credentials to access your account',
    invalidCredentials: 'Invalid email or password',
    
    // Dashboard
    totalUsers: 'Total Users',
    totalEvents: 'Total Events',
    totalProducts: 'Total Products',
    totalServices: 'Total Services',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
    
    // Common
    search: 'Search...',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    noData: 'No data available',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    name: 'Name',
    description: 'Description',
    image: 'Image',
    title: 'Title',
    
    // Languages
    english: 'English',
    afaanOromo: 'Afaan Oromo',
    amharic: 'አማርኛ',
    language: 'Language',
  },
  om: {
    // Navigation
    dashboard: 'Daashboordii',
    home: 'Mana',
    about: "Waa'ee",
    works: 'Hojii',
    festivals: 'Ayyaanota',
    galleries: 'Gaaleerii',
    events: 'Taateewwan',
    services: 'Tajaajila',
    contact: 'Quunnamtii',
    products: 'Oomisha',
    talents: 'Dandeettii',
    users: 'Fayyadamtoota',
    settings: 'Qindaa\'ina',
    logout: "Ba'i",
    
    // Auth
    login: 'Seeni',
    email: 'Imeelii',
    password: 'Jecha iccitii',
    signIn: 'Seeni',
    welcomeBack: 'Baga Nagaan Dhufte',
    loginDescription: 'Akkaawuntii kee seenuuf odeeffannoo kee galchi',
    invalidCredentials: 'Imeelii ykn jecha iccitii dogoggora',
    
    // Dashboard
    totalUsers: 'Fayyadamtoota Waliigala',
    totalEvents: 'Taateewwan Waliigala',
    totalProducts: 'Oomisha Waliigala',
    totalServices: 'Tajaajila Waliigala',
    recentActivity: 'Sochii Dhiyoo',
    viewAll: 'Hunda Ilaali',
    
    // Common
    search: 'Barbaadi...',
    add: 'Dabali',
    edit: 'Gulaali',
    delete: 'Haqi',
    save: 'Olkaa\'i',
    cancel: 'Haqi',
    loading: 'Fe\'aa jira...',
    noData: 'Odeeffannoon hin jiru',
    actions: 'Gocha',
    status: 'Haala',
    date: 'Guyyaa',
    name: 'Maqaa',
    description: 'Ibsa',
    image: 'Suuraa',
    title: 'Mata duree',
    
    // Languages
    english: 'Afaan Ingilizii',
    afaanOromo: 'Afaan Oromoo',
    amharic: 'አማርኛ',
    language: 'Afaan',
  },
  am: {
    // Navigation
    dashboard: 'ዳሽቦርድ',
    home: 'መነሻ',
    about: 'ስለ',
    works: 'ስራዎች',
    festivals: 'በዓላት',
    galleries: 'ማዕከለ-ስዕላት',
    events: 'ክስተቶች',
    services: 'አገልግሎቶች',
    contact: 'እውቂያ',
    products: 'ምርቶች',
    talents: 'ተሰጥኦዎች',
    users: 'ተጠቃሚዎች',
    settings: 'ቅንብሮች',
    logout: 'ውጣ',
    
    // Auth
    login: 'ግባ',
    email: 'ኢሜይል',
    password: 'የይለፍ ቃል',
    signIn: 'ግባ',
    welcomeBack: 'እንኳን ደህና መጡ',
    loginDescription: 'መለያዎን ለመድረስ ማረጋገጫዎን ያስገቡ',
    invalidCredentials: 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል',
    
    // Dashboard
    totalUsers: 'ጠቅላላ ተጠቃሚዎች',
    totalEvents: 'ጠቅላላ ክስተቶች',
    totalProducts: 'ጠቅላላ ምርቶች',
    totalServices: 'ጠቅላላ አገልግሎቶች',
    recentActivity: 'የቅርብ ጊዜ እንቅስቃሴ',
    viewAll: 'ሁሉንም ይመልከቱ',
    
    // Common
    search: 'ፈልግ...',
    add: 'ጨምር',
    edit: 'አርትዕ',
    delete: 'ሰርዝ',
    save: 'አስቀምጥ',
    cancel: 'ሰርዝ',
    loading: 'በመጫን ላይ...',
    noData: 'ምንም መረጃ የለም',
    actions: 'ድርጊቶች',
    status: 'ሁኔታ',
    date: 'ቀን',
    name: 'ስም',
    description: 'መግለጫ',
    image: 'ምስል',
    title: 'ርዕስ',
    
    // Languages
    english: 'English',
    afaanOromo: 'Afaan Oromoo',
    amharic: 'አማርኛ',
    language: 'ቋንቋ',
  },
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang];
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  om: 'Afaan Oromo',
  am: 'አማርኛ',
};
