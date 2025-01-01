import { IColors } from "../types";
import { ColorFilter } from "./ColorFilter";

export default function ColorsFilter({ data: colors }: { data: IColors }) {
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
