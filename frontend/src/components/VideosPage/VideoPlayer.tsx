import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  IoLockClosed,
  IoPersonCircleOutline,
} from "react-icons/io5";
import VideoCard from "../video/Videocards";

const VideoDetail = () => {
const { id } = useParams();

const [video, setVideo] = useState<any>(null);
const [loading, setLoading] = useState(true);
const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
const [unlocking, setUnlocking] = useState(false);
const [message, setMessage] = useState("");

const videoRef = useRef<HTMLVideoElement>(null);

const [watchTime, setWatchTime] = useState(0);
const watchTimeRef = useRef(0);

useEffect(() => {
  watchTimeRef.current = watchTime;
}, [watchTime]);

// Fetch Video + Related Videos
useEffect(() => {
  const fetchVideo = async () => {
    try {
      const videoResponse = await axios.get(
        `http://localhost:3000/api/video/${id}`,
        {
          withCredentials: true,
        }
      );

      const currentVideo = videoResponse.data.data;

      const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const premiumVideos = storedUser.premiumVideos || [];

      currentVideo.isUnlocked =
        !currentVideo.isPremium ||
        premiumVideos.includes(currentVideo._id);

      setVideo(currentVideo);

      const allVideosResponse = await axios.get(
        "http://localhost:3000/api/video",
        {
          withCredentials: true,
        }
      );

      const filteredVideos = allVideosResponse.data.data.filter(
        (item: any) => item._id !== currentVideo._id
      );

      setRelatedVideos(filteredVideos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchVideo();
}, [id]);
console.log(video)
// Watch Time Tracking
useEffect(() => {
  if (!video) return;

  const videoElement = videoRef.current;

  if (!videoElement) return;

  let interval: ReturnType<typeof setInterval>;

  const startTracking = () => {
    clearInterval(interval);

    interval = setInterval(() => {
      if (!videoElement.paused && !videoElement.ended) {
        setWatchTime((prev) => prev + 1);
      }
    }, 1000);
  };

  const stopTracking = () => {
    clearInterval(interval);
  };

  const handleEnded = async () => {
  clearInterval(interval);

  localStorage.setItem(
    `watch-${video._id}`,
    JSON.stringify({
      videoId: video._id,
      watchTime: watchTimeRef.current,
      completed: true,
    })
  );

  console.log(
    "Completed Video | Watched:",
    watchTimeRef.current,
    "seconds"
  );

  try {
    const response = await axios.patch(
      "http://localhost:3000/api/user/credits",
      {
        videoId: video._id,
      },
      {
        withCredentials: true,
      }
    );

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    storedUser.credits = response.data.data.credits;

    localStorage.setItem(
      "user",
      JSON.stringify(storedUser)
    );

    toast.success(
      response.data.message || "Credits awarded successfully!"
    );
  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Couldn't award credits."
    );
  }
};

  videoElement.addEventListener("play", startTracking);
  videoElement.addEventListener("pause", stopTracking);
  videoElement.addEventListener("ended", handleEnded);

  return () => {
    clearInterval(interval);

    videoElement.removeEventListener("play", startTracking);
    videoElement.removeEventListener("pause", stopTracking);
    videoElement.removeEventListener("ended", handleEnded);

    localStorage.setItem(
      `watch-${video._id}`,
      JSON.stringify({
        videoId: video._id,
        watchTime: watchTimeRef.current,
        completed: false,
      })
    );

    console.log(
      "Video Closed | Watched:",
      watchTimeRef.current,
      "seconds"
    );
  };
}, [video]);

// Unlock Premium Video
const unlockVideo = async () => {
  if (unlocking) return;

  try {
    setUnlocking(true);
    setMessage("");

    const response = await axios.post(
      `http://localhost:3000/api/video/${video._id}/unlock`,
      {},
      {
        withCredentials: true,
      }
    );

    setMessage(response.data.message);

    setVideo((prev: any) => ({
      ...prev,
      isUnlocked: true,
    }));

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!storedUser.premiumVideos) {
      storedUser.premiumVideos = [];
    }

    if (!storedUser.premiumVideos.includes(video._id)) {
      storedUser.premiumVideos.push(video._id);
    }

    if (response.data.data?.remainingCredits !== undefined) {
      storedUser.credits = response.data.data.remainingCredits;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(storedUser)
    );
  } catch (error: any) {
    console.log(error);

    setMessage(
      error.response?.data?.message ||
        "Failed to unlock premium video."
    );
  } finally {
    setUnlocking(false);
  }
};

if (loading) {
  return (
    <div className="h-screen flex items-center justify-center text-white">
      Loading...
    </div>
  );
}

if (!video) {
  return (
    <div className="h-screen flex items-center justify-center text-red-500">
      Video Not Found
    </div>
  );
}
  return (
    <section className="h-[calc(100vh-64px)] bg-background overflow-y-auto">
  <div className="max-w-6xl mx-auto px-6 py-6">

    {/* Video Player */}

    <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6">

      {video.isPremium && !video.isUnlocked ? (
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl bg-slate-900 flex flex-col items-center justify-center">

          <IoLockClosed
            size={70}
            className="text-yellow-400"
          />

          <h2 className="mt-6 text-3xl font-bold text-white">
            Premium Video
          </h2>

          <p className="mt-2 text-gray-400">
            Unlock this video using your credits.
          </p>

          {/* Backend Message */}
          {message && (
            <p
              className={`mt-4 text-sm font-medium ${
                video.isUnlocked
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            onClick={unlockVideo}
            disabled={unlocking}
            className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold"
          >
            {unlocking ? "Unlocking..." : "Unlock To Watch"}
          </button>

        </div>
      ) : (
        <div className="flex justify-center">

          <video
            ref={videoRef}
            controls
            controlsList="nodownload"
            className="w-full max-w-4xl aspect-video rounded-2xl bg-black"
          >
            <source
              src={video.video.url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

        </div>
      )}

    </div>

    {/* Video Info */}

    <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6 mt-5">

      <h1 className="text-3xl font-bold text-white">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center gap-5 mt-5 text-gray-300">

        <div className="flex items-center gap-2">
          <IoPersonCircleOutline size={22} />
          {video.uploadedBy?.name}
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-800">
          {video.category}
        </span>

        {video.isPremium && (
          <span className="px-3 py-1 rounded-full bg-yellow-500 text-black font-semibold">
            Premium
          </span>
        )}

      </div>

    </div>

    {/* Description */}

    <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6 mt-5">

      <h2 className="text-xl font-bold text-white mb-3">
        Description
      </h2>

      <p className="text-gray-300 leading-7">
        {video.description}
      </p>

    </div>

    {/* Related Videos */}

    <div className="mt-8">

      <h2 className="text-2xl font-bold text-white mb-5">
        Related Videos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {relatedVideos.slice(0, 4).map((item) => (
          <VideoCard
            key={item._id}
            video={item}
          />
        ))}

      </div>

    </div>

  </div>
</section>
  );
};

export default VideoDetail;