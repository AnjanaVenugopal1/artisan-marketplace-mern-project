export default function Wishlist() {
  const wishlist = [
    {
      id: 1,
      name: "Handwoven Saree",
      price: 1800,
      artisan: "Kerala Artisans",
      image:"/images/saree2.jpg",
    },
    {
      id: 2,
      name: "Clay Pot",
      price: 1200,
      artisan: "Traditional Pottery",
      image:
        "/images/pot.jpg",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-10">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-100 tracking-tight">
          My Wishlist
        </h2>
        <span className="text-sm text-gray-400">
          {wishlist.length} items saved
        </span>
      </div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <p className="text-xl mb-2">Your wishlist is empty</p>
          <p className="text-sm">Save your favorite artisan products here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-100 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  by {item.artisan}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-amber-500">
                    ₹ {item.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-semibold py-2 rounded-xl transition">
                    Move to Cart
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400 transition text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
