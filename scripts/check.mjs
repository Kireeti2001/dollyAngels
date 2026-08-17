import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateEnquiry,
  isContactApiConfigured,
  digitsOnly,
  buildMailtoHref,
} from "../src/lib/contact.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const school = JSON.parse(readFileSync(join(root, "src/data/school.json"), "utf8"));
const gallery = JSON.parse(readFileSync(join(root, "src/data/gallery.json"), "utf8"));

assert.ok(school.name);
assert.ok(school.contact.email.includes("@"));
assert.ok(school.contact.phoneHref.startsWith("tel:"));
assert.ok(school.programs.length >= 4);
assert.ok(school.events.every((e) => e.date && e.title));
assert.ok(gallery.albums.length >= 1);
assert.ok(gallery.albums.every((a) => a.id && a.title && Array.isArray(a.images) && a.images.length > 0));

assert.equal(validateEnquiry({ parentName: "", email: "", phone: "" }).length, 3);
assert.equal(
  validateEnquiry({
    parentName: "Asha",
    email: "asha@example.com",
    phone: "+91 98765 43210",
  }).length,
  0
);
assert.ok(validateEnquiry({ parentName: "Asha", email: "nope", phone: "123" }).length >= 2);
assert.equal(digitsOnly("+91 98765 43210").slice(-10), "9876543210");
assert.equal(isContactApiConfigured(""), false);
assert.equal(isContactApiConfigured("https://formspree.io/f/YOUR_FORM_ID"), false);
assert.equal(isContactApiConfigured("https://formspree.io/f/xyzabcde"), true);
assert.ok(
  buildMailtoHref({ parentName: "Asha", email: "a@b.c", phone: "1" }, "info@dollyangels.com").startsWith(
    "mailto:"
  )
);

console.log("ok: school data + contact helpers");
