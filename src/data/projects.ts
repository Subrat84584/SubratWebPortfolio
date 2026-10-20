export interface StoreLinks {
  googlePlay: string;
  appStore?: string;
}

export type HighlightIcon = 'users' | 'file' | 'languages' | 'shopping' | 'bell' | 'timer' | 'presets' | 'chart' | 'share' | 'audio' | 'business' | 'opportunities' | 'services' | 'advertising' | 'insights';

export interface ProjectScreenshot {
  src: string;
  title: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  icon: string;
  storeLinks: StoreLinks;
  description: string;
  note: { title: string; description: string; icon: 'care' | 'training' | 'business' };
  problemHeading: string;
  problem: string;
  solutionHeading: string;
  solution: string;
  tags: string[];
  tagsLabel: string;
  initialScreenshot: number;
  screenshots: ProjectScreenshot[];
  highlightsTitle: string;
  highlightsLabel: string;
  highlights: { icon: HighlightIcon; title: string; description: string; tag: string }[];
}

// Store content lives here; screenshots are local so the portfolio has no store API dependency.
export const kareSpecial: PortfolioProject = {
  id: 'karespecial',
  category: 'HEALTHCARE & WELLBEING',
  note: {
    title: 'Many needs. One connected ecosystem.',
    description: 'Screening, consultations, daily routines & sensory learning.',
    icon: 'care',
  },
  problemHeading: 'Care is complex. Coordination shouldn’t be.',
  solutionHeading: 'A shared space for every part of care.',
  tagsLabel: 'Project technologies',
  initialScreenshot: 3,
  highlightsTitle: 'Key technical achievements',
  highlightsLabel: 'ENGINEERING HIGHLIGHTS',
  highlights: [
    {
      icon: 'users',
      title: 'One platform. Three perspectives.',
      description: 'Built a multi-tenant role system for parents, doctors, and therapists, with customized dashboards and workflows.',
      tag: 'Role-based architecture',
    },
    {
      icon: 'file',
      title: 'Clinical scorecards, on device.',
      description: 'Implemented client-side PDF synthesis to generate clinical scorecards directly on the device.',
      tag: 'PDF generation',
    },
    {
      icon: 'languages',
      title: 'Care in a familiar language.',
      description: 'Integrated on-device Google ML Kit models for seamless local language translation.',
      tag: 'Google ML Kit',
    },
    {
      icon: 'shopping',
      title: 'Subscriptions and sensory essentials.',
      description: 'Integrated Razorpay checkout for recurring subscription plans and e-commerce orders.',
      tag: 'Razorpay',
    },
    {
      icon: 'bell',
      title: 'The right reminder, on time.',
      description: 'Deployed real-time appointment reminders and community updates via Firebase Cloud Messaging.',
      tag: 'Firebase Cloud Messaging',
    },
  ],
  name: 'KareSpecial',
  subtitle: 'All-in-One Autism Care & Digital Health Platform',
  icon: `${import.meta.env.BASE_URL}projects/karespecial/icon.webp`,
  storeLinks: {
    googlePlay: 'https://play.google.com/store/apps/details?id=com.karespecial.app&pcampaignid=web_share',
  },
  description:
    'Connecting parents, doctors, and therapists in one multilingual app — from specialized care to the small routines that make every day easier.',
  problem:
    'Autism Spectrum Disorder (ASD) therapy requires ongoing coordination across medical, educational, and sensory domains. Parents often struggle to coordinate therapists, manage daily transition routines, access localized diagnostic evaluations, and find curated learning aids.',
  solution:
    'KareSpecial brings all stakeholders into one unified ecosystem. It combines clinical-grade diagnostic screening (ISAA), specialized teleconsultations, interactive transition timers, soothing audio tools, and an e-commerce platform for sensory toys into an accessible, multilingual mobile application.',
  tags: ['Google ML Kit', 'Razorpay', 'Firebase Cloud Messaging', 'On-device PDF'],
  screenshots: [
    { file: 'screenshot-1.webp', title: 'Welcome to KareSpecial', alt: 'KareSpecial welcome screen with the app logo' },
    { file: 'screenshot-2.webp', title: 'Supporting every child’s progress', alt: 'KareSpecial onboarding introducing support for a child’s progress' },
    { file: 'screenshot-3.webp', title: 'A simple start to connected care', alt: 'KareSpecial sign-in screen with email and phone options' },
    { file: 'screenshot-4.webp', title: 'Everything parents need, together', alt: 'KareSpecial parent dashboard with care services and daily tools' },
    { file: 'screenshot-5.webp', title: 'Learning, one step at a time', alt: 'KareSpecial learning modules screen' },
    { file: 'screenshot-6.webp', title: 'Psychometric assessments', alt: 'KareSpecial psychometric assessment options' },
    { file: 'screenshot-7.webp', title: 'A little space for calm', alt: 'KareSpecial Calmness Corner with soothing audio tools' },
    { file: 'screenshot-8.webp', title: 'Appointments, organized', alt: 'KareSpecial appointment management screen' },
  ].map((screenshot) => ({
    ...screenshot,
    width: 720,
    height: 1280,
    src: `${import.meta.env.BASE_URL}projects/karespecial/${screenshot.file}`,
  })),
};

