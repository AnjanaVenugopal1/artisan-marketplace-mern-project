import { useState } from "react";
import api from "../../api/axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("region", region);
      formData.append("material", material);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully ✅");

      // reset form
      setName("");
      setPrice("");
      setRegion("");
      setMaterial("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-12 bg-gray-950 text-white">
      <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10">
        <h2 className="text-3xl font-serif font-semibold mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-white/10"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-white/10"
            required
          />

          <input
            type="text"
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-white/10"
          />

          <input
            type="text"
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-white/10"
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-[#FFD978] to-[#F2B705]
              text-black hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
