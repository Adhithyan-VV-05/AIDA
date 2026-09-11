import React, { useState, useEffect } from 'react';
import { Download, X, WifiOff, CheckCircle2, Sparkles, Smartphone } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Catch browser PWA install event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user already dismissed install prompt in this session
      const dismissed = sessionStorage.getItem('aida_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowOfflineToast(true);
      setTimeout(() => setShowOfflineToast(false), 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOfflineToast(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('aida_pwa_dismissed', 'true');
  };

  return (
    <>
      {/* Offline / Back Online Toast Banner */}
      {showOfflineToast && (
        <div className="fixed top-20 right-4 z-[9999] transition-all duration-300 transform translate-y-0">
          <div className={`px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 text-sm font-medium ${
            isOffline 
              ? 'bg-amber-950/80 border-amber-500/40 text-amber-200' 
              : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
          }`}>
            {isOffline ? (
              <>
                <WifiOff className="w-5 h-5 text-amber-400 animate-pulse" />
                <div>
                  <p className="font-semibold text-amber-100">You are offline</p>
                  <p className="text-xs text-amber-300/80">AIDA is cached & ready for offline access.</p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-semibold text-emerald-100">Back Online</p>
                  <p className="text-xs text-emerald-300/80">Connected to network.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PWA Install Banner */}
      {showPrompt && !installed && (
        <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="relative p-5 rounded-3xl bg-neutral-900/90 border border-purple-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl group-hover:bg-sky-500/30 transition-all duration-500" />

            <div className="relative flex items-start gap-4">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-sky-500 p-[1px] shrink-0 shadow-lg shadow-purple-500/20">
                <div className="w-full h-full rounded-[15px] bg-neutral-950 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[11px] font-bold tracking-widest text-purple-400 uppercase">App Available</span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">Install AIDA JECC</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Install our app for quick home screen access, fast performance, and offline browsing!
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-0 right-0 p-1 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-end gap-2">
              <button
                onClick={handleDismiss}
                className="px-3.5 py-1.5 text-xs font-semibold text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Not Now
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white shadow-lg shadow-purple-500/25 transition-all transform active:scale-95 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Install App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
