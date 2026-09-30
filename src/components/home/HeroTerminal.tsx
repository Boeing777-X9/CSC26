"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Play, RotateCcw, Copy, Check } from "lucide-react";

export const HeroTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: "init_csc_security.sh",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-[#ff8c32] font-bold">
            [+] CYBERSPACE CLUB (CSC MUJ) TERMINAL v2.6.0
          </p>
          <p className="text-slate-400">
            Type <span className="text-emerald-400 font-mono">help</span> to see available commands or click the buttons below.
          </p>
        </div>
      ),
    },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let res: React.ReactNode;

    switch (trimmed) {
      case "help":
        res = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-[#ff8c32] font-bold mb-1">AVAILABLE COMMANDS:</p>
            <p>
              <span className="text-emerald-400 font-bold">about</span> - Learn about CyberSpace Club MUJ
            </p>
            <p>
              <span className="text-emerald-400 font-bold">events</span> - View 2026 upcoming events & CTF schedule
            </p>
            <p>
              <span className="text-emerald-400 font-bold">domains</span> - List cybersecurity specialization tracks
            </p>
            <p>
              <span className="text-emerald-400 font-bold">whoami</span> - Display visitor identity status
            </p>
            <p>
              <span className="text-emerald-400 font-bold">clear</span> - Clear terminal screen
            </p>
          </div>
        );
        break;

      case "about":
        res = (
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            CyberSpace Club (CSC MUJ) is the flagship cybersecurity student body at Manipal University Jaipur. We specialize in ethical hacking, web penetration testing, reverse engineering, CTF competitions, and security research.
          </p>
        );
        break;

      case "events":
        res = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-[#ff8c32] font-bold">UPCOMING 2026 CALENDAR:</p>
            <p>• [2026-03-15] Flagship CyberSpace CTF (Jeopardy Format)</p>
            <p>• [2026-02-20] HackCyber 4.0 Hackathon</p>
            <p>• [2026-01-10] Zero-Day Bug Bounty Bootcamp</p>
          </div>
        );
        break;

      case "domains":
        res = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-emerald-400">1. Ethical Hacking & Penetration Testing</p>
            <p className="text-emerald-400">2. Web & Cloud Application Security</p>
            <p className="text-emerald-400">3. Digital Forensics & Reverse Engineering</p>
            <p className="text-emerald-400">4. Cryptography & Cipher Systems</p>
          </div>
        );
        break;

      case "whoami":
        res = (
          <p className="text-[#ff8c32] font-mono text-xs sm:text-sm">
            guest@cscmuj:~# Security Level: VISITOR (Authorized)
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        res = (
          <p className="text-rose-400 font-mono text-xs sm:text-sm">
            bash: command not found: &apos;{trimmed}&apos;. Type &apos;help&apos; for list of commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: cmdStr, output: res }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-[#08090e] border border-[#ff8c32]/40 shadow-[0_0_50px_rgba(255,140,50,0.2)] overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11131c] border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 text-slate-400 text-xs font-bold tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#ff8c32]" />
            csc_kernel_shell.sh
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <button
            onClick={() => handleCommand("clear")}
            className="p-1 hover:text-slate-200 transition-colors"
            title="Clear Terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 sm:p-6 min-h-[260px] max-h-[360px] overflow-y-auto space-y-4 bg-[#08090e]/95 text-slate-200">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-[#ff8c32] font-semibold">
              <span>root@cscmuj:~#</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Input Prompt */}
        <div className="flex items-center gap-2 text-[#ff8c32] pt-1">
          <span>root@cscmuj:~#</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'about'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono text-xs sm:text-sm"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="p-3 bg-[#11131c]/90 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-semibold mr-1">QUICK CMDS:</span>
        {["help", "about", "events", "domains", "whoami", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded-md bg-[#1a1d29] border border-slate-700/80 text-slate-300 hover:text-[#ff8c32] hover:border-[#ff8c32]/50 transition-all font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
