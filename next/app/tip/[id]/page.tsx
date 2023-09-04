import { Tip } from "@/source/components/tip";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Tip restaurantId={params.id} />
    </div>
  );
}
