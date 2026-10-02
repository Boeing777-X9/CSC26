export const siteConfig = {
  name: "CYBER SPACE CLUB",
  tagline: "Securing the Digital Frontier",
  email: "contact@csc-muj.com",
  phone: "+91 98765 43210",
  address: "MUJ, Jaipur",
  whatsapp: "https://wa.me/919876543210",
  instagram: "https://www.instagram.com/cscmuj/",
  linkedin: "https://www.linkedin.com/company/cyberspace-club-muj/",
  mapLink: "#",
  reservationLink: "/join",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/#contact" },
];

export const heroData = {
  headline: "Securing the Future",
  subline: "Where code meets cybersecurity.",
  cta: "Join the Club",
};

export const aboutData = {
  kicker: "We specialize in",
  title: ["Ethical", "Hacking", "Network Defense", "Zero", "Day", "Exploits"],
  signature: "built by hackers",
  description:
    "CYBER SPACE CLUB (CSC) is a community of cybersecurity enthusiasts dedicated to exploring the realms of digital security, ethical hacking, and secure software development. We learn, we hack, we protect.",
};

export const statsData = [
  { value: "500+", label: "Active Members" },
  { value: "50+", label: "CTFs Conquered" },
  { value: "12", label: "Open Source Projects" },
  { value: "24/7", label: "Terminal Uptime" },
];

export const menuCategories = [
  {
    id: "web",
    name: "Web Security",
    description: "Finding vulnerabilities in the modern web infrastructure.",
    items: [
      { name: "SQL Injection", description: "Exploiting database queries and bypassing auth", price: "0x01" },
      { name: "Cross-Site Scripting", description: "Injecting malicious scripts into web pages", price: "0x02" },
      { name: "CSRF", description: "Forging requests on behalf of users", price: "0x03" },
      { name: "Server-Side Request Forgery", description: "Abusing server functionality to read internal data", price: "0x04" },
    ],
  },
  {
    id: "binary",
    name: "Binary Exploitation",
    description: "Deep dive into memory corruption and low-level exploits.",
    items: [
      { name: "Buffer Overflow", description: "Overwriting memory to control execution flow", price: "0x0A" },
      { name: "Return Oriented Programming", description: "Chaining gadgets to bypass DEP", price: "0x0B" },
      { name: "Format String Attacks", description: "Leaking memory via printf vulnerabilities", price: "0x0C" },
      { name: "Heap Exploitation", description: "Manipulating dynamic memory allocators", price: "0x0D" },
    ],
  },
  {
    id: "crypto",
    name: "Cryptography",
    description: "Breaking encryption and securing communications.",
    items: [
      { name: "RSA Attacks", description: "Factoring primes and exploiting weak keys", price: "0x10" },
      { name: "Hash Collisions", description: "Finding identical hashes for different inputs", price: "0x11" },
      { name: "Block Cipher Modes", description: "Exploiting ECB and CBC vulnerabilities", price: "0x12" },
      { name: "Elliptic Curve", description: "Advanced modern cryptographic systems", price: "0x13" },
    ],
  },
  {
    id: "re",
    name: "Reverse Engineering",
    description: "Deconstructing malware and analyzing binaries.",
    items: [
      { name: "Malware Analysis", description: "Dissecting malicious payloads", price: "0x20" },
      { name: "Assembly Analysis", description: "Reading x86 and ARM like a book", price: "0x21" },
      { name: "Obfuscation", description: "Bypassing packers and anti-debugging", price: "0x22" },
      { name: "Firmware Reversing", description: "Analyzing IoT and hardware firmware", price: "0x23" },
    ],
  },
];

export const galleryImages = [
  { id: 1, category: "hackathons", alt: "Late night coding at the annual hackathon" },
  { id: 2, category: "workshops", alt: "Cybersecurity awareness session" },
  { id: 3, category: "ctf", alt: "Team competing in an international CTF" },
  { id: 4, category: "hackathons", alt: "Brainstorming architecture designs" },
  { id: 5, category: "workshops", alt: "Hands-on penetration testing lab" },
  { id: 6, category: "ctf", alt: "Capturing the final flag" },
  { id: 7, category: "hackathons", alt: "Project presentation and judging" },
  { id: 8, category: "workshops", alt: "Guest speaker from the industry" },
  { id: 9, category: "ctf", alt: "Analyzing packet captures in Wireshark" },
];

export const eventsData = [
  {
    id: 1,
    title: "CyberHack 2026",
    description: "Our flagship 36-hour cybersecurity hackathon focused on building secure solutions.",
    date: "15th October",
    tags: "Hackathon / Development",
  },
  {
    id: 2,
    title: "Intro to Penetration Testing",
    description: "A hands-on workshop covering the basics of network scanning, enumeration, and exploitation.",
    date: "22nd October",
    tags: "Workshop / InfoSec",
  },
  {
    id: 3,
    title: "Capture The Flag (CTF) - Fall Edition",
    description: "Compete against top minds to solve challenges in crypto, web, and pwn.",
    date: "5th November",
    tags: "CTF / Competition",
  },
  {
    id: 4,
    title: "Malware Analysis Deep Dive",
    description: "Learn how to safely detonate and analyze modern malware strains.",
    date: "12th November",
    tags: "Workshop / Reverse Engineering",
  },
  {
    id: 5,
    title: "Alumni Talk: Life as a Red Teamer",
    description: "Insights from our alumni working as offensive security engineers in the industry.",
    date: "20th November",
    tags: "Speaker / Networking",
  },
];

export const footerColumns = [
  {
    title: "Our Mission",
    subtitle: "Securing the Digital Frontier",
    description:
      "CSC is dedicated to fostering a community of cybersecurity enthusiasts, providing the resources and environment to learn ethical hacking and secure coding.",
    link: { label: "Read More", href: "#about" },
  },
  {
    title: "Gallery",
    subtitle: "Moments in the Terminal",
    description:
      "Explore the hackathons, workshops, and late-night debugging sessions that define our club.",
    link: { label: "View Gallery", href: "#gallery" },
  },
  {
    title: "Events",
    subtitle: "Learn and Compete",
    description:
      "From intensive CTFs to beginner-friendly workshops, join us at our next major event.",
    link: { label: "Explore Events", href: "#events" },
  },
  {
    title: "Join Us",
    subtitle: "Become a Member",
    description:
      "Ready to dive into cybersecurity? We recruit passionate individuals from all backgrounds.",
    link: { label: "Apply Now", href: "/join" },
  },
];

export const drinksData = {
  kicker: "The ultimate challenge",
  title: "Capture The Flag",
  description:
    "The adrenaline rush of finding a vulnerability. The satisfaction of a successful exploit. CTFs are where theory meets practice in high-stakes environments.",
};

export const dayNightData = {
  day: {
    title: "Red Team",
    subtitle: "offensive security operations",
  },
  night: {
    title: "Blue Team",
    subtitle: "defensive architecture & incident response",
  },
};
