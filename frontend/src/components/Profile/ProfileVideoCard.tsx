import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileVideoCard = ({ video }: { video: any }) => {
  // console.log(video)
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Later replace with your endpoint
      // await axios.delete(
      //   `${import.meta.env.VITE_DELETE_VIDEO}/${video._id}`,
      //   {
      //     withCredentials: true,
      //   }
      // );

      // console.log("Deleting:", video._id);

      toast.success("Video deleted.");

      // Later you can either:
      // window.location.reload();
      // OR call a parent refresh function.
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Couldn't delete video.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Link
      to={`/video/${video._id}`}
      className="relative bg-accent bg-slate-800 hover:bg-accent-hover rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute top-5 right-5 z-10"
      >
        <IoTrashOutline
          size={22}
          className="text-white hover:text-red-400 transition"
        />
      </button>

      {/* Thumbnail */}
      <img
        src={video.thumbnail.url}
        alt={video.title}
        className="w-full aspect-video rounded-xl object-cover"
      />

      {/* Info */}
      <div className="mt-3 px-1">

        <h2 className="text-text-primary font-semibold text-sm line-clamp-2">
          {video.title}
        </h2>

        <p className="text-text-secondary text-xs mt-1">
          {video.creator}
        </p>

      </div>
    </Link>
  );
};

export default ProfileVideoCard;