// Feature copy is based on the official store listings; implementation details are not inferred.
export const hitnMove: PortfolioProject = {
  id: 'hitnmove',
  name: 'HitnMove',
  category: 'BOXING & FITNESS',
  subtitle: 'Boxing Interval Timer & Training Companion',
  icon: `${import.meta.env.BASE_URL}projects/hitnmove/icon.webp`,
  storeLinks: {
    googlePlay: 'https://play.google.com/store/apps/details?id=com.hitnmove.hitnmoveapp&pcampaignid=web_share',
    appStore: 'https://apps.apple.com/us/app/hitnmove-app/id6760335531',
  },
  description:
    'A training companion for boxers, martial artists, and coaches. Set your rounds, follow the audio cues, and see your progress after every session.',
  note: {
    title: 'Your rounds. Your rhythm.',
    description: 'Boxing, MMA, heavy bag sessions & HIIT.',
    icon: 'training',
  },
  problemHeading: 'Keep your focus on the next round.',
  problem:
    'Training means balancing effort, recovery, and repetition. Watching the clock, resetting intervals, and keeping track of sessions can interrupt that focus.',
  solutionHeading: 'Structure for every training session.',
  solution:
    'HitnMove brings adjustable timers, saved presets, workout analytics, and shareable summaries together on Android and iOS. Audio cues guide each round while an always-on display keeps the timer visible.',
  tags: ['Android & iOS', 'Interval training', 'Workout analytics', 'Image & PDF sharing'],
  tagsLabel: 'App capabilities',
  initialScreenshot: 5,
  highlightsTitle: 'Built for the way you train',
  highlightsLabel: 'PRODUCT HIGHLIGHTS',
  highlights: [
    {
      icon: 'timer',
      title: 'Every interval, your way.',
      description: 'Adjust round length, recovery time, preparation, and the number of rounds.',
      tag: 'Custom timers',
    },
    {
      icon: 'presets',
      title: 'Save it. Start training.',
      description: 'Keep favorite timer setups as presets for boxing, MMA, or Tabata workouts.',
      tag: 'Quick presets',
    },
    {
      icon: 'chart',
      title: 'See the work add up.',
      description: 'Review completed sessions and training volume with workout charts and analytics.',
      tag: 'Progress tracking',
    },
    {
      icon: 'share',
      title: 'Share your session.',
      description: 'Export workout summaries as images or PDFs for coaches and friends.',
      tag: 'Workout summaries',
    },
    {
      icon: 'audio',
      title: 'Stay in the rhythm.',
      description: 'Background audio alerts mark your rounds while the display stays awake.',
      tag: 'Audio & always-on display',
    },
  ],
  screenshots: [
    { file: 'screenshot-1.webp', title: 'Step into HitnMove', alt: 'HitnMove launch screen with the boxing brand logo' },
    { file: 'screenshot-2.webp', title: 'Sign in and get moving', alt: 'HitnMove email sign-in screen' },
    { file: 'screenshot-3.webp', title: 'Your training starts here', alt: 'HitnMove training dashboard' },
    { file: 'screenshot-4.webp', title: 'Get ready for the next round', alt: 'HitnMove preparation countdown before a workout' },
    { file: 'screenshot-5.webp', title: 'Set your training rhythm', alt: 'HitnMove workout settings for rounds and intervals' },
    { file: 'screenshot-6.webp', title: 'Make every round count', alt: 'HitnMove live round timer with remaining time and round progress' },
    { file: 'screenshot-7.webp', title: 'See your session add up', alt: 'HitnMove workout results and training progress' },
  ].map((screenshot) => ({
    ...screenshot,
    width: 720,
    height: 1280,
    src: `${import.meta.env.BASE_URL}projects/hitnmove/${screenshot.file}`,
  })),
};

