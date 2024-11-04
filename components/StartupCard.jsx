import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const StartupCard = ({ post }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    description,
    image,
  } = post;
  return (
    <li className="startup-card group flex flex-col justify-between">
      <div className="">
        <div className="flex-between">
          <p className="startup_card_date">{formatDate(_createdAt)}</p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-primary" />
            <span className="text-16-medium">{views}</span>
          </div>
        </div>

        <div className="flex-between mt-5 gap-5">
          <div className="flex-1 ">
            <Link href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{title}</h3>
              <p className="startup-card_desc">{description}</p>
            </Link>
          </div>

          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image}
              alt="placeholder"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <Link href={`/startup/${_id}`}>
          <img
            src={image}
            alt="placeholder"
            loading="lazy"
            className="startup-card_img flex-1"
          />
        </Link>
        <div className="flex justify-between w-full items-center">
          <Link href={`/?query=${category.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>
          <Button className="startup-card_btn" asChild>
            <Link href={`/startup/${_id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index) => (
      <li key={index}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
