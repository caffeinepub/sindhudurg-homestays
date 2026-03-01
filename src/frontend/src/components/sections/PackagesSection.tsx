import type { Package } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, usePackagesByCategory } from "@/hooks/useQueries";
import { Check, Clock, ExternalLink, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import couplesBeachDinner from "../../../public/assets/generated/couples-beach-dinner.dim_800x600.jpg";
import couplesBoatRide from "../../../public/assets/generated/couples-boat-ride.dim_800x600.jpg";
import familyCookingClass from "../../../public/assets/generated/family-cooking-class.dim_800x600.jpg";
import familyFarmTour from "../../../public/assets/generated/family-farm-tour.dim_800x600.jpg";
import friendsBonfireNight from "../../../public/assets/generated/friends-bonfire-night.dim_800x600.jpg";
import friendsWaterfallTrek from "../../../public/assets/generated/friends-waterfall-trek.dim_800x600.jpg";
import preweddingBeach from "../../../public/assets/generated/prewedding-beach.dim_800x600.jpg";
import preweddingFort from "../../../public/assets/generated/prewedding-fort.dim_800x600.jpg";
import seniorBeachWalk from "../../../public/assets/generated/senior-beach-walk.dim_800x600.jpg";
import seniorTempleVisit from "../../../public/assets/generated/senior-temple-visit.dim_800x600.jpg";

const categoryConfig = {
  [Category.couples]: {
    label: "Couples",
    images: [couplesBeachDinner, couplesBoatRide],
    tagColor: "bg-rose-100 text-rose-700",
    emoji: "💑",
  },
  [Category.family]: {
    label: "Family",
    images: [familyFarmTour, familyCookingClass],
    tagColor: "bg-amber-100 text-amber-700",
    emoji: "👨‍👩‍👧‍👦",
  },
  [Category.friends]: {
    label: "Friends",
    images: [friendsWaterfallTrek, friendsBonfireNight],
    tagColor: "bg-blue-100 text-blue-700",
    emoji: "🎉",
  },
  [Category.prewedding]: {
    label: "Pre-Wedding",
    images: [preweddingFort, preweddingBeach],
    tagColor: "bg-purple-100 text-purple-700",
    emoji: "💍",
  },
  [Category.senior]: {
    label: "Senior",
    images: [seniorBeachWalk, seniorTempleVisit],
    tagColor: "bg-teal-100 text-teal-700",
    emoji: "🧓",
  },
};

function PackageCard({ pkg, imgSrc }: { pkg: Package; imgSrc: string }) {
  const waMessage = encodeURIComponent(
    `Hi, I want to book the "${pkg.name}" package. Please share details.`,
  );
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-border bg-card shadow-tropical h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <img
            src={imgSrc}
            alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold">
              {pkg.duration}
            </Badge>
          </div>
          {pkg.isAvailable && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                Available
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-display text-xl font-bold text-foreground leading-tight">
            {pkg.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-body">
            {pkg.description}
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              Up to {Number(pkg.maxGuests)} guests
            </span>
          </div>

          {/* Inclusions */}
          <ul className="space-y-1.5 flex-1">
            {pkg.inclusions.slice(0, 5).map((inc) => (
              <li
                key={inc}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="flex items-end justify-between pt-2 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Starting from
              </p>
              <p className="font-display text-2xl font-bold text-primary">
                ₹{Number(pkg.pricePerPerson).toLocaleString("en-IN")}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  /person
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Group: ₹{Number(pkg.priceGroup).toLocaleString("en-IN")}
              </p>
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] text-white hover:bg-[#1ebe5a] gap-1.5 font-semibold">
                <SiWhatsapp className="h-4 w-4" />
                Book
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PackageSkeleton() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="space-y-2 pt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <Skeleton className="h-10 w-full mt-2" />
      </div>
    </Card>
  );
}

function CategoryPackages({ category }: { category: Category }) {
  const { data: packages, isLoading } = usePackagesByCategory(category);
  const config = categoryConfig[category];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <PackageSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!packages?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">{config.emoji}</p>
        <p className="text-muted-foreground font-body">
          No packages available for this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg, i) => (
        <PackageCard
          key={String(pkg.id)}
          pkg={pkg}
          imgSrc={config.images[i % config.images.length]}
        />
      ))}
    </div>
  );
}

export default function PackagesSection() {
  const [activeTab, setActiveTab] = useState<Category>(Category.couples);

  return (
    <section id="packages" className="py-20 md:py-28 bg-sand-texture">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Our Offerings
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Packages for Every
            <br />
            <span className="text-primary italic">Kind of Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            From romantic getaways to group adventures, we curate experiences
            that leave lifelong memories.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Category)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-2xl mx-auto mb-10 bg-muted p-1 h-auto gap-1">
            {Object.entries(categoryConfig).map(([cat, { label, emoji }]) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="flex items-center gap-1.5 py-2.5 font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-sm"
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categoryConfig).map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <CategoryPackages category={cat as Category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
