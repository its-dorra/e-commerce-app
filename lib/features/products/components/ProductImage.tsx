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
        "h-[350px] w-full rounded-sm bg-secondaryWhite/50 p-2",
        className,
      )}
    >
      <img
        className="h-full w-full object-fill mix-blend-multiply"
        src={imageUrl.length > 0 ? imageUrl : undefined}
        alt={alt}
      />
    </div>
  );
}