// Based on MAGAS's website and official app listings, without assuming its internal stack.
export const magas: PortfolioProject = {
  id: 'magas',
  name: 'MAGAS',
  category: 'BUSINESS & PROFESSIONAL SERVICES',
  subtitle: 'B2B Marketplace for Android & iOS',
  icon: `${import.meta.env.BASE_URL}projects/magas/icon.webp`,
  storeLinks: {
    googlePlay: 'https://play.google.com/store/apps/details?id=com.magas.app&pcampaignid=web_share',
    appStore: 'https://apps.apple.com/us/app/magas-super-app/id6790666078',
  },
  description:
    'I developed the Android and iOS apps for MAGAS, bringing business discovery, professional profiles, and service listings to mobile users across India and the GCC.',
  note: {
    title: 'My role: Android & iOS app development.',
    description: 'Built the mobile experience for the MAGAS business ecosystem.',
    icon: 'business',
  },
  problemHeading: 'The right connections can be hard to find.',
  problem:
    'Businesses and independent professionals often manage promotion, service discovery, and growth opportunities across separate channels. Finding relevant providers and reaching the right audience takes time, especially across regions and industries.',
  solutionHeading: 'A business ecosystem, built for mobile.',
  solution:
    'The MAGAS mobile apps bring business and professional profiles, advertising, opportunities, classifieds, and industry content together on Android and iOS. Users can discover service providers and connect around business needs from their phones.',
  tags: ['Android & iOS', 'Mobile app development', 'B2B marketplace', 'Business services'],
  tagsLabel: 'Mobile app capabilities',
  initialScreenshot: 4,
  highlightsTitle: 'The MAGAS mobile experience',
  highlightsLabel: 'MOBILE APP HIGHLIGHTS',
  highlights: [
    {
      icon: 'business',
      title: 'Discover businesses and expertise.',
      description: 'Explore SME listings and professional profiles across industries, service categories, and locations.',
      tag: 'Business & professional directories',
    },
    {
      icon: 'opportunities',
      title: 'Find the next opportunity.',
      description: 'Browse business opportunities, job posts, and classifieds for specific business needs.',
      tag: 'Opportunities & classifieds',
    },
    {
      icon: 'services',
      title: 'Source the support you need.',
      description: 'Discover service packages covering advisory, corporate services, capital, and technology.',
      tag: 'Services marketplace',
    },
    {
      icon: 'advertising',
      title: 'Make your offering visible.',
      description: 'Promote products and services through advertising listings and receive enquiries in a personal dashboard.',
      tag: 'Advertising & lead generation',
    },
    {
      icon: 'insights',
      title: 'Share knowledge and connect.',
      description: 'Explore business blogs, whitepapers, videos, and a network of service partners.',
      tag: 'Insights & professional network',
    },
  ],
  screenshots: [
    { file: 'screenshot-1.webp', title: 'Meet the MAGAS ecosystem', alt: 'MAGAS business ecosystem onboarding screen' },
    { file: 'screenshot-2.webp', title: 'Your gateway to MAGAS', alt: 'MAGAS sign-in screen with email and Google options' },
    { file: 'screenshot-3.webp', title: 'Find the right business services', alt: 'MAGAS premium services catalogue' },
    { file: 'screenshot-4.webp', title: 'Your professional presence', alt: 'MAGAS professional profile dashboard' },
    { file: 'screenshot-5.webp', title: 'A marketplace for business', alt: 'MAGAS business marketplace with listings and opportunities' },
    { file: 'screenshot-6.webp', title: 'Promote your business', alt: 'MAGAS advertising plan selection screen' },
    { file: 'screenshot-7.webp', title: 'Choose your membership', alt: 'MAGAS membership plans and discounts' },
  ].map((screenshot) => ({
    ...screenshot,
    width: 718,
    height: 1280,
    src: `${import.meta.env.BASE_URL}projects/magas/${screenshot.file}`,
  })),
};

