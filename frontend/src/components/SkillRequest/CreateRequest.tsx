import { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const CreateRequestModal = ({ open, setOpen }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/api/skill-request",

        {
          title,
          description,
        },

        {
          withCredentials: true,
        },
      );

      toast.success("Request submitted.");

      setTitle("");
      setDescription("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Couldn't create request.",
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
        <div className="w-full max-w-xl rounded-2xl bg-slate-700 border border-slate-600 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-600">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Create Skill Request
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Request a skill you'd like the community to create.
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-slate-600 hover:bg-red-500 transition flex items-center justify-center"
            >
              <IoClose size={22} className="text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Title</label>

              <input
                type="text"
                placeholder="Docker for Beginners"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 text-white px-4 py-3 outline-none focus:border-accent transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Describe what you'd like to learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 text-white px-4 py-3 outline-none resize-none focus:border-accent transition"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-5 border-t border-slate-600">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-black disabled:opacity-50 text-white font-semibold transition"
            >
              {loading ? "Creating..." : "Create Request"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequestModal;
