import { Link } from "react-router-dom";

const VideoCard = ({ video }: any) => {
  // console.log(video)

  const initials = (video.uploadedBy?.name || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <Link
      to={`/video/${video._id}`}
      className="group block w-full hover:bg-[#F0E8DB] p-4 rounded-xl transition-transform duration-200 ease-out hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-3xl ring-2 ring-transparent transition-all duration-200 ease-out group-hover:ring-[#4B5694] group-hover:shadow-[0_12px_28px_rgba(75,86,148,0.18)]">
        <img
          src={video.thumbnail.url}
          alt={video.title}
          className="aspect-video w-full object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
        />

        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded-md bg-[#12241C]/90 px-2 py-1 text-sm font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 flex gap-4">
        {video.uploadedBy?.avatar.url ? (
          <img
            src={video.uploadedBy.avatar.url}
            alt={video.uploadedBy?.name || "Creator"}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 ease-out group-hover:ring-[#4B5694]"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7288AE] font-display text-lg font-semibold text-white ring-2 ring-transparent transition-all duration-200 ease-out group-hover:ring-[#4B5694]">
            {initials}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="line-clamp-2 text-xl font-semibold leading-6 text-[#12241C] transition-colors duration-150 group-hover:text-[#4B5694]">
            {video.title || "Untitled Video"}
          </h2>

          <p className="mt-2 truncate text-base text-[#7288AE] font-medium">
            {video.uploadedBy?.name || "Unknown Creator"}
          </p>

          {(video.views !== undefined || video.createdAt) && (
            <p className="truncate text-sm text-[#5B6B64] mt-0.5">
              {video.views !== undefined && (
                <>{video.views.toLocaleString()} views</>
              )}
              {video.views !== undefined && video.createdAt && " · "}
              {video.createdAt && (
                <>
                  {new Date(video.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;