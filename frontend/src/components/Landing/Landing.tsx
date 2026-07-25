import { Link } from "react-router-dom";
import {
  IoVideocamOutline,
  IoPeopleOutline,
  IoFlashOutline,
  IoArrowForwardOutline,
  IoTrophyOutline,
  IoStatsChartOutline,
  IoPlayCircleOutline,
} from "react-icons/io5";

const Landing = () => {
  return (
    <>
      {/* Hero - Single Viewport, No Scroll */}
      <section className="relative h-screen bg-background flex items-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto w-full h-full px-6 lg:px-10">
          <div className="flex h-full items-center justify-center">

            {/* Centered Text Content */}
            <div className="text-center animate-in" style={{ animationDelay: "0.05s" }}>
              <p className="text-secondary font-semibold text-sm tracking-[0.25em] uppercase">
                Learn · Earn · Request
              </p>

              <h1 className="mt-4 text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight">
                <span className="text-primary">Share Skills.</span>
                <br />
                <span className="text-secondary">Learn Together.</span>
              </h1>

              <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Upload short educational videos, earn credits by helping others,
                and discover practical skills shared by the community.
              </p>

              {/* Primary CTA */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <Link
                  to="/videos"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary text-white font-semibold text-base hover:bg-primary transition-all duration-300 group w-full sm:w-auto"
                >
                  Get Started
                  <IoArrowForwardOutline
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/skill-requests"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-border text-text-primary font-semibold text-base hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all duration-300 w-full sm:w-auto"
                >
                  Browse Requests
                </Link>
              </div>

              {/* How it works - compact inline */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-xl border border-border/30 flex items-center justify-center">
                    <IoVideocamOutline size={15} className="text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Upload</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-xl border border-border/30 flex items-center justify-center">
                    <IoFlashOutline size={15} className="text-credits" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Earn credits</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-xl border border-border/30 flex items-center justify-center">
                    <IoPeopleOutline size={15} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Request skills</span>
                </div>
              </div>

              {/* Compact trust indicators */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 pt-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <IoTrophyOutline size={14} className="text-primary" />
                  <span className="font-bold text-primary">500+ skills</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IoPeopleOutline size={14} className="text-secondary" />
                  <span className="font-bold text-primary">12K+ learners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IoStatsChartOutline size={14} className="text-credits" />
                  <span className="font-bold text-primary">100K+ credits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IoPlayCircleOutline size={14} className="text-accent" />
                  <span className="font-bold text-primary">50K+ hours</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Subtle atmospheric background blobs */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </section>
    </>
  );
};

export default Landing;