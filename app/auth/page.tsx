"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CscLogo } from "@/components/ui/CscLogo";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Terminal,
} from "lucide-react";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityToken, setSecurityToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!regNo && !email) {
      setErrorMsg("Please enter your Student Registration Number or Email.");
      return;
    }
    if (!password) {
      setErrorMsg("Password is required.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex items-center justify-center p-4 py-16 relative overflow-hidden">
      {/* Background Matrix pattern */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40"></div>

      <div className="relative w-full max-w-md">
        {/* Glowing border card wrapper */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ff7900] to-[#ff9533] opacity-30 blur-lg"></div>

        <div className="relative bg-[#0d0e15] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Logo Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block">
              <CscLogo size={50} showText={true} />
            </Link>
            <h2 className="text-xl font-bold text-white tracking-tight pt-2">
              {authMode === "login" ? "CSC Member Sign In" : "New Member Registration"}
            </h2>
            <p className="text-xs text-slate-400">
              {authMode === "login"
                ? "Enter your credentials to access member features and event certificates."
                : "Join the CyberSpace Club student portal at Manipal University Jaipur."}
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex bg-[#161922] p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setSubmitted(false);
                setErrorMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === "login"
                  ? "bg-[#ff7900] text-black shadow-[0_0_10px_rgba(255,121,0,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("register");
                setSubmitted(false);
                setErrorMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === "register"
                  ? "bg-[#ff7900] text-black shadow-[0_0_10px_rgba(255,121,0,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Success Notification */}
          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>Authentication Successful!</span>
              </div>
              <p className="text-xs text-slate-300">
                Welcome back, <strong className="text-white">{regNo || email}</strong>. Redirecting to member dashboard...
              </p>
              <div className="pt-2">
                <Link href="/events">
                  <Button variant="orange" size="sm" className="w-full justify-center">
                    Proceed to Events & Certificates
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Registration Number / Email */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                  REGISTRATION NO. / MUJ EMAIL
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="e.g. 249301045 or user@jaipur.manipal.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900]"
                  />
                </div>
              </div>

              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                    OFFICIAL EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@jaipur.manipal.edu"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900]"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Security Key Optional */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                  CLUB TOKEN / PASSKEY (OPTIONAL)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={securityToken}
                    onChange={(e) => setSecurityToken(e.target.value)}
                    placeholder="CSC-2026-KEY"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button variant="orange" size="lg" type="submit" className="w-full justify-center gap-2">
                  <Lock className="w-4 h-4 text-black" />
                  <span>{authMode === "login" ? "Sign In to Member Portal" : "Submit Registration"}</span>
                </Button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
            Need assistance? Contact <a href="mailto:csc.muj@jaipur.manipal.edu" className="text-[#ff7900] hover:underline">csc.muj@jaipur.manipal.edu</a>
          </div>
        </div>
      </div>
    </div>
  );
}
