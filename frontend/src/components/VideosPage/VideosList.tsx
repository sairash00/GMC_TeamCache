import VideoCard from "../video/Videocards.tsx";

const VideosList = () => {
  // Dummy data for now
  const videos = Array.from({ length: 18 }, (_, i) => ({
    _id: i + 1,
    title: `Sample Video ${i + 1}`,
    thumbnail: `https://picsum.photos/500/300?random=${i + 1}`,
  }));

  return (
    <section className="h-[calc(100vh-64px)] bg-background">
      <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 py-6 flex flex-col">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text-primary">
            Videos
          </h1>

          <p className="text-text-secondary mt-1">
            Explore skills shared by the community.
          </p>
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto pr-2">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">

            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default VideosList;