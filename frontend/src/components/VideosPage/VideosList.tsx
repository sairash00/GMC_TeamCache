import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../video/Videocards.tsx";


const VideosList = () => {

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchVideos = async () => {

      try {

        const response = await axios.get(
          "http://localhost:3000/api/video",
          {
            withCredentials: true,
          }
        );


        setVideos(response.data);

      } catch (error) {

        console.log("Error fetching videos:", error);

      } finally {

        setLoading(false);

      }

    };


    fetchVideos();

  }, []);



  if (loading) {
    return (
      <section className="h-[calc(100vh-64px)] bg-background flex items-center justify-center">
        <p className="text-text-secondary">
          Loading videos...
        </p>
      </section>
    );
  }



  return (
    <section className="h-[calc(100vh-64px)] bg-background">

      <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 py-6 flex flex-col">


        <div className="mb-6">

          <h1 className="text-3xl font-bold text-text-primary">
            Videos
          </h1>

          <p className="text-text-secondary mt-1">
            Explore skills shared by the community.
          </p>

        </div>



        <div className="flex-1 overflow-y-auto pr-2">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">


            {videos.data.map((video) => (

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