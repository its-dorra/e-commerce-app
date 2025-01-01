import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CircleAvatarProps {
  imageUrl: string | null;
  name: string;
}

export default function CircleAvatar({ imageUrl, name }: CircleAvatarProps) {
  const fallBackName =
    (name.length > 1 &&
      name
        .split(" ")
        .map((item) => item[0].toUpperCase())
        .join("")) ||
    "";

  return (
    <Avatar>
      <AvatarImage src={imageUrl || ""} />
      <AvatarFallback>{fallBackName}</AvatarFallback>
    </Avatar>
  );
}
