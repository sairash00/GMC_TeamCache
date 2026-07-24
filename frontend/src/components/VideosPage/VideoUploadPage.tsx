import { useState } from "react";
import api, { axios } from "../../utils/axios.ts";
import toast from "react-hot-toast";

const categories = [
  "Financial Literacy",
  "Digital Literacy",
  "Agriculture",
  "Health",
  "Business",
  "Technology",
  "Vocational",
  "Communication",
  "Creative",
  "Other",
];

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [isPremium, setIsPremium] = useState(false);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !thumbnail ||
      !video
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isPremium", String(isPremium));
      formData.append("thumbnail", thumbnail);
      formData.append("video", video);

      const response = await api.post("/api/video", formData);

      toast.success(response.data.message || "Video uploaded successfully.");

      setTitle("");
      setDescription("");
      setCategory(categories[0]);
      setIsPremium(false);
      setThumbnail(null);
      setVideo(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Couldn't upload video.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-[calc(100vh-64px)] bg-background overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-slate-700 rounded-2xl border border-slate-600 p-8">
          <h1 className="text-3xl font-bold text-white">Upload Video</h1>

          <p className="text-gray-400 mt-2">
            Share your knowledge with the SkillSnap community.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Video Title
              </label>

              <input
                type="text"
                placeholder="Enter your video title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl bg-slate-800 border border-slate-600 px-5 py-3 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
              />
            </div>

            {/* Description */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Describe what users will learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl bg-slate-800 border border-slate-600 px-5 py-3 text-white placeholder:text-gray-500 resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
              />
            </div>

            {/* Category + Premium */}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-2xl bg-slate-800 border border-slate-600 px-5 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Access
                </label>

                <div className="h-[52px] rounded-2xl border border-slate-600 bg-slate-800 flex items-center px-5">
                  <input
                    type="checkbox"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="w-5 h-5 accent-indigo-600"
                  />

                  <span className="ml-3 text-white">Premium Video</span>
                </div>
              </div>
            </div>

            {/* Upload Boxes */}

            <div className="grid md:grid-cols-2 gap-5">
              {/* Thumbnail */}

              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-slate-500 rounded-2xl p-6 hover:border-indigo-500 transition text-center bg-slate-800">
                  <p className="text-5xl">🖼️</p>

                  <h3 className="mt-3 font-semibold text-white">
                    Upload Thumbnail
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">PNG, JPG, WEBP</p>

                  {thumbnail && (
                    <p className="mt-4 text-indigo-400 text-sm truncate">
                      {thumbnail.name}
                    </p>
                  )}
                </div>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                />
              </label>

              {/* Video */}

              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-slate-500 rounded-2xl p-6 hover:border-indigo-500 transition text-center bg-slate-800">
                  <p className="text-5xl">🎥</p>

                  <h3 className="mt-3 font-semibold text-white">
                    Upload Video
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">MP4, MOV, AVI</p>

                  {video && (
                    <p className="mt-4 text-indigo-400 text-sm truncate">
                      {video.name}
                    </p>
                  )}
                </div>

                <input
                  hidden
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-3 bg-gradient-to-r from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 transition-all text-white font-semibold shadow-lg disabled:opacity-60"
            >
              {loading ? "Uploading Video..." : "Upload Video"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadVideo;
