import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  size = 'md',
  color = 'currentColor'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const iconPath = `/icons/${name}.svg`;

  return (
    <div 
      className={`${sizeClasses[size]} ${className}`}
      style={{ color }}
    >
      <img 
        src={iconPath} 
        alt={name}
        className="w-full h-full"
        style={{ filter: 'none' }}
        onError={(e) => {
          // Fallback to emoji if SVG fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = getFallbackIcon(name);
          }
        }}
      />
    </div>
  );
};

// Fallback emoji icons
const getFallbackIcon = (name: string): string => {
  const iconMap: Record<string, string> = {
    'transcriptions': '☰',
    'tags': '🏷️',
    'projects': '📁',
    'settings': '⚙️',
    'trash': '🗑️',
    'plus': '+',
    'chevron-down': '⌄',
    'home': '🏠',
    'favourites': '⭐',
    'bell': '🔔',
    'search': '🔍',
  };
  
  return iconMap[name] || '?';
};

export default Icon;
