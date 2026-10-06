"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, X, ShieldAlert, Save, UploadCloud, Loader2 } from "lucide-react";

export default function AdminEventsPage() {
  const supabase = createClient();
  
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "TBA",
    venue: "MUJ Campus",
    description: "",
    category: "General",
    type: "normal",
    image_url: "",
    registration_live: false,
    is_visible: true,
  });

  useEffect(() => {
    const verifyAdminAccess = async () => {
      setCheckingAuth(true);
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user?.email) {
          setIsAuthorized(false);
          return;
        }
        setAdminEmail(user.email);
        const { data: adminData } = await supabase.from("admins").select("email").eq("email", user.email).single();
        if (adminData) {
          setIsAuthorized(true);
          fetchEvents(); 
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        setIsAuthorized(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    verifyAdminAccess();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      
      if (data.url) {
        setFormData({ ...formData, image_url: data.url });
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Upload failed. Are you sure you are an admin?");
    } finally {
      setImageUploading(false);
    }
  };

  const handleOpenModal = (event: any = null) => {
    if (event) {
      setEditingId(event.id);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time || "TBA",
        venue: event.venue || "MUJ Campus",
        description: event.description,
        category: event.category || "General",
        type: event.type || "normal",
        image_url: event.image_url || "",
        registration_live: event.registration_live,
        is_visible: event.is_visible,
      });
    } else {
      setEditingId(null);
      setFormData({ title: "", date: "", time: "TBA", venue: "MUJ Campus", description: "", category: "General", type: "normal", image_url: "", registration_live: false, is_visible: true });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await supabase.from("events").update(formData).eq("id", editingId);
    } else {
      await supabase.from("events").insert([formData]);
    }
    await fetchEvents();
    setIsModalOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event? This cannot be undone.")) {
      setLoading(true);
      await supabase.from("events").delete().eq("id", id);
      await fetchEvents();
      setLoading(false);
    }
  };

  if (checkingAuth) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#ff7900]">Verifying credentials...</div>;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-zinc-400 text-center max-w-md">Your email address ({adminEmail}) is not authorized.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Event Management</h1>
            <p className="text-sm text-zinc-400 mt-1">Authenticated as {adminEmail}</p>
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#ff7900] text-black px-5 py-2.5 rounded-xl font-bold hover:bg-white transition-colors">
            <Plus className="w-4 h-4" /> Create New Event
          </button>
        </div>

        <div className="bg-[#161922] rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400 font-mono text-xs uppercase border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Event Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${event.registration_live ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}>
                        {event.registration_live ? "Registrations Open" : "Closed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{event.title}</td>
                    <td className="px-6 py-4 text-zinc-400 font-mono text-xs">{event.date}</td>
                    <td className="px-6 py-4 flex justify-end gap-3">
                      <button onClick={() => handleOpenModal(event)} className="text-zinc-400 hover:text-[#ff7900] transition-colors p-1"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(event.id)} className="text-zinc-400 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161922] w-full max-w-2xl rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Event" : "Create New Event"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
              
              <div className="p-4 bg-zinc-900/50 border border-zinc-700 border-dashed rounded-xl flex flex-col items-center justify-center gap-3">
                {formData.image_url ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-800">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain bg-black" />
                    <button type="button" onClick={() => setFormData({...formData, image_url: ""})} className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-md hover:bg-rose-600"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-zinc-400" />
                    <label className="cursor-pointer bg-[#ff7900] text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors flex items-center gap-2">
                      {imageUploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : "Upload Poster"}
                      <input type="file" accept="image/*" onChange={uploadImage} className="hidden" disabled={imageUploading} />
                    </label>
                    <p className="text-xs text-zinc-500">Upload direct to Cloudinary</p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-[#ff7900] focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</label>
                  <input required type="text" placeholder="e.g. 15 March 2026" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-[#ff7900] focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-[#ff7900] focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-3 p-3 bg-black border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700">
                  <input type="checkbox" checked={formData.registration_live} onChange={e => setFormData({...formData, registration_live: e.target.checked})} className="w-4 h-4 accent-[#ff7900]" />
                  <span className="text-sm font-medium text-white">Registrations Open</span>
                </label>
                
                <label className="flex items-center gap-3 p-3 bg-black border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700">
                  <input type="checkbox" checked={formData.is_visible} onChange={e => setFormData({...formData, is_visible: e.target.checked})} className="w-4 h-4 accent-[#ff7900]" />
                  <span className="text-sm font-medium text-white">Publicly Visible</span>
                </label>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-zinc-300 hover:bg-zinc-800 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="px-5 py-2.5 bg-[#ff7900] text-black rounded-xl font-bold hover:bg-white transition-colors flex items-center gap-2">
                  {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Event</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}