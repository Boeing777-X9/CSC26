export interface EventItem {
  id: string;
  year: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  status: "Upcoming" | "Completed";
  speaker?: string;
  certificateAvailable?: boolean;
  image?: string;
}

export const eventsList: EventItem[] = [
  // 2026 Events
  {
    id: "ctf-2026",
    year: "2026",
    title: "Flagship CyberSpace CTF 2026",
    category: "CTF Competition",
    date: "March 15, 2026",
    time: "10:00 AM - 10:00 PM IST",
    venue: "MUJ Tech Center & Online",
    description:
      "12-hour Jeopardy-style Capture The Flag competition featuring challenges in Binary Exploitation, WebSec, Reverse Engineering, Cryptography, and Forensics.",
    status: "Upcoming",
    speaker: "CSC MUJ Core Tech Team",
    certificateAvailable: true,
  },
  {
    id: "hackcyber-4",
    year: "2026",
    title: "HackCyber 4.0 Hackathon",
    category: "Hackathon",
    date: "February 20, 2026",
    time: "09:00 AM - 05:00 PM IST",
    venue: "Lab 304, Academic Block 1",
    description:
      "24-hour offensive and defensive security hackathon building automated threat response bots and secure web architectures.",
    status: "Completed",
    speaker: "Industry Experts & Alumni",
    certificateAvailable: true,
  },
  {
    id: "bugbounty-2026",
    year: "2026",
    title: "Zero-Day Bug Bounty Bootcamp",
    category: "Workshop",
    date: "January 10, 2026",
    time: "02:00 PM - 06:00 PM IST",
    venue: "Auditorium 2, MUJ",
    description:
      "Hands-on workshop on finding business logic flaws, IDORs, and SSRF in real bug bounty programs like HackerOne and Bugcrowd.",
    status: "Completed",
    speaker: "Top Bug Bounty Hunters",
    certificateAvailable: true,
  },
  {
    id: "ai-sec-2026",
    year: "2026",
    title: "AI & LLM Security Summit 2026",
    category: "Conference",
    date: "April 05, 2026",
    time: "11:00 AM - 04:00 PM IST",
    venue: "Main Amphitheatre",
    description:
      "Exploring adversarial prompt injections, model extraction attacks, and securing generative AI deployments.",
    status: "Upcoming",
    speaker: "Security Researchers",
    certificateAvailable: true,
  },

  // 2025 Events
  {
    id: "cybercon-2025",
    year: "2025",
    title: "CyberCon Annual Conference 2025",
    category: "Conference",
    date: "November 12, 2025",
    time: "10:00 AM IST",
    venue: "MUJ Convention Hall",
    description:
      "Annual security conference featuring keynote talks on ransomware mitigation, SOC operations, and threat intelligence.",
    status: "Completed",
    speaker: "Chief Information Security Officers",
    certificateAvailable: true,
  },
  {
    id: "reveng-2025",
    year: "2025",
    title: "Reverse Engineering 101 with Ghidra",
    category: "Workshop",
    date: "September 18, 2025",
    time: "03:00 PM IST",
    venue: "CS Lab 102",
    description:
      "Deep dive into x86/ARM disassembly, decompilation using NSA's Ghidra, and analyzing unpacked malware samples.",
    status: "Completed",
    speaker: "CSC Reverse Eng Division",
    certificateAvailable: true,
  },
  {
    id: "websec-2025",
    year: "2025",
    title: "OWASP Top 10 Hands-on Masterclass",
    category: "Workshop",
    date: "April 22, 2025",
    time: "02:00 PM IST",
    venue: "Online Labs",
    description:
      "Practical exploitation of SQL injections, Cross-Site Scripting (XSS), and Broken Access Controls in vulnerable environments.",
    status: "Completed",
    speaker: "CSC WebSec Lead",
    certificateAvailable: true,
  },
  {
    id: "winter-ctf-2025",
    year: "2025",
    title: "Winter CTF Battle 2025",
    category: "CTF Competition",
    date: "December 05, 2025",
    time: "06:00 PM IST",
    venue: "Online Arena",
    description:
      "Overnight beginner-friendly CTF challenge designed for freshmen to test their cryptography and web exploitation skills.",
    status: "Completed",
    speaker: "CSC CTF Team",
    certificateAvailable: true,
  },

  // 2024 Events
  {
    id: "launchpad-2024",
    year: "2024",
    title: "CSC Launchpad & Orientation 2024",
    category: "Orientation",
    date: "August 28, 2024",
    time: "04:00 PM IST",
    venue: "MUJ Auditorium 1",
    description:
      "Official inaugural ceremony of CyberSpace Club for the 2024 academic session with live hacking demonstrations.",
    status: "Completed",
    speaker: "CSC Executive Board",
    certificateAvailable: true,
  },
  {
    id: "netdef-2024",
    year: "2024",
    title: "Network Defense & Wireshark Bootcamp",
    category: "Workshop",
    date: "October 14, 2024",
    time: "02:30 PM IST",
    venue: "Networking Lab",
    description:
      "Analyzing PCAP traffic files, packet inspection, detecting TCP SYN scans, and configuring Snort IDS rules.",
    status: "Completed",
    speaker: "Network Security Team",
    certificateAvailable: true,
  },
  {
    id: "crypto-2024",
    year: "2024",
    title: "Applied Cryptography Challenge 2024",
    category: "Challenge",
    date: "November 20, 2024",
    time: "05:00 PM IST",
    venue: "Online",
    description:
      "Solving RSA implementation flaws, AES side-channel analysis, and lattice-based cryptography puzzles.",
    status: "Completed",
    speaker: "Crypto Division Lead",
    certificateAvailable: true,
  },
];
