import { Tip } from "@/source/components/tip";

export default function Page({ params }: { params: { id: string } }) {
  const restaurantId = Number(params.id);
  return (
    <div>
      <Tip restaurantId={restaurantId} />
    </div>
  );
}
