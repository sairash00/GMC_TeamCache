import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SkillRequestCard = ({ request }:any) => {
  return (
    <div className="flex gap-4 rounded-xl bg-slate-800 hover:bg-slate-600 transition-all duration-300 p-4">

      {/* Votes */}

      <div className="flex flex-col items-center justify-center gap-2 min-w-12 rounded-lg bg-accent px-2 py-3">

        <button className="text-white hover:text-green-300 transition">
          <FaArrowUp size={14} />
        </button>

        <span className="text-white font-bold text-sm">
          {request.votes}
        </span>

        <button className="text-white hover:text-red-300 transition">
          <FaArrowDown size={14} />
        </button>

      </div>

      {/* Content */}

      <div className="flex-1">

        <div className="flex items-center gap-2 mb-2">

          <img
            src={request.avatar}
            alt={request.user}
            className="w-9 h-9 rounded-full object-cover"
          />

          <span className="text-sm text-gray-300">
            {request.user}
          </span>

        </div>

        <h2 className="text-white font-semibold text-lg">
          {request.title}
        </h2>

        <p className="text-gray-300 text-sm mt-1 line-clamp-3">
          {request.description}
        </p>

      </div>

    </div>
  );
};

export default SkillRequestCard;