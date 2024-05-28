import prismadb from "@/lib/prismadb";

import { BillBoardForm } from "./components/billboard-form";

export default async function BillBoardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  );
}
