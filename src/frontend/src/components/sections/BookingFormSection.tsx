import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAllPackages, useSubmitInquiry } from "@/hooks/useQueries";
import { ExternalLink, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiGoogle, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

// ── Replace this URL with your actual Google Form link ──────────────────────
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe_REPLACE_WITH_YOUR_FORM_ID/viewform?embedded=true";
const GOOGLE_FORM_EXTERNAL_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe_REPLACE_WITH_YOUR_FORM_ID/viewform";
// ────────────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  phone: string;
  packageId: string;
  packageName: string;
  guestCount: string;
  preferredDate: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  phone: "",
  packageId: "",
  packageName: "",
  guestCount: "2",
  preferredDate: "",
  message: "",
};

export default function BookingFormSection() {
  const [activeTab, setActiveTab] = useState<"form" | "google">("form");
  const [form, setForm] = useState<FormData>(initialForm);
  const { data: packages, isLoading: packagesLoading } = useAllPackages();
  const { mutateAsync: submitInquiry, isPending } = useSubmitInquiry();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePackageSelect = (value: string) => {
    const [id, ...nameParts] = value.split("|");
    const name = nameParts.join("|");
    setForm((prev) => ({ ...prev, packageId: id, packageName: name }));
  };

  const buildWhatsAppUrl = () => {
    const msg = `Hi! I'd like to book a package.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Package:* ${form.packageName || "General Inquiry"}\n*Guests:* ${form.guestCount}\n*Preferred Date:* ${form.preferredDate}\n*Message:* ${form.message || "Please share availability and details."}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    try {
      await submitInquiry({
        name: form.name,
        phone: form.phone,
        packageId: form.packageId ? BigInt(form.packageId) : BigInt(0),
        packageName: form.packageName || "General Inquiry",
        guestCount: BigInt(form.guestCount || "1"),
        preferredDate: form.preferredDate,
        message: form.message,
      });

      toast.success("Inquiry submitted! Opening WhatsApp...", {
        description: "We'll get back to you within 2 hours.",
      });

      // Open WhatsApp
      window.open(buildWhatsAppUrl(), "_blank");

      setForm(initialForm);
    } catch {
      toast.error("Could not submit. Opening WhatsApp instead.");
      window.open(buildWhatsAppUrl(), "_blank");
    }
  };

  return (
    <section
      id="booking"
      className="py-20 md:py-28 bg-primary relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Ready to Book?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Make a Booking
              <br />
              <span className="italic text-accent">Inquiry</span>
            </h2>
            <p className="text-white/75 font-body">
              Choose how you'd like to reach us — WhatsApp form or Google Form.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="flex bg-white/10 rounded-full p-1 gap-1 backdrop-blur-sm border border-white/20">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === "form"
                    ? "bg-white text-primary shadow"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <SiWhatsapp className="h-4 w-4" />
                WhatsApp Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("google")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === "google"
                    ? "bg-white text-primary shadow"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <SiGoogle className="h-4 w-4" />
                Google Form
              </button>
            </div>
          </motion.div>

          {/* Google Form panel */}
          {activeTab === "google" && (
            <motion.div
              key="google"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl p-4 md:p-6 shadow-2xl border border-border overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SiGoogle className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    Google Booking Form
                  </span>
                </div>
                <a
                  href={GOOGLE_FORM_EXTERNAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
              </div>
              <iframe
                src={GOOGLE_FORM_URL}
                title="Google Booking Form"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-xl w-full"
                style={{ minHeight: 640 }}
              >
                Loading…
              </iframe>
              <p className="text-muted-foreground text-xs text-center mt-3 font-body">
                Having trouble? Use the "Open in new tab" link above.
              </p>
            </motion.div>
          )}

          {/* WhatsApp / inline form panel */}
          {activeTab === "form" && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-foreground font-semibold text-sm"
                  >
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Rahul Sharma"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-background border-border"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-foreground font-semibold text-sm"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-background border-border"
                    required
                  />
                </div>

                {/* Package */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-foreground font-semibold text-sm">
                    Package Interested In
                  </Label>
                  <Select
                    onValueChange={handlePackageSelect}
                    disabled={packagesLoading}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue
                        placeholder={
                          packagesLoading
                            ? "Loading packages..."
                            : "Select a package"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0|General Inquiry">
                        General Inquiry
                      </SelectItem>
                      {packages?.map((pkg) => (
                        <SelectItem
                          key={String(pkg.id)}
                          value={`${pkg.id}|${pkg.name}`}
                        >
                          {pkg.name} — ₹
                          {Number(pkg.pricePerPerson).toLocaleString("en-IN")}
                          /person
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Guest Count */}
                <div className="space-y-2">
                  <Label
                    htmlFor="guests"
                    className="text-foreground font-semibold text-sm"
                  >
                    Number of Guests
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="2"
                    value={form.guestCount}
                    onChange={(e) => handleChange("guestCount", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-foreground font-semibold text-sm"
                  >
                    Preferred Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) =>
                      handleChange("preferredDate", e.target.value)
                    }
                    className="bg-background border-border"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="message"
                    className="text-foreground font-semibold text-sm"
                  >
                    Message / Special Requests
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your group, any special requirements, or questions you have..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="bg-background border-border resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-base rounded-full gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    type="button"
                    className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5a] font-semibold py-6 text-base rounded-full gap-2"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                    WhatsApp Directly
                  </Button>
                </a>
              </div>

              <p className="text-muted-foreground text-xs text-center mt-4 font-body">
                We reply within 2 hours. Your privacy is respected — no spam,
                ever.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
