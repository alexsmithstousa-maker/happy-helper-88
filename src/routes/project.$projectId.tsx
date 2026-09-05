import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  RefreshCw,
  Home,
  ShieldCheck,
  Video,
  ChevronLeft,
  Eye,
  EyeOff
} from "lucide-react";

export const Route = createFileRoute("/project/$projectId")({
  component: ProjectStudioView,
});

function ProjectStudioView() {
  const { projectId } = Route.useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Resolved proxy URL (from our active HTTPS streaming engine)
  const proxyStudioUrl = `https://srv1953617.hstgr.cloud/project/${projectId}`;
  const directGoogleUrl = `https://flow.google.com/project/${projectId}`;

  const reloadIframe = () => {
    setIframeLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = proxyStudioUrl;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#070a11] text-slate-100 overflow-hidden font-sans select-none">
      {/* Studio Header Bar */}
      {!hideHeader && (
        <header className="h-12 bg-[#0e1422] border-b border-white/10 px-4 flex items-center justify-between z-50 shrink-0 transition-all">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-xs font-black text-white shadow-md shadow-indigo-500/30">
                G
              </div>
              <span className="text-xs font-bold text-white tracking-wide hidden sm:inline">
                Google Flow Studio
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-indigo-500/30">
                PRO ACTIVE
              </span>
              <span className="bg-slate-800 text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded-md border border-white/5 max-w-[140px] sm:max-w-[240px] truncate" title={projectId}>
                {projectId}
              </span>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHideHeader(true)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1.5 rounded-lg border border-white/5 transition-colors"
              title="Hide top bar (Full View)"
            >
              <EyeOff className="w-3.5 h-3.5" /> <span className="hidden md:inline">Frameless</span>
            </button>
            <button
              onClick={reloadIframe}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors"
              title="Reload Studio"
            >
              <RefreshCw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Reload</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
            </button>
            <a
              href={directGoogleUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold px-3 py-1.5 rounded-lg shadow-md shadow-indigo-500/20 transition-all"
            >
              <ExternalLink className="w-3 h-3" /> <span className="hidden sm:inline">Direct Flow</span>
            </a>
          </div>
        </header>
      )}

      {/* Floating Restore Button when Header is Hidden */}
      {hideHeader && (
        <button
          onClick={() => setHideHeader(false)}
          className="fixed top-2 right-2 z-50 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/20 px-2.5 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-md flex items-center gap-1 transition-all opacity-70 hover:opacity-100"
          title="Restore Header"
        >
          <Eye className="w-3 h-3" /> Show Bar
        </button>
      )}

      {/* Main Studio Iframe Frame */}
      <main className={`flex-1 w-full ${hideHeader ? "h-screen" : "h-[calc(100vh-48px)]"} relative bg-[#0a0d14]`}>
        <iframe
          ref={iframeRef}
          src={proxyStudioUrl}
          title={`Google Flow Studio ${projectId}`}
          className="w-full h-full border-none block"
          allow="camera; microphone; clipboard-read; clipboard-write; fullscreen; encrypted-media; autoplay"
          loading="eager"
          onLoad={() => setIframeLoading(false)}
        />
      </main>
    </div>
  );
}
