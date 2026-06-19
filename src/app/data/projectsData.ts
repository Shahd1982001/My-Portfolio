export interface Project {
  id: string;
  title: string;
  description: string;
  gradient: string;
  category: string;
  tools?: string[];
  prototypeLink?: string;
  designFileLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  // Optional links for website / app projects
  websiteLink?: string; // use for live website URLs
  // appLink?: string; // use for app store or direct app page URLs
  // apkLink?: string; // use for APK download links
  details?: {
    en?: string;
    ar?: string;
  };
  gallery?: string[];
}

export const projectsData: Project[] = [
  // Example placeholders for future website/app entries:
  {
    id: "lmapi-libya.netlify",
    title: "LMAPI",
    description: "A live website project built for showcase.",
    category: "Website",
    tools: ["Html", "Css", "JavaScript"],
    websiteLink: "https://lmapi-libya.netlify.app/",
    gradient: "from-sky-400 to-indigo-500",
    details: {
      en: "Discover the rich heritage of Libyan traditional medicine. Explore a comprehensive digital database of medicinal and aromatic plants found in Libya, their uses, properties, and cultural significance.",
      ar: "اكتشف التراث الغني للطب التقليدي الليبي. استعرض قاعدة بيانات رقمية شاملة للنباتات الطبية والعطرية الموجودة في ليبيا، مع معلومات عن استخداماتها وخصائصها وأهميتها الثقافية.",
    },
  },


  //*********************************************************************/
  // {
  //   id: "my-flutter-app",
  //   title: "My Flutter App",
  //   description: "A Flutter application demo with APK download.",
  //   category: "Application",
  //   tools: ["Flutter"],
  //   appLink: "https://example.com/app-page",
  //   apkLink: "https://example.com/my-app.apk",
  //   gradient: "from-teal-400 to-cyan-500",
  //   details: {
  //     en: "A demo app listed as a project with a download link.",
  //     ar: "تطبيق تجريبي مع رابط تنزيل APK.",
  //   },
  // },


  //*********************************************************************/
  {
    id: "masgi-app",
    title: "Masgi App",
    description: "A beautifully crafted traditional recipe digital library.",
    category: "UI/UX Design",
    tools: ["Figma"],
    prototypeLink: "https://www.figma.com/proto/tsDL4qx1sMHKzXpL9ZX0oM/msagy?node-id=1-1531&t=dfpjWvrMF0Bz6BPP-1",
    designFileLink: "https://www.figma.com/design/tsDL4qx1sMHKzXpL9ZX0oM/msagy?node-id=0-1&t=jGM3UXtncCWrc3ft-1",
    imageSrc: "/images/cover.png",
    imageAlt: "Masgi app interface preview",
    gradient: "from-purple-400 to-pink-400",
    details: {
      en: "A unified digital hub for Libyan and international recipes. Masgi eliminates the hassle of scattered sources, offering a seamless experience that blends authentic heritage with global culinary diversity.",
      ar: "مرجع رقمي موحد يجمع وصفات المطبخ الليبي والعالمي. يهدف 'مسقي' إلى إنهاء تشتت الوصفات، ليقدم رحلة طهي سهلة وممتعة تجمع بين أصالة التراث وتنوع النكهات."
    },
    gallery: [
      "/images/UX screens.png",
      "/images/UX screens 2.png"
    ],
  },
  {
    id: "neo-wallet",
    title: "Neo Wallet",
    description: "A sleek and modern financial/crypto wallet interface.",
    category: "UI/UX Design",
    tools: ["Figma"],
    prototypeLink: "https://www.figma.com/proto/0eoeGyge1eSqp7nxq598cM/neo-wallet?node-id=115-3&t=jAtuUf15moMerlEd-1",
    designFileLink: "https://www.figma.com/design/0eoeGyge1eSqp7nxq598cM/neo-wallet?node-id=115-3&t=IL32i1KSR6b2INFL-1",
    imageSrc: "/images/neoWallet cover.png",
    imageAlt: "Neo Wallet app interface preview",
    gradient: "from-lavender-400 to-purple-500",
    details: {
       en: "A smart finance wallet that merges an intuitive user interface with robust security, transforming complex daily financial management into a clear, reliable, and effortless experience.A stylized UI/UX concept focused on digital wellness and premium content organization.",
      ar: "محفظة مالية ذكية تدمج بين واجهة مستخدم بديهية ومعايير أمان عالية، لتبسيط عملياتك المالية اليومية وجعلها أكثر وضوحاً وموثوقية.",
       },
       gallery: [
      "/images/neowallet screens.png",
      "/images/neowallet screens 2.png"
    ],
},
  {
    id: "aura",
    title: "AURA",
    description: "An elegant UI/UX design case study.",
    category: "UI/UX Design",
    tools: ["Figma"],
    prototypeLink: "https://www.figma.com/proto/SnMw6CKtZ6NYpwCZrxou1b/Aura?node-id=0-1&t=1FejJllJKoeB2G2R-1",
    designFileLink: "https://www.figma.com/design/SnMw6CKtZ6NYpwCZrxou1b/Aura?node-id=167-2&t=Smqf0X9Vn1yeNJWY-1",
    imageSrc: "/images/aura cover.png",
    imageAlt: "Aura app interface preview",
    gradient: "from-purple-500 to-indigo-500",
    details: {
       en: "A premium fragrance shopping application that combines an extensive scent library with an AI-powered matching engine, analyzing your preferences to curate the perfect fragrance for your unique personality.",
      ar: "تطبيق تسوق للعطور الفاخرة يدمج بين تصفح المكتبة الغنية وميزة 'أوجد راحتك'؛  حيث يحلل الذكاء الاصطناعي تفضيلاتك ليقترح عليك العطور التي تتناغم مع شخصيتك بدقة ",
        },
    gallery: [
      "/images/aura UI screens.png",
      "/images/aura UI screens 2.png"
    ],
  },
  // {
  //   id: "roboleg-app",
  //   title: "Roboleg App",
  //   description: "An innovative mobile application interface integrated with assistive voice-controlled tech.",
  //   category: "UI/UX Design",
  //   tools: ["Figma"],
  //   prototypeLink: "https://www.example.com/roboleg-prototype",
  //   designFileLink: "https://www.figma.com/file/roboleg-app",
  //   gradient: "from-pink-400 to-purple-400"
  // },


   //*********************************************************************/
  {
    id: "brand-logo-set",
    title: "Lipstick Design",
    description: "A beautifully crafted lipstick product design artwork.",
    category: "Graphic Design",
    tools: ["Photoshop"],
    gradient: "from-emerald-400 to-cyan-500",
    imageSrc: "/images/lipstick add.jpg",
    imageAlt: "Lipstick design artwork",
    details: {
      en: "A refined product design composition focused on color, material, and premium brand presentation.",
      ar: "تصميم منتج راقي يركز على الألوان والمواد والعرض المتميز للعلامة التجارية.",
    },
  },
  {
    id: "event-poster",
    title: "Perfume Design",
    description: "An elegant perfume bottle design artwork.",
    category: "Graphic Design",
    tools: ["Photoshop"],
    gradient: "from-orange-400 to-rose-500",
    imageSrc: "/images/perfume add.jpg",
    imageAlt: "Perfume design artwork",
    details: {
      en: "A luxurious perfume concept that highlights fragrance bottle styling and rich typography.",
      ar: "تصميم عبوة عطر فاخر يبرز شكل الزجاجة والطباعة الغنية.",
    },
  }
];
