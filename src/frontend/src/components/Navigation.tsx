import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Pre-Wedding", href: "#prewedding" },
  { label: "Monsoon", href: "#monsoon" },
  { label: "Gallery", href: "#gallery" },
  { label: "Payment", href: "#payment" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi,%20I%20want%20to%20book%20a%20package";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-tropical border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-display font-bold">
                S
              </span>
            </div>
            <span
              className={`font-display font-semibold text-lg leading-tight transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Sindhudurg
              <br />
              <span className="text-accent text-sm font-normal">Homestays</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled
                    ? "text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-1.5"
              >
                <SiWhatsapp className="h-4 w-4" />
                Book Now
              </Button>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-card/98 backdrop-blur-xl flex flex-col pt-20"
          >
            <nav className="flex flex-col items-center gap-6 p-8 flex-1">
              {navLinks.map((link, i) => (
                <motion.button
                  type="button"
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 text-lg px-8 py-6">
                    <SiWhatsapp className="h-5 w-5" />
                    Book via WhatsApp
                  </Button>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="h-7 w-7" />
      </a>
    </>
  );
}
