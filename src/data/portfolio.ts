export type Project = {
  name: string; category: string; description: string; technologies: string[];
  featured?: boolean; placeholder?: boolean; features?: string[];
  liveUrl?: string; githubUrl?: string; image?: string; imageReady?: boolean;
};
const github = "https://github.com/nzerneste250";
export const portfolio = {
  name: "NZAYISENGA Erneste",
  title: "Software Developer | Graphic Designer | Tech Entrepreneur",
  location: "Rwanda",
  heroIdentity: "SOFTWARE DEVELOPER • GRAPHIC DESIGNER • TECH ENTREPRENEUR",
  heroEyebrow: "DEVELOPER • DESIGNER • FOUNDER",
  founderLine: "Founder of IZO SERVICE QUICKY",
  description: "Portfolio of NZAYISENGA Erneste, a Rwandan Software Developer, Graphic Designer, Tech Entrepreneur, and founder of IZO SERVICE QUICKY.",
  intro: "I build practical digital products, modern web applications, and creative visual solutions that solve real-world problems.",
  about: [
    "I'm Erneste, a Rwandan Software Engineering student, software developer, graphic designer, and technology entrepreneur. I'm currently completing my final year in Software Engineering at INES Ruhengeri.",
    "I build practical digital products and combine software, visual design, and business thinking to create useful solutions for real users.",
    "I'm also the founder of IZO SERVICE QUICKY, where I provide online service assistance, graphic design and branding, and website development."
  ],
  // LinkedIn and the deployment domain can be added when available.
  email: "Nzerneste250@gmail.com",
  phone: "+250 789 245 524",
  linkedin: "",
  github,
  socials: [
    { name: "Instagram", icon: "instagram", handle: "@nzerneste250", url: "https://www.instagram.com/nzerneste250/" },
    { name: "X", icon: "x", handle: "@nz_erneste250", url: "https://x.com/nz_erneste250" },
    { name: "Facebook", icon: "facebook", handle: "nzerneste250", url: "https://www.facebook.com/nzerneste250" },
    { name: "GitHub", icon: "github", handle: "nzerneste250", url: github }
  ],
  siteUrl: "",
  profileImage: "/images/profile.webp",
  profileImageReady: true,
  cvUrl: "/Erneste_Nzayisenga_CV.pdf",
  company: {
    name: "IZO SERVICE QUICKY",
    label: "FOUNDER • DIGITAL SERVICES • CREATIVE TECHNOLOGY",
    heading: "Digital services. Creative solutions. Built for everyday needs.",
    description: "IZO SERVICE QUICKY is a digital service and creative technology business focused on making online services, visual communication, and web solutions more accessible to individuals and businesses.",
    services: [
      { name: "Online Service Assistance", icon: "globe", description: "Assistance with online public and administrative services.", items: ["Irembo services", "RRA online services", "RDB online services", "RURA online services", "Other administrative and digital services"] },
      { name: "Graphic Design & Branding", icon: "pen", description: "Visual communication that gives your business a clear, consistent identity.", items: ["Logo Design", "Visual Identity", "Flyers", "Posters", "Business Cards", "Social Media Graphics", "Corporate Branding", "Promotional Materials"] },
      { name: "Website Development", icon: "code", description: "Practical websites and web applications, from setup to ongoing maintenance.", items: ["Business Websites", "Portfolio Websites", "Responsive Websites", "Web Applications", "Domain Setup", "Hosting Setup", "Deployment", "Maintenance"] }
    ]
  },
  education: [
    { institution: "INES Ruhengeri", course: "Software Engineering", status: "Final-year student", date: "Current", location: "Rwanda" },
    { institution: "Hanika Anglican Integrated Polytechnic (HAIP)", course: "Advanced Level — Software Development", status: "Advanced Level", date: "2019–2022", location: "Rwanda" }
  ],
  languages: [{ name: "Kinyarwanda", level: "Mother tongue" }, { name: "English", level: "Good" }, { name: "French", level: "Fair" }],
  skills: [
    { name: "Frontend", icon: "code", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Responsive Web Design"] },
    { name: "Backend", icon: "server", items: ["Node.js", "Express.js", "REST APIs"] },
    { name: "Database", icon: "database", items: ["MySQL"] },
    { name: "Deployment & Server", icon: "globe", items: ["Ubuntu", "Nginx", "PM2", "Vercel", "VPS deployment"] },
    { name: "Tools", icon: "terminal", items: ["Git", "GitHub", "VS Code", "npm", "Linux"] },
    { name: "Design", icon: "pen", items: ["Graphic Design", "UI/UX Design", "Adobe Photoshop", "Branding", "Social Media Design"] },
    { name: "Computer & IT", icon: "server", items: ["Hardware maintenance", "Software maintenance", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Online research"] },
    { name: "Digital Media", icon: "layout", items: ["Photography", "Video production", "Filmmaking", "Electronic device maintenance"] }
  ],
  projects: [
    {
      name: "ikizame.rw", category: "FULL-STACK WEB APPLICATION", featured: true, placeholder: false,
      description: "An online provisional driving exam platform designed to help users practice and prepare for Rwanda's provisional driving licence examinations using phones and computers.",
      technologies: ["Node.js", "Express", "MySQL", "JavaScript", "Nginx", "PM2", "Ubuntu VPS", "PayPack integration"],
      features: ["Online exam practice with a user-friendly, responsive interface", "MTN MoMo and Airtel Money payment support", "PayPack integration and payment verification", "Secure backend and production VPS deployment", "Mobile-friendly practice on phones and computers"],
      liveUrl: "https://ikizame.rw/", githubUrl: "https://github.com/nzerneste250/ikizame-app", image: "/images/projects/ikizame.png", imageReady: true
    },
    { name: "Agriculture Harvest Prediction App", category: "MOBILE DEVELOPMENT · IN DEVELOPMENT", description: "A mobile-based agriculture project exploring harvest prediction using agricultural and weather-related information. This work is still in development.", technologies: ["Mobile application", "Agriculture data", "Weather information"], placeholder: false, featured: false }
  ] as Project[],
  services: [
    { name: "Web Development", icon: "code", description: "Modern responsive websites and web applications that feel natural on every screen." },
    { name: "Software Development", icon: "terminal", description: "Custom digital solutions designed around real business requirements." },
    { name: "UI/UX Design", icon: "layout", description: "Clean and usable digital interfaces, with a clear path from idea to interaction." },
    { name: "Graphic Design", icon: "pen", description: "Logos, flyers, posters, social media graphics, and branding materials with a consistent visual identity." },
    { name: "Website Deployment", icon: "globe", description: "Deployment and configuration using VPS, Ubuntu, Nginx, PM2, and Vercel." }
  ],
  experience: [{ role: "Developer", project: "ikizame.rw", date: "", description: "Designed, developed, deployed, and maintained the ikizame.rw online provisional driving exam platform.", responsibilities: ["Frontend and backend development", "Database and payment integration", "Deployment and server configuration", "Testing, maintenance, and security improvements"] }],
  certifications: [] as { name: string; issuer: string; date: string; url?: string }[]
};
export const navigation = ["Home", "About", "IZO SERVICE QUICKY", "Skills", "Projects", "Services", "Experience", "Education", "Contact"];
export const sectionHref = (name: string) => name === "IZO SERVICE QUICKY" ? "#entrepreneurship" : `#${name.toLowerCase()}`;
