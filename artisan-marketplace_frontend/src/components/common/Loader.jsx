export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      {/* Animated GIF with rounded shape */}
      <div className="w-64 h-64 mb-6 overflow-hidden rounded-full shadow-lg">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmQ2eDhrZmcwbGxqNzJzcWozdm14c2xyd3U0OW9kaW9icmtjeGM1MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yAdHSX2jpMNWnKwpMj/giphy.gif"
          alt="Loading..."
          className="w-full h-full object-cover"
        />
      </div>

      {/* Spinner fallback */}
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4 shadow-md"></div>

      {/* Caption */}
      <p className="text-xl font-semibold text-amber-400 text-center">
        Crafting your artisan experience...
      </p>
    </div>
  );
}
