import fs from "fs";
import path from "path";

export interface Project {
  num: string;
  title: string;
  category: string;
  year: string;
  date?: string;
  status?: "Published" | "Draft";
  description: string;
  fullDescription: string;
  tags: string[];
  images: string[];
  githubUrl?: string;
  demoUrl?: string;
  moreUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  logo: string;
}

export interface ResearchItem {
  citation: string;
  title: string;
  badge: string;
  badgeType: "award" | "ongoing";
  summary: string;
  href: string;
}

export interface AwardItem {
  id: string;
  title: string;
  year: string;
  category: string;
}

export interface HeroConfig {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineAccent: string;
  description1: string;
  description2: string;
  ctaText: string;
  statusBadgeText: string;
  backgroundImage: string;
}

export interface AboutConfig {
  fullName: string;
  titleBadge: string;
  profileImage: string;
  subtitleBio: string;
  narrativeParagraph1: string;
  narrativeParagraph2: string;
  certifications: string[];
  signatureQuote: string;
  yearsExperience: string;
  productionApps: string;
  arxivPapers: string;
  awardNotice: string;
}

export interface TechCategory {
  title: string;
  tools: string[];
}

export interface ApproachPillar {
  title: string;
  description: string;
}

export interface ApproachAndToolsConfig {
  pillars: ApproachPillar[];
  techCategories: TechCategory[];
}

export interface ContactConfig {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  availabilityStatus: string;
  footerText: string;
}

export interface PortfolioData {
  hero: HeroConfig;
  about: AboutConfig;
  projects: Project[];
  experiences: ExperienceItem[];
  research: ResearchItem[];
  awards: AwardItem[];
  approachAndTools: ApproachAndToolsConfig;
  contact: ContactConfig;
  lastUpdated?: string;
}

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio-data.json");

export function getPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading portfolio data file:", error);
  }

  return {
    hero: {
      eyebrow: "SOFTWARE ENGINEER & RESEARCHER",
      headlineLine1: "I TURN COMPLEX",
      headlineLine2: "PROBLEMS INTO",
      headlineAccent: "SOLUTIONS.",
      description1: "I build systems, tools and intelligent applications that create real impact.",
      description2: "Currently open to meaningful opportunities.",
      ctaText: "VIEW MY WORK",
      statusBadgeText: "STATUS: Building",
      backgroundImage: "/images/84c0cdca-1d5e-4613-b846-504afd8f5221.webp",
    },
    about: {
      fullName: "Hasinthaka Piyumal",
      titleBadge: "Software Engineer & Final-Year Undergraduate",
      profileImage: "/images/about-portrait.jpg",
      subtitleBio: "Final-year Software Engineering student at University of Kelaniya. Specializing in distributed backend microservices, applied machine learning pipelines, and full-stack web/mobile application development.",
      narrativeParagraph1: "With 3+ years of freelance experience delivering web and mobile apps alongside enterprise engineering experience at WSO2 and Zenlise, I build software that balances technical rigor with real-world product reliability.",
      narrativeParagraph2: "My academic research in AI design pattern prevalence won the Best Paper Award at PATTERNS 2026 and is published on arXiv.",
      certifications: ["IBM Machine Learning Certified", "Duke University Explainable AI (XAI)"],
      signatureQuote: "Let's build something impactful.",
      yearsExperience: "3+",
      productionApps: "4+",
      arxivPapers: "1",
      awardNotice: "PATTERNS 2026",
    },
    projects: [],
    experiences: [],
    research: [],
    awards: [],
    approachAndTools: {
      pillars: [
        { title: "Modular Microservices", description: "Designing decoupled, event-driven architectures with Go, Python & Redis queues." },
        { title: "High-Performance Backends", description: "Optimizing REST APIs, Spring Boot services, and database queries for low latency." },
        { title: "Cross-Platform Mobile", description: "Engineering native-like Flutter mobile apps for iOS and Android." },
        { title: "Clean Code & Testing", description: "Enforcing test coverage, CI/CD pipelines, and rigorous software architecture." }
      ],
      techCategories: [
        { title: "Languages", tools: ["Python", "Go", "Java", "TypeScript", "Dart", "Ballerina", "SQL"] },
        { title: "Frameworks & Web", tools: ["Next.js", "React", "Spring Boot", "FastAPI", "Flutter", "Tailwind CSS"] },
        { title: "Cloud & Databases", tools: ["PostgreSQL", "Redis", "Docker", "Azure", "Firebase", "Prometheus"] },
        { title: "AI & Data Tools", tools: ["TensorFlow Lite", "NetworkX", "Scikit-Learn", "Vector DB (RAG)"] }
      ]
    },
    contact: {
      email: "hasinthaka@example.com",
      phone: "+94 77 123 4567",
      github: "https://github.com/HasinthakaPiyumal",
      linkedin: "https://linkedin.com/in/HasinthakaPiyumal",
      twitter: "https://twitter.com/HasinthakaPiyumal",
      availabilityStatus: "Open to Opportunities",
      footerText: "© 2026 Hasinthaka Piyumal. All rights reserved.",
    },
  };
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    const updatedData = {
      ...data,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " by Hasinthaka",
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving portfolio data file:", error);
    return false;
  }
}
