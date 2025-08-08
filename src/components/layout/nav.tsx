import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="flex h-16 items-center px-4 bg-gray-100 border-b border-gray-200 mb-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="http://192.168.208.5/picking/index.php"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
                to={"."}
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="http://192.168.208.5/purchasing/purchasing.php"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
                to={"/"}
              >
                Purchasing
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="http://192.168.208.5/purchasing/dashboard.php"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
                to={"."}
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="http://192.168.208.5/purchasing/miro.php"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
                to={"."}
              >
                MIRO
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-2 text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1">
        <Link to={"."}>Vendor</Link>
      </div>
    </header>
  );
}
