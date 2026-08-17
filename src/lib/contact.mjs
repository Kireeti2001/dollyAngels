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

export function buildMailtoHref(formData, toEmail) {
  const subject = encodeURIComponent(`Admission enquiry from ${formData.parentName}`);
  const lines = [
    `Parent: ${formData.parentName}`,
    `Email: ${formData.email}`,
    `Phone: ${formData.phone}`,
    formData.childName ? `Child: ${formData.childName}` : null,
    formData.childAge ? `Child's age: ${formData.childAge}` : null,
    "",
    formData.message || "(No extra message)",
  ].filter((line) => line !== null);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${toEmail}?subject=${subject}&body=${body}`;
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
