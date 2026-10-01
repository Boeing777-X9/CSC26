"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Eye, EyeOff, Link as LinkIcon, Link2Off } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image_url: string;
  is_visible: boolean;
  registration_live: boolean;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    image_url: "",
    is_visible: true,
    registration_live: false,
  });

  // Fetch Events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setEvents(data as EventItem[]);
        }
      }
    } catch (err) {
      console.error("Error fetching admin events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add New Event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        alert("Supabase client is not connected.");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from("events").insert([formData]);

      if (!error) {
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          venue: "",
          category: "",
          image_url: "",
          is_visible: true,
          registration_live: false,
        });
        fetchEvents();
        alert("Event added successfully!");
      } else {
        alert("Error adding event: " + error.message);
      }
    } catch (err: any) {
      alert("Error adding event: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Boolean Fields (is_visible, registration_live)
  const toggleStatus = async (id: string, field: "is_visible" | "registration_live", currentValue: boolean) => {
    const supabase = createClient();
    if (!supabase) return;

    const { error } = await supabase
      .from("events")
      .update({ [field]: !currentValue })
      .eq("id", id);

    if (!error) {
      fetchEvents();
    }
  };

  // Delete Event
  const deleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const supabase = createClient();
    if (!supabase) return;

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      fetchEvents();
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Event Management</h1>
          <p className="text-slate-400">Add new events and toggle their visibility on the public page.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Event Form */}
          <div className="bg-[#12141c] border border-slate-800 p-6 rounded-2xl h-fit">
            <h2 className="text-xl font-bold text-[#ff7900] mb-6">Create New Event</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">TITLE *</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff7900] outline-none" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">DESCRIPTION *</label>
                <textarea required name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff7900] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">DATE *</label>
                  <input required name="date" placeholder="e.g. Oct 24, 2026" value={formData.date} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff7900] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">TIME</label>
                  <input name="time" placeholder="e.g. 10:00 AM" value={formData.time} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff7900] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">VENUE *</label>
                  <input required name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff7900] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">CATEGORY</label>
                  <input name="category" placeholder="e.g. Hackathon" value={formData.category} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-[#ff7900] focus:border-[#ff7900] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">IMAGE URL</label>
                <input name="image_url" placeholder="https://..." value={formData.image_url} onChange={handleChange} className="w-full bg-[#090a0f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff7900] outline-none" />
              </div>

              <div className="flex items-center gap-6 pt-2 pb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="is_visible" checked={formData.is_visible} onChange={handleChange} className="w-4 h-4 accent-[#ff7900]" />
                  <span className="text-sm font-medium text-slate-300">Visible on site</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="registration_live" checked={formData.registration_live} onChange={handleChange} className="w-4 h-4 accent-emerald-500" />
                  <span className="text-sm font-medium text-slate-300">Reg Live</span>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#ff7900] hover:bg-[#ff9533] text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                {isSubmitting ? "Saving..." : "Add Event"}
              </button>
            </form>
          </div>

          {/* Existing Events List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white">Manage Database Events</h2>
            
            {loading ? (
              <div className="text-slate-400">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="bg-[#12141c] border border-slate-800 p-8 rounded-2xl text-center text-slate-500">
                No events in the database yet. You can add one using the form on the left!
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-[#12141c] border border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#ff7900] text-xs font-mono border border-[#ff7900]/30 px-2 py-0.5 rounded">
                          {event.category || "General"}
                        </span>
                        <h3 className="font-bold text-white text-lg">{event.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">
                        {event.date} • {event.venue}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {/* Visibility Toggle */}
                      <button
                        onClick={() => toggleStatus(event.id, "is_visible", event.is_visible)}
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                          event.is_visible 
                            ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" 
                            : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                        }`}
                      >
                        {event.is_visible ? <><Eye className="w-4 h-4"/> Visible</> : <><EyeOff className="w-4 h-4"/> Hidden</>}
                      </button>

                      {/* Registration Toggle */}
                      <button
                        onClick={() => toggleStatus(event.id, "registration_live", event.registration_live)}
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                          event.registration_live 
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20" 
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                        }`}
                      >
                        {event.registration_live ? <><LinkIcon className="w-4 h-4"/> Reg Open</> : <><Link2Off className="w-4 h-4"/> Reg Closed</>}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}