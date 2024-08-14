"use client";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


type CategoryIconProps = {
  category: Category;
};

function CategoryIcon({ category }: CategoryIconProps) {
  const param = useParams<{ category: string }>();

  return (
    <div
      className={`${
        category.slug === param.category ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className=" relative w-16 h-16">
        <Image src={`/icon_${category.slug}.svg`} alt="Imagen Categoria" fill />
      </div>

      <Link href={`/order/${category.slug}`} className=" text-xl font-bold ">
        {category.name}
      </Link>
    </div>
  );
}

export default CategoryIcon;
