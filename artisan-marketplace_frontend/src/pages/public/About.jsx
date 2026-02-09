import React from "react";

export default function About() {
  return (
    <main className="text-gray-100 bg-gradient-to-b from-black to-gray-950">

    
      <section className="relative h-[75vh] flex items-center justify-center px-6">

  
        <img
          src="/images/about-bg.jpg"
          alt="Indian craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 "></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl text-center">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-6">
            Our Story
          </p>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-white">
            About <span className="text-amber-400">KalaSutra</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            KalaSutra is a curated marketplace celebrating the soul of Indian
            craftsmanship. We connect skilled artisans directly with those who
            value authenticity, heritage, and handmade excellence.
          </p>
        </div>
      </section>

      
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <p className="uppercase tracking-widest text-sm text-amber-400 mb-4">
              Our Purpose
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Our Mission
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Our mission is to empower artisans by giving them a global platform
              to share their craft, stories, and traditions — without middlemen.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Every product on KalaSutra represents generations of knowledge,
              patience, and cultural identity woven into timeless creations.
            </p>
          </div>

          {/* Highlight Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10
            border border-white/10 shadow-xl">
            <h3 className="text-xl font-semibold text-amber-400 mb-6">
              Why KalaSutra?
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li>• 100% authentic handcrafted products</li>
              <li>• Fair and direct support to artisans</li>
              <li>• Preservation of endangered crafts</li>
              <li>• Ethical, conscious marketplace</li>
            </ul>
          </div>
        </div>
      </section>

     
      <section className="relative px-6 py-28">

        
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-widest text-sm text-amber-400 mb-4">
            Looking Ahead
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Our Vision
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            We envision a world where traditional craftsmanship is not lost to
            time, but celebrated globally. KalaSutra strives to become a bridge
            between artisans and conscious buyers - where every purchase tells
            a story and sustains a legacy.
          </p>
        </div>
      </section>

   
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-xl font-serif text-gray-300">
            KalaSutra is not just a marketplace.
          </p>

          <p className="mt-4 text-2xl md:text-3xl font-serif font-semibold
            bg-gradient-to-r from-[#FFD978] to-[#F2B705]
            bg-clip-text text-transparent">
            It is a movement to honor hands that create culture.
          </p>
        </div>
      </section>

    </main>
  );
}
