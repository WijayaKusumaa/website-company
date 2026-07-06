import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [isLoginView, setIsLoginView] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLoginView && !fullName)) return;

    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      onSuccess(email);
      setFullName('');
      setEmail('');
      setPassword('');
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[920px] bg-[#FDFDFD] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 min-h-[600px] border border-slate-100"
          >
            {/* Left side - Video Panel */}
            <div className="relative w-full md:w-1/2 h-40 md:h-auto overflow-hidden bg-[#0A0D1A] flex-shrink-0">
              <video 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a1a]/95 via-[#060a1a]/30 to-transparent" />
              
              {/* Brand Label Overlay */}
              <div className="absolute top-6 left-6 text-white font-black tracking-widest text-base z-10 flex items-center gap-2">
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 w-2.5 h-2.5 rounded-full animate-pulse" />
                FREELANCER
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-10 hidden md:block">
                <h4 className="text-lg font-bold mb-1.5 text-slate-100">Turn bold thinking into outcomes.</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Join our network of elite creators and companies shaping the digital horizon.</p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 bg-white flex flex-col justify-center items-center text-slate-800 relative">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full border border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="w-full max-w-[340px] flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                    {isLoginView ? 'Log In' : 'Create Account'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isLoginView ? 'Welcome back! Please enter your details.' : 'Start your creative development journey.'}
                  </p>
                </div>

                {/* Google SSO Button */}
                <button 
                  type="button"
                  className="w-full py-2.5 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  <GoogleIcon />
                  <span>{isLoginView ? 'Log in with Google' : 'Sign up with Google'}</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {!isLoginView && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">Full Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
                          <User size={15} />
                        </span>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm outline-none placeholder-slate-400/80 focus:border-orange-500/80 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 shadow-inner"
                          style={{ paddingLeft: '44px' }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">Email Address</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
                        <Mail size={15} />
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm outline-none placeholder-slate-400/80 focus:border-orange-500/80 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 shadow-inner"
                        style={{ paddingLeft: '44px' }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
                        <Lock size={15} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm outline-none placeholder-slate-400/80 focus:border-orange-500/80 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 shadow-inner"
                        style={{ paddingLeft: '44px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 p-1 cursor-pointer transition-colors"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#E55A00] to-[#FF7A00] hover:from-[#D45300] hover:to-[#E55A00] text-white font-bold py-3 rounded-xl mt-2 transition-all duration-300 disabled:opacity-70 flex justify-center items-center h-[48px] cursor-pointer shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      isLoginView ? 'Log In' : 'Create Account'
                    )}
                  </button>
                </form>

                {/* Toggle View */}
                <p className="text-center text-xs text-slate-500 font-semibold">
                  {isLoginView ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="text-[#E55A00] hover:text-[#D45300] hover:underline font-bold cursor-pointer"
                  >
                    {isLoginView ? 'Sign up' : 'Log in'}
                  </button>
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-3.5 mt-2 text-slate-400 border-t border-slate-100 pt-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center hover:text-blue-600 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"><FacebookIcon size={14} /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center hover:text-sky-500 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"><TwitterIcon size={14} /></a>
                  <a href="https://github.com/WijayaKusumaa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center hover:text-slate-800 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"><GithubIcon size={14} /></a>
                  <a href="https://www.instagram.com/haswaltch_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center hover:text-pink-600 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"><InstagramIcon size={14} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
