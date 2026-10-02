"use client";

import React, { useState, useRef } from "react";
import "@/app/globals.css";
import ParticleTextEffect from "@/components/ui/particle-text-effect";

/* ──────────────────────────────────────────────────
   TYPES & INTERFACES
────────────────────────────────────────────────── */
export interface TeamMember {
  name: string;
  post: string;
  photo?: string;
  quote?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

interface FlipCardProps {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  quote?: string;
}

/* ──────────────────────────────────────────────────
   ICONS
────────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

/* ──────────────────────────────────────────────────
   HELPER FUNCTIONS
────────────────────────────────────────────────── */
const sanitizeUrl = (type: "linkedin" | "instagram" | "github", value?: string): string => {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  if (type === "instagram") return `https://instagram.com/${value.replace("@", "")}`;
  if (type === "linkedin" && value.includes("linkedin.com")) return `https://${value}`;
  return `https://${value}`;
};

/* ──────────────────────────────────────────────────
   REUSABLE SECTION HEADER WITH PARTICLE TEXT EFFECT
────────────────────────────────────────────────── */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="relative mb-8 w-full flex flex-col items-center justify-center">
    <ParticleTextEffect text={title} />
    <div className="h-[2px] w-28 mx-auto -mt-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
  </div>
);

/* ──────────────────────────────────────────────────
   3D FLIP CARD COMPONENT
────────────────────────────────────────────────── */
function FlipCard({ name, role, photo, linkedin, github, instagram, quote }: FlipCardProps) {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const safeLinkedin = sanitizeUrl("linkedin", linkedin);
  const safeInstagram = sanitizeUrl("instagram", instagram);
  const safeGithub = sanitizeUrl("github", github);
  
  const hasLinks = safeLinkedin || safeGithub || safeInstagram;
  const showPhoto = photo && !imgFailed;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 3D calculation
    setRotateX((mouseY - centerY) / -20);
    setRotateY((mouseX - centerX) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className="flip-card"
      onClick={() => setFlipped((f) => !f)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className={`flip-card-inner${flipped ? " is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="flip-card-front member-card group">
          <div className="card-photo">
            {showPhoto ? (
              <img src={photo} alt={name} onError={() => setImgFailed(true)} />
            ) : (
              <div className="card-photo-placeholder flex flex-col items-center gap-2">
                <span className="text-4xl text-orange-500/50">👤</span>
              </div>
            )}
            <div className="card-photo-scrim" />
          </div>
          <div className="card-info">
            <div className="card-name group-hover:text-orange-400 transition-colors">{name}</div>
            <div className="card-accent-line" />
            <div className="card-role">{role}</div>
            
            {hasLinks && (
              <div className="card-links mt-1">
                {safeLinkedin && (
                  <a href={safeLinkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="card-link">
                    <LinkedInIcon />
                  </a>
                )}
                {safeGithub && (
                  <a href={safeGithub} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="card-link">
                    <GitHubIcon />
                  </a>
                )}
                {safeInstagram && (
                  <a href={safeInstagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="card-link">
                    <InstagramIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back member-card">
          <div className="card-back-inner">
            <p className="card-back-quote">
              {quote ? `"${quote}"` : "✦"}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flip-card {
          width: 100%;
          height: 100%;
          cursor: pointer;
          position: relative;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-style: preserve-3d;
        }

        .flip-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-front {
          transform: rotateY(0deg);
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .member-card {
          display: block;
          padding: 0;
          border-radius: 16px;
          border: 1px solid rgba(255, 121, 0, 0.2);
          background: rgba(15, 15, 20, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .card-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(30,30,40,0.8) 0%, rgba(10,10,15,1) 100%);
        }

        .card-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .card-photo-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 30%,
            rgba(15, 10, 5, 0.6) 70%,
            rgba(10, 5, 0, 0.95) 100%
          );
        }

        .card-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-info {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 16px 20px 20px;
        }

        .card-name {
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.02em;
        }

        .card-accent-line {
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #ff7900, #ffb347);
          margin: 6px 0;
          border-radius: 2px;
        }

        .card-role {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .card-links {
          display: flex;
          gap: 6px;
          margin-top: 8px;
        }

        .card-link {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        .card-link:hover {
          background: #ff7900;
          color: #000;
          border-color: #ff7900;
          transform: translateY(-2px);
        }

        .card-back-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at top right, rgba(255,121,0,0.15), transparent),
                      rgba(10, 10, 15, 0.8);
        }

        .card-back-quote {
          font-size: 13px;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          line-height: 1.6;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   JSON DATA
────────────────────────────────────────────────── */
const teamData: Record<string, TeamMember[]> = {
  "Faculty Coordinators": [
    { name: "Dr. Umashankar Rawat", post: "Professor in Department of CSE", linkedin: "https://www.linkedin.com/in/umashankar-rawat-41730a48/", photo: "" },
    { name: "Dr. Aditya Sinha", post: "Assistant Professor in Department of CSE", linkedin: "https://www.linkedin.com/in/aditya-sinha-ph-d-13261416/", photo: "" },
    { name: "Dr. Kavita Jhajharia", post: "Assistant Professor in Department of IT", linkedin: "https://www.linkedin.com/in/dr-kavita-jhajharia-85b703124/", photo: "" },
    { name: "Dr. Bagesh Kumar", post: "Assistant Professor in Department of IT", linkedin: "https://www.linkedin.com/in/dr-kavita-jhajharia-85b703124/", photo: "" }
  ],
  "DSW": [
    { name: "Dr. Madhura Yadav", post: "Dean, Directorate of Student's Welfare", linkedin: "https://www.linkedin.com/in/dr-madhura-yadav-0b261118/", photo: "" },
    { name: "Dr. Pankaj Vyas", post: "Director, Directorate of Student's Welfare", linkedin: "https://www.linkedin.com/in/dr-pankaj-vyas-8092281a/", photo: "" },
    { name: "Dr. Sanchit Anand", post: "Assistant Director, Directorate of Student's Welfare", linkedin: "https://www.linkedin.com/in/dr-sanchit-anand-4a9112105/", photo: "" }
  ],
  "Executive Board": [
    { name: "Abhinav Trikha", post: "Chairperson", quote: "-", linkedin: "https://www.linkedin.com/in/abhinav-trikha/", photo: "" },
    { name: "Ambika Seth", post: "Vice-Chairperson", photo: "" },
    { name: "Amritansh Srivastava", post: "General Secretary", photo: "" },
    { name: "Stuti Agrawal", post: "Treasurer", photo: "" },
    { name: "Harshit Raj Singh", post: "Executive Secretary", quote: "Vīra Bhogyā Vasundharā — dare, and the world is yours.", linkedin: "https://www.linkedin.com/in/harshit-raj-singh-613953335?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/_.harshit._.17?stkn=Yml3am40ZDBlY2pz", photo: "" },
    { name: "Suyash Pandey", post: "Managing Director", photo: "" },
    { name: "Arindam Sharma", post: "Operational Director", photo: "" },
    { name: "Soumyadeepa Pal", post: "Art Director", quote: "Magic happens when you don't give up. Even though you want to.. The universe always falls in love with a stubborn heart...!", linkedin: "www.linkedin.com/in/soumyadeepa-pal", instagram: "_soumyadeepa_pal_", photo: "" }
  ],
  "Advisory Board": [
    { name: "Rishabh Pandey", post: "Advisory", photo: "" },
    { name: "Arnab Roy", post: "Advisory", photo: "" },
    { name: "Kuber Chhabra", post: "Advisory", photo: "" },
    { name: "Ganesh Kotwade", post: "Advisory", photo: "" },
    { name: "Pranav Upadhyay", post: "Advisory", photo: "" },
    { name: "Aditya Agrawal", post: "Advisory", photo: "" },
    { name: "Anhadbani Anand", post: "Advisory", photo: "" }
  ],
  "Community Managers": [
    { name: "Manish Kumar Pandey", post: "Community Manager", quote: "I don’t wait for a role to give me responsibility; I take responsibility and make the role matter.", linkedin: "https://www.linkedin.com/in/manish-kumar-pandey-a0ba98378", instagram: "https://www.instagram.com/itz.me_manish.7", photo: "" },
    { name: "Suhani Rusia", post: "Community Manager", quote: "Passionate about building connections, fostering collaboration, and creating a thriving tech community. Connect. Collaborate. Create.", photo: "" }
  ],
  "Heads": [
    { name: "Manas Malhotra", post: "Head of Events", photo: "" },
    { name: "Anukriti Katoch", post: "Head of Programs", quote: "coming from mountain peace, chasing city chaos, and embracing it all.", linkedin: "https://www.linkedin.com/in/anukriti-katoch-946472269", instagram: "https://www.instagram.com/palakshi_71", photo: "" },
    { name: "Parisikha Jain", post: "Head of Marketing", quote: "Creating, connecting, and turning ideas into something people remember.", linkedin: "https://www.linkedin.com/in/parisikha-jain-b46504413", instagram: "https://www.instagram.com/parisikha_20", photo: "" },
    { name: "Manshi Singh", post: "Technical Head", photo: "" },
    { name: "Sarthak Agrawal", post: "Head of Research & Development", quote: "Some days are heavy, and that's okay.", linkedin: "https://www.linkedin.com/in/sarthak-agrawal-83074437b", instagram: "https://www.instagram.com/sarthak_leo2", github: "https://github.com/sarthak6244", photo: "" },
    { name: "Siddharth Singh", post: "Head of Corporate Affairs", photo: "" },
    { name: "Suyash Sharma", post: "Head of Media", photo: "" },
    { name: "Prakhar Yadav", post: "Head of Curations", photo: "" },
    { name: "Ananye Verma", post: "Head of Operations & Logistics", quote: "Always ready for a event !!", linkedin: "https://www.linkedin.com/in/ananye-verma-0b634237b", instagram: "https://www.instagram.com/ananyeverma_142", photo: "" }
  ],
  "Joint Heads": [
    { name: "Jyothi Anand", post: "Joint Head of Events", quote: "We are the masters of our fate and the captains of our souls", linkedin: "https://www.linkedin.com/in/jyothi-a-6884163b9", photo: "" },
    { name: "Yash Yadav", post: "Joint Head of Events", quote: "Stay curious. Keep building", linkedin: "https://www.linkedin.com/in/yash-yadav-28566b3a9", instagram: "https://www.instagram.com/yashyadav_6", photo: "" },
    { name: "Priyansh Agarwal", post: "Joint Head of Programs", quote: "Turning ideas into experiences, one program at a time. Building, leading, and creating with the CYBER SPACE CLUB.", linkedin: "https://www.linkedin.com/in/priyansh-agarwal-512999365", photo: "" },
    { name: "Harshit Dubey", post: "Joint Head of Programs", quote: "Tech in my mind, creativity in my lens, and leadership in everything I do.", linkedin: "https://www.linkedin.com/in/harshit-dubey-03073339b", instagram: "https://www.instagram.com/hars4t", photo: "" },
    { name: "Snehal Singh", post: "Joint Head of Programs", quote: "Don't stress do your best forget the rest", instagram: "tanusingh_0205", photo: "" },
    { name: "Samyukta Basu", post: "Joint Head of Marketing", quote: "Building, exploring, and leaving a little room for the unexpected.", linkedin: "https://www.linkedin.com/in/samyukta-basu-79656329a", instagram: "https://www.instagram.com/_samyukta__", photo: "" },
    { name: "Rudra Pratap Singh", post: "Joint Head of Technical", quote: "Expect disappointment so that you can never be disappointed", linkedin: "https://www.linkedin.com/in/rudra-pratap-singh-8523502b6", instagram: "https://www.instagram.com/rudrapratapsingh.725", github: "https://github.com/Rudra-25-12", photo: "" },
    { name: "Ojash Bhatnagar", post: "Joint Head of Technical", quote: "Here for the plot", linkedin: "https://www.linkedin.com/in/ojash-bhatnagar-35b37a380", photo: "" },
    { name: "Pradyumn Kabra", post: "Joint Head of Technical", quote: "Turning ideas into code, and challenges into opportunities.", linkedin: "https://www.linkedin.com/in/pradyumn-kabra-b17386233/", instagram: "https://www.instagram.com/pradyumn.ka6ra", photo: "" },
    { name: "Shubhangi Kesharwani", post: "Joint Head of Research & Development", quote: "A lifelong apprentice to the art of figuring things out.", linkedin: "https://www.linkedin.com/in/shubhangi-kesharwani-363189383/", instagram: "https://www.instagram.com/shubhangik_21/", github: "https://github.com/ShubhangiK06", photo: "" },
    { name: "Riya Kumari", post: "Joint Head of Research & Development", quote: "Books taught me that softness and strength can coexist. I’ve been a fan of both ever since.", linkedin: "www.linkedin.com/in/riya-kumari-5b302239a", github: "https://github.com/riyakumarif5-stack", photo: "" },
    { name: "Sanaya Muchhal", post: "Joint Head of Corporate Affairs", quote: "A little curious about everything.", photo: "" },
    { name: "Chetna Sharma", post: "Joint Head of Graphic Design", quote: "My energy is unlimited, my motivation is missing, and my questions are never-ending.", instagram: "https://www.instagram.com/sleepdeprived_91", photo: "" },
    { name: "Nitigya Surana", post: "Joint Head of Graphic Design", quote: "Design is not just what it looks like and feels like. Design is how it works", linkedin: "https://www.linkedin.com/in/nitigya-surana-5b75a3379", instagram: "https://www.instagram.com/nitigya_0607", photo: "" },
    { name: "Nileshwari Patil", post: "Joint Head of Media", photo: "" },
    { name: "Pranjal Patel", post: "Joint Head of Media", quote: "The reward for good work is more work.", linkedin: "https://www.linkedin.com/in/pranjal-patel-53b272375", instagram: "https://www.instagram.com/pranjalpatel._", photo: "" }
  ],
  "Senior Co-ordinators": [
    { name: "Mayank Pramanick", post: "Senior Coordinator of Programs", photo: "" },
    { name: "Jiya Chhabra", post: "Senior Coordinator Marketing", quote: "Somewhere between figuring it all out and making it happen.", photo: "" },
    { name: "Aditya Tripathi", post: "Senior Coordinator Technical", quote: "Turning curiosity into code and ideas into reality.", linkedin: "http://www.linkedin.com/in/aditya-tripathi-922a2429a", instagram: "aditya._tripathi._", github: "Aditya6743", photo: "" },
    { name: "Mohammad Faisal", post: "Senior Coordinator Technical", photo: "" },
    { name: "Satyam Jha", post: "Senior Coordinator Research & Development", photo: "" },
    { name: "Saumya Singh", post: "Senior Coordinator Media", photo: "" },
    { name: "Shashank Agrawal", post: "Senior Coordinator Operations & Logistics", quote: "Learning today, building tomorrow.", linkedin: "https://www.linkedin.com/in/shashank-agrawal-026b34368", instagram: "https://www.instagram.com/shashankagarwal1103", photo: "" },
    { name: "Lav Goyal", post: "Senior Coordinator Operations & Logistics", quote: "I believe every frame has a story worth telling.", linkedin: "https://www.linkedin.com/in/lav-goyal-5a7215416", instagram: "https://www.instagram.com/lavv.goyal", photo: "" }
  ]
};

/* ──────────────────────────────────────────────────
   MAIN PAGE LAYOUT
────────────────────────────────────────────────── */
export default function TeamPage() {
  const execBoard = teamData["Executive Board"];
  const execTopTwo = execBoard.slice(0, 2);
  const execRest = execBoard.slice(2);

  return (
    <div className="relative w-full pt-[120px] pb-20 text-[#eeeeee] overflow-x-hidden bg-transparent selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-orange-500/15 via-amber-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] left-[-250px] w-[650px] h-[650px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[65%] right-[-250px] w-[650px] h-[650px] bg-orange-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-24 justify-center items-center max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Main Header */}
        <div className="flex flex-col justify-center items-center w-full my-8 relative">
          <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-75 pointer-events-none" />
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-center tracking-tighter text-white drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            BEHIND THE <span className="bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent">SCENES</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg font-medium tracking-[0.2em] uppercase text-center">
            The minds powering CYBER SPACE CLUB
          </p>
        </div>

        {/* 1. Faculty Coordinators */}
        <div className="relative flex flex-col items-center w-full p-8 md:p-12 rounded-3xl bg-neutral-900/60 border border-orange-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <SectionHeader title="Faculty Coordinators" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-items-center">
            {teamData["Faculty Coordinators"].map((member, i) => (
              <div className="w-[220px] h-[300px]" key={i}>
                <FlipCard {...member} role={member.post} />
              </div>
            ))}
          </div>
        </div>

        {/* 2. DSW */}
        <div className="relative flex flex-col items-center w-full p-8 md:p-12 rounded-3xl bg-neutral-900/60 border border-orange-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <SectionHeader title="Directorate of Student's Welfare" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full justify-items-center">
            {teamData["DSW"].map((member, i) => (
              <div className="w-[220px] h-[300px]" key={i}>
                <FlipCard {...member} role={member.post} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Executive Board */}
        <div className="relative flex flex-col items-center w-full my-4 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-orange-500/10 via-neutral-900/80 to-black border border-orange-500/40 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
          <SectionHeader title="Executive Board" />

          {/* Chair & Vice Chair */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-10 w-full">
            {execTopTwo.map((member, i) => (
              <div className="w-[220px] h-[300px]" key={i}>
                <FlipCard {...member} role={member.post} />
              </div>
            ))}
          </div>

          {/* Core Execs */}
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center w-full">
            {execRest.map((member, i) => (
              <div className="w-[220px] h-[300px]" key={i}>
                <FlipCard {...member} role={member.post} />
              </div>
            ))}
          </div>
        </div>

        {/* Helper mapping for standard sections */}
        {[
          { title: "ADVISORY BOARD", data: teamData["Advisory Board"] },
          { title: "COMMUNITY MANAGERS", data: teamData["Community Managers"] },
          { title: "HEADS", data: teamData["Heads"] },
          { title: "JOINT HEADS", data: teamData["Joint Heads"] },
          { title: "SENIOR CO-ORDINATORS", data: teamData["Senior Co-ordinators"] },
        ].map((section, idx) => (
          <div key={idx} className="flex flex-col justify-center items-center w-full my-2">
            <SectionHeader title={section.title} />
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center w-full">
              {section.data.map((member, i) => (
                <div className="w-[220px] h-[300px]" key={i}>
                  <FlipCard {...member} role={member.post} />
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}