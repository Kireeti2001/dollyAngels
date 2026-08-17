import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import school from "../../lib/school";

function Logo({ to = "/home", className, imgClassName, showWordmark = true }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2 no-underline min-h-[44px]", className)}>
      <img
        src="/logo.svg"
        alt=""
        className={cn("h-10 w-auto md:h-11", imgClassName)}
        width="140"
        height="102"
      />
      {showWordmark && (
        <span className="text-lg md:text-xl font-bold font-heading bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {school.shortName}
        </span>
      )}
    </Link>
  );
}

export default Logo;
