import { getColors } from "../services";
import { ColorFilter } from "./ColorFilter";

export default async function ColorsFilter() {
  const colors = await getColors();

  return (
    <div className="space-y-4">
      <h5 className="h5">Colors</h5>
      <div className="flex flex-wrap items-center gap-3">
        {colors.map((color) => (
          <ColorFilter key={color.name} {...color} />
        ))}
      </div>
    </div>
  );
}
