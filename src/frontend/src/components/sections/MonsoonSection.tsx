import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, usePackagesByCategory } from "@/hooks/useQueries";
import { Binoculars, CloudRain, Eye, Waves } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import monsoonSindhudurg from "../../../public/assets/generated/monsoon-sindhudurg.dim_800x600.jpg";

const activities = [
  {
    icon: CloudRain,
    title: "Waterfall Trekking",
    desc: "Discover hidden cascades in the mist-shrouded Western Ghats forests.",
  },
  {
    icon: Waves,
    title: "Kayaking & Water Sports",
    desc: "Paddle through emerald backwaters and serene lagoons.",
  },
  {
    icon: Eye,
    title: "Scenic Rain Drives",
    desc: "Wind through lush countryside roads drenched in monsoon greenery.",
  },
  {
    icon: Binoculars,
    title: "Bird Watching",
    desc: "Spot rare migratory and resident birds in their natural habitat.",
  },
];

export default function MonsoonSection() {
  const { data: packages, isLoading } = usePackagesByCategory(Category.monsoon);

  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent("Hi, I'm interested in your Monsoon packages. Please share details.")}`;

  return (
    <section
      id="monsoon"
      className="bg-monsoon-green py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent text-accent-foreground font-bold mb-4">
              Best: June – September
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Monsoon Magic
              <br />
              <span className="italic text-accent">Awaits You</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed font-body mb-8">
              Witness the Western Ghats transform into a living emerald
              tapestry. Roaring waterfalls, misty valleys, and the sweet
              fragrance of wet earth — monsoon in Sindhudurg is an experience
              like no other.
            </p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 rounded-full px-8">
                <SiWhatsapp className="h-4 w-4" />
                Book Monsoon Package
              </Button>
            </a>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <img
                src={monsoonSindhudurg}
                alt="Monsoon Sindhudurg"
                className="w-full h-72 md:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-xl px-5 py-3 shadow-amber">
              <p className="font-display font-bold text-xl">June–Sep</p>
              <p className="text-xs font-semibold opacity-80">Monsoon Season</p>
            </div>
          </motion.div>
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {activities.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm h-full">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed font-body">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Monsoon packages */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl bg-white/10" />
            ))}
          </div>
        ) : packages && packages.length > 0 ? (
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-6 text-center">
              Monsoon Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => {
                const waMsg = encodeURIComponent(
                  `Hi, I want to book the "${pkg.name}" monsoon package. Please share details.`,
                );
                return (
                  <Card
                    key={String(pkg.id)}
                    className="bg-white/10 border-white/20 backdrop-blur-sm"
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-display font-bold text-white text-lg leading-tight flex-1 mr-2">
                          {pkg.name}
                        </h4>
                        <Badge className="bg-accent text-accent-foreground text-xs flex-shrink-0">
                          {pkg.duration}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm mb-4 leading-relaxed font-body">
                        {pkg.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-accent text-xl">
                          ₹{Number(pkg.pricePerPerson).toLocaleString("en-IN")}
                          <span className="text-xs text-white/60 font-normal ml-1">
                            /person
                          </span>
                        </span>
                        <a
                          href={`https://wa.me/919876543210?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-semibold"
                          >
                            <SiWhatsapp className="h-3.5 w-3.5" />
                            Book
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
