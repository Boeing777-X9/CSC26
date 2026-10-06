"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";

type Event = {
  id: string;
  title: string;
  certificates_live: boolean;
};

export default function AdminCertificatesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("id, title, certificates_live")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching events:", error);
    else setEvents(data || []);
    setLoading(false);
  };

  const toggleCertificateStatus = async (eventId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    setEvents(events.map(e => e.id === eventId ? { ...e, certificates_live: newStatus } : e));

    const { error } = await supabase
      .from("events")
      .update({ certificates_live: newStatus })
      .eq("id", eventId);

    if (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
      fetchEvents(); 
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <div className="max-w-4xl mx-auto bg-[#161922] p-8 rounded-2xl border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6">Certificate Distribution Control</h1>
        <p className="text-zinc-400 mb-8">Toggle the visibility of certificates for user dashboards.</p>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#ff7900]" />
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-zinc-800/50">
                <span className="font-medium text-lg">{event.title}</span>
                <button
                  onClick={() => toggleCertificateStatus(event.id, event.certificates_live)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
                    event.certificates_live 
                      ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {event.certificates_live ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {event.certificates_live ? "Live" : "Hidden"}
                </button>
              </div>
            ))}
            {events.length === 0 && <p className="text-zinc-500 text-center py-8">No events found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}