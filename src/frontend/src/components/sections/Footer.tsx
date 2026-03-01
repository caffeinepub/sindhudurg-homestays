import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Pricing", href: "#pricing" },
  { label: "Pre-Wedding", href: "#prewedding" },
  { label: "Monsoon", href: "#monsoon" },
  { label: "Gallery", href: "#gallery" },
  { label: "Payment", href: "#payment" },
  { label: "Contact", href: "#contact" },
  { label: "Book Now", href: "#booking" },
];

const handleNavClick = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold">
                  S
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-background text-xl leading-tight">
                  Sindhudurg Homestays
                </h3>
                <p className="text-background/50 text-xs">
                  Where Konkan meets your heart
                </p>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed font-body max-w-xs mb-6">
              Authentic Konkan experiences crafted with love — from beach
              sunsets to mountain treks, we make every journey unforgettable.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                {
                  icon: SiInstagram,
                  href: "https://www.instagram.com/sindhudurg_homestays",
                  label: "Instagram",
                },
                {
                  icon: SiFacebook,
                  href: "https://www.facebook.com/sindhudurghomestays",
                  label: "Facebook",
                },
                {
                  icon: SiYoutube,
                  href: "https://www.youtube.com/@sindhudurghomestays",
                  label: "YouTube",
                },
                {
                  icon: SiWhatsapp,
                  href: "https://wa.me/919876543210?text=Hi,%20I%20want%20to%20book%20a%20package",
                  label: "WhatsApp",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-background mb-5 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-background/60 hover:text-accent text-sm transition-colors font-body"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-background mb-5 text-base">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background/80 text-sm font-semibold">
                    +91 98765 43210
                  </p>
                  <p className="text-background/50 text-xs">Call or WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background/80 text-sm font-semibold">
                    info@sindhudurghomestays.com
                  </p>
                  <p className="text-background/50 text-xs">Email us anytime</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background/80 text-sm font-semibold">
                    Tarkarli, Malvan
                  </p>
                  <p className="text-background/50 text-xs">
                    Sindhudurg, Maharashtra 416606
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-xs font-body text-center md:text-left">
            © {year} Sindhudurg Homestays. All rights reserved.
          </p>
          <p className="text-background/40 text-xs font-body flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-rose-400 fill-current" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
