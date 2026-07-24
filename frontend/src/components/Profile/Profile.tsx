import ProfileVideoCard from "./ProfileVideoCard";
import { IoCameraOutline } from "react-icons/io5";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    credits: 120,
    avatar: "https://i.pravatar.cc/200?img=8",
  };

  const videos = Array.from({ length: 8 }, (_, i) => ({
    _id: i + 1,
    title: `Video ${i + 1}`,
    creator: user.name,
    thumbnail: `https://picsum.photos/500/300?random=${i + 1}`,
  }));

  return (
    <section className="h-[calc(100vh-64px)] bg-background">
      <div className="max-w-7xl mx-auto h-full px-6 py-6 flex flex-col gap-6">

        {/* Profile Card */}
        <div className="bg-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

          <div className="flex items-center gap-5">

            <div className="relative">

              <img
                src={user.avatar}
                className="w-28 h-28 rounded-full object-cover border-4 border-accent"
              />

              <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-accent hover:bg-accent-hover flex items-center justify-center transition">
                <IoCameraOutline className="text-white" />
              </button>

            </div>

            <div>

              <h1 className="text-3xl font-bold text-white">
                {user.name}
              </h1>

              <p className="text-gray-300 mt-1">
                {user.email}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2">
                <span className="text-yellow-400">🪙</span>

                <span className="text-white font-semibold">
                  {user.credits} Credits
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Videos */}

        <div className=" rounded-2xl p-5 flex-1 overflow-y-auto">

          <h2 className="text-2xl font-bold text-white mb-5">
            Uploaded Videos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {videos.map((video) => (
              <ProfileVideoCard
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

export default Profile;