import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Category = {
  name: string;
  image: string;
};

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <div className="pt-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={category.image} alt={category.name} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">{category.name}</p>
      </div>
    </div>
  );
}
