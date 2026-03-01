import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  CreditCard,
  Info,
  QrCode,
  Shield,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi,%20I%20would%20like%20to%20inquire%20about%20card%20payment%20options%20for%20booking%20a%20package.";

const bankDetails = [
  { label: "Bank Name", value: "Bank of Maharashtra" },
  { label: "Account No", value: "123456789012" },
  { label: "IFSC Code", value: "MAHB0001234" },
  { label: "Account Name", value: "Sindhudurg Homestays" },
];

const paymentMethods = [
  {
    id: "bank",
    icon: Building2,
    title: "Bank Transfer / NEFT",
    badge: "Recommended",
    badgeClass: "bg-primary text-primary-foreground",
    description:
      "Transfer directly to our bank account via NEFT, RTGS, or IMPS. Instant confirmation on WhatsApp.",
    content: (
      <div className="space-y-3 mt-4">
        <div className="bg-muted/70 rounded-xl p-4 space-y-2.5">
          {bankDetails.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-muted-foreground text-sm font-body flex-shrink-0">
                {label}
              </span>
              <span className="font-semibold text-foreground text-sm font-mono text-right select-all">
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 bg-accent/10 border border-accent/20 rounded-lg p-3">
          <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground font-body leading-snug">
            <strong className="text-foreground">Placeholder details</strong> —
            share your payment screenshot on WhatsApp after transfer for instant
            confirmation.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "upi",
    icon: QrCode,
    title: "UPI Payment",
    badge: "Fastest",
    badgeClass: "bg-accent text-accent-foreground",
    description:
      "Pay via any UPI app — PhonePe, GPay, Paytm, or any bank's UPI. Scan or copy the UPI ID.",
    content: (
      <div className="space-y-3 mt-4">
        {/* QR code placeholder */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 rounded-xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center">
            <QrCode className="h-10 w-10 text-muted-foreground/50 mb-1" />
            <span className="text-[10px] text-muted-foreground font-body text-center leading-tight px-2">
              QR code will appear here
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-body text-center">
            Or copy the UPI ID below
          </p>
        </div>
        <div className="bg-muted/70 rounded-xl p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground font-body mb-0.5">
              UPI ID
            </p>
            <p className="font-mono font-bold text-foreground text-base select-all">
              sindhudurg@upi
            </p>
          </div>
          <Smartphone className="h-6 w-6 text-primary flex-shrink-0" />
        </div>
        <div className="flex items-start gap-2 bg-accent/10 border border-accent/20 rounded-lg p-3">
          <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground font-body leading-snug">
            <strong className="text-foreground">Placeholder UPI ID</strong> —
            send payment screenshot on WhatsApp to confirm your booking.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "card",
    icon: CreditCard,
    title: "Credit / Debit Card",
    badge: "Coming Soon",
    badgeClass: "bg-secondary text-secondary-foreground",
    description:
      "Secure online card payments via Stripe. Pay with Visa, Mastercard, or any major debit/credit card.",
    content: (
      <div className="space-y-3 mt-4">
        <div className="flex flex-col items-center gap-4 py-2">
          {/* Card brand icons */}
          <div className="flex gap-3 items-center">
            {["VISA", "MC", "RuPay"].map((brand) => (
              <div
                key={brand}
                className="px-3 py-1.5 rounded-md bg-muted border border-border"
              >
                <span className="text-xs font-bold text-muted-foreground tracking-wider">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          <Shield className="h-8 w-8 text-primary opacity-60" />
          <p className="text-sm text-muted-foreground font-body text-center leading-snug max-w-xs">
            Card payment gateway is currently being set up. Contact us via
            WhatsApp to arrange card payment or pay on arrival.
          </p>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors"
        >
          <SiWhatsapp className="h-4 w-4" />
          Enquire on WhatsApp
        </a>
      </div>
    ),
  },
];

export default function PaymentOptionsSection() {
  return (
    <section id="payment" className="py-20 md:py-28 bg-sand-texture">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            How to Pay
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple &amp; Secure
            <br />
            <span className="text-primary italic">Payment Options</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Choose the payment method that works best for you. All transactions
            are safe and confirmed via WhatsApp.
          </p>
        </motion.div>

        {/* Payment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {paymentMethods.map(
            (
              {
                id,
                icon: Icon,
                title,
                badge,
                badgeClass,
                description,
                content,
              },
              i,
            ) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full border-border bg-card shadow-tropical flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge
                        className={`text-xs font-bold flex-shrink-0 ${badgeClass}`}
                      >
                        {badge}
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-lg font-bold text-foreground mt-3">
                      {title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">
                      {description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <Separator className="mb-0" />
                    {content}
                  </CardContent>
                </Card>
              </motion.div>
            ),
          )}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-10 font-body max-w-lg mx-auto"
        >
          After payment, share your transaction screenshot via WhatsApp to
          receive booking confirmation within 30 minutes.
        </motion.p>
      </div>
    </section>
  );
}
