import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, usePackagesByCategory } from "@/hooks/useQueries";
import { Check, Star } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

interface PricingData {
  category: Category;
  label: string;
  emoji: string;
  highlight: boolean;
  accentClass: string;
  bgClass: string;
}

const pricingCategories: PricingData[] = [
  {
    category: Category.couples,
    label: "Couples Escape",
    emoji: "💑",
    highlight: true,
    accentClass: "border-accent",
    bgClass: "bg-primary",
  },
  {
    category: Category.family,
    label: "Family Fun",
    emoji: "👨‍👩‍👧‍👦",
    highlight: false,
    accentClass: "border-border",
    bgClass: "bg-secondary",
  },
  {
    category: Category.friends,
    label: "Friends Getaway",
    emoji: "🎉",
    highlight: false,
    accentClass: "border-border",
    bgClass: "bg-secondary",
  },
  {
    category: Category.prewedding,
    label: "Pre-Wedding",
    emoji: "💍",
    highlight: false,
    accentClass: "border-border",
    bgClass: "bg-primary",
  },
];

function PricingCard({ data }: { data: PricingData }) {
  const { data: packages, isLoading } = usePackagesByCategory(data.category);

  const cheapest = packages?.reduce(
    (min, p) =>
      Number(p.pricePerPerson) < Number(min.pricePerPerson) ? p : min,
    packages[0],
  );

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in the ${data.label} package. Please share details and pricing.`,
  );
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl overflow-hidden border-2 ${data.accentClass} ${
        data.highlight ? "shadow-amber" : "shadow-tropical"
      }`}
    >
      {data.highlight && (
        <div className="absolute -top-px left-0 right-0 h-1 bg-accent" />
      )}

      {data.highlight && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-accent text-accent-foreground font-bold text-xs gap-1">
            <Star className="h-3 w-3 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header */}
      <div
        className={`${data.bgClass} px-6 pt-6 pb-8 relative`}
        style={{
          background: data.highlight
            ? "linear-gradient(135deg, oklch(0.42 0.13 145) 0%, oklch(0.35 0.12 145) 100%)"
            : "linear-gradient(135deg, oklch(0.52 0.10 205) 0%, oklch(0.45 0.09 205) 100%)",
        }}
      >
        <div className="text-4xl mb-2">{data.emoji}</div>
        <h3 className="font-display text-xl font-bold text-white">
          {data.label}
        </h3>
        {isLoading ? (
          <Skeleton className="h-10 w-32 mt-3 bg-white/20" />
        ) : cheapest ? (
          <div className="mt-3">
            <span className="font-display text-4xl font-bold text-white">
              ₹{Number(cheapest.pricePerPerson).toLocaleString("en-IN")}
            </span>
            <span className="text-white/75 text-sm ml-2">/person</span>
            <p className="text-white/60 text-xs mt-1">
              Group: ₹{Number(cheapest.priceGroup).toLocaleString("en-IN")}
            </p>
          </div>
        ) : (
          <p className="text-white/70 text-sm mt-2">Contact for pricing</p>
        )}
      </div>

      {/* Inclusions */}
      <div className="bg-card px-6 py-6">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          <ul className="space-y-2.5">
            {cheapest?.inclusions.slice(0, 4).map((inc) => (
              <li
                key={inc}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6"
        >
          <Button
            className={`w-full font-semibold gap-2 rounded-full ${
              data.highlight
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <SiWhatsapp className="h-4 w-4" />
            Book Now
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent
            <br />
            <span className="text-primary italic">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            No hidden charges. What you see is what you pay. Every experience
            crafted with love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingCategories.map((data) => (
            <PricingCard key={data.category} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
}
