import { FaBoxOpen, FaShoppingCart, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArtisanDashboard() {
  const cards = [
    {
      icon: <FaBoxOpen className="text-amber-600 text-4xl mb-4" />,
      title: "My Products",
      desc: "Manage your listed products",
      path: "/artisan/products",
    },
    {
      icon: <FaShoppingCart className="text-amber-600 text-4xl mb-4" />,
      title: "Orders",
      desc: "View customer orders",
      path: "/artisan/orders",
    },
    {
      icon: <FaChalkboardTeacher className="text-amber-600 text-4xl mb-4" />,
      title: "Workshops",
      desc: "Create virtual workshops",
      path: "/artisan/tutorials",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Artisan Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Link to={card.path} key={idx}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition duration-200 flex flex-col items-center text-center cursor-pointer">
              {card.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {card.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
