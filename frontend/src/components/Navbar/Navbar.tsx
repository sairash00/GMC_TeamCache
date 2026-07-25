import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  IoSearchOutline,
  IoClose,
  IoWalletOutline,
  IoVideocamOutline,
  IoChatbubbleEllipsesOutline,
  IoStarOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = (() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      return userData || {};
    } catch {
      return {};
    }
  })();

  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-surface/95 backdrop-blur-xl border-l border-border/50 shadow-lg transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar?.url || ""}
              alt="avatar"
              className="w-11 h-11 rounded-full object-cover border border-border"
            />

            <div>
              <h3 className="font-semibold text-text-primary">John Doe</h3>
              <p className="text-xs text-credits font-medium">
                {user.credits || "0"} Credits
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-border/50 rounded-lg transition-colors"
          >
            <IoClose size={24} className="text-text-primary" />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-5 text-text-secondary font-medium">
          <Link
            to="/videos"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-primary/10"
          >
            <IoVideocamOutline size={18} />
            Videos
          </Link>

          <Link
            to="/skill-requests"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-primary/10"
          >
            <IoChatbubbleEllipsesOutline size={18} />
            Skill Requests
          </Link>

          <Link
            to="/upload-video"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-primary/10"
          >
            <IoCloudUploadOutline size={18} />
            Upload
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-primary/10"
          >
            Profile
          </Link>

        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Floating Navigation - Three Section Liquid Glass Design */}
      <nav className="sticky top-4 z-30 mx-4 lg:mx-10">
        <div className="h-16 flex items-center gap-4 px-2">
          {/* Section 1: Logo - Left */}
          <Link
            to="/"
            className="flex-shrink-0 px-5 py-2 bg-surface/90 backdrop-blur-3xl border border-border/40 rounded-2xl text-2xl font-bold tracking-tight text-primary hover:text-secondary transition-colors relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent"
          >
            SkillSnap
          </Link>

          {/* Section 2: Center Navigation Links - TRUE CENTER */}
          <div className="flex-1 flex justify-center px-3">
            <div className="flex items-center gap-1 bg-primary/5 backdrop-blur-3xl border border-primary/20 rounded-2xl px-3 py-1.5 shadow-[0_8px_32px_rgba(17,24,68,0.15)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50">
              <Link
                to="/videos"
                className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 px-4 rounded-xl text-text-secondary font-medium hover:bg-white/5 relative z-10"
              >
                <IoVideocamOutline size={16} />
                Videos
              </Link>

              <Link
                to="/skill-requests"
                className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 px-4 rounded-xl text-text-secondary font-medium hover:bg-white/5 relative z-10"
              >
                <IoChatbubbleEllipsesOutline size={16} />
                Requests
              </Link>

              <Link
                to="/premiumvideos"
                className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 px-4 rounded-xl text-text-secondary font-medium hover:bg-white/5 relative z-10"
              >
                <IoStarOutline size={16} />
                Premium
              </Link>

              <Link
                to="/upload-video"
                className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 px-4 rounded-xl text-text-secondary font-medium hover:bg-white/5 relative z-10"
              >
                <IoCloudUploadOutline size={16} />
                Upload
              </Link>
            </div>
          </div>

          {/* Section 3: Right Side - Wallet, Search, Avatar */}
          <div className="flex-shrink-0 flex items-center gap-2 px-3">
            <div className="flex items-center gap-2 bg-surface/90 backdrop-blur-3xl border border-border/40 rounded-2xl px-3 py-2 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent">
              {/* Credits */}
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-credits/15 backdrop-blur-xl px-4 py-2 rounded-xl text-sm font-semibold text-credits border border-credits/30 hover:bg-credits/25 transition-all relative z-10"
              >
                <IoWalletOutline size={18} className="text-credits" />
                <span>{user.credits || "0"}</span>
              </Link>

              {/* Search */}
              <Link
                to="/search"
                className="p-2 text-text-secondary hover:text-primary hover:bg-white/10 rounded-lg transition-all relative z-10"
              >
                <IoSearchOutline size={23} />
              </Link>

              {/* Avatar */}
              <Link to="/profile" className="group relative z-10">
                <img
                  src={user.avatar?.url}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-accent/50 hover:border-primary transition-all group-hover:scale-105"
                />
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 text-primary hover:bg-white/10 rounded-lg transition-all relative z-10"
              >
                <RxHamburgerMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;