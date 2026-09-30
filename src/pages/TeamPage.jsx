import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';

const faculty = [
  { name: "Dr. Umashankar Rawat", role: "Professor in Department of CSE" },
  { name: "Dr. Aditya Sinha", role: "Assistant Professor in Department of CSE" },
  { name: "Dr. Kavita Jhajharia", role: "Assistant Professor in Department of IT" },
  { name: "Dr. Bagesh Kumar", role: "Assistant Professor in Department of IT" }
];

const dsw = [
  { name: "Dr. Madhura Yadav", role: "Dean, Directorate of Student's Welfare" },
  { name: "Dr. Pankaj Vyas", role: "Director, Directorate of Student's Welfare" },
  { name: "Dr. Sanchit Anand", role: "Assistant Director, Directorate of Student's Welfare" }
];

const executive = [
  { name: "Abhinav Trikha", role: "Chairperson" },
  { name: "Ambika Seth", role: "Vice-Chairperson" },
  { name: "Amritansh Srivastava", role: "General Secretary" },
  { name: "Stuti Agrawal", role: "Treasurer" },
  { name: "Harshit Raj Singh", role: "Executive Secretary" },
  { name: "Suyash Pandey", role: "Managing Director" },
  { name: "Arindam Sharma", role: "Operational Director" },
  { name: "Soumyadeepa Pal", role: "Art Director" }
];

const advisory = [
  { name: "Rishabh Pandey", role: "Advisory Board" },
  { name: "Arnab Roy", role: "Advisory Board" },
  { name: "Kuber Chhabra", role: "Advisory Board" },
  { name: "Ganesh Kotwade", role: "Advisory Board" },
  { name: "Pranav Upadhyay", role: "Advisory Board" },
  { name: "Aditya Agrawal", role: "Advisory Board" },
  { name: "Anhadbani Anand", role: "Advisory Board" }
];

const community = [
  { name: "Manish Kumar Pandey", role: "Community Manager" },
  { name: "Suhani Rusia", role: "Community Manager" }
];

const heads = [
  { name: "Manas Malhotra", role: "Head of Events" },
  { name: "Anukriti Katoch", role: "Head of Programs" },
  { name: "Parisikha Jain", role: "Head of Marketing" },
  { name: "Manshi Singh", role: "Technical Head" },
  { name: "Sarthak Agrawal", role: "Head of Research & Development" },
  { name: "Siddharth Singh", role: "Head of Corporate Affairs" },
  { name: "Suyash Sharma", role: "Head of Media" },
  { name: "Prakhar Yadav", role: "Head of Curations" },
  { name: "Ananye Verma", role: "Head of Operations & Logistics" }
];

const jointHeads = [
  { name: "Jyothi Anand", role: "Joint Head of Events" },
  { name: "Yash Yadav", role: "Joint Head of Events" },
  { name: "Priyansh Agarwal", role: "Joint Head of Programs" },
  { name: "Harshit Dubey", role: "Joint Head of Programs" },
  { name: "Snehal Singh", role: "Joint Head of Programs" },
  { name: "Samyukta Basu", role: "Joint Head of Marketing" },
  { name: "Rudra Pratap Singh", role: "Joint Head of Technical" },
  { name: "Ojash Bhatnagar", role: "Joint Head of Technical" },
  { name: "Pradyumn Kabra", role: "Joint Head of Technical" },
  { name: "Shubhangi Kesharwani", role: "Joint Head of Research & Development" },
  { name: "Riya Kumari", role: "Joint Head of Research & Development" },
  { name: "Sanaya Muchhal", role: "Joint Head of Corporate Affairs" },
  { name: "Chetna Sharma", role: "Joint Head of Graphic Design" },
  { name: "Nitigya Surana", role: "Joint Head of Graphic Design" },
  { name: "Nileshwari Patil", role: "Joint Head of Media" },
  { name: "Pranjal Patel", role: "Joint Head of Media" }
];

const seniorCoords = [
  { name: "Mayank Pramanick", role: "Senior Coordinator of Programs" },
  { name: "Jiya Chhabra", role: "Senior Coordinator Marketing" },
  { name: "Aditya Tripathi", role: "Senior Coordinator Technical" },
  { name: "Mohammad Faisal", role: "Senior Coordinator Technical" },
  { name: "Satyam Jha", role: "Senior Coordinator Research & Development" },
  { name: "Saumya Singh", role: "Senior Coordinator Media" },
  { name: "Shashank Singh", role: "Senior Coordinator Operations & Logistics" },
  { name: "Lav Goyal", role: "Senior Coordinator Operations & Logistics" },
  { name: "Namit Agarwal", role: "Senior Coordinator" }
];

