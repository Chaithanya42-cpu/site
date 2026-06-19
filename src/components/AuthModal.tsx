import React, { useState } from "react";
import { X, Smartphone, Mail, Key } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, name: string) => void;
}

type AuthTab = "login" | "signup" | "otp";

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [email, setEmail] = useState("demo@lumina.com");
  const [password, setPassword] = useState("password123");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("123456");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "demo@lumina.com" && password === "password123") {
      onSuccess(email, "Demo Reader");
      onClose();
    } else if (email && password) {
      onSuccess(email, email.split("@")[0]);
      onClose();
    } else {
      alert("Invalid credentials. Please fill in the required details.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPass) {
      alert("All fields are required.");
      return;
    }
    onSuccess(registerEmail, registerName);
    onClose();
  };

  const handleOtpRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert("Please enter a valid mobile number.");
      return;
    }
    if (!otpSent) {
      setOtpSent(true);
      alert("Demo OTP '123456' has been sent to " + phone);
    } else {
      if (otpCode === "123456") {
        onSuccess(`phone-${phone.replace(/\D/g, "")}@lumina.com`, "OTP Reader");
        onClose();
      } else {
        alert("Incorrect OTP. Please check the simulated SMS.");
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    onSuccess(
      `${provider.toLowerCase()}-${Math.floor(Math.random() * 1000)}@lumina.com`,
      `${provider} Customer`
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/65 backdrop-blur-[4px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 md:p-8 z-10 border border-brand-ivory-dark"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-ink p-1 rounded-full hover:bg-brand-ivory transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="font-serif text-2.5xl font-extrabold text-brand-ink mb-1">
                Reader Log In
              </h2>
              <p className="text-xs text-gray-500">
                Unlock downloads, save purchase histories, and check reading plans.
              </p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-brand-ivory-dark/60 mb-6">
              {(["login", "signup", "otp"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setOtpSent(false);
                  }}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider border-b-2 text-center transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "border-brand-amber text-brand-amber"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "login" && "Sign In"}
                  {tab === "signup" && "Register"}
                  {tab === "otp" && "SMS OTP"}
                </button>
              ))}
            </div>

            {/* login panel */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink placeholder-gray-400"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-amber text-brand-ink rounded-xl py-3 font-bold text-sm tracking-wide shadow-md hover:bg-brand-amber-deep transition-all mt-6 cursor-pointer"
                >
                  Verify Credentials
                </button>
              </form>
            )}

            {/* register panel */}
            {activeTab === "signup" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                    Create Password
                  </label>
                  <input
                    type="password"
                    required
                    value={registerPass}
                    onChange={(e) => setRegisterPass(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-ink text-white rounded-xl py-3 font-bold text-sm tracking-wide shadow-md hover:bg-brand-teal transition-all mt-6 cursor-pointer"
                >
                  Register Account
                </button>
              </form>
            )}

            {/* mobile otp panel */}
            {activeTab === "otp" && (
              <form onSubmit={handleOtpRequest} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink placeholder-gray-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide flex justify-between">
                      <span>SMS Verification Code</span>
                      <span className="text-brand-teal font-extrabold font-mono">CODE SENT</span>
                    </label>
                    <input
                      type="text"
                      align="center"
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-4 py-2.5 text-center tracking-[0.5em] font-mono text-lg font-bold border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber transition-all text-brand-ink"
                    />
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-teal text-white rounded-xl py-3 font-bold text-sm tracking-wide shadow-md hover:bg-brand-teal-light transition-all mt-6 cursor-pointer"
                >
                  {otpSent ? "Verify Mobile OTP" : "Send Login OTP Code"}
                </button>
              </form>
            )}

            <div className="text-center my-4 font-mono text-[10px] text-gray-400">
              OR CONTINUE WITH
            </div>

            {/* SOCIAL SSO */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex-1 py-2.5 px-4 border border-gray-200 hover:border-brand-amber rounded-xl text-xs font-bold text-gray-700 bg-white shadow-sm flex items-center justify-center gap-2 hover:bg-brand-ivory transition-all cursor-pointer"
              >
                <span className="text-blue-500 font-black">G</span> Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="flex-1 py-2.5 px-4 border border-gray-200 hover:border-brand-amber rounded-xl text-xs font-bold text-gray-700 bg-white shadow-sm flex items-center justify-center gap-2 hover:bg-brand-ivory transition-all cursor-pointer"
              >
                <span className="text-blue-700 font-black">F</span> Facebook
              </button>
            </div>
            
            <p className="text-center text-[11px] text-gray-400 mt-6 pt-3 border-t border-brand-ivory-mid">
              Demo account loaded. Click "Verify Credentials" to explore instantly!
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
