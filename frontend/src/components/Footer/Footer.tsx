import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-surface/80 backdrop-blur-2xl border border-border/30 rounded-2xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              SkillSnap
            </Link>

            <p className="text-sm text-text-secondary mt-1">
              Learn · Earn · Request
            </p>
          </div>

          <div className="flex gap-5 text-text-secondary text-xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-text-secondary">
          © 2026 SkillSnap. Built for learning.
        </div>
      </div>
    </footer>
  );
};

export default Footer;