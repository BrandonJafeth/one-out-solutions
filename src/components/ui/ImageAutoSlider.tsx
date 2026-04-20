import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ImageAutoSliderProps {
  images?: string[];
  className?: string;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop"
];

export const ImageAutoSlider = ({ images = [], className }: ImageAutoSliderProps) => {
  // Use user-provided or default images
  const displayImages = images && images.length > 0 ? images : defaultImages;
  
  // Only duplicate once for translate(-50%) scroll logic to improve DOM performance
  const duplicatedImages = [...displayImages, ...displayImages];

  return (
    <div className={twMerge("w-full relative overflow-hidden flex items-center justify-center py-8", className)}>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); } /* Hardware accelerated transform */
        }

        .infinite-scroll-track {
          display: flex;
          width: max-content;
          animation: scroll-left 40s linear infinite;
          will-change: transform;
        }

        .scroll-mask {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
      
      {/* Scrolling images container */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="scroll-mask w-full overflow-hidden translate-z-0">
          {/* Pause animation on hover for better UX */}
          <div className="infinite-scroll-track gap-6 hover:[animation-play-state:paused]">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden border border-[#d6ebfd]/19 bg-black transition-colors duration-300 hover:border-orange/50 group"
              >
                <img
                  src={image}
                  alt={`Captura ${index + 1} del proyecto en portafolio`}
                  className="w-full h-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};
