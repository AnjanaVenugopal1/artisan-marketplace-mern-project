import { useState } from "react";
import api from "../../api/axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    material: "",
    region: "",
    stock: "",
    image: null,
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as artisan first");
        return;
      }

      const res = await api.post(
        "/products",
        {
          name: product.name,
          price: product.price,
          category: product.category,
          material: product.material,
          region: product.region,
          stock: product.stock,
          description: product.description,
          image: "", // temporary (no upload yet)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Product added successfully");
      console.log("Saved product:", res.data);

      // Reset form
      setProduct({
        name: "",
        price: "",
        category: "",
        material: "",
        region: "",
        stock: "",
        image: null,
        description: "",
      });
    } catch (error) {
      console.error("Add product error:", error);
      alert("❌ Failed to add product");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Eg: Handwoven Cotton Saree"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Eg: 1500"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Craft Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            >
              <option value="">Select category</option>
              <option value="Pottery">Pottery</option>
              <option value="Handloom">Handloom</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Woodwork">Woodwork</option>
            </select>
          </div>

          {/* Material */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Material
            </label>
            <input
              type="text"
              name="material"
              value={product.material}
              onChange={handleChange}
              placeholder="Eg: Cotton, Clay, Silver"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Region
            </label>
            <input
              type="text"
              name="region"
              value={product.region}
              onChange={handleChange}
              placeholder="Eg: Kutch, Jaipur, Odisha"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock Available
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Eg: 10"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description / Story
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe your craft..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600 dark:text-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-600 py-3 text-white font-semibold hover:bg-yellow-500 transition shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}
