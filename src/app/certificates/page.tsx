"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { Loader2, Download, Award } from "lucide-react";

type UserCertificate = {
  event_id: string;
  events: {
    name: string;
    certificates_live: boolean;
  };
};

export default function UserCertificatesPage() {
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchUserCertificates();
  }, []);

  const fetchUserCertificates = async () => {
    setLoading(true);
    
    // 1. Get logged in user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      setLoading(false);
      return;
    }

    // 2. Fetch registrations for this user where the event's certificate is live
    // Note: Adjust table and column names to match your exact schema
    const { data, error } = await supabase
      .from("event_registrations")
      .select(`
        event_id,
        events (
          name,
          certificates_live
        )
      `)
      .eq("email", user.email);

    if (error) {
      console.error("Error fetching certificates:", error);
    } else {
      // Filter out registrations where the linked event's certificates are hidden
      const liveCertificates = (data as any[]).filter(
        (reg) => reg.events?.certificates_live === true
      );
      setCertificates(liveCertificates);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <Award className="w-12 h-12 text-[#ff7900] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
          <p className="text-zinc-400">View and download your earned Cyberspace Club certificates.</p>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#ff7900]" />
          </div>
        ) : certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div key={cert.event_id} className="bg-[#161922] p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between h-48 group relative overflow-hidden">
                <div className="z-10">
                  <p className="text-[#ff7900] text-xs font-bold uppercase tracking-wider mb-2">Verified Attendance</p>
                  <h2 className="text-xl font-bold">{cert.events.name}</h2>
                </div>
                
                {/* 
                  Replace the href below with your actual certificate generation route 
                  (e.g., passing the event_id and user email to a PDF generator API)
                */}
                <a 
                  href={`/api/certificates/generate?event_id=${cert.event_id}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-10 flex items-center justify-center gap-2 w-full bg-white text-black py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>

                {/* Decorative background icon */}
                <Award className="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-[0.02] group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#161922] p-12 rounded-2xl border border-zinc-800 text-center">
            <p className="text-zinc-400 mb-2">You don't have any available certificates yet.</p>
            <p className="text-sm text-zinc-500">If you recently attended an event, the admin may not have published them yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}