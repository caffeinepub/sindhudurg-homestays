import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import couplesBeachDinner from "../../../public/assets/generated/couples-beach-dinner.dim_800x600.jpg";
import couplesBoatRide from "../../../public/assets/generated/couples-boat-ride.dim_800x600.jpg";
import familyCookingClass from "../../../public/assets/generated/family-cooking-class.dim_800x600.jpg";
import familyFarmTour from "../../../public/assets/generated/family-farm-tour.dim_800x600.jpg";
import friendsBonfireNight from "../../../public/assets/generated/friends-bonfire-night.dim_800x600.jpg";
import friendsWaterfallTrek from "../../../public/assets/generated/friends-waterfall-trek.dim_800x600.jpg";
import heroTarkarlSunset from "../../../public/assets/generated/hero-tarkarli-sunset.dim_1600x900.jpg";
import monsoonSindhudurg from "../../../public/assets/generated/monsoon-sindhudurg.dim_800x600.jpg";
import preweddingBeach from "../../../public/assets/generated/prewedding-beach.dim_800x600.jpg";
import preweddingFort from "../../../public/assets/generated/prewedding-fort.dim_800x600.jpg";

const galleryItems = [
  {
    src: heroTarkarlSunset,
    caption: "Tarkarli Sunset",
    category: "all",
  },
  {
    src: couplesBeachDinner,
    caption: "Beach Dinner",
    category: "couples",
  },
  {
    src: couplesBoatRide,
    caption: "Sunset Boat Ride",
    category: "couples",
  },
  {
    src: familyFarmTour,
    caption: "Farm Tour",
    category: "family",
  },
  {
    src: familyCookingClass,
    caption: "Cooking Class",
    category: "family",
  },
  {
    src: friendsWaterfallTrek,
    caption: "Waterfall Trek",
    category: "friends",
  },
  {
    src: friendsBonfireNight,
    caption: "Bonfire Night",
    category: "friends",
  },
  {
    src: preweddingFort,
    caption: "Fort Shoot",
    category: "prewedding",
  },
  {
    src: preweddingBeach,
    caption: "Beach Shoot",
    category: "prewedding",
  },
  {
    src: monsoonSindhudurg,
    caption: "Monsoon Bliss",
    category: "monsoon",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Couples", value: "couples" },
  { label: "Family", value: "family" },
  { label: "Friends", value: "friends" },
  { label: "Pre-Wedding", value: "prewedding" },
  { label: "Monsoon", value: "monsoon" },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter(
          (g) => g.category === activeFilter || g.category === "all",
        );

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Gallery
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Moments That
            <br />
            <span className="text-primary italic">Last a Lifetime</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            A glimpse into the magic that awaits you on the Konkan coast.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button
              type="button"
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground shadow-tropical"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => openLightbox(i)}
                className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-sm font-semibold">
                    {item.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={() => closeLightbox()}
      >
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
          {lightboxIndex !== null && (
            <div className="relative">
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <Button
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 h-auto"
                variant="ghost"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 h-auto"
                variant="ghost"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="w-full rounded-xl max-h-[80vh] object-contain bg-black"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {filtered[lightboxIndex].caption} · {lightboxIndex + 1}/
                {filtered.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
