import { Link } from "react-router-dom";

const VideoCard = ({ video }:any) => {
  return (
    <Link
      to={`/video/${video._id}`}
      className="group w-full rounded-2xl bg-accent bg-slate-800 hover:bg-accent-hover p-3 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="mt-3 px-1">

        <h2 className="text-text-primary font-semibold text-sm leading-5 line-clamp-2">
          {video.title || "Untitled Video"}
        </h2>

        <p className="mt-1 text-xs text-text-secondary">
          {video.creator || "Unknown Creator"}
        </p>

      </div>
    </Link>
  );
};

export default VideoCard;