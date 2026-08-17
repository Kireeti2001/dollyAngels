export function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

export function isContactApiConfigured(apiUrl) {
  if (!apiUrl) return false;
  return !/YOUR_FORM_ID/i.test(apiUrl);
}

export function validateEnquiry(formData) {
  const errors = [];
  if (!formData.parentName?.trim()) errors.push("Parent's name is required");
  if (!formData.email?.trim()) errors.push("Email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.push("Enter a valid email address");
  }
  const phone = digitsOnly(formData.phone);
  if (!formData.phone?.trim()) errors.push("Phone number is required");
  else if (phone.length < 10) errors.push("Enter a 10-digit phone number");
  if (formData.childAge && Number(formData.childAge) < 1) {
    errors.push("Child's age must be at least 1");
  }
  return errors;
}

export function enquiryLines(formData) {
  return [
    `Parent: ${formData.parentName}`,
    `Email: ${formData.email}`,
    `Phone: ${formData.phone}`,
    formData.childName ? `Child: ${formData.childName}` : null,
    formData.childAge ? `Child's age: ${formData.childAge}` : null,
    "",
    formData.message || "(No extra message)",
  ].filter((line) => line !== null);
}

export function buildMailtoHref(formData, toEmail) {
  const subject = encodeURIComponent(`Admission enquiry from ${formData.parentName}`);
  const body = encodeURIComponent(enquiryLines(formData).join("\n"));
  return `mailto:${toEmail}?subject=${subject}&body=${body}`;
}

// ponytail: assumes an Indian number when only 10 digits are given. Ceiling — one
// default country code; pass `countryCode` (or a full +CC number) for anywhere else.
export function toWhatsAppNumber(phone, countryCode = "91") {
  const digits = digitsOnly(phone).replace(/^0+/, "");
  if (!digits) return "";
  return digits.length === 10 ? `${countryCode}${digits}` : digits;
}

export function buildWhatsAppHref(formData, schoolPhone, countryCode = "91") {
  const number = toWhatsAppNumber(schoolPhone, countryCode);
  const text = encodeURIComponent(
    [`Admission enquiry from ${formData.parentName}`, "", ...enquiryLines(formData)].join("\n")
  );
  return `https://wa.me/${number}?text=${text}`;
}

export function formatEventDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
