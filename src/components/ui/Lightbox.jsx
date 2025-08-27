import React, { useState, useEffect, useCallback } from 'react';
import { 
  IconX, 
  IconChevronLeft, 
  IconChevronRight, 
  IconMaximize, 
  IconMinimize, 
  IconPlayerPlay, 
} from '@tabler/icons-react';

const Lightbox = ({ 
  isOpen, 
  onClose, 
  sources = [], 
  captions = [],
  startIndex = 0,
  showThumbnails = true 
}) => {
  const validStartIndex = typeof startIndex === 'number' ? startIndex : 0;
  
  const [currentIndex, setCurrentIndex] = useState(validStartIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // reset when open
  useEffect(() => {
    if (isOpen) {
      const safeIndex = typeof startIndex === 'number' ? startIndex : 0;
      setCurrentIndex(safeIndex);
      setIsLoading(false);
      setImageError(false);
    }
  }, [startIndex, isOpen, sources]);

  // keyboard nav
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sources.length);
    setIsLoading(false);
    setImageError(false);
  }, [sources.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sources.length) % sources.length);
    setIsLoading(false);
    setImageError(false);
  }, [sources.length]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setIsLoading(false);
    setImageError(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  const isVideo = (src) => {
    if (!src) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
  };

  if (!isOpen || sources.length === 0) return null;

  const currentSource = sources[currentIndex];
  const currentCaption = captions[currentIndex];
  const isCurrentVideo = isVideo(currentSource);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">

      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="text-white/90 text-sm font-medium">
            {currentIndex + 1} / {sources.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <IconMinimize size={20} /> : <IconMaximize size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              aria-label="Close lightbox"
            >
              <IconX size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-full flex items-center justify-center p-16 pt-20 pb-32">
        {/* previous button */}
        {sources.length > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <IconChevronLeft size={24} />
          </button>
        )}

        {/* media container */}
        <div className="relative max-w-full max-h-full flex items-center justify-center">
          {isLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {imageError && (
            <div className="flex flex-col items-center justify-center text-white/60 p-8">
              <IconX size={48} className="mb-2" />
              <p>Failed to load media</p>
              <p className="text-sm mt-1">{currentSource}</p>
            </div>
          )}

          {!imageError && currentSource && (
            isCurrentVideo ? (
              <div className="relative">
                <video
                  key={currentSource}
                  src={currentSource}
                  controls
                  className="max-w-full max-h-[70vh] rounded-lg shadow-2xl"
                  onLoadedData={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            ) : (
              <img
                key={`img-${currentIndex}-${Date.now()}`}
                src={currentSource}
                alt={currentCaption || `Image ${currentIndex + 1}`}
                className="max-w-full max-h-[70vh] rounded-lg shadow-2xl object-contain"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: imageError ? 'none' : 'block' }}
              />
            )
          )}
        </div>

        {/* mext button */}
        {sources.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Next image"
          >
            <IconChevronRight size={24} />
          </button>
        )}
      </div>

      {/* caption */}
      {currentCaption && (
        <div className="absolute bottom-24 left-0 right-0 text-center px-4">
          <p className="text-white/90 text-sm md:text-base bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block max-w-2xl">
            {currentCaption}
          </p>
        </div>
      )}

      {/* thumbnails */}
      {showThumbnails && sources.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 p-4">
            {sources.map((src, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 relative overflow-hidden rounded transition-all duration-200 ${
                  index === currentIndex
                    ? 'ring-2 ring-white scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {isVideo(src) ? (
                  <div className="w-16 h-16 bg-white/10 flex items-center justify-center">
                    <IconPlayerPlay size={20} className="text-white/60" />
                  </div>
                ) : (
                  <img
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lightbox;