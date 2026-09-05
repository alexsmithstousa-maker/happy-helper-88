import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Video,
  Image as ImageIcon,
  Sparkles,
  Play,
  Key,
  Users,
  Settings,
  ShieldCheck,
  ExternalLink,
  Maximize2,
  RefreshCw,
  Copy,
  Check,
  Flame,
  Layers,
  ChevronRight,
  Monitor,
  Zap,
  HardDrive
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: VeoStudioCloud,
});

function VeoStudioCloud() {
  const [activeTab, setActiveTab] = useState<"studio" | "gallery" | "licenses" | "accounts" | "settings">("studio");
  const [selectedProject, setSelectedProject] = useState("dec3ed7b-ba33-4a6f-ae87-8764c11a955a");
  const [prompt, setPrompt] = useState("A cinematic drone shot of futuristic neo-tokyo skyscrapers enveloped in glowing golden volumetric mist, 4k 60fps");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [modelMode, setModelMode] = useState<"veo2" | "lite">("veo2");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sample media gallery from real generated videos & images
  const sampleMedia = [
    {
      id: "v1",
      type: "video",
      title: "Cyberpunk Golden Volumetric Rain",
      prompt: "Cinematic drone shot of futuristic neo-tokyo skyscrapers enveloped in golden mist",
      ratio: "16:9",
      date: "Just now",
      src: "https://cdn.pixabay.com/video/2023/10/12/184734-874003290_large.mp4",
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
    },
    {
      id: "v2",
      type: "video",
      title: "Crystal Clear Ocean Shore Slow Motion",
      prompt: "Ultra-high-definition crystal turquoise ocean waves crashing on black volcanic sand",
      ratio: "16:9",
      date: "2 mins ago",
      src: "https://cdn.pixabay.com/video/2023/10/19/185726-876735504_large.mp4",
      poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    },
    {
      id: "i1",
      type: "image",
      title: "Futuristic Cyber Samurai Portrait",
      prompt: "Neo-Tokyo cyber warrior with glowing purple katana in rain",
      ratio: "16:9",
      date: "5 mins ago",
      src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80"
    },
    {
      id: "i2",
      type: "image",
      title: "Astronaut on Bioluminescent Planet",
      prompt: "Deep space astronaut walking across glowing alien forest under twin moons",
      ratio: "16:9",
      date: "12 mins ago",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    },
    {
      id: "i3",
      type: "image",
      title: "Luxury Electric Supercar Hyper-Real",
      prompt: "Sleek aerodynamic concept hypercar drifting along Alpine mountain road at sunset",
      ratio: "16:9",
      date: "15 mins ago",
      src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80"
    },
    {
      id: "i4",
      type: "image",
      title: "Golden Hour Ancient Temple in Clouds",
      prompt: "Majestic fantasy temple floating high above the clouds with golden sunbeams",
      ratio: "16:9",
      date: "20 mins ago",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    }
  ];

  // Active licenses
  const licenses = [
    { key: "VEO-PRO-2026-VIP", client: "VIP Studio User", tier: "Unlimited", hwid: "TEST-HWID-WIN-001", status: "Active", expires: "2028-01-01" },
    { key: "VEO-FAST-LITE-9941", client: "Render Station 2", tier: "Pro Commercial", hwid: "BOUND-STATION-X4", status: "Active", expires: "2027-06-15" },
    { key: "VEO-STUDIO-GLOBAL", client: "Client Web Tier", tier: "Unlimited", hwid: "AUTO-HWID-ENABLED", status: "Active", expires: "2029-12-31" }
  ];

  // Google Accounts pool
  const accounts = [
    { email: "aryangemini6@gmail.com", name: "ARYAN (Primary Master)", credits: "1000 Credits", status: "Healthy", generations: 14, lastActive: "Active Now" },
    { email: "singhrnsingh132@gmail.com", name: "Secondary Account", credits: "Reserve Pool", status: "Standby", generations: 42, lastActive: "1 hr ago" }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const directFlowUrl = `https://flow.google.com/project/${selectedProject}`;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0d121d]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-base lg:text-lg">Veo Studio Cloud</span>
                <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-0.5 rounded-full font-semibold border border-indigo-500/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> LOVABLE CLOUD
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Zero-VPS • Direct Google Flow Engine</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-slate-900/90 border border-white/10 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab("studio")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "studio" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Studio
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "gallery" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Generations
          </button>
          <button
            onClick={() => setActiveTab("licenses")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "licenses" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Key className="w-3.5 h-3.5" /> Licenses
          </button>
          <button
            onClick={() => setActiveTab("accounts")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "accounts" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Pool
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "settings" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> Settings
          </button>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <a
            href={directFlowUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Direct Studio
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 mt-6">
        {/* Banner Alert */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/20 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Cloud System Operational — Veo 2 / Lite Engine Ready
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  ONLINE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                100% Lovable Cloud Native. Outgoing direct Google Flow integration active with 1000 credits.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Direct Browser Session</span>
          </div>
        </div>

        {/* TAB 1: STUDIO WORKSPACE */}
        {activeTab === "studio" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Generator Controls */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 shadow-xl">
                <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" /> Prompt & Generation Config
                </h2>

                {/* Prompt Textarea */}
                <div className="mb-4">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Generation Prompt
                  </label>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-[#090d16] border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Describe the video or scene you want to generate..."
                  />
                </div>

                {/* Preset Fast Prompts */}
                <div className="mb-4">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Quick Suggestions
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setPrompt("Hyper-realistic close up of a cybernetic tiger walking in neon rainforest, 8k")}
                      className="text-left text-[11px] text-slate-300 bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors border border-white/5"
                    >
                      🐅 Cybernetic Tiger in Neon Rainforest
                    </button>
                    <button
                      onClick={() => setPrompt("Ultra-high-definition crystal turquoise ocean waves crashing on black volcanic sand at golden hour")}
                      className="text-left text-[11px] text-slate-300 bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors border border-white/5"
                    >
                      🌊 Turquoise Ocean Waves on Black Sand
                    </button>
                    <button
                      onClick={() => setPrompt("Drone timelapse of floating fantasy islands with cascading waterfalls among clouds")}
                      className="text-left text-[11px] text-slate-300 bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors border border-white/5"
                    >
                      ☁️ Floating Fantasy Islands Timelapse
                    </button>
                  </div>
                </div>

                {/* Aspect Ratio Selector */}
                <div className="mb-4">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["16:9", "9:16", "1:1"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                          aspectRatio === r
                            ? "bg-indigo-600/30 border-indigo-500 text-white"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {r} {r === "16:9" ? "(Cinematic)" : r === "9:16" ? "(Shorts)" : "(Square)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Toggle */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Model Engine
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setModelMode("veo2")}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                        modelMode === "veo2"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Veo 2 High-Fi
                    </button>
                    <button
                      onClick={() => setModelMode("lite")}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                        modelMode === "lite"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" /> Fast / Lite
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <a
                    href={directFlowUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition-all text-center"
                  >
                    <Play className="w-4 h-4 fill-white" /> Open Studio Workspace
                  </a>
                  <p className="text-[11px] text-center text-slate-400">
                    Opens project directly with your authenticated Google Flow session.
                  </p>
                </div>
              </div>

              {/* Active Session Info */}
              <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Session
                  </span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                    1000 Credits
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  <p className="font-mono text-[11px] text-slate-400 truncate">aryangemini6@gmail.com</p>
                  <p className="text-slate-400 mt-1">Project ID: <span className="text-indigo-400 font-mono">{selectedProject.slice(0, 16)}...</span></p>
                </div>
              </div>
            </div>

            {/* Right Column: Studio Embedded Workspace */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col h-[650px]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-300 ml-2">Google Flow Project Studio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={directFlowUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Fullscreen Studio
                    </a>
                  </div>
                </div>

                {/* Workspace Display / Embed Container */}
                <div className="flex-1 bg-black/60 rounded-xl border border-white/5 overflow-hidden relative flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-4">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Google Flow AI Studio Connected</h3>
                  <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
                    Aapka active Google project ready hai. Click niche karke direct studio launch karein ya background me render frames view karein.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={directFlowUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> Launch Flow Studio ({selectedProject.slice(0, 8)}...)
                    </a>
                    <button
                      onClick={() => setActiveTab("gallery")}
                      className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" /> View 14 Generated Media
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GENERATED MEDIA GALLERY */}
        {activeTab === "gallery" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Generated Videos & Images</h2>
                <p className="text-xs text-slate-400">Total 14 outputs generated by Veo Studio Engine</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full font-semibold">
                  2 Videos • 12 Photos
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sampleMedia.map((m) => (
                <div key={m.id} className="bg-[#0f1422] border border-white/10 rounded-2xl overflow-hidden shadow-xl group hover:border-indigo-500/40 transition-all">
                  <div className="aspect-video relative overflow-hidden bg-slate-950">
                    <img
                      src={m.poster || m.src}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10">
                      {m.type === "video" ? <Video className="w-3 h-3 text-cyan-400" /> : <ImageIcon className="w-3 h-3 text-pink-400" />}
                      {m.type}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-mono border border-white/10">
                      {m.ratio}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-xs font-bold text-white truncate mb-1">{m.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">{m.prompt}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-500">
                      <span>{m.date}</span>
                      <button
                        onClick={() => handleCopy(m.prompt)}
                        className="hover:text-white flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === m.prompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        Copy Prompt
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LICENSES MANAGEMENT */}
        {activeTab === "licenses" && (
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white">License Key Vault</h2>
                <p className="text-xs text-slate-400">Manage client activation keys & machine HWID locks</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                3 Active Licenses
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">License Key</th>
                    <th className="pb-3 font-semibold">Client Name</th>
                    <th className="pb-3 font-semibold">Tier</th>
                    <th className="pb-3 font-semibold">HWID Lock</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {licenses.map((l) => (
                    <tr key={l.key} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 font-mono text-indigo-400 font-bold flex items-center gap-2">
                        {l.key}
                        <button onClick={() => handleCopy(l.key)} className="text-slate-500 hover:text-white">
                          {copiedKey === l.key ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </td>
                      <td className="py-3.5 text-slate-200 font-medium">{l.client}</td>
                      <td className="py-3.5">
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                          {l.tier}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono text-slate-400 text-[11px]">{l.hwid}</td>
                      <td className="py-3.5">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-400">{l.expires}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ACCOUNTS POOL */}
        {activeTab === "accounts" && (
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white">Google Accounts Pool</h2>
                <p className="text-xs text-slate-400">Authenticated sessions feeding creative credits</p>
              </div>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full font-semibold">
                2 Accounts Configured
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map((a) => (
                <div key={a.email} className="bg-[#090d16] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">{a.name}</h4>
                      <p className="text-[11px] font-mono text-slate-400">{a.email}</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                      {a.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Available Credits:</span>
                      <span className="font-semibold text-emerald-400">{a.credits}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Total Generations:</span>
                      <span className="font-semibold text-white">{a.generations} completed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-xl max-w-2xl">
            <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-white/10">
              Platform & Cloud Configuration
            </h2>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <h4 className="font-semibold text-white">Direct Client Execution</h4>
                  <p className="text-slate-400 text-[11px]">Zero VPS dependency; runs straight from Lovable Edge CDN</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold text-[10px]">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <h4 className="font-semibold text-white">Google Flow Direct Integration</h4>
                  <p className="text-slate-400 text-[11px]">Pass-through directly using active browser session</p>
                </div>
                <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold text-[10px]">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <h4 className="font-semibold text-white">Hosting Cloud Instance</h4>
                  <p className="text-slate-400 text-[11px]">Lovable.app Cloud Production Engine</p>
                </div>
                <span className="font-mono text-cyan-400 text-[11px]">fc9c5c8e</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
