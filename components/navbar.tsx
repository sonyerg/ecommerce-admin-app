import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";

export default async function NavBar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId, //you need userId to find needed stores.
    },
  });

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="flex ml-auto items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
