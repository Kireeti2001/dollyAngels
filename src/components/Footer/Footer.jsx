import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import school from "../../lib/school";
import { hasSupabase } from "../../lib/supabase";
import Logo from "../Logo/Logo";
import { Marquee } from "../ui/motion";

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
    <footer className="relative z-10 mt-auto">
      <Marquee className="font-heading font-bold text-lg">
        {school.programs.map((p) => (
          <span key={p.id} className="flex items-center gap-2 text-foreground">
            <span aria-hidden>{p.emoji}</span> {p.title}
            <span className="text-primary" aria-hidden>✦</span>
          </span>
        ))}
        {school.events.map((e) => (
          <span key={e.title} className="flex items-center gap-2 text-muted-foreground">
            {e.title}
            <span className="text-accent" aria-hidden>✦</span>
          </span>
        ))}
      </Marquee>
      <div className="bg-card border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-xs">{school.heroLead}</p>
            <p className="text-sm text-muted-foreground mt-2">Since {school.established}</p>
          </div>
          <nav aria-label="Footer">
            <p className="font-heading font-bold mb-4">Explore</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              {hasSupabase && (
                <li>
                  <Link to="/admin/gallery" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">
                    Manage gallery
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div>
            <p className="font-heading font-bold mb-4">Visit us</p>
            <ul className="space-y-3 text-muted-foreground">
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
                <a href={school.contact.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 hover:text-primary">
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
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {year} {school.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
