function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
        <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  
  export default FeatureCard;
  