import { cn } from "@/lib/utils";

export default function ProductImage({
  imageUrl,
  alt,
  className,
}: {
  imageUrl: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid h-[350px] w-full place-items-center rounded-sm bg-secondaryWhite",
        className,
      )}
    >
      <img
        className="w-5/6 object-contain mix-blend-color-burn"
        src={imageUrl.length > 0 ? imageUrl : undefined}
        alt={alt}
      />
    </div>
  );
}
