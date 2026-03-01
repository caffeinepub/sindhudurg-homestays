import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import heroTarkarlSunset from "../../../public/assets/generated/hero-tarkarli-sunset.dim_1600x900.jpg";
import monsoonSindhudurg from "../../../public/assets/generated/monsoon-sindhudurg.dim_800x600.jpg";
import preweddingBeach from "../../../public/assets/generated/prewedding-beach.dim_800x600.jpg";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi,%20I%20want%20to%20book%20a%20package";

const slides = [
  {
    src: heroTarkarlSunset,
    title: "Discover Sindhudurg",
    subtitle: "Where the Konkan Coast meets its most breathtaking sunsets",
    tag: "Arabian Sea • Tarkarli",
  },
  {
    src: preweddingBeach,
    title: "Pre-Wedding Dreams",
    subtitle: "Capture forever against Tarkarli's golden shores",
    tag: "Photography • Romance",
  },
  {
    src: monsoonSindhudurg,
    title: "Monsoon Magic",
    subtitle: "Experience the raw beauty of the Western Ghats in the rains",
    tag: "June – September",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback((idx: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleExplore = () => {
    const el = document.querySelector("#packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].src}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current}-content`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold uppercase tracking-widest mb-4">
              {slides[current].tag}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none tracking-tight text-balance">
              {slides[current].title}
            </h1>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body font-light">
              {slides[current].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleExplore}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-base rounded-full"
              >
                Explore Packages
              </Button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 font-semibold px-8 py-6 text-base rounded-full gap-2 backdrop-blur-sm"
                >
                  <SiWhatsapp className="h-5 w-5 text-[#25D366]" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.title}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-accent"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow controls */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
