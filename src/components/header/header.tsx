import { FileIcon, HomeIcon, LogOutIcon, UsersRound } from "lucide-react";
import { NavButton } from "../nav-button/nav-button";
import Link from "next/link";
import { ToggleThemeButton } from "../theme-provider/toggle-theme-button";
import { Button } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { NavButtonMenu } from "../nav-button-menu/nav-button-menu";

export function Header() {
  return (
    <header className="bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/" label="Home" icon={HomeIcon} />
          <Link
            href="/"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={FileIcon} />

          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              {
                title: "Search Customers",
                href: "/customers",
              },
              {
                title: "New Customer",
                href: "/customers/form",
              },
            ]}
          />

          <ToggleThemeButton />

          <Button
            className="rounded-full"
            asChild
            variant="ghost"
            size="icon"
            aria-label="Logout"
            title="Logout"
          >
            <LogoutLink>
              <LogOutIcon />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
