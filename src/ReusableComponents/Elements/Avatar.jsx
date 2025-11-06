// components/Avatar.jsx
import React, { useState } from 'react';

const Avatar = ({
  src,
  alt = '',
  name,
  size = 'medium',
  variant = 'circle',
  status,
  badge,
  fallbackIcon,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const variants = {
    circle: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const showFallback = !src || imageError;

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onClick={onClick}
        className={`
          ${sizes[size]}
          ${variants[variant]}
          ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
          flex items-center justify-center
          bg-gradient-to-br from-teal-400 to-teal-600
          text-white font-semibold
          overflow-hidden
          transition-opacity duration-200
        `}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : fallbackIcon ? (
          fallbackIcon
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>

      {/* Status Indicator */}
      {status && (
        <span className={`
          absolute bottom-0 right-0
          ${statusSize[size]}
          ${statusColors[status]}
          border-2 border-white
          rounded-full
        `}></span>
      )}

      {/* Badge */}
      {badge && (
        <span className="
          absolute -top-1 -right-1
          min-w-[1.25rem] h-5
          flex items-center justify-center
          px-1
          bg-red-500 text-white
          text-xs font-bold
          rounded-full
          border-2 border-white
        ">
          {badge}
        </span>
      )}
    </div>
  );
};

export default Avatar;

// AvatarGroup Component
export const AvatarGroup = ({ children, max = 5, size = 'medium', className = '' }) => {
  const avatars = React.Children.toArray(children);
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex items-center -space-x-2 ${className}`}>
      {displayAvatars}
      {remaining > 0 && (
        <Avatar
          name={`+${remaining}`}
          size={size}
          className="ring-2 ring-white"
        />
      )}
    </div>
  );
};