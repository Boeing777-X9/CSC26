import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TiltedCard from '../components/TiltedCard';
import CurvedInput from '../components/CurvedInput';
import { Search } from 'lucide-react';

const pastEventsData = [
  { title: "DECRYPTA", tags: ["game on", "minds unleashed", "puzzle decryption"] },
  { title: "Bounty Bonanza 3.0", tags: ["halloween hunt", "whispers and winners", "eerie escapade"] },
  { title: "Rewind & Recode", tags: ["D3-Tech Fest", "code for change", "innovation unleashed"] },
  { title: "Cyber Awareness Camp", tags: ["digital wellness", "online safety", "responsible internet surfing"] },
  { title: "Modular Nexus", tags: ["IoT challenge", "score and shine", "gamified learning"] },
  { title: "PlayTopia", tags: ["teamwork wins", "battle of brains", "outsmart outplay"] },
  { title: "Hack n' Earn 2.0", tags: ["skillshot", "precision", "bitwise", "stacktrace"] },
  { title: "Build & Deploy 2.0", tags: ["mentorship", "hands on", "beginner-friendly"] },
  { title: "Capture the Flag", tags: ["cyber security", "logic warfare", "informative"] },
  { title: "Alice in Borderland", tags: ["high stakes", "survival games", "adreneline fueled"] },
  { title: "Bounty Bonanza 2.0", tags: ["mystery driven", "fast paced", "brain teasing", "thrilling"] },
  { title: "Build Fest", tags: ["creative", "technological", "real world impact"] },
  { title: "Battle Blitz 2.0", tags: ["social games", "activities", "challenges", "fun"] },
  { title: "Error Odyssey 2.0", tags: ["competition", "coding", "debugging", "C"] },
  { title: "AI vs Human Debate", tags: ["future", "intelligence", "imagination", "machine-vs-mind"] }
];

const EventCard = ({ event }) => (
  <div className="flex flex-col items-center gap-4">
    <TiltedCard
      imageSrc={`https://picsum.photos/seed/${event.title.replace(/\s+/g, '')}/300/300?grayscale`}
      altText={event.title}
      captionText=""
      containerHeight="200px"
      containerWidth="200px"
      imageHeight="200px"
      imageWidth="200px"
      rotateAmplitude={12}
      scaleOnHover={1.1}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={false}
    />
    <div className="text-center mt-2 max-w-[250px]">
      <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {event.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = pastEventsData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <div className="flex flex-col justify-center items-center w-full my-4 relative z-10">
            <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full scale-75 pointer-events-none"></div>
            <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#fe8d32] to-[#f8be19] text-transparent bg-clip-text relative z-10">
              Our Events
            </h1>
            
            <div className="flex justify-center mb-12">
              <div className="bg-[#1a1a1a] rounded-full p-1 flex">
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-2 rounded-full transition-all ${activeTab === 'upcoming' ? 'bg-gradient-to-r from-[#fe8d32] to-[#ce9700] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Upcoming Events
                </button>
                <button 
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-2 rounded-full transition-all ${activeTab === 'past' ? 'bg-gradient-to-r from-[#fe8d32] to-[#ce9700] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Past Events
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'upcoming' && (
            <div className="text-center py-16 z-10">
              <p className="text-gray-400 text-xl">Coming Soon</p>
            </div>
          )}

          {activeTab === 'past' && (
            <div className="relative flex flex-col justify-center items-center w-full my-4 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-orange-500/10 via-neutral-900/80 to-black border border-orange-500/40 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.1)] z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
              
              <div className="flex flex-col items-center w-full mb-12 gap-8">
                {/* Search Bar */}
                <div className="relative w-full max-w-lg mb-8">
                  <CurvedInput
                    placeholder="Search past events..."
                    buttonText="Search"
                    theme="dark"
                    bend={22}
                    height={60}
                    width="100%"
                    backgroundColor="rgba(0,0,0,0.4)"
                    borderColor="rgba(254, 141, 50, 0.5)"
                    buttonColor="#fe8d32"
                    buttonTextColor="#ffffff"
                    iconColor="#fe8d32"
                    value={searchTerm}
                    onChange={(val) => setSearchTerm(val)}
                    onSubmit={(val) => setSearchTerm(val)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 w-full justify-items-center">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, i) => (
                    <EventCard key={i} event={event} />
                  ))
                ) : (
                  <div className="col-span-full py-12">
                    <p className="text-neutral-500 text-lg">No events found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
