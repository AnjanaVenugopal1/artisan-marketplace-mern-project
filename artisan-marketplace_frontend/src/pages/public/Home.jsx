import { Link } from "react-router-dom";
import FeatureCard from "../../components/home/FeatureCard";

export default function Home() {
  return (
    <main className="font-sans text-gray-900 dark:text-white">

      <section className="relative h-screen w-full overflow-hidden">

    
        <img
          src="/images/bg2.jpg"
          alt="Indian Handcrafted Ceramics"
          className="absolute inset-0 h-full w-full object-cover"
        />

       
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"></div>

       
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-3xl">

            
            <p
              className="uppercase tracking-[0.35em] text-sm md:text-base font-semibold
              bg-gradient-to-r from-[#FFD978] via-[#F2B705] to-[#C99700]
              bg-clip-text text-transparent
              drop-shadow-[0_2px_8px_rgba(255,217,120,0.45)]"
            >
              KALASUTRA
            </p>

       
            <h1 className="mt-5 text-5xl md:text-6xl font-serif font-semibold text-white leading-tight">
              Handcrafted.
              <br />
              <span className="bg-gradient-to-r from-[#FFD978] to-[#F2B705] bg-clip-text text-transparent">
                Rooted. Timeless.
              </span>
            </h1>

            
            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              Discover authentic handmade crafts created by
              <span className="text-[#FFD978] font-medium"> skilled Indian artisans</span>.
              Each piece carries tradition, care, and cultural legacy.
            </p>

     
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                to="/products"
                className="relative px-8 py-3 rounded-full font-semibold text-black
                bg-gradient-to-r from-[#FFD978] via-[#F2B705] to-[#C99700]
                shadow-[0_8px_25px_rgba(242,183,5,0.35)]
                hover:shadow-[0_14px_40px_rgba(242,183,5,0.55)]
                hover:scale-105 transition-all duration-300"
              >
                Explore Marketplace
              </Link>

       
              <Link
                to="/artisans"
                className="px-8 py-3 rounded-full font-medium text-white
                border border-white/70
                hover:border-[#FFD978] hover:text-[#FFD978]
                hover:bg-white/10 transition-all duration-300"
              >
                Meet the Artisans
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY KALASUTRA (REDESIGNED) ================= */}
<section className="relative py-24 bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white overflow-hidden">

  {/* subtle background texture */}
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(255,217,120,0.25),transparent_60%)]"></div>

  <div className="relative max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <p className="uppercase tracking-[0.3em] text-sm text-[#FFD978] mb-4">
        Our Promise
      </p>

      <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
        Why KalaSutra?
      </h2>

      <p className="mt-6 text-gray-300 text-lg">
        KalaSutra is more than a marketplace - it is a bridge between
        India’s master artisans and conscious modern living.
      </p>
    </div>

    {/* Feature Blocks */}
    <div className="grid md:grid-cols-3 gap-10">

      {/* Card 1 */}
      <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-white/10
        hover:border-[#FFD978]/40 hover:bg-white/10 transition-all duration-500">

        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full
            bg-gradient-to-br from-[#FFD978] to-[#C99700] text-black text-xl font-bold">
            ✦
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          Authentic Handmade
        </h3>

        <p className="text-gray-300 leading-relaxed">
          Every creation is handcrafted using age-old techniques,
          preserving the soul of Indian craftsmanship.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-white/10
        hover:border-[#FFD978]/40 hover:bg-white/10 transition-all duration-500">

        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full
            bg-gradient-to-br from-[#FFD978] to-[#C99700] text-black text-xl font-bold">
            ✦
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          Fair & Direct
        </h3>

        <p className="text-gray-300 leading-relaxed">
          No middlemen. Artisans earn what they truly deserve,
          ensuring dignity and sustainability.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-white/10
        hover:border-[#FFD978]/40 hover:bg-white/10 transition-all duration-500">

        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full
            bg-gradient-to-br from-[#FFD978] to-[#C99700] text-black text-xl font-bold">
            ✦
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          Cultural Preservation
        </h3>

        <p className="text-gray-300 leading-relaxed">
          Every purchase helps keep endangered art forms alive
          for future generations.
        </p>
      </div>

    </div>
  </div>
</section>


    </main>
  );
}
