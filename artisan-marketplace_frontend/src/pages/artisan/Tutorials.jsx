import { useState } from "react";

export default function Tutorials() {
  const [tutorials] = useState([
    { id: 1, title: "How to weave cotton fabric", type: "Video" },
    { id: 2, title: "Traditional pottery techniques", type: "Image Guide" },
  ]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Workshops & Tutorials
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Type: {t.type}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
