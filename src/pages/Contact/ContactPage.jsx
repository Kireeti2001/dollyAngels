import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { useToast } from "../../contexts/ToastContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Reveal, MotionCard } from "../../components/ui/motion";
import school from "../../lib/school";
import {
  validateEnquiry,
  isContactApiConfigured,
  buildMailtoHref,
  buildWhatsAppHref,
} from "../../lib/contact.mjs";

const emptyForm = {
  parentName: "",
  email: "",
  phone: "",
  childName: "",
  childAge: "",
  message: "",
};

function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const apiUrl = import.meta.env.VITE_CONTACT_API;
  const apiReady = isContactApiConfigured(apiUrl);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const errors = validateEnquiry(formData);
    setFormError(errors[0] || "");
    if (errors.length > 0) {
      showToast({ title: "Please check the form", description: errors[0], status: "error" });
      return false;
    }
    return true;
  };

  const handleWhatsApp = () => {
    if (!isFormValid()) return;
    window.open(buildWhatsAppHref(formData, school.contact.phone), "_blank", "noopener");
    showToast({
      title: "Opening WhatsApp",
      description: "Send the message and you'll get a reply straight away.",
      status: "success",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    if (!apiReady) {
      window.location.href = buildMailtoHref(formData, school.contact.email);
      showToast({
        title: "Opening your email app",
        description: "Send the message from there and we will reply soon.",
        status: "success",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit");
      showToast({ title: "Enquiry submitted!", description: "We'll get back to you soon.", status: "success" });
      setFormData(emptyForm);
    } catch {
      showToast({
        title: "Could not send online",
        description: "Opening email instead so your enquiry still goes through.",
        status: "error",
      });
      window.location.href = buildMailtoHref(formData, school.contact.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cards = [
    { icon: FaPhone, title: "Phone", href: school.contact.phoneHref, lines: [school.contact.phone] },
    { icon: FaEnvelope, title: "Email", href: `mailto:${school.contact.email}`, lines: [school.contact.email] },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      href: school.contact.mapUrl,
      external: true,
      lines: school.contact.addressLines,
      hint: "Open in Maps →",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow">✦ Contact</span>
        <h1 className="headline text-4xl md:text-6xl mt-6">
          Let’s plan a <span className="text-primary">visit.</span>
        </h1>
        <p className="body-large mt-6">
          Ask about admissions, a tour, or our programs. We reply to every enquiry.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
        <MotionCard>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {formError && (
              <p role="alert" className="text-sm font-semibold text-destructive bg-destructive/10 rounded-2xl px-4 py-3 border-2 border-destructive/40">
                {formError}
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent’s name *</Label>
                <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Enter parent's name" autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile number" autoComplete="tel" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" autoComplete="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child’s name</Label>
                <Input id="childName" name="childName" value={formData.childName} onChange={handleInputChange} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child’s age</Label>
                <Input id="childAge" name="childAge" type="number" min="1" max="12" value={formData.childAge} onChange={handleInputChange} placeholder="Optional" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific questions?" rows={4} />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : apiReady ? "Submit enquiry" : "Send via email"}{" "}
              {isSubmitting ? (
                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden />
              ) : (
                <FaArrowRight className="h-4 w-4" />
              )}
            </Button>
            <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleWhatsApp}>
              <FaWhatsapp className="h-5 w-5" aria-hidden /> Send on WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              WhatsApp opens with your enquiry ready to send — you get an instant reply from us.
            </p>
            {!apiReady && (
              <p className="text-xs text-muted-foreground text-center">
                This opens your email app with the enquiry filled in. Set Formspree in `.env` to send from the site.
              </p>
            )}
          </form>
        </MotionCard>

        <div className="space-y-5">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noreferrer" : undefined}
              className="block no-underline"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="editorial-card p-5 flex gap-4 hover:-translate-y-1 transition-transform">
                <span className="rounded-full border-2 border-border bg-secondary p-3 h-fit">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-heading font-bold text-lg">{card.title}</p>
                  {card.lines.map((line) => (
                    <p key={line} className="text-muted-foreground">
                      {line}
                    </p>
                  ))}
                  {card.hint && <p className="text-sm font-bold text-primary mt-1">{card.hint}</p>}
                </div>
              </div>
            </motion.a>
          ))}
          <MotionCard className="bg-secondary">
            <div className="flex gap-4">
              <FaClock className="h-6 w-6 shrink-0 mt-1" aria-hidden />
              <div>
                <p className="font-heading font-bold text-lg">Office hours</p>
                {school.hours.map((row) => (
                  <p key={row.days} className="text-muted-foreground">
                    {row.days}: {row.time}
                  </p>
                ))}
              </div>
            </div>
          </MotionCard>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
