import React from 'react';

// Maps gemstone category IDs to specific high-end color classes
const COLOR_MAP = {
  'blue-sapphire': 'blue',
  'kashmir-blue-sapphire': 'blue',
  'cornflower-blue-sapphire': 'blue',
  'royal-blue-sapphire': 'blue',
  'blue-zircon': 'blue',
  'blue-topaz': 'blue',
  'kyanite': 'blue',
  'lapis-lazuli': 'blue',
  
  'emerald': 'emerald',
  'colombian-emerald': 'emerald',
  'no-oil-emerald': 'emerald',
  'panjshir-afghanistan-emerald': 'emerald',
  'vivid-green-emerald': 'emerald',
  'peridot': 'emerald',
  
  'ruby': 'ruby',
  'burmese-ruby': 'ruby',
  'pigeon-blood-ruby': 'ruby',
  'star-ruby': 'ruby',
  'red-coral': 'coral',
  'garnet': 'ruby',
  
  'yellow-sapphire-pukhraj': 'yellow',
  'citrine': 'yellow',
  'yellow-topaz': 'yellow',
  
  'pearl': 'pearl',
  'white-coral': 'pearl',
  
  'hessonite': 'hessonite',
  
  'opal': 'opal',
  'fire-opal': 'opal',
  'moonstone': 'opal',
  
  'amethyst': 'amethyst',
  'iolite': 'amethyst',
  
  'alexandrite': 'opal' // multi color
};

export default function GemRenderer({ category = 'blue-sapphire', size = 'md', className = '' }) {
  const colorType = COLOR_MAP[category] || 'blue';
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`gem-renderer ${selectedSize} ${className}`}>
      {/* 3D Rotatable body with conic gradient reflections */}
      <div className={`gem-body gem-color-${colorType}`}>
        {/* Facet layers for realistic diamond cutting */}
        <div className="gem-facet"></div>
        <div className="gem-facet-inner"></div>
        
        {/* Animated shimmer light reflex overlay */}
        <div className="gem-sparkle"></div>
      </div>
    </div>
  );
}
