import { Badge } from "@/components/ui/badge";
import {
  Anchor,
  MapPin,
  Mountain,
  Sunset,
  TreePine,
  Waves,
  Wind,
} from "lucide-react";
import { motion } from "motion/react";
import amboliWaterfall from "../../../public/assets/generated/amboli-waterfall.dim_800x500.jpg";
import devbaghBeach from "../../../public/assets/generated/devbagh-beach.dim_800x500.jpg";
import malvanBeach from "../../../public/assets/generated/malvan-beach.dim_800x500.jpg";
import sindhudurgFort from "../../../public/assets/generated/sindhudurg-fort.dim_800x500.jpg";
import tondavaliBeach from "../../../public/assets/generated/tondavali-beach.dim_800x500.jpg";
import vengurlaBeach from "../../../public/assets/generated/vengurla-beach.dim_800x500.jpg";

const places = [
  {
    name: "Tarkarli Beach",
    location: "Malvan, Sindhudurg",
    icon: Waves,
    image: malvanBeach,
    tags: ["Snorkeling", "Scuba Diving", "Sunset Views"],
    description:
      "One of the cleanest beaches in Maharashtra with crystal-clear water and white sand. Perfect for snorkeling, scuba diving, and long quiet walks at sunset.",
    mood: "Romantic & Serene",
  },
  {
    name: "Sindhudurg Fort",
    location: "Sea Fort, Malvan",
    icon: Anchor,
    image: sindhudurgFort,
    tags: ["Heritage", "History", "Boat Ride"],
    description:
      "Built by Chhatrapati Shivaji Maharaj on a rocky island, this 17th-century sea fort offers sweeping ocean views and a deep sense of history and calm.",
    mood: "Historic & Peaceful",
  },
  {
    name: "Amboli Waterfalls",
    location: "Amboli, Western Ghats",
    icon: Mountain,
    image: amboliWaterfall,
    tags: ["Trekking", "Nature", "Monsoon Special"],
    description:
      "Nestled in the misty Western Ghats, Amboli is a hill station famed for breathtaking waterfalls, rich biodiversity, and a cool, rejuvenating climate.",
    mood: "Refreshing & Tranquil",
  },
  {
    name: "Devbagh Beach",
    location: "Malvan, Sindhudurg",
    icon: TreePine,
    image: devbaghBeach,
    tags: ["Dolphins", "Mangroves", "Isolation"],
    description:
      "A hidden gem where two rivers meet the sea. Spot dolphins, explore mangrove forests, and enjoy the solitude of an almost private beach.",
    mood: "Wild & Untouched",
  },
  {
    name: "Vengurla Beach",
    location: "Vengurla, Sindhudurg",
    icon: Sunset,
    image: vengurlaBeach,
    tags: ["Lighthouse", "Cashew Farms", "Sunrise"],
    description:
      "A serene coastal town with a beautiful lighthouse, pristine beach, and vast cashew and coconut plantations. Ideal for a slow, peaceful getaway.",
    mood: "Calm & Picturesque",
  },
  {
    name: "Tondavali Beach",
    location: "Malvan, Sindhudurg",
    icon: Wind,
    image: tondavaliBeach,
    tags: ["Secluded", "Rocky Coves", "Stargazing"],
    description:
      "One of the most secluded beaches in the region, surrounded by rocky outcrops and coconut groves. Hardly crowded — ideal for peace seekers and star gazers.",
    mood: "Secret & Serene",
  },
];

export default function PeacefulPlacesSection() {
  return (
    <section id="places" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="bg-primary/10 text-primary font-semibold mb-4 px-4 py-1.5">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            Explore Sindhudurg
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
            Peaceful Places
            <br />
            <span className="text-primary italic">Worth Visiting</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Beyond the beaches, Sindhudurg hides serene spots that restore your
            soul — misty waterfalls, ancient forts, hidden coves, and sleepy
            coastal towns untouched by time.
          </p>
        </motion.div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place, i) => {
            const Icon = place.icon;
            return (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card border border-border"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Mood badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                      {place.mood}
                    </span>
                  </div>
                  {/* Icon bubble */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-foreground leading-tight">
                      {place.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{place.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                    {place.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground font-body text-base mb-4">
            Want a guided tour to these hidden gems?
          </p>
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              "Hi, I'd like to explore the peaceful places in Sindhudurg. Can you suggest a guided itinerary?",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <MapPin className="h-4 w-4" />
            Plan a Custom Tour
          </a>
        </motion.div>
      </div>
    </section>
  );
}
