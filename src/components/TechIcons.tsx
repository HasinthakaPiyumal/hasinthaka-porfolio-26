"use client";

import React from "react";

export interface TechItem {
  id: string;
  name: string;
  category: "Languages" | "Frameworks & Web" | "Cloud & Databases" | "AI & Data Tools" | "DevOps & Tools";
  color: string;
  icon: React.FC<{ className?: string }>;
}

export const PREDEFINED_TECH_LIST: TechItem[] = [
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    color: "#3178C6",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.95 15.68c.37.24.84.4 1.34.4.67 0 1.05-.33 1.05-.8 0-.47-.35-.72-1.15-1.02l-.52-.2c-1.3-.47-1.97-1.14-1.97-2.18 0-1.46 1.2-2.38 3.12-2.38.74 0 1.36.14 1.83.37l-.42 1.34c-.37-.18-.85-.31-1.38-.31-.66 0-.98.3-.98.71 0 .43.34.66 1.13.95l.52.2c1.37.5 2.02 1.18 2.02 2.27 0 1.54-1.22 2.47-3.28 2.47-.9 0-1.57-.18-2.07-.44l.43-1.38zM6 9.68h4.51v1.38H8.38v5.44H6.77v-5.44H6V9.68z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Languages",
    color: "#F7DF1E",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M11.64 16.5c.34.58.79.97 1.48.97.63 0 1.02-.25 1.02-.62 0-.44-.35-.61-1.05-.91l-.36-.15c-1.05-.44-1.74-1.01-1.74-2.2 0-1.27.97-2.14 2.5-2.14.97 0 1.67.31 2.16 1.12l-1.09.7c-.27-.47-.63-.67-1.07-.67-.44 0-.75.22-.75.53 0 .37.28.53.89.79l.36.16c1.23.53 1.94 1.08 1.94 2.3 0 1.46-1.15 2.28-2.73 2.28-1.28 0-2.12-.51-2.6-1.46l1.08-.7zm-5.14-.15c.23.4.5.7.9.89.37.19.85.3 1.43.3.62 0 1.1-.19 1.44-.55.33-.36.5-.86.5-1.63v-3.79h1.36v3.83c0 1.16-.32 1.98-.95 2.5-.63.53-1.48.79-2.55.79-1.02 0-1.84-.25-2.43-.87l.3-1.47z" fill="#000000" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    category: "Languages",
    color: "#3776AB",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M11.87 2c-5.24 0-4.9 2.27-4.9 2.27l.01 2.35h4.98v.7H5.01S2 7.02 2 12.31c0 5.28 2.62 5.09 2.62 5.09h1.57v-2.22s-.08-2.65 2.61-2.65h4.48s2.51.04 2.51-2.44V4.54S16.1 2 11.87 2zm-2.7 1.54a.92.92 0 1 1 0 1.84.92.92 0 0 1 0-1.84z" fill="#3776AB" />
        <path d="M12.13 22c5.24 0 4.9-2.27 4.9-2.27l-.01-2.35h-4.98v-.7h6.95s3.01.3 3.01-4.99c0-5.28-2.62-5.09-2.62-5.09h-1.57v2.22s.08 2.65-2.61 2.65h-4.48s-2.51-.04-2.51 2.44v5.54S7.9 22 12.13 22zm2.7-1.54a.92.92 0 1 1 0-1.84.92.92 0 0 1 0 1.84z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    id: "golang",
    name: "Go (Golang)",
    category: "Languages",
    color: "#00ADD8",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00ADD8" />
        <path d="M7.42 10.3c.4-.1.82-.16 1.25-.16 2.3 0 3.7 1.3 3.7 3.5 0 2.2-1.5 3.7-3.9 3.7-2.3 0-3.6-1.4-3.6-3.4 0-1.4.7-2.6 1.9-3.2l.7.5c-.8.4-1.3 1.2-1.3 2.1 0 1.3.9 2.2 2.3 2.2 1.4 0 2.3-.8 2.3-2.3 0-1.4-.8-2.2-2.3-2.2-.3 0-.6.04-.8.1l-.1-.8zm8.8-1.5c1.8 0 3.1 1.3 3.1 3.2 0 1.9-1.3 3.2-3.1 3.2-1.8 0-3.1-1.3-3.1-3.2 0-1.9 1.3-3.2 3.1-3.2zm0 1.2c-1.1 0-1.8.9-1.8 2 0 1.1.7 2 1.8 2 1.1 0 1.8-.9 1.8-2 0-1.1-.7-2-1.8-2z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "java",
    name: "Java",
    category: "Languages",
    color: "#ED8B00",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8.85 16.27c0 0-.58.33.82.45 1.7.14 2.87.1 5.08-.24 0 0 .73.47 1.63.85-2.6.86-7.85.59-7.53-1.06zm-1.08 2.5c0 0-.6.41.9.52 1.87.14 3.8.11 6.55-.31 0 0 .54.34 1.32.61-3.4 1.05-9.87.77-8.77-.82zm.17-4.63c0 0-.48.42 1.05.47 1.84.05 3.32.02 5.86-.33 0 0 .42.3.95.53-3.07.82-8.9.57-7.86-.67zm2.4-3.03s-1.42 1.74 1.3 1.86c2.47.11 4.54-.15 6.07-.84 0 0-.56.46-1.34.78-2.6.9-7.14.7-6.03-1.8zm5.55-4.48s1.08 1.1-.98 2.76c-1.63 1.31-3.4 2.37-3.4 2.37s1.37.1 2.32-.73c1.17-1.03 2.5-2.3 2.06-4.4z" fill="#5382A1" />
        <path d="M14.07 1.5c0 0 1.25 1.45.2 2.86-1.06 1.42-2.34 2.45-2.34 2.45s1.25.07 2.15-.81c1.1-1.07 1.66-2.22 0-4.5z" fill="#E76F00" />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React / React Native",
    category: "Frameworks & Web",
    color: "#61DAFB",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.2">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frameworks & Web",
    color: "#000000",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="12" fill="#000000" stroke="#444444" strokeWidth="1" />
        <path d="M16.5 17.5L10.3 8.8H8.5v7.4h1.5v-4.9l5.1 7.2h1.4zm-1.5-8.7h1.5v5.1H15V8.8z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Frameworks & Web",
    color: "#339933",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#339933" />
        <path d="M12 4.5l6.5 3.75v7.5L12 19.5l-6.5-3.75v-7.5L12 4.5z" fill="#111111" />
        <path d="M12 7l4 2.3v4.6L12 16.2l-4-2.3V9.3L12 7z" fill="#339933" />
      </svg>
    ),
  },
  {
    id: "springboot",
    name: "Spring Boot",
    category: "Frameworks & Web",
    color: "#6DB33F",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M20.6 13c.2-2.9-1.2-5.7-3.6-7.3-2.5-1.6-5.8-1.7-8.4-.3C6 6.8 4.6 9.6 4.8 12.5c.2 2.9 1.9 5.4 4.5 6.5 2.6 1.1 5.7.7 7.9-1.1" fill="#6DB33F" />
        <path d="M12 6c3 0 5 2.5 5 5.5S14.5 17 11.5 17c-2 0-4-1-4.5-3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Frameworks & Web",
    color: "#02569B",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14.3 2L3.8 12.5l3.2 3.2L17.5 5.2h-3.2z" fill="#45D1FD" />
        <path d="M14.3 11.8l-4.1 4.1 4.1 4.1h3.2l-4.1-4.1 4.1-4.1h-3.2z" fill="#02569B" />
        <path d="M10.2 15.9l4.1 4.1h3.2l-4.1-4.1h-3.2z" fill="#01579B" />
      </svg>
    ),
  },
  {
    id: "dart",
    name: "Dart",
    category: "Languages",
    color: "#0175C2",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 12L12 4.5h6l3.5 3.5-6 11.5H10L4.5 12z" fill="#0175C2" />
        <path d="M12 4.5L5.5 11 12 17.5l5.5-6.5L12 4.5z" fill="#00B4AB" />
      </svg>
    ),
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Frameworks & Web",
    color: "#009688",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path d="M11 5l-4 8h5l-1 6 6-9h-5l1-5z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frameworks & Web",
    color: "#06B6D4",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 6c-3.3 0-5.5 1.7-6.6 5 1.3-1.7 2.8-2.2 4.4-1.7 1 0.3 1.6 1 2.4 1.8 1.2 1.3 2.6 2.8 5.8 2.8 3.3 0 5.5-1.7 6.6-5-1.3 1.7-2.8 2.2-4.4 1.7-1-0.3-1.6-1-2.4-1.8-1.2-1.3-2.6-2.8-5.8-2.8zM5.4 13c-3.3 0-5.5 1.7-6.6 5 1.3-1.7 2.8-2.2 4.4-1.7 1 0.3 1.6 1 2.4 1.8 1.2 1.3 2.6 2.8 5.8 2.8 3.3 0 5.5-1.7 6.6-5-1.3 1.7-2.8 2.2-4.4 1.7-1-0.3-1.6-1-2.4-1.8-1.2-1.3-2.6-2.8-5.8-2.8z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Cloud & Databases",
    color: "#4169E1",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 5.2 3 8v8c0 2.8 4 5 9 5s9-2.2 9-5V8c0-2.8-4-5-9-5zm0 2.5c3.9 0 6.5 1.6 6.5 2.5S15.9 10.5 12 10.5 5.5 8.9 5.5 8 8.1 5.5 12 5.5zM5.5 10.8c1.6 1 4 1.7 6.5 1.7s4.9-.7 6.5-1.7V12c0 .9-2.6 2.5-6.5 2.5S5.5 12.9 5.5 12v-1.2zm0 4c1.6 1 4 1.7 6.5 1.7s4.9-.7 6.5-1.7V16c0 .9-2.6 2.5-6.5 2.5S5.5 16.9 5.5 16v-1.2z" fill="#4169E1" />
      </svg>
    ),
  },
  {
    id: "redis",
    name: "Redis",
    category: "Cloud & Databases",
    color: "#DC382D",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M2 9.5l10-5.5 10 5.5-10 5.5L2 9.5zm0 5l10 5.5 10-5.5-10 5.5L2 14.5z" fill="#DC382D" />
        <path d="M12 4L2 9.5l10 5.5 10-5.5L12 4z" fill="#A41E11" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps & Tools",
    color: "#2496ED",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M13.98 11.08h-2.12v-2.1h2.12v2.1zm-2.65 0H9.2v-2.1h2.13v2.1zm5.3 0h-2.12v-2.1h2.12v2.1zm-2.65-2.63h-2.12V6.36h2.12v2.1zm2.65 0h-2.12V6.36h2.12v2.1zm-7.95 2.63H6.55v-2.1h2.13v2.1zm-2.65 0H3.9v-2.1h2.13v2.1zm10.6-5.26h-2.12V3.73h2.12v2.1zm8.38 5.6c-.35-.24-1.2-.72-2.47-.72-.75 0-1.47.16-2.14.45V9.45h-.06c-.84-.52-2.1-.73-3.37-.73v.8c.97 0 1.95.14 2.58.55l.23.15v2.85c0 1.46-.77 2.76-1.95 3.5-2.12 1.34-5.32 1.34-7.44 0-1.18-.74-1.95-2.04-1.95-3.5v-.35l-.36-.05A5.62 5.62 0 0 0 2 13.57C2 17.1 5.8 20 10.5 20c5.3 0 9.77-3.4 10.4-7.96.6-.14 1.7-.5 2.45-1.52.3-.4.4-.76.45-.92h-.01z" fill="#2496ED" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Cloud & Databases",
    color: "#47A248",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C11.5 4 10.2 6.8 9.5 9c-.8 2.5-1.5 5.2-1.5 7.8 0 2.2.9 3.5 2.2 4.5.6.5 1.2.7 1.8.7s1.2-.2 1.8-.7c1.3-1 2.2-2.3 2.2-4.5 0-2.6-.7-5.3-1.5-7.8-.7-2.2-2-5-2.5-7z" fill="#47A248" />
        <path d="M12 2v20c.6 0 1.2-.2 1.8-.7 1.3-1 2.2-2.3 2.2-4.5 0-2.6-.7-5.3-1.5-7.8-.7-2.2-2-5-2.5-7z" fill="#3F9142" />
      </svg>
    ),
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud & Databases",
    color: "#FF9900",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M6.7 15.6c-2.4 0-4.3-1.1-4.3-3.6 0-2.6 2-3.6 4.3-3.6h2.2v1.5H6.7c-1.4 0-2.6.4-2.6 2 0 1.5 1.1 2.1 2.6 2.1 1.2 0 2.3-.6 2.3-1.8v-1.1h1.7v1.2c0 2.1-1.6 3.3-4 3.3zM15.4 15.6c-2.4 0-4.3-1.1-4.3-3.6 0-2.6 2-3.6 4.3-3.6h2.2v1.5h-2.2c-1.4 0-2.6.4-2.6 2 0 1.5 1.1 2.1 2.6 2.1 1.2 0 2.3-.6 2.3-1.8v-1.1h1.7v1.2c0 2.1-1.6 3.3-4 3.3z" fill="#FF9900" />
        <path d="M2.5 18c4.5 2.5 12.5 2.5 19 0-.3-.4-.7-.9-.9-1.2-5.5 2-12.5 2-16.5 0l-1.6 1.2z" fill="#FF9900" />
      </svg>
    ),
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & Databases",
    color: "#0078D4",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M13.05 2.63L3.84 15.6h5.83l3.38-12.97z" fill="#0078D4" />
        <path d="M12.96 4.26L9.67 15.6H20.16L12.96 4.26z" fill="#50E6FF" />
      </svg>
    ),
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Cloud & Databases",
    color: "#FFCA28",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 17l4-12 3 5-7 7z" fill="#FFA000" />
        <path d="M11 10l2-4 7 11-9-7z" fill="#F4511E" />
        <path d="M4 17l8 5 8-5-8-15-8 15z" fill="#FFCA28" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub / Git",
    category: "DevOps & Tools",
    color: "#F05032",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FFFFFF" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Frameworks & Web",
    color: "#E10098",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l7 3.9v7.8l-7 3.9-7-3.9V8.1l7-3.9z" fill="#E10098" />
        <circle cx="12" cy="12" r="3" fill="#E10098" />
      </svg>
    ),
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & Data Tools",
    color: "#FF6F00",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v10l4-2.3V9.3L12 12l5-2.7v5.4l4 2.3V7L12 2z" fill="#FF6F00" />
      </svg>
    ),
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Data Tools",
    color: "#EE4C2C",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14.5 3a7.5 7.5 0 010 15h-1a6 6 0 100-12v-3zm0 3a4.5 4.5 0 110 9h.5a3 3 0 100-6V6z" fill="#EE4C2C" />
        <circle cx="16" cy="4.5" r="1.5" fill="#EE4C2C" />
      </svg>
    ),
  },
  {
    id: "openai",
    name: "OpenAI / LLMs",
    category: "AI & Data Tools",
    color: "#10A37F",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M22.2 11.2c0-1.7-.8-3.2-2-4.1.3-.9.3-1.9 0-2.8-.7-.9-1.8-1.5-3-1.5-.7 0-1.3.2-1.9.5C14.4 2.4 13.2 1.8 12 1.8s-2.4.6-3.3 1.5c-.6-.3-1.2-.5-1.9-.5-1.2 0-2.3.6-3 1.5-.3.9-.3 1.9 0 2.8-1.2.9-2 2.4-2 4.1 0 1.2.4 2.4 1.2 3.3-.3.9-.3 1.9 0 2.8.7.9 1.8 1.5 3 1.5.7 0 1.3-.2 1.9-.5.9.9 2.1 1.5 3.3 1.5s2.4-.6 3.3-1.5c.6.3 1.2.5 1.9.5 1.2 0 2.3-.6 3-1.5.3-.9.3-1.9 0-2.8 1-.9 1.5-2.1 1.5-3.3z" stroke="#10A37F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "vectordb",
    name: "Vector DB (RAG)",
    category: "AI & Data Tools",
    color: "#8B5CF6",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#8B5CF6" />
        <path d="M7 17L12 7l5 10H7z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "ballerina",
    name: "Ballerina",
    category: "Languages",
    color: "#00BA88",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00BA88" />
        <path d="M7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "prometheus",
    name: "Prometheus",
    category: "Cloud & Databases",
    color: "#E6522C",
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#E6522C" />
        <path d="M12 6c-2 3-3 5-3 8 0 1.7 1.3 3 3 3s3-1.3 3-3c0-3-1-5-3-8z" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export function getTechItem(nameOrId: string): TechItem {
  const norm = nameOrId.toLowerCase().trim();
  const matched = PREDEFINED_TECH_LIST.find(
    (t) => t.id.toLowerCase() === norm || t.name.toLowerCase().includes(norm) || norm.includes(t.id.toLowerCase())
  );

  if (matched) return matched;

  // Fallback for custom entries
  return {
    id: norm,
    name: nameOrId,
    category: "DevOps & Tools",
    color: "#568f5e",
    icon: ({ className = "w-5 h-5" }) => (
      <div className={`${className} font-mono text-[10px] font-bold text-white bg-[#222222] border border-[#333333] rounded flex items-center justify-center`}>
        {nameOrId.substring(0, 3).toUpperCase()}
      </div>
    ),
  };
}
