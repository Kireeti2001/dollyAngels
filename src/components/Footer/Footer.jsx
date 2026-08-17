import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import school from "../../lib/school";
import { hasSupabase } from "../../lib/supabase";

const footerLinks = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg text-primary">{school.name}</p>
          <p className="text-sm text-muted-foreground mt-2">{school.tagline}</p>
          <p className="text-sm text-muted-foreground mt-1">Since {school.established}</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-heading text-sm text-foreground mb-3">Explore</p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            {hasSupabase && (
              <li>
                <Link to="/admin/gallery" className="text-sm text-muted-foreground hover:text-primary">
                  Manage gallery
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div>
          <p className="font-heading text-sm text-foreground mb-3">Visit us</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={school.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-primary">
                <FaPhone className="h-3.5 w-3.5 shrink-0" />
                {school.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${school.contact.email}`} className="inline-flex items-center gap-2 hover:text-primary">
                <FaEnvelope className="h-3.5 w-3.5 shrink-0" />
                {school.contact.email}
              </a>
            </li>
            <li>
              <a
                href={school.contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 hover:text-primary"
              >
                <FaMapMarkerAlt className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>
                  {school.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {year} {school.name}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
