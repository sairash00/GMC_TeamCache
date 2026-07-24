import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import VideoCard from "../video/Videocards.tsx";

const Search = () => {
  const [search, setSearch] = useState("");

  // Replace with API data later
  const videos:any = [];

  const filteredVideos = videos.filter((video:any) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-background">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-text-primary mb-8">
          Search Videos
        </h1>

        {/* Search */}

        <div className="relative">

          <IoSearchOutline
            className="absolute text-black left-5 top-1/2 -translate-y-1/2 text-text-secondary"
            size={22}
          />

          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card rounded-2xl pl-14 pr-5 font-semibold  py-4 outline-none text-black shadow border border-border focus:border-primary transition"
          />

        </div>

        {/* Results */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <VideoCard
                key={videos._id}
                video={videos}
              />
          {/* {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-text-secondary py-20">
              No videos found.
            </div>
          )} */}

        </div>

      </div>

    </section>
  );
};

export default Search;