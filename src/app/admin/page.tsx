"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, ShieldAlert, LayoutDashboard, LogOut, Loader2, Award } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      setCheckingAuth(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user?.email) {
        setIsAuthorized(false);
        setCheckingAuth(false);
        return;
      }

      setUserEmail(user.email);

      // Check if their email is in your admins table
      const { data: adminData } = await supabase
        .from("admins")
        .select("email")
        .eq("email", user.email)
        .single();

      if (adminData) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      
      setCheckingAuth(false);
    };

    verifyAccess();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirects to the homepage after logout
    router.refresh();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#ff7900] gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading Dashboard...</span>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-bold text-white mb-2">Not Logged In</h2>
        <p className="text-zinc-400 mb-6">You need to sign in to view the admin dashboard.</p>
        <Link href="/login" className="bg-[#ff7900] text-black px-6 py-2.5 rounded-xl font-bold hover:bg-white transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Dashboard Header with Logout Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <LayoutDashboard className="w-8 h-8 text-[#ff7900]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-zinc-400 mt-1">Logged in as <span className="text-white font-mono">{userEmail}</span></p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-rose-500/10 hover:border-rose-500/50 text-zinc-300 hover:text-rose-500 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Access Check & Navigation Grid */}
        {!isAuthorized ? (
          <div className="bg-rose-950/20 border border-rose-500/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <ShieldAlert className="w-12 h-12 text-rose-500 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Admin Access</h2>
            <p className="text-zinc-400 max-w-md">
              Your account does not have admin permissions for this website. Please contact the system administrator if you believe this is an error.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Events Management Card */}
            <Link 
              href="/admin/events" 
              className="group block bg-[#161922] border border-zinc-800 rounded-2xl p-6 hover:border-[#ff7900] hover:shadow-[0_0_25px_rgba(255,121,0,0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              <Calendar className="w-8 h-8 text-[#ff7900] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-1.5">Manage Events</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Add new events, edit details, update Cloudinary posters, and toggle registration status.
              </p>
            </Link>

            {/* Certificates Management Card */}
            <Link 
              href="/admin/certificates" 
              className="group block bg-[#161922] border border-zinc-800 rounded-2xl p-6 hover:border-[#ff7900] hover:shadow-[0_0_25px_rgba(255,121,0,0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              <Award className="w-8 h-8 text-[#ff7900] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-1.5">Certificates</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Toggle certificate visibility for users and distribute verification for past events.
              </p>
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
}