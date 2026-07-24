import { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { axios } from "../../utils/axios";
import VideoCard from "../video/Videocards";

const Search = () => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/video");
        setVideos(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    if (!search.trim()) return videos;

    const filtered = videos.filter((video: any) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );

    // If nothing matches, show all videos
    return filtered.length > 0 ? filtered : videos;
  }, [search, videos]);

  if (loading) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-secondary text-lg">Loading videos...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-text-primary mb-8">
          Search Videos
        </h1>

        {/* Search */}

        <div className="relative">
          <IoSearchOutline
            className="absolute left-5 top-1/2 -translate-y-1/2 text-black"
            size={22}
          />

          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card rounded-2xl pl-14 pr-5 py-4 font-semibold outline-none text-black shadow border border-border focus:border-primary transition"
          />
        </div>

        {/* Results */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredVideos.map((video: any) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Search;