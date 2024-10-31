import { getSizes } from "../services";
import SizeFilter from "./SizeFilter";

export default async function SizesFilter() {
  const sizes = await getSizes();

  return (
    <div className="space-y-4">
      <h5 className="h5">Sizes</h5>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <SizeFilter key={size.name} name={size.name} />
        ))}
      </div>
    </div>
  );
}
