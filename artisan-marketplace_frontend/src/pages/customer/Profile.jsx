import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Anjana",
    email: "anjana@example.com",
    address: "Kochi, Kerala",
    avatar: "https://ui-avatars.com/api/?name=Anjana&background=f59e0b&color=fff",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // 🔗 Later: send updated user to backend
    console.log("Updated user:", user);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          My Profile
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 dark:text-gray-300">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-800 dark:text-gray-200">{user.name}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 dark:text-gray-300">
            Address
          </label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-800 dark:text-gray-200">{user.address}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
