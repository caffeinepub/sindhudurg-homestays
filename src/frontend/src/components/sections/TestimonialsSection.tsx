import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllTestimonials } from "@/hooks/useQueries";
import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const categoryLabels: Record<string, string> = {
  couples: "Couples",
  family: "Family",
  friends: "Friends",
  prewedding: "Pre-Wedding",
  monsoon: "Monsoon",
};

const categoryColors: Record<string, string> = {
  couples: "bg-rose-100 text-rose-700",
  family: "bg-amber-100 text-amber-700",
  friends: "bg-blue-100 text-blue-700",
  prewedding: "bg-purple-100 text-purple-700",
  monsoon: "bg-green-100 text-green-700",
};

function TestimonialCard({
  testimonial,
}: {
  testimonial: {
    id: bigint;
    name: string;
    location: string;
    message: string;
    category: string;
    rating: bigint;
    date: string;
  };
}) {
  const catKey = String(testimonial.category);

  return (
    <Card className="border-border bg-card shadow-tropical h-full">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote icon */}
        <Quote className="h-8 w-8 text-accent mb-4 opacity-60 flex-shrink-0" />

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: Number(testimonial.rating) }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: star rating is positional
            <Star key={i} className="h-4 w-4 text-accent fill-current" />
          ))}
        </div>

        {/* Message */}
        <p className="text-foreground/80 text-sm leading-relaxed font-body flex-1 mb-4 italic">
          "{testimonial.message}"
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div>
            <p className="font-display font-semibold text-foreground">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs font-body mt-0.5">
              {testimonial.location}
            </p>
          </div>
          <Badge
            className={`text-xs font-semibold ${categoryColors[catKey] || "bg-muted text-muted-foreground"}`}
          >
            {categoryLabels[catKey] || catKey}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex justify-between pt-4">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useAllTestimonials();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Guest Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Guests
            <br />
            <span className="text-primary italic">Are Saying</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Real experiences from real guests who fell in love with Sindhudurg.
          </p>
        </motion.div>

        {/* Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : !testimonials?.length ? (
          <div className="text-center py-16 text-muted-foreground font-body">
            <p>No testimonials yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t) => (
                <CarouselItem
                  key={String(t.id)}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard
                    testimonial={{ ...t, category: String(t.category) }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-primary" />
              <CarouselNext className="static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-primary" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}
