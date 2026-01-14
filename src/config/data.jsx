import React from 'react';
import { Award, Rocket, Shield } from 'lucide-react';

export const DATA = {
  name: "Divyank Singh",
  role: "Software Engineer",
  email: "divyanksingh.work@gmail.com",
  linkedin: "linkedin.com/in/itsdivyanksingh",
  summary: "Technology professional with over 3 years of experience across mobile and web frontends, early-stage product execution, and cloud infrastructure. I bridge the gap between building scalable products and ensuring robust application security. I thrive in fast-moving teams where I can take ownership of the full lifecycle—from high-conversion User Interface development to stable production deployment and incident handling.",
  stats: [
    { label: "Professional Experience", value: "3+ Years" },
    { label: "Academic Institution", value: "IIT Patna" },
    { label: "Systems Engineered", value: "8+ Units" },
    { label: "Intellectual Property", value: "1 Patent" }
  ],
  achievements: [
    { label: "Idea Patent Holder", detail: "Anaam Application Anonymous Reporting", Icon: Award },
    { label: "Startup Specialist", detail: "Expertise in zero-to-one product growth", Icon: Rocket },
    { label: "Security Certified", detail: "CompTIA PenTest+ and Google Cybersecurity", Icon: Shield }
  ],
  experience: [
    {
      id: 'exp-incash',
      company: "Incash",
      role: "Software Developer",
      period: "July 2023 - Present",
      location: "Nigeria (Remote)",
      type: "Full Time",
      tasks: [
        "Improved User Interface and User Experience across core flow, shipped android, ios and web updates.",
        "Integrated push notifications and analytics to track user behaviour.",
        "Build internal admin portal for fast operations.",
        "End to end frontend development of employer portal.",
        "Developed marketing tools to aid sales efforts."
      ],
      stack: ["Flutter", "React", "Firebase", "Google Analytics", "REST API Integration", "State Management"]
    },
    {
      id: 'exp-spt',
      company: "The Social Purpose Trust",
      role: "Technology Consultant",
      period: "February 2025 - December 2025",
      location: "Ghaziabad (Remote)",
      type: "Consultant / Lead",
      tasks: [
        "Developed products roadmap for tech team to follow.",
        "Managed the team of 5 people to streamline the development flow of 6 products.",
        "Implemented a initial development flow for organization.",
        "Managed AWS deployment, manual bug testing and security of all the products.",
        "Fixed a security issue affecting our Next.js app on AWS and improved overall hardening.",
        "Streamlined development flow and shared insights in business growth."
      ],
      stack: ["Amazon Web Services", "Nginx", "Next.js", "Security Hardening", "Infrastructure Leadership"]
    }
  ],
  projects: [
    {
      id: 'proj-anaam',
      title: "Anaam Application",
      context: "Innovation and Security",
      period: "Smart India Hackathon",
      desc: "A secure Flutter-based platform designed for anonymous drug trafficking reporting. Focused on zero-knowledge architecture and data integrity.",
      patent: "System and Method For Reporting Information Related to Drug Trafficking Anonymously (Patent Number: 202211029346)",
      tech: ["Flutter", "Dart", "Security Architecture"]
    },
    {
      id: 'proj-auth',
      title: "Authentication Reimagined",
      context: "UIDAI Privacy Layer",
      period: "Data Privacy Project",
      desc: "A Real world application using UIDAI (Unique Identification Authority of India) authentication services to verify individuals without disclosing Aadhaar Numbers.",
      details: [
        "End-to-end integration of official UIDAI Application Programming Interfaces with Python backends.",
        "Created a dual-application ecosystem for Residents and Authorities."
      ],
      tech: ["Python", "UIDAI Application Programming Interface", "API Security", "OAuth"]
    }
  ],
  skills: {
    frontend_and_mobile: [
      "React", "Tailwind", "Flutter", "Dart", "Responsive UI", "HTML", 
      "CSS", "Material Design", "JS", "Cross Platform Dev", "State Management"
    ],
    engineering_and_tools: [
      "Build and Release", "Route Management", "REST API Integration", "JSON Handling", 
      "Manual Testing", "Google Analytics", "Application Security", "Firebase", "Git"
    ],
    cloud_and_infrastructure: [
      "AWS", "AWS Amplify", "AWS EC2", "Linux", "Nginx", "AWS Route 53", 
      "Reverse Proxy Setup", "Basic System Admin", "Project Management"
    ],
    generative_ai: [
      "Prompt Engineering", "Generative AI Workflows", "AI-Driven Development"
    ]
  },
  certs: [
    { title: "Google Cybersecurity Professional", year: "2025", issuer: "Coursera" },
    { title: "CompTIA PenTest +", year: "2021", issuer: "TryHackMe" },
    { title: "Offensive Pentesting", year: "2021", issuer: "TryHackMe" },
    { title: "Algorithm and Data Structures in Python", year: "2020", issuer: "Udemy" },
    { title: "Microsoft Technical Associate Python", year: "2019", issuer: "Microsoft" }
  ],
  education: [
    {
      id: 'edu-iitp',
      school: "IIT Patna",
      degree: "Master of Science in Artificial Intelligence and Cyber Security",
      period: "2026 - Present",
      location: "Patna"
    },
    {
      id: 'edu-gku',
      school: "Gurukula Kangri (Deemed to be University)",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      period: "2019 - 2023",
      location: "Haridwar"
    }
  ]
};