import { ISizes } from "../types";
import SizeFilter from "./SizeFilter";

export default async function SizesFilter({ data: sizes }: { data: ISizes }) {
  return (
    <div className="space-y-4">
      <h5 className="h5">Sizes</h5>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <SizeFilter key={size} name={size} />
        ))}
      </div>
    </div>
  );
}
