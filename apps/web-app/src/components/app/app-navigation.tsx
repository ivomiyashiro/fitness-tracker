import { Link, useLocation } from "react-router";
import { CalendarIcon, DumbbellIcon, NotepadTextIcon } from "lucide-react";
import { cn } from "@/helpers/lib/utils";

const AppLink = ({
  children,
  isActive = false,
  to,
}: {
  children: React.ReactNode;
  isActive: boolean;
  to: string;
}) => {
  return (
    <li>
      <Link
        to={to}
        className={cn("flex flex-col items-center justify-center gap-1", {
          "text-primary": isActive,
        })}
      >
        {children}
      </Link>
    </li>
  );
};

export const AppNavigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="app-padding border-t">
      <ul className="flex justify-around">
        <AppLink to="training-plans" isActive={pathname === "/training-plans"}>
          <NotepadTextIcon />
          <span>Plans</span>
        </AppLink>
        <AppLink to="sessions" isActive={pathname === "/sessions"}>
          <DumbbellIcon />
          <span>Sessions</span>
        </AppLink>
        <AppLink to="calendar" isActive={pathname === "/calendar"}>
          <CalendarIcon />
          <span>Calendar</span>
        </AppLink>
      </ul>
    </nav>
  );
};
