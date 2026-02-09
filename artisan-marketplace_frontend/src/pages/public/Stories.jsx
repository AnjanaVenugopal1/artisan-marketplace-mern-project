import { useState } from "react";
import dummyStories from "../../data/dummyStories";

/* 🔹 WORKSHOP DATA (TEMP – later from backend) */
const workshops = [
  {
    id: 1,
    title: "Pottery Wheel Basics",
    artisan: "Ramesh Kumar",
    craft: "Clay Pottery",
    duration: "90 mins",
    type: "Live",
    video: "/images/12285803_1920_1080_24fps.mp4",
  },
  {
    id: 2,
    title: "Handloom Weaving Foundations",
    artisan: "Sita Devi",
    craft: "Odisha Handloom",
    duration: "2 hrs",
    type: "Recorded",
    video: "/images/3967195-uhd_4096_2160_24fps.mp4",
  },
];

export default function Stories() {
  const [expandedStory, setExpandedStory] = useState(null);
  const [search, setSearch] = useState("");

  const filteredStories = dummyStories.filter(
    (story) =>
      story.title.toLowerCase().includes(search.toLowerCase()) ||
      story.artisan.toLowerCase().includes(search.toLowerCase()) ||
      story.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-b from-black to-gray-950">

      {/* ================= TITLE HERO WITH BACKGROUND IMAGE ================= */}
      <div className="relative h-[70vh] flex items-center justify-center px-6">

        {/* Background Image */}
        <img
          src="/images/story-bg.jpg"
          alt="Artisan at work"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Blur Overlay */}
        <div className="absolute inset-0 bg-black/70 "></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-6">
            Artisan Voices
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white">
            Cultural Stories & Experiences
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            Stories, skills, and traditions behind India’s finest handcrafted arts -
            told by the artisans themselves.
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto">

          {/* SEARCH */}
          <div className="mb-20 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search stories by title, artisan or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-gray-900 border border-white/10
                px-5 py-3 text-sm text-white placeholder-gray-500
                focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none"
            />
          </div>

          {/* ================= STORIES ================= */}
          <div className="grid md:grid-cols-2 gap-12 mb-32">
            {filteredStories.length === 0 && (
              <p className="text-center col-span-full text-gray-400">
                No stories found.
              </p>
            )}

            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="group rounded-3xl overflow-hidden
                  bg-white/5 backdrop-blur-md border border-white/10
                  hover:border-amber-500/40 transition-all duration-500"
              >
                {story.image && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover
                        group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                )}

                <div className="p-8">
                  {(story.region || story.craftType) && (
                    <span className="inline-block mb-3 text-xs tracking-wide text-amber-400 uppercase">
                      {story.region || story.craftType}
                    </span>
                  )}

                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {story.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4">
                    By {story.artisan}
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    {expandedStory === story.id
                      ? story.content
                      : story.content.slice(0, 220) + "..."}
                  </p>

                  {story.content.length > 220 && (
                    <button
                      onClick={() =>
                        setExpandedStory(
                          expandedStory === story.id ? null : story.id
                        )
                      }
                      className="mt-4 text-sm font-medium text-amber-400 hover:underline"
                    >
                      {expandedStory === story.id ? "Read Less" : "Read More"} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ================= WORKSHOPS ================= */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-4">
                Learn from the Masters
              </p>

              <h3 className="text-3xl md:text-4xl font-serif font-semibold text-white">
                Artisan Workshops & Training
              </h3>

              <p className="mt-4 text-gray-400 text-lg">
                Join live sessions or watch recorded workshops conducted by master artisans.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="group rounded-3xl overflow-hidden
                    bg-white/5 backdrop-blur-md border border-white/10
                    hover:border-amber-500/40 transition-all duration-500"
                >
                  <div className="relative h-52 overflow-hidden">
                    <video
                      src={workshop.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover
                        group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-amber-500/90
                        flex items-center justify-center text-black text-2xl font-bold
                        shadow-lg group-hover:scale-110 transition">
                        ▶
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <span className="text-xs uppercase tracking-wide text-amber-400">
                      {workshop.craft}
                    </span>

                    <h4 className="text-xl font-semibold text-white mt-2 mb-1">
                      {workshop.title}
                    </h4>

                    <p className="text-sm text-gray-400 mb-4">
                      By {workshop.artisan} · {workshop.duration}
                    </p>

                    <button
                      className={`w-full py-3 rounded-xl font-semibold transition
                        ${
                          workshop.type === "Live"
                            ? "bg-gradient-to-r from-[#FFD978] to-[#F2B705] text-black"
                            : "border border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                        }`}
                    >
                      {workshop.type === "Live"
                        ? "Join Live Workshop"
                        : "Watch Recording"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
