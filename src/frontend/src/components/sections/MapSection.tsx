import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";

const locations = [
  {
    name: "Tarkarli Beach",
    desc: "Crystal clear turquoise waters, water sports & sunset views",
    icon: "🏖️",
  },
  {
    name: "Sindhudurg Fort",
    desc: "17th-century Maratha sea fort on a scenic island",
    icon: "🏰",
  },
  {
    name: "Amboli Waterfalls",
    desc: "Western Ghats' stunning monsoon waterfalls & biodiversity",
    icon: "💦",
  },
];

export default function MapSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Location
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Us
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-body">
              Tarkarli, Malvan, Sindhudurg, Maharashtra 416606
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Location Cards */}
          <div className="space-y-4">
            {locations.map(({ name, desc, icon }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border bg-card shadow-tropical hover:shadow-amber transition-shadow duration-300 cursor-pointer">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="text-3xl">{icon}</div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Navigation className="h-3.5 w-3.5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">
                          {name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Get directions button */}
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="https://maps.google.com/?q=Tarkarli+Beach,+Malvan,+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </motion.a>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-tropical border-2 border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30474.94!2d73.44!3d16.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc02d6cfbb3b5b7%3A0x1e46b75b09b09f7a!2sTarkarli%20Beach!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tarkarli Beach Map"
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
