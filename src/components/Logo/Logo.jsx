import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import school from "../../lib/school";

function Logo({ to = "/home", className, imgClassName, showWordmark = true }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2.5 no-underline min-h-[44px] group", className)}>
      <img
        src="/logo.svg"
        alt=""
        className={cn("h-9 w-9 md:h-10 md:w-10 transition-transform group-hover:-rotate-6 group-hover:scale-105", imgClassName)}
        width="96"
        height="96"
      />
      {showWordmark && (
        <span className="font-heading text-lg md:text-xl font-bold leading-none text-foreground">
          {school.shortName}
          <span className="block text-[10px] font-body font-bold uppercase tracking-[0.2em] text-primary mt-0.5">
            School
          </span>
        </span>
      )}
    </Link>
  );
}

export default Logo;
