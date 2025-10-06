import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadCrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

interface BreadCrumbsProps {
  items: BreadCrumbItem[];
  className?: string;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items, className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          {item.isActive ? (
            <span className="text-gray-900 font-medium flex items-center space-x-1">
              {item.icon && item.icon}
              <span>{item.label}</span>
            </span>
          ) : (
            <button
              onClick={() => item.path && navigate(item.path)}
              className="hover:text-gray-900 transition-colors flex items-center space-x-1"
              disabled={!item.path}
            >
              {item.icon && item.icon}
              <span>{item.label}</span>
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
