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
        "h-[350px] w-full overflow-hidden rounded-2xl bg-zinc-100/70 p-2",
        className,
      )}
    >
      <img
        className={cn(
          "h-full w-full rounded-xl object-cover mix-blend-multiply",
          imageClassName,
        )}
        src={imageUrl.length > 0 ? imageUrl : undefined}
        alt={alt}
      />
    </div>
  );
}
