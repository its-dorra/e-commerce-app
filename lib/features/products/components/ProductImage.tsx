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
        "grid h-[350px] w-full place-items-center rounded-sm bg-secondaryWhite/50",
        className,
      )}
    >
      <img
        className="w-5/6 object-contain mix-blend-multiply"
        src={imageUrl.length > 0 ? imageUrl : undefined}
        alt={alt}
      />
    </div>
  );
}
