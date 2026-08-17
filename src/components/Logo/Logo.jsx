import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import school from "../../lib/school";

function Logo({ to = "/home", className, imgClassName, showWordmark = true }) {
  return (
    <Link to={to} className={cn("flex items-center gap-3 no-underline min-h-[44px] group", className)}>
      <span className="rounded-full border-2 border-border bg-card p-1 shadow-hard-sm group-hover:-translate-y-0.5 transition-transform">
        <img
          src="/logo.svg"
          alt=""
          className={cn("h-9 w-auto md:h-10 rounded-full", imgClassName)}
          width="140"
          height="102"
        />
      </span>
      {showWordmark && (
        <span className="font-heading text-lg md:text-xl font-bold leading-tight text-foreground">
          {school.shortName}
          <span className="block text-[11px] font-body font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            School for what’s ahead
          </span>
        </span>
      )}
    </Link>
  );
}

export default Logo;
