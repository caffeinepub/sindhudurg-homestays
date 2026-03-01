import { ExternalLink, Heart, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { SiInstagram } from "react-icons/si";
import couplesBeachDinner from "/assets/generated/couples-beach-dinner.dim_800x600.jpg";
import familyFarmTour from "/assets/generated/family-farm-tour.dim_800x600.jpg";
import friendsWaterfallTrek from "/assets/generated/friends-waterfall-trek.dim_800x600.jpg";
import heroTarkarlSunset from "/assets/generated/hero-tarkarli-sunset.dim_1600x900.jpg";
import monsoonSindhudurg from "/assets/generated/monsoon-sindhudurg.dim_800x600.jpg";
import preweddingFort from "/assets/generated/prewedding-fort.dim_800x600.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/sindhudurg_homestays";

const instaPosts = [
  {
    src: heroTarkarlSunset,
    likes: "1.2k",
    caption: "Golden hour at Tarkarli 🌅 #TarkarliBeach",
  },
  {
    src: couplesBeachDinner,
    likes: "892",
    caption: "Romance by the sea ✨ #BeachDinner",
  },
  {
    src: preweddingFort,
    likes: "2.1k",
    caption: "Forever at Sindhudurg Fort 💍 #PreWedding",
  },
  {
    src: monsoonSindhudurg,
    likes: "1.5k",
    caption: "Monsoon magic in the Ghats ⛰️ #MonsoonKonkan",
  },
  {
    src: friendsWaterfallTrek,
    likes: "743",
    caption: "Adventure awaits! 🌊 #WaterfallTrek",
  },
  {
    src: familyFarmTour,
    likes: "621",
    caption: "Farm to table life 🌿 #KonkanFarm",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-28 bg-sand-texture">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-2"
          >
            <SiInstagram className="h-6 w-6" />
            <span className="font-display text-4xl md:text-5xl font-bold">
              @sindhudurg_homestays
            </span>
          </a>
          <p className="text-muted-foreground font-body mt-2">
            Follow our journey through the Konkan coast
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
          {instaPosts.map((post) => (
            <motion.a
              key={post.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden group aspect-square block"
            >
              <img
                src={post.src}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Heart className="h-5 w-5 fill-current text-rose-400" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                </div>
                <p className="text-white text-xs text-center font-body leading-snug line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            <SiInstagram className="h-5 w-5" />
            Follow on Instagram
            <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
