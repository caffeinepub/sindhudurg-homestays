import { Package, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Guests" },
  { icon: Package, value: "12+", label: "Packages" },
  { icon: Star, value: "4.9★", label: "Rating" },
];

export default function IntroStrip() {
  return (
    <section className="bg-primary py-14 md:py-20 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <span className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                {value}
              </span>
              <span className="text-primary-foreground/70 text-sm mt-1 font-body">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-primary-foreground/85 text-lg md:text-xl leading-relaxed font-body font-light">
            Nestled between the{" "}
            <span className="text-accent font-semibold">Western Ghats</span> and
            the <span className="text-accent font-semibold">Arabian Sea</span>,
            Sindhudurg offers an unmatched blend of sun, sea, forests, and
            heritage. Let us take you there.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
