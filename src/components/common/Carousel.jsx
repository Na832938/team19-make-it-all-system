// src/components/common/Carousel.jsx
import { useState, useMemo } from 'react';
import Button from './Button.jsx';

export default function Carousel({ items, renderItem }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  const slides = useMemo(() => items.map((item, idx) => renderItem(item, idx)), [items, renderItem]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="w-full flex-shrink-0 flex justify-center items-center"
            style={{ height: '100%' }}
          >
            {slide}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <Button
            type="orange"
            variant="carousel"
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow bg-[var(--surface-colour)] text-[var(--text-primary)] hover:brightness-110"
          >
            ‹
          </Button>
          <Button
            type="orange"
            variant="carousel"
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow bg-[var(--surface-colour)] text-[var(--text-primary)] hover:brightness-110"
          >
            ›
          </Button>
        </>
      )}
    </div>
  );
}
