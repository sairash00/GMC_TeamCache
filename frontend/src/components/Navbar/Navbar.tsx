import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  IoSearchOutline,
  IoClose,
  IoWalletOutline,
} from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const avatar =
    "https://ui-avatars.com/api/?name=User&background=111844&color=fff";

  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-card shadow-hover border-l border-divider transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-divider">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="avatar"
              className="w-11 h-11 rounded-full object-cover border border-border"
            />

            <div>
              <h3 className="font-semibold text-text-primary">John Doe</h3>
              <p className="text-xs text-credits font-medium">
                120 Credits
              </p>
            </div>
          </div>

          <button onClick={() => setOpen(false)}>
            <IoClose size={24} className="text-text-primary" />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-5 text-text-secondary font-medium">

          <Link to="/videos" onClick={() => setOpen(false)}>
            Videos
          </Link>

          <Link to="/skill-requests" onClick={() => setOpen(false)}>
            Skill Requests
          </Link>

          <Link to="/upload-video" onClick={() => setOpen(false)}>
            Upload
          </Link>

          <Link to="/profile" onClick={() => setOpen(false)}>
            Profile
          </Link>

        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-30 h-16 bg-card border-b border-divider shadow px-5 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          SkillSnap
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7 text-text-secondary font-medium">

          <Link
            to="/videos"
            className="hover:text-primary transition"
          >
            Videos
          </Link>

          <Link
            to="/skill-requests"
            className="hover:text-primary transition"
          >
            Requests
          </Link>

           <Link
            to="/premiumvideos"
            className="hover:text-primary transition"
          >
            Premium
          </Link>

          <Link
            to="/upload-video"
            className="hover:text-primary transition"
          >
            Upload
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Credits */}
          <Link
            to="/profile"
            className="hidden md:flex items-center gap-2 bg-surface px-3 py-2 rounded-xl shadow text-sm font-semibold text-credits hover:shadow-hover transition"
          >
            <IoWalletOutline size={18} />
            <span>120</span>
          </Link>

          {/* Search */}
          <Link
            to="/search"
            className="text-text-secondary hover:text-primary transition"
          >
            <IoSearchOutline size={23} />
          </Link>

          {/* Avatar */}
          <Link to="/profile">
            <img
              src={avatar}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-accent hover:border-primary transition"
            />
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-primary"
          >
            <RxHamburgerMenu size={24} />
          </button>

        </div>

      </nav>
    </>
  );
};

export default Navbar;