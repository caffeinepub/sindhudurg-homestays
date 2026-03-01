import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import preweddingBeach from "/assets/generated/prewedding-beach.dim_800x600.jpg";
import preweddingFort from "/assets/generated/prewedding-fort.dim_800x600.jpg";

const locations = [
  { name: "Tarkarli Beach", desc: "Golden shores at sunset" },
  { name: "Sindhudurg Fort", desc: "Majestic island fortress" },
  { name: "Devbagh", desc: "Secluded jungle beach" },
  { name: "Bhogwe Waterfalls", desc: "Misty cascading falls" },
];

const photographers = [
  { name: "Rahul Desai", specialty: "Candid & Outdoor", rating: 5 },
  { name: "Priya Kulkarni", specialty: "Fine Art Portraits", rating: 5 },
  { name: "Aditya Nair", specialty: "Cinematic Style", rating: 5 },
];

const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent("Hi, I'm interested in a pre-wedding photoshoot. Please share details about packages, locations, and photographer partnerships.")}`;

export default function PreWeddingSection() {
  return (
    <section
      id="prewedding"
      className="bg-sunset-mesh py-20 md:py-28 relative overflow-hidden"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="bg-accent text-accent-foreground font-bold mb-4">
            💍 Pre-Wedding Shoots
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Capture Your Love Story
            <br />
            <span className="italic text-accent">Before the Big Day</span>
          </h2>
          <p className="text-white/75 max-w-xl mx-auto font-body text-lg">
            Sindhudurg's dramatic coastline, ancient fort, and lush waterfalls
            create the most breathtaking backdrops for your forever memories.
          </p>
        </motion.div>

        {/* Images grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src={preweddingFort}
              alt="Pre-wedding shoot at Sindhudurg Fort"
              className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <MapPin className="h-3 w-3 mr-1" />
                Sindhudurg Fort
              </Badge>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src={preweddingBeach}
              alt="Pre-wedding shoot at Tarkarli Beach"
              className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <MapPin className="h-3 w-3 mr-1" />
                Tarkarli Beach
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-accent" />
              Shoot Locations
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {locations.map(({ name, desc }) => (
                <div
                  key={name}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-4"
                >
                  <h4 className="font-display font-semibold text-white text-sm mb-1">
                    {name}
                  </h4>
                  <p className="text-white/60 text-xs font-body">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photographers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Camera className="h-6 w-6 text-accent" />
              Partner Photographers
            </h3>
            <div className="space-y-3">
              {photographers.map(({ name, specialty, rating }) => (
                <div
                  key={name}
                  className="flex items-center justify-between bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-5 py-4"
                >
                  <div>
                    <h4 className="font-display font-semibold text-white">
                      {name}
                    </h4>
                    <p className="text-white/60 text-xs font-body mt-0.5">
                      {specialty}
                    </p>
                  </div>
                  <div className="flex">
                    {"⭐"
                      .repeat(rating)
                      .split("")
                      .map((_, i) => (
                        <Star
                          // biome-ignore lint/suspicious/noArrayIndexKey: static star row
                          key={i}
                          className="h-4 w-4 text-accent fill-current"
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-8"
            >
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 rounded-full py-6 text-base">
                <SiWhatsapp className="h-5 w-5" />
                Plan My Pre-Wedding Shoot
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
