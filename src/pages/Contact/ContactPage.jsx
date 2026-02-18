import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useToast } from "../../contexts/ToastContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.parentName) errors.push("Parent name is required");
    if (!formData.email) errors.push("Email is required");
    if (!formData.phone) errors.push("Phone number is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Invalid email format");
    if (!/^\d{10}$/.test(formData.phone)) errors.push("Invalid phone number (10 digits required)");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => showToast({ title: "Validation Error", description: error, status: "error" }));
      return;
    }
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API || "https://formspree.io/f/YOUR_FORM_ID";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit");
      showToast({ title: "Enquiry Submitted!", description: "We'll get back to you soon.", status: "success" });
      setFormData({ parentName: "", email: "", phone: "", childName: "", childAge: "", message: "" });
    } catch (error) {
      showToast({
        title: "Error",
        description: "Set up Formspree (formspree.io) or VITE_CONTACT_API in .env. See README.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    { icon: FaPhone, title: "Phone", value: "+91 1234567890" },
    { icon: FaEnvelope, title: "Email", value: "info@dollyangels.com" },
    { icon: FaMapMarkerAlt, title: "Address", value: "123 School Street, Your City", value2: "State, PIN: 123456" },
  ];

  return (
    <div className="min-h-[90vh] py-8 md:py-10 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <h1 className="text-2xl font-heading font-bold text-primary mb-2">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            We&apos;d love to hear from you! Please fill out the form below for any enquiries about admissions or our programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent&apos;s Name *</Label>
                <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Enter parent's name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childName">Child&apos;s Name</Label>
                <Input id="childName" name="childName" value={formData.childName} onChange={handleInputChange} placeholder="Enter child's name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child&apos;s Age</Label>
                <Input id="childAge" name="childAge" type="number" value={formData.childAge} onChange={handleInputChange} placeholder="Enter child's age" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific questions or concerns?" rows={4} />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <div className="space-y-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-card rounded-2xl p-6 shadow-md border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 150 }}
                whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
              >
                <div className="flex gap-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <card.icon className="w-6 h-6 text-primary shrink-0" />
                  </motion.div>
                  <div>
                    <p className="font-heading font-bold">{card.title}</p>
                    <p className="text-muted-foreground">{card.value}</p>
                    {card.value2 && <p className="text-muted-foreground">{card.value2}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
