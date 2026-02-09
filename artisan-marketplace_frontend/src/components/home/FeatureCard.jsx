export default function FeatureCard({ title, description }) {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-md hover:shadow-xl transition">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}
