import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";

export default async function CategoryPage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
