import { Link } from "react-router-dom";
import {
  IoVideocamOutline,
  IoPeopleOutline,
  IoFlashOutline,
} from "react-icons/io5";

const Landing = () => {
  return (
    <section className="relative h-[calc(100vh-64px)] bg-background flex items-center justify-center overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-selection opacity-30 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-180px] left-[-150px] w-[350px] h-[350px] bg-accent opacity-15 blur-[120px] rounded-full"></div>

      <div className="absolute top-[20%] right-[-120px] w-[280px] h-[280px] bg-primary opacity-10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 lg:px-10">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-secondary text-sm font-semibold tracking-[0.3em] uppercase mb-2">
            Learn • Earn • Request
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-text-primary leading-tight">
            Share Skills.
            <br />
            Learn Together.
          </h1>

          <p className="mt-4 text-base text-text-secondary max-w-xl mx-auto leading-7">
            Upload short educational videos, earn credits by helping others,
            and discover practical skills shared by the community.
          </p>

          <Link
            to="/videos"
            className="inline-flex items-center mt-7 px-8 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Features */}

        <div className="flex flex-wrap justify-center gap-5 mt-12">

          {/* Upload */}

          <div className="w-56 bg-card rounded-2xl p-4 shadow hover:shadow-hover hover:-translate-y-2 transition-all duration-300">

            <div className="w-11 h-11 rounded-full bg-selection flex items-center justify-center mx-auto">
              <IoVideocamOutline
                size={22}
                className="text-primary"
              />
            </div>

            <h3 className="mt-3 text-base font-semibold text-text-primary text-center">
              Upload Skills
            </h3>

            <p className="mt-2 text-xs text-text-secondary text-center leading-5">
              Share bite-sized educational videos and help others learn faster.
            </p>

          </div>

          {/* Credits */}

          <div className="w-56 bg-card rounded-2xl p-4 shadow hover:shadow-hover hover:-translate-y-2 transition-all duration-300">

            <div className="w-11 h-11 rounded-full bg-selection flex items-center justify-center mx-auto">
              <IoFlashOutline
                size={22}
                className="text-primary"
              />
            </div>

            <h3 className="mt-3 text-base font-semibold text-text-primary text-center">
              Earn Credits
            </h3>

            <p className="mt-2 text-xs text-text-secondary text-center leading-5">
              Receive credits for your contributions and unlock premium learning
              content.
            </p>

          </div>

          {/* Requests */}

          <div className="w-56 bg-card rounded-2xl p-4 shadow hover:shadow-hover hover:-translate-y-2 transition-all duration-300">

            <div className="w-11 h-11 rounded-full bg-selection flex items-center justify-center mx-auto">
              <IoPeopleOutline
                size={22}
                className="text-primary"
              />
            </div>

            <h3 className="mt-3 text-base font-semibold text-text-primary text-center">
              Request Skills
            </h3>

            <p className="mt-2 text-xs text-text-secondary text-center leading-5">
              Request new topics and let the community create them for everyone.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Landing;