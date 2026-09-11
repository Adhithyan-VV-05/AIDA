import React, { useState, useEffect } from 'react';
import { Download, X, CheckCircle2, Share, Sparkles, Loader2, Smartphone, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  
  // Downloading & Installation states
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Detect if already running in standalone mode (installed PWA)
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(checkStandalone);

    if (checkStandalone) return;

    // Detect iOS
    const ua = window.navigator.userAgent;
    const iosDevice = /iPhone|iPad|iPod/.test(ua);
    setIsIOS(iosDevice);

    // Listen for PWA install prompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem('aida_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalling(false);
      setInstallProgress(100);
      setIsSuccess(true);
      setTimeout(() => {
        setShowPrompt(false);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show prompt for iOS users if not dismissed
    if (iosDevice && !sessionStorage.getItem('aida_pwa_dismissed')) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS doesn't support programmatic install, show iOS tooltip
      return;
    }

    if (!deferredPrompt) return;

    setIsInstalling(true);
    setInstallProgress(15);

    // Smooth progress simulation for fast & proper download feedback
    const timer1 = setTimeout(() => setInstallProgress(45), 200);
    const timer2 = setTimeout(() => setInstallProgress(85), 500);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (outcome === 'accepted') {
        setInstallProgress(100);
        setIsSuccess(true);
        setIsInstalling(false);
        setDeferredPrompt(null);
        
        // Auto dismiss after 2.5s and attempt auto-focus/launch
        setTimeout(() => {
          setShowPrompt(false);
        }, 2500);
      } else {
        setIsInstalling(false);
        setInstallProgress(0);
      }
    } catch (err) {
      console.error('PWA install error:', err);
      setIsInstalling(false);
      setInstallProgress(0);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('aida_pwa_dismissed', 'true');
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[99999] animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="relative p-5 rounded-[2rem] bg-neutral-950/95 border border-red-900/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:border-red-600/60 transition-all duration-300 group overflow-hidden">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-red-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/25 transition-all duration-500" />
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header: Brand Logo & Title */}
        <div className="relative flex items-center justify-between gap-3 pb-3 border-b border-neutral-900">
          <div className="flex items-center gap-3">
            {/* AIDA Logo Container */}
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-red-900/50 p-1.5 flex items-center justify-center shrink-0 shadow-md shadow-red-950/50">
              <img
                src={siteConfig.logo}
                alt="AIDA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-black text-sm tracking-tight text-white uppercase">
                  AIDA <span className="font-serif italic text-red-500 font-normal lowercase text-base">jecc</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-950/80 text-red-400 border border-red-800/40 uppercase tracking-wider">
                  OFFICIAL APP
                </span>
              </div>
              <p className="text-[11px] font-medium text-neutral-400">Department of AI & Data Science</p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body: Content or Loading State */}
        <div className="relative mt-3">
          {isSuccess ? (
            /* Success State */
            <div className="py-2 flex flex-col items-center justify-center text-center space-y-2 animate-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h5 className="text-sm font-bold text-white tracking-wide">AIDA App Installed!</h5>
              <p className="text-xs text-neutral-400">Launch from your phone home screen for instant access.</p>
            </div>
          ) : isInstalling ? (
            /* Installing Progressive Progress State */
            <div className="py-2 space-y-2.5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                <span className="flex items-center gap-2 text-red-400">
                  <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                  Installing AIDA App...
                </span>
                <span className="font-mono text-neutral-400">{installProgress}%</span>
              </div>
              {/* Progressive Glowing Progress Bar */}
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-500 transition-all duration-300 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                  style={{ width: `${installProgress}%` }}
                />
              </div>
            </div>
          ) : isIOS ? (
            /* iOS Custom Tooltip */
            <div className="py-1 space-y-2">
              <p className="text-xs text-neutral-300 leading-relaxed">
                To install AIDA on your iPhone/iPad:
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2.5 text-xs text-neutral-300">
                <Share className="w-4 h-4 text-red-400 shrink-0" />
                <span>Tap <strong className="text-white">Share</strong> then select <strong className="text-white">"Add to Home Screen"</strong></span>
              </div>
            </div>
          ) : (
            /* Normal Install Banner */
            <div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Install our official mobile app for instant home screen access, fast performance, and offline capabilities!
              </p>
            </div>
          )}
        </div>

        {/* Card Footer: Action Buttons */}
        {!isSuccess && !isInstalling && !isIOS && (
          <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between gap-3">
            <button
              onClick={handleDismiss}
              className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-1"
            >
              Not Now
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-950/80 hover:shadow-red-600/40 border border-red-500/30 transition-all transform active:scale-95 group/btn"
            >
              <Download className="w-4 h-4 text-red-100 group-hover/btn:translate-y-0.5 transition-transform" />
              <span>Install App</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-200 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
