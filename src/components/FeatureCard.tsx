interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const FeatureCard = ({ title, description, icon, gradient }: FeatureCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-4`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