export const mediTwin: PortfolioProject = {
  id: 'meditwin',
  name: 'MediTwin',
  category: 'DIGITAL HEALTHCARE & TELEMEDICINE',
  subtitle: 'Doctor Appointments, Diagnostics & Health Records',
  icon: `${import.meta.env.BASE_URL}projects/meditwin/icon.webp`,
  storeLinks: {
    googlePlay: 'https://play.google.com/store/apps/details?id=com.carencurehealth.meditwin&pcampaignid=web_share',
  },
  description:
    'MediTwin connects patients with certified doctors, accredited diagnostic labs, and comprehensive health management — from teleconsultations and pathology tests to digital medical records.',
  note: {
    title: 'Consultations. Diagnostics. Records.',
    description: 'Clinic visits, teleconsultations, home sample collection & secure records.',
    icon: 'care',
  },
  problemHeading: 'Healthcare access is fragmented. Finding care shouldn’t be.',
  problem:
    'Patients often navigate separate channels for doctor consultations, diagnostic tests, lab report tracking, and prescription management. Booking appointments, scheduling home sample collection, and securely storing family health history creates friction.',
  solutionHeading: 'A complete clinical companion, right from your phone.',
  solution:
    'MediTwin brings verified doctor consultations (in-clinic & teleconsult), comprehensive pathology & eye diagnostics with home sample collection, digital health record management, and secure payments into one unified Flutter mobile platform.',
  tags: ['Flutter & Dart', 'Teleconsultation', 'Diagnostic Booking', 'Digital Health Records', 'Razorpay & UPI'],
  tagsLabel: 'App capabilities',
  initialScreenshot: 0,
  highlightsTitle: 'Healthcare engineering highlights',
  highlightsLabel: 'CLINICAL APP HIGHLIGHTS',
  highlights: [
    {
      icon: 'users',
      title: 'Doctor Consultations Made Easy',
      description: 'Browse verified doctors across specialties, compare availability, and book instant clinic visits or teleconsultations.',
      tag: 'Doctor booking & video consult',
    },
    {
      icon: 'file',
      title: 'Diagnostics & Eye Tests',
      description: 'Schedule routine pathology tests, full body checkups, and eye diagnostics with home sample collection or clinic visits.',
      tag: 'Lab test scheduling',
    },
    {
      icon: 'shopping',
      title: 'Secure Digital Health Records',
      description: 'Safely access and download digital test reports, doctor prescriptions, and medical history in one encrypted location.',
      tag: 'EHR & report vault',
    },
    {
      icon: 'insights',
      title: 'Transparent Pricing & Payments',
      description: 'Integrated secure online payments via UPI, net banking, and cards along with in-clinic pay options.',
      tag: 'UPI & payment gateway',
    },
    {
      icon: 'bell',
      title: 'Real-Time Appointment Updates',
      description: 'Automated slot confirmation, timely appointment reminders, and report readiness alerts powered by Firebase.',
      tag: 'Real-time notifications',
    },
  ],
  screenshots: [
    { file: 'screenshot-1.webp', title: 'Consult Certified Doctors', alt: 'MediTwin doctor consultation and specialty selection screen' },
    { file: 'screenshot-2.webp', title: 'Book Diagnostic & Eye Tests', alt: 'MediTwin diagnostic lab tests and full body checkup booking screen' },
    { file: 'screenshot-3.webp', title: 'Home Sample Collection', alt: 'MediTwin home sample collection scheduling screen' },
    { file: 'screenshot-4.webp', title: 'Digital Health Records', alt: 'MediTwin encrypted digital health records and test reports screen' },
    { file: 'screenshot-5.webp', title: 'Doctor Appointments & Slots', alt: 'MediTwin real-time appointment booking and time slot selector' },
    { file: 'screenshot-6.webp', title: 'Prescriptions & Reports', alt: 'MediTwin downloadable test reports and medical prescriptions view' },
    { file: 'screenshot-7.webp', title: 'Flexible & Secure Payments', alt: 'MediTwin transparent payment options with UPI and card support' },
    { file: 'screenshot-8.webp', title: 'Family Healthcare Management', alt: 'MediTwin family health profile and records management screen' },
  ].map((screenshot) => ({
    ...screenshot,
    width: 1080,
    height: 1920,
    src: `${import.meta.env.BASE_URL}projects/meditwin/${screenshot.file}`,
  })),
};

export const projects: PortfolioProject[] = [hitnMove, kareSpecial, mediTwin, magas];
