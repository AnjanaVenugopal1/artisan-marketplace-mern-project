import { Link } from "react-router-dom";

export default function ArtisanCard({ artisan }) {
  const name = artisan.fullName || artisan.name || "Unnamed Artisan";

  return (
    <Link
      to={`/artisans/${artisan._id}`}
      className="group relative rounded-3xl overflow-hidden
      bg-gradient-to-b from-gray-900 to-gray-950
      border border-white/10 hover:border-amber-500/40
      transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={artisan.profileImage || "/images/artisans/default-artisan.jpg"}
          alt={name}
          className="h-full w-full object-cover
          group-hover:scale-110 transition-transform duration-500"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white mb-1">
          {name}
        </h3>

        <p className="text-sm text-amber-400">
          {artisan.craftType}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {artisan.region}
        </p>

        <span
          className="inline-block mt-4 text-sm text-amber-400
          border border-amber-500/40 px-4 py-1 rounded-full
          group-hover:bg-amber-500/10 transition"
        >
          View Profile →
        </span>
      </div>
    </Link>
  );
}
