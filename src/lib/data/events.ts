export interface EventItem {
  id: string;
  year: "2026" | "2025" | "2024";
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  status: "Upcoming" | "Completed" | "Ongoing";
  speaker?: string;
  certificateAvailable: boolean;
  image?: string;
  poster?: string;
  tags?: string[];
}

export const eventsList: EventItem[] = [
  // 2025 Official CSC MUJ Events
  {
    id: "decrypta-2025",
    year: "2025",
    title: "DECRYPTA",
    category: "Puzzle Decryption",
    date: "November 09, 2025",
    time: "10:00 AM - 05:00 PM IST",
    venue: "MUJ Tech Center & Online",
    description:
      "Cipher to Solution — Game On, Minds Unleashed. High-stakes puzzle decryption and cybersecurity challenge testing reverse thinking and cryptography skills.",
    status: "Completed",
    speaker: "CSC Tech Division",
    certificateAvailable: true,
    poster: "/events/posters/decrypta.webp",
    tags: ["game on", "minds unleashed", "puzzle decryption"],
  },
  {
    id: "bounty-bonanza-3",
    year: "2025",
    title: "Bounty Bonanza 3.0",
    category: "Bug Bounty",
    date: "November 08, 2025",
    time: "11:00 AM - 06:00 PM IST",
    venue: "AB-1 Seminar Hall",
    description:
      "Eerie Escapade & Halloween Hunt. Spooky treasure hunt and hands-on vulnerability hunting for web applications, APIs, and mobile targets.",
    status: "Completed",
    speaker: "CSC Offensive Security",
    certificateAvailable: true,
    poster: "/events/posters/bounty3.webp",
    tags: ["halloween hunt", "whispers and winners", "eerie escapade"],
  },
  {
    id: "rewind-recode-2025",
    year: "2025",
    title: "Rewind & Recode",
    category: "Hackathon",
    date: "October 10 - 11, 2025",
    time: "09:00 AM - 09:00 AM IST (24 Hours)",
    venue: "D3-Tech Fest Arena",
    description:
      "Fix the script with code. A 24-hour hackathon focused on code remediation, secure software development, and building innovative tech solutions for real-world change.",
    status: "Completed",
    speaker: "D3-Tech Fest & CSC Core",
    certificateAvailable: true,
    poster: "/events/posters/rewindnrecode.webp",
    tags: ["D3-Tech Fest", "code for change", "innovation unleashed"],
  },
  {
    id: "cyber-awareness-2025",
    year: "2025",
    title: "Cyber Awareness Camp",
    category: "Social Awareness",
    date: "October 07, 2025",
    time: "10:00 AM - 03:00 PM IST",
    venue: "MUJ Campus & Community Center",
    description:
      "Spreading digital hygiene, online safety practices, phishing defense awareness, and social engineering countermeasures across the campus community.",
    status: "Completed",
    speaker: "CSC Outreach Team",
    certificateAvailable: true,
    poster: "/events/posters/cac.webp",
    tags: ["digital hygiene", "community outreach", "online safety"],
  },
  {
    id: "modular-nexus-2025",
    year: "2025",
    title: "Modular Nexus",
    category: "Workshop",
    date: "August 24, 2025",
    time: "02:00 PM - 05:30 PM IST",
    venue: "Lab 204, Academic Block 2",
    description:
      "Exploring modular blockchain architectures, microservices security, and building scalable decoupled systems.",
    status: "Completed",
    speaker: "Web3 & Systems Security Division",
    certificateAvailable: true,
    poster: "/events/posters/Mnexus.webp",
    tags: ["modular blockchain", "microservices", "scalable tech"],
  },
  {
    id: "playtopia-2025",
    year: "2025",
    title: "PLAYTOPIA",
    category: "Gaming & CTF",
    date: "August 23, 2025",
    time: "11:00 AM - 04:00 PM IST",
    venue: "Student Activity Center",
    description:
      "Gamified cybersecurity arena featuring interactive puzzle stations, arcade hacking challenges, and team-based speed decryption.",
    status: "Completed",
    speaker: "CSC Interactive Team",
    certificateAvailable: true,
    poster: "/events/posters/playtopia.webp",
    tags: ["gamified arena", "arcade hacking", "speed decryption"],
  },
  {
    id: "hack-n-earn-2",
    year: "2025",
    title: "Hack n' Earn 2.0",
    category: "Workshop",
    date: "July 14, 2025",
    time: "03:00 PM - 06:00 PM IST",
    venue: "Online Workshop",
    description:
      "Mastering real-world bug bounty hunting, finding business logic flaws, and earning bounties on platforms like HackerOne and Bugcrowd.",
    status: "Completed",
    speaker: "CSC Bounty Leads",
    certificateAvailable: true,
    poster: "/events/posters/hackearn2.webp",
    tags: ["bug bounty", "vulnerability hunting", "reward pool"],
  },
  {
    id: "bounty-bonanza-2",
    year: "2025",
    title: "Bounty Bonanza 2.0",
    category: "Bug Bounty",
    date: "April 12, 2025",
    time: "10:00 AM - 04:00 PM IST",
    venue: "Lab 105, AB-1",
    description:
      "Hands-on web and API vulnerability hunting bootcamp with live target challenges and bounty rewards.",
    status: "Completed",
    speaker: "CSC Offensive Team",
    certificateAvailable: true,
    poster: "/events/posters/bounty.webp",
    tags: ["websec", "api hunting", "offensive security"],
  },

  // 2024 Official CSC MUJ Event
  {
    id: "ai-vs-human-2024",
    year: "2024",
    title: "AI vs Human Debate",
    category: "Debate & Discussion",
    date: "November 15, 2024",
    time: "03:00 PM - 06:00 PM IST",
    venue: "Auditorium 1, MUJ",
    description:
      "An engaging intellectual clash exploring the ethics, threat vectors, autonomous decision-making, and future impact of Artificial Intelligence vs Human Cognition in cybersecurity.",
    status: "Completed",
    speaker: "CSC Debate & Ethics Council",
    certificateAvailable: true,
    poster: "/events/posters/aihuman.webp",
    tags: ["ethics & tech", "threat vectors", "autonomous ai"],
  },
];
