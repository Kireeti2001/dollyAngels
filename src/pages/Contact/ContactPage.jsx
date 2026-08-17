import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useToast } from "../../contexts/ToastContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import school from "../../lib/school";
import {
  validateEnquiry,
  isContactApiConfigured,
  buildMailtoHref,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateEnquiry(formData);
    if (errors.length > 0) {
      setFormError(errors[0]);
      showToast({ title: "Please check the form", description: errors[0], status: "error" });
      return;
    }
    setFormError("");
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

  return (
    <div className="min-h-[90vh] py-8 md:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Contact us</h1>
          <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
            We&apos;d love to hear from you. Ask about admissions, a visit, or our programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {formError && (
                <p role="alert" className="text-sm text-destructive bg-destructive/10 rounded-xl px-3 py-2">
                  {formError}
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent&apos;s name *</Label>
                <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Enter parent's name" autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile number" autoComplete="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childName">Child&apos;s name</Label>
                <Input id="childName" name="childName" value={formData.childName} onChange={handleInputChange} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child&apos;s age</Label>
                <Input id="childAge" name="childAge" type="number" min="1" max="12" value={formData.childAge} onChange={handleInputChange} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific questions?" rows={4} />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : apiReady ? "Submit enquiry" : "Send via email"}
              </Button>
              {!apiReady && (
                <p className="text-xs text-muted-foreground text-center">
                  This opens your email app with the enquiry filled in. Set Formspree in `.env` to send from the site.
                </p>
              )}
            </form>
          </motion.div>

          <div className="space-y-6">
            <a href={school.contact.phoneHref} className="block bg-card rounded-2xl p-6 shadow-md border border-border hover:border-primary">
              <div className="flex gap-4">
                <FaPhone className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-heading font-bold">Phone</p>
                  <p className="text-muted-foreground">{school.contact.phone}</p>
                </div>
              </div>
            </a>
            <a href={`mailto:${school.contact.email}`} className="block bg-card rounded-2xl p-6 shadow-md border border-border hover:border-primary">
              <div className="flex gap-4">
                <FaEnvelope className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-heading font-bold">Email</p>
                  <p className="text-muted-foreground">{school.contact.email}</p>
                </div>
              </div>
            </a>
            <a href={school.contact.mapUrl} target="_blank" rel="noreferrer" className="block bg-card rounded-2xl p-6 shadow-md border border-border hover:border-primary">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-heading font-bold">Address</p>
                  {school.contact.addressLines.map((line) => (
                    <p key={line} className="text-muted-foreground">
                      {line}
                    </p>
                  ))}
                  <p className="text-sm text-primary mt-1">Open in Maps →</p>
                </div>
              </div>
            </a>
            <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
              <div className="flex gap-4">
                <FaClock className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-heading font-bold">Office hours</p>
                  {school.hours.map((row) => (
                    <p key={row.days} className="text-muted-foreground">
                      {row.days}: {row.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
