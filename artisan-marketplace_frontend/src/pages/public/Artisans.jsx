import { useEffect, useState } from "react";
import api from "../../api/axios";
import ArtisanCard from "../../components/artisan/ArtisanCard";

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [search, setSearch] = useState("");
  const [craft, setCraft] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await api.get("/users/artisans");
        const rawData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        const normalized = rawData.map((a) => ({
          ...a,
          displayName: a.fullName || a.name || "Unnamed Artisan",
          craftType: a.craftType || "",
          region: a.region || "",
        }));

        setArtisans(normalized);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch artisans", err);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  /* ================= FILTER ================= */
  const filteredArtisans = artisans.filter((a) => {
    const matchesSearch = a.displayName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCraft = craft ? a.craftType === craft : true;
    const matchesRegion = region ? a.region === region : true;

    return matchesSearch && matchesCraft && matchesRegion;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredArtisans.length / itemsPerPage);
  const paginatedArtisans = filteredArtisans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const crafts = [...new Set(artisans.map((a) => a.craftType).filter(Boolean))];
  const regions = [...new Set(artisans.map((a) => a.region).filter(Boolean))];

  if (loading) {
    return (
      <div className="py-40 text-center text-gray-400">
        Loading master artisans…
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-black to-gray-950 text-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] flex items-center justify-center px-6">
        <img
          src="/images/hand4.jpg"
          alt="Indian artisans at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center max-w-3xl">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-6">
            The Makers
          </p>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
            The Hands Behind the Craft
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Meet the master artisans preserving India’s cultural heritage
            through skill, patience, and generations of tradition.
          </p>
        </div>
      </section>

      {/* ================= FILTERS (FIXED) ================= */}
      <section className="px-6 relative z-20">
       <div
  className="
    max-w-6xl mx-auto
    bg-gray-900/90
    border border-white/10
    rounded-3xl p-8 shadow-xl
    -translate-y-20
  "
>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <input
              type="text"
              placeholder="Search artisan by name…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-5 py-3 rounded-xl
                bg-gray-900 border border-white/10
                text-white placeholder-gray-500
                focus:ring-2 focus:ring-amber-500/40 outline-none"
            />

            <select
              value={craft}
              onChange={(e) => {
                setCraft(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-5 py-3 rounded-xl
                bg-gray-900 border border-white/10
                text-white focus:ring-2 focus:ring-amber-500/40 outline-none"
            >
              <option value="">All Crafts</option>
              {crafts.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-5 py-3 rounded-xl
                bg-gray-900 border border-white/10
                text-white focus:ring-2 focus:ring-amber-500/40 outline-none"
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

          </div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto">

          {paginatedArtisans.length === 0 ? (
            <p className="text-center text-gray-400">
              No artisans found.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
              {paginatedArtisans.map((artisan) => (
                <ArtisanCard key={artisan._id} artisan={artisan} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-16">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-xl font-medium transition
                    ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-[#FFD978] to-[#F2B705] text-black"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
