export const JobDetails = [
  // {
  //   icon: '', // FontAwesome camelCased icon name to be displayed in the main header
  //   title: '', // string used as main header for job item
  //   company: '', // string used to display the company name in the main header
  //   description: '', // string used as sub header for job item
  //   start: '', // string used to display the job start date
  //   end: '', // string used to display the job end date
  //   tasks: [], // array of strings used to generate a bullet point list describing the job experience
  //   tech: [] // array of strings used to populate the list of pills shown on the job item. Tech chip colouring is taken from techcolours.js
  // },
  {
    icon: 'faCoins',
    title: 'Senior Frontend Developer',
    company: 'The Standard',
    description: 'DeFi Lending Protocol',
    start: 'Aug 2023',
    end: 'Current',
    tasks: [
      'Architected production React dApp from MVP to $2 million TVL platform',
      'Integrated with Arbitrum smart contracts via wagmi/ethers',
      'Built white-label React dApp enabling partner deployments with custom theming and feature toggles',
      'Optimised frontend queries with local caching of specific data to reduce TheGraph and Alchemy usage by 45%',
      'Upgraded UI/UX of multi-step staking process to reduce manual inputs needed from users',
    ],
    tech: [
      'Web3',
      'Ethereum',
      'DApp',
      'React',
      'Wagmi',
      'Zustand',
      'Tailwind',
    ]
  },
  {
    icon: 'faVault',
    title: 'Frontend Developer',
    company: 'Vaultoro',
    description: 'Crypto & Precious Metal Exchange Platform',
    start: 'Jun 2020',
    end: 'Aug 2023',
    tasks: [
      'Launched streamlined trading interface, replacing a multi-step process, that resolved our most common support complaint',
      'Developed and deployed iOS portfolio tracking app (React Native/Expo)',
      'Delivered company-wide UI rebrand with 30+ reusable React components, replacing inconsistent UI implementations',
      'Built secondary React dashboard for automated savings product processing six-figure monthly EUR volume',
      'Worked with analytics & backend teams to integrate a custom in-house analytics product into our trading dashboards',
    ],
    tech: [
      'React',
      'Redux',
      'React Native',
      'Expo',
      'REST APIs',
      'SCSS'
    ]
  },
  {
    icon: 'faUtensils',
    title: 'Frontend Developer',
    company: 'Perched',
    description: 'Online Marketplace for Popup Kitchens',
    start: 'Jan 2019',
    end: 'Dec 2019',
    tasks: [
      'Delivered 3 React applications; marketing site, customer portal and admin dashboard, supporting 100+ chefs & restaurants',
      'Implemented real-time two way booking system with live availability updates',
      'Built WebSocket-powered messaging system connecting chefs and kitchens',
      'Optimized SEO implementation achieving 40% increase in organic traffic within 3 months',
    ],
    tech: [
      'React',
      'Redux',
      'REST APIs',
      'HTML',
      'SCSS'
    ]
  },
  {
    icon: 'faStore',
    title: 'Frontend Developer',
    company: 'MIMO',
    description: 'WiFi Splash Page & Marketing Platform',
    start: 'Jun 2017',
    end: 'Jul 2018',
    tasks: [
      'Helped implement GDPR compliant features',
      'Helped update and manage AngularJS web app, following Google\'s Material specification',
    ],
    tech: [
      'AngularJS',
      'HTML',
      'SCSS'
    ]
  },
  {
    icon: 'faWifi',
    title: 'Support Chief',
    company: 'Cucumber Tony [TechStars]',
    description: 'Cloud-based WiFi Management Platform',
    start: 'Oct 2015',
    end: 'Nov 2019',
    tasks: [
      'Managed support center and remotely diagnosed problems with WiFi access points & custom firmware installations',
      'Evolved from support to engineering role, ultimately maintaining AngularJS platform managing 10,000+ access points',
      'Implemented GDPR compliance features across platform, ensuring regulatory compliance for EU customers',
      'Designed and deployed responsive marketing site increasing trial signups by 20%',
    ],
    tech: [
      'AngularJS',
      'HTML',
      'SCSS'
    ]
  },
];

export const SkillYears = [
  6, // React         2019
  9, // Javascript    2016
  10,// HTML/CSS      2015
  2, // Web3          2023
  1, // React Native  2022-2023
];

export const RoleYears = [
  2, // Web3          2023
  9, // Frontend      2016
  1, // App           2022-2023
];
