import { cn } from "@/lib/utils";

export default function ProductImage({
  imageUrl,
  alt,
  className,
  imageClassName,
}: {
  imageUrl: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[340px] w-full overflow-hidden rounded-xl bg-stone-100/90",
        className,
      )}
    >
      <img
        className={cn(
          "h-full w-full object-cover transition-transform duration-500",
          imageClassName,
        )}
        src={imageUrl.length > 0 ? imageUrl : undefined}
        alt={alt}
      />
    </div>
  );
}
