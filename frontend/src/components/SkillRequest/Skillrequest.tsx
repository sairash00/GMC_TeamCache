import { useState } from "react";
import CreateRequestModal from "./CreateRequest.tsx";
import SkillRequestCard from "./SkillRequestCard";

const SkillRequests = () => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Dummy data (replace with API later)
  const requests = [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "Need help learning Docker",
      description:
        "I'm comfortable with Node.js but Docker is still confusing. Looking for a beginner-friendly tutorial that explains containers, images, volumes, and networking.",
      votes: 24,
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=10",
      title: "React Native Basics",
      description:
        "Would love a crash course covering React Native fundamentals and navigation.",
      votes: 15,
    },
    {
      id: 3,
      user: "Alex",
      avatar: "https://i.pravatar.cc/150?img=8",
      title: "Git & GitHub Workflow",
      description:
        "Need a practical guide for branching, pull requests, merge conflicts, and deployment workflow.",
      votes: 31,
    },
  ];

  const handleSubmit = async () => {
    // Replace with API call
    console.log({
      title,
      description,
    });

    setOpen(false);
    setTitle("");
    setDescription("");
  };

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

            {requests.map((request) => (
              <SkillRequestCard
                key={request.id}
                request={request}
              />
            ))}

          </div>
        </div>
      </section>

      {/* Create Request Modal */}
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