import Link from "next/link";

import Container from "@/components/user/ui/container";
import MainNav from "@/components/user/main-nav";
import NavbarActions from "@/components/user/navbar-actions";
import getCategories from "@/actions/get-categories";
import { cn } from "@/lib/utils";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories(true);

  return (
    <div
      className={cn(
        "border-b fixed w-full bg-background/50 backdrop-blur-lg z-20"
      )}
    >
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href={"/"} className="ml-4 flex lg:ml--0 gap-x-2">
            <p className="uppercase font-bold text-xl">Store</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
