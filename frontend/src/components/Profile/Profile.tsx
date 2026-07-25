import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProfileVideoCard from "./ProfileVideoCard";
import { IoCameraOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/me",
          {
            withCredentials: true,
          }
        );

        setUser(response.data);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data)
        );

      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(
        response.data.message || "Logged out successfully"
      );

      localStorage.removeItem("user");

      navigate("/login");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Logout failed"
      );

    }
  };


  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingAvatar(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.patch(
        "http://localhost:3000/api/user/avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        response.data.message || "Avatar updated successfully."
      );

      setUser((prev: any) => {
        const updatedUser = {
          ...prev,
          data: {
            ...prev.data,
            avatar: response.data.data.avatar,
          },
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser.data)
        );

        return updatedUser;
      });

    } catch (error) {

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
          "Couldn't upload avatar."
        );
      } else {
        toast.error("Something went wrong.");
      }

    } finally {

      setUploadingAvatar(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    }
  };


  if (loading) {
    return (
      <section className="h-[calc(100vh-64px)] bg-background flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </section>
    );
  }


  if (!user) {
    return (
      <section className="h-[calc(100vh-64px)] bg-background flex items-center justify-center">
        <p className="text-gray-400">User not found</p>
      </section>
    );
  }


  return (
    <section className="h-[calc(100vh-64px)] bg-background">

      <div className="max-w-7xl mx-auto h-full px-6 py-6 flex flex-col gap-6">


        {/* Profile Card */}
        <div className="bg-[#E7D4B4] border border-[#b4a181] shadow-xl shadow-black/20 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">


          <div className="flex items-center gap-5">

            <div className="relative">

              <img
                src={
                  user.data.avatar?.url ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                className="w-28 h-28 rounded-full object-cover border-4 border-amber-500/80"
              />


              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />


              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition disabled:opacity-60"
              >
                <IoCameraOutline className="text-[#1c1712]" />
              </button>

            </div>


            <div>

              <h1 className="text-3xl font-bold text-[#384180]">
                {user.data.name}
              </h1>


              <p className="text-[#555046] mt-1">
                {user.data.email}
              </p>


              <div className="mt-4 inline-flex items-center gap-2 bg-[#211d17] border border-[#3d3527] rounded-lg px-4 py-2">

                <span className="text-yellow-400">
                  🪙
                </span>

                <span className="text-[#f2ead9] font-semibold">
                  {user.data.credits} Credits
                </span>

              </div>


            </div>


          </div>


          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition text-white font-semibold"
          >
            Logout
          </button>


        </div>


        {/* Videos */}
        <div className="rounded-2xl p-5 flex-1 overflow-y-auto">

          <h2 className="text-2xl font-bold text-[#4E5996] mb-5">
            Uploaded Videos
          </h2>


          {user.data.uploadedVideos?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {user.data.uploadedVideos.map((video: any) => (
                <ProfileVideoCard
                  key={video._id}
                  video={video}
                />
              ))}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 rounded-2xl border border-dashed ">
              <p className="text-5xl mb-3">📭</p>
              <p className="text-[#4E5996] font-semibold text-lg">
                No videos uploaded yet
              </p>
              <p className="text-[#4E5996] text-sm mt-1">
                Your uploaded videos will show up here.
              </p>
            </div>
          )}


        </div>


      </div>

    </section>
  );
};

export default Profile;