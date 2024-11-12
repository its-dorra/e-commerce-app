export default function ProductImage({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return (
    <div className="grid h-[420px] w-full place-items-center rounded-sm bg-secondaryWhite">
      <img
        className="w-5/6 object-contain mix-blend-color-burn"
        src={imageUrl}
        alt={alt}
      />
    </div>
  );
}
