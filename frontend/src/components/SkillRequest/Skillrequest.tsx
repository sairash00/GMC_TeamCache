import { useEffect, useState } from "react";
import axios from "axios";

import CreateRequestModal from "./CreateRequest.tsx";
import SkillRequestCard from "./SkillRequestCard";

const SkillRequests = () => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [requests, setRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/skill-request",
          {
            withCredentials: true,
          },
        );

        setRequests(response.data);
      } catch (error) {
        console.log("Failed to fetch skill requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleSubmit = async () => {
    try {
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

      // refresh requests after creating

      const response = await axios.get(
        "http://localhost:3000/api/skill-request",
      );

      setRequests(response.data);

      setOpen(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("Failed to create request", error);
    }
  };

  if (loading) {
    return (
      <section className="h-[calc(100vh-64px)] bg-background flex items-center justify-center">
        <p className="text-text-secondary">Loading requests...</p>
      </section>
    );
  }

  return (
    <>
      <section className="h-[calc(100vh-64px)] bg-background">
        <div className="max-w-5xl mx-auto h-full px-6 py-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Skill Requests
              </h1>

              <p className="text-text-secondary mt-1">
                Vote for the skills you want to see next.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium transition"
            >
              + Create Request
            </button>
          </div>

          {/* Requests */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {requests.data?.map((request:any) => (
              <SkillRequestCard key={request._id} request={request} />
            ))}
          </div>
        </div>
      </section>

      <CreateRequestModal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SkillRequests;