const getShortRole = (role) => {
  return role.replace(/^(Head of|Joint Head of|Senior Coordinator of|Senior Coordinator)\s*/i, '') || role;
};

const MemberCard = ({ member, onClick }) => (
  <div className="w-[280px] h-[380px] mx-auto flex items-center justify-center">
    <ProfileCard
      name={member.name}
      title={getShortRole(member.role)}
      handle={member.name.toLowerCase().replace(/\s+/g, '')}
      status="CSC Team"
      contactText="Socials"
      avatarUrl={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={true}
      onContactClick={() => onClick(member)}
      onClick={() => onClick(member)}
      behindGlowEnabled={true}
      behindGlowColor="rgba(255, 106, 0, 0.4)"
      innerGradient="linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(50,20,0,0.4) 100%)"
    />
  </div>
);

const Section = ({ title, members, noBackground, onMemberClick }) => (
  <div className={`relative flex flex-col justify-center items-center gap-8 w-full ${noBackground ? '' : 'p-6 md:p-8 rounded-3xl bg-neutral-900/60 border border-orange-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]'}`}>
    <div className="flex justify-center items-center w-full mb-6 border-b border-orange-500/20 pb-6">
      <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-orange-500 uppercase text-center">{title}</h2>
    </div>
    <div className="flex flex-wrap justify-center gap-10 w-full">
      {members.map((member, i) => (
        <MemberCard key={i} member={member} onClick={onMemberClick} />
      ))}
    </div>
  </div>
);

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Close modal on escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
  return (
    <>
      <Navbar />
      <main className="relative w-full pt-[120px] pb-20 text-[#eeeeee] overflow-x-hidden bg-[#0a0a0a] min-h-screen">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-orange-500/15 via-amber-600/5 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-[35%] left-[-250px] w-[650px] h-[650px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-[65%] right-[-250px] w-[650px] h-[650px] bg-orange-500/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-16 justify-center items-center max-w-[1440px] mx-auto px-4 md:px-8 mt-10">
          
          {/* Header */}
          <div className="flex justify-center items-center w-full my-4 relative">
            <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-75 pointer-events-none"></div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-600">
              Behind The Scenes
            </h1>
          </div>

          <Section title="Faculty Coordinators" members={faculty} onMemberClick={setSelectedMember} />
          <Section title="DSW" members={dsw} onMemberClick={setSelectedMember} />
          
          <div className="relative flex flex-col justify-center items-center w-full my-4 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-orange-500/10 via-neutral-900/80 to-black border border-orange-500/40 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            <div className="flex justify-center items-center w-full mb-12">
              <h2 className="text-3xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-lg uppercase text-center">
                Executive Board
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-10 w-full">
              {executive.map((member, i) => (
                <MemberCard key={i} member={member} onClick={setSelectedMember} />
              ))}
            </div>
          </div>

          <Section title="Advisory Board" members={advisory} onMemberClick={setSelectedMember} />
          <Section title="Community Managers" members={community} onMemberClick={setSelectedMember} />
          <Section title="Heads" members={heads} onMemberClick={setSelectedMember} />
          <Section title="Joint Heads" members={jointHeads} onMemberClick={setSelectedMember} />
          <Section title="Senior Co-ordinators" members={seniorCoords} onMemberClick={setSelectedMember} />

        </div>

        {/* Modal */}
        {selectedMember && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300"
            onClick={() => setSelectedMember(null)}
          >
            <div 
              className="relative bg-neutral-900 border border-orange-500/30 rounded-3xl p-8 max-w-lg w-full shadow-2xl flex flex-col items-center transform scale-100 animate-in fade-in zoom-in duration-300"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                onClick={() => setSelectedMember(null)}
              >
                <X size={24} />
              </button>
              
              <img 
                src={selectedMember.image || "https://picsum.photos/300/300?grayscale"} 
                alt={selectedMember.name} 
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-orange-500/20 mb-6 shadow-lg shadow-orange-500/10"
              />
              
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">{selectedMember.name}</h2>
              <h3 className="text-lg text-orange-400 text-center mb-8">{selectedMember.role}</h3>
              
              <div className="flex gap-6">
                <a 
                  href={selectedMember.insta || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a 
                  href={selectedMember.linkedin || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
