import { useEffect, useState } from "react";
import { axios } from "../../utils/axios";
import VideoCard from "../video/Videocards";

const PremiumVideos = () => {
  const [premiumVideos, setPremiumVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/video/getPremiumVideos");

        const videos = response.data.data || [];

        const storedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        const subscribedVideos: string[] =
          storedUser.premiumVideos || [];

        const updatedVideos = videos.map((video: any) => ({
          ...video,
          isSubscribed: subscribedVideos.includes(video._id),
        }));

        setPremiumVideos(updatedVideos);
      } catch (error) {
        console.error("Failed to fetch premium videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumVideos();
  }, []);

  if (loading) {
    return (
      <section className="h-[calc(100vh-64px)] bg-background flex items-center justify-center">
        <p className="text-text-secondary text-lg">
          Loading premium videos...
        </p>
      </section>
    );
  }

  return (
    <section className="h-[calc(100vh-64px)] bg-background overflow-hidden">
      <div className="h-full px-6 py-6">
        {/* Header */}
        <div className="bg-surface/80 backdrop-blur-2xl border border-border/30 rounded-2xl px-6 py-4 mb-6">
          <h1 className="text-3xl font-bold text-text-primary">
            Premium Videos
          </h1>

          <p className="text-text-secondary mt-2">
            Unlock exclusive skill videos using your credits.
          </p>
        </div>

        {/* Videos */}
        <div className="h-[calc(100%-140px)] overflow-y-auto pr-2">
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