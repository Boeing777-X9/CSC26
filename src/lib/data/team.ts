export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Core Board" | "Technical & CTF" | "Operations & Logistics" | "Design & Media" | "PR & Outreach";
  bio: string;
  rankBadge: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  avatarBg: string;
}

export const membersList: TeamMember[] = [
  {
    id: "rudra",
    name: "Rudra Sharma",
    role: "President & Core Lead",
    department: "Core Board",
    bio: "Offensive security researcher and CTF player specializing in binary exploitation and web application security.",
    rankBadge: "LEVEL 5 // COMMANDER",
    github: "https://github.com/Boeing777-X9",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    email: "rudra@cscmuj.com",
    avatarBg: "from-[#FF8C32] to-[#C06014]",
  },
  {
    id: "member-2",
    name: "Aarav Gupta",
    role: "Vice President",
    department: "Core Board",
    bio: "Cloud security enthusiast and DevOps engineer managing CSC MUJ infrastructure and event servers.",
    rankBadge: "LEVEL 5 // VICE COMMANDER",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "aarav@cscmuj.com",
    avatarBg: "from-sky-500 to-blue-700",
  },
  {
    id: "member-3",
    name: "Siddharth Verma",
    role: "Technical Head (CTF Lead)",
    department: "Technical & CTF",
    bio: "Reverse engineer, Ghidra wizard, and active participant in top global Jeopardy CTF tournaments.",
    rankBadge: "LEVEL 4 // CTF MASTER",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatarBg: "from-purple-500 to-indigo-800",
  },
  {
    id: "member-4",
    name: "Ananya Mehta",
    role: "WebSec & Cryptography Lead",
    department: "Technical & CTF",
    bio: "Penetration tester focusing on OWASP top 10 vulnerabilities, API fuzzing, and cryptographic ciphers.",
    rankBadge: "LEVEL 4 // SEC ARCHITECT",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatarBg: "from-emerald-500 to-teal-800",
  },
  {
    id: "member-5",
    name: "Rohan Kapoor",
    role: "Head of Operations",
    department: "Operations & Logistics",
    bio: "Orchestrating smooth venue logistics, hackathon sponsorships, and university administrative approvals.",
    rankBadge: "LEVEL 4 // OPS CHIEF",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatarBg: "from-amber-500 to-orange-800",
  },
];
