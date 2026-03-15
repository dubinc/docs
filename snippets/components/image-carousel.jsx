import { useState, useEffect } from "react";

export const ImageCarousel = ({
  images = [],
  imageClassName = "",
  autoplay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(autoplay);

  useEffect(() => {
    if (!autoplayActive || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [autoplayActive, images.length]);

  const disableAutoplay = () => setAutoplayActive(false);

  const goToPrev = () => {
    disableAutoplay();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    disableAutoplay();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    disableAutoplay();
    setCurrentIndex(index);
  };

  if (!images.length) return null;

  return (
    <div className="not-prose w-full" onClick={disableAutoplay}>
      <div className="relative overflow-hidden rounded-xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className={`w-full rounded-xl object-cover p-1 ${imageClassName ? imageClassName : "aspect-[1200/630]"}`}
            />
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 shadow-sm backdrop-blur-sm">
            <button
              onClick={goToPrev}
              className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-zinc-950 dark:bg-white"
                      : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
