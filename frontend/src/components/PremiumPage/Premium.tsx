import { useMemo } from "react";
import VideoCard from "../video/Videocards.tsx";

const PremiumVideos = () => {
  // Replace with API data later
  const videos = [
    {
      _id: "1",
      title: "Complete React Masterclass",
      creator: "John Doe",
      thumbnail: "https://picsum.photos/500/300?random=1",
      isPremium: true,
      isUnlocked: false
    },
    {
      _id: "2",
      title: "MongoDB Crash Course",
      creator: "Jane Smith",
      thumbnail: "https://picsum.photos/500/300?random=2",
      isPremium: false,
      isUnlocked: false
    },
    {
      _id: "3",
      title: "Advanced TypeScript",
      creator: "SkillSnap",
      thumbnail: "https://picsum.photos/500/300?random=3",
      isPremium: true,
      isUnlocked: false
    },
    {
      _id: "4",
      title: "Docker Essentials",
      creator: "Alex",
      thumbnail: "https://picsum.photos/500/300?random=4",
      isPremium: true,
      isUnlocked: false
    },
  ];

  const premiumVideos = useMemo(
    () => videos.filter((video) => video.isPremium),
    [videos]
  );

  return (
    <section className="h-[calc(100vh-64px)] bg-background overflow-hidden">
      <div className="h-full px-6 py-6">

        {/* Header */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text-primary">
            Premium Videos
          </h1>

          <p className="text-text-secondary mt-2">
            Unlock exclusive skill videos using your credits.
          </p>
        </div>

        {/* Videos */}

        <div className="h-[calc(100%-72px)] overflow-y-auto pr-2">

          {premiumVideos.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-lg text-text-secondary">
                No premium videos available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {premiumVideos.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default PremiumVideos;