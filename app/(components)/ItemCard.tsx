import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ItemPostWithId } from "@/types";
import { SM_IMAGE_SIZE } from "@/util";
import ItemInfoModal from "./ItemInfoModal";

const formatPostDate = (postDate: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const postDateNoTime = new Date(postDate);
  postDateNoTime.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - postDateNoTime.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let postedText: string;
  if (diffDays === 0) {
    postedText = "Posted today";
  } else if (diffDays === 1) {
    postedText = "Posted yesterday";
  } else {
    postedText = `Posted ${diffDays} days ago`;
  }

  const formattedDate = postDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${postedText}, ${formattedDate}`;
};

const ItemCard = ({ itemPost }: { itemPost: ItemPostWithId }) => {
  return (
    <Card className="flex flex-row w-[512px] overflow-clip">
      <div className="p-6 pr-0 flex items-center content-center">
        <div className={`aspect-square w-full overflow-hidden rounded-sm`}>
          {itemPost.image ? (
            <Image
              alt="an image of an object"
              src={itemPost.image}
              className="w-full h-full object-cover"
              width={SM_IMAGE_SIZE}
              height={SM_IMAGE_SIZE}
            />
          ) : (
            <Image
              alt="placeholder image"
              src={`https://placehold.co/${SM_IMAGE_SIZE}x${SM_IMAGE_SIZE}.png`}
              width={SM_IMAGE_SIZE}
              height={SM_IMAGE_SIZE}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        <CardHeader className="w-full">
          <div className="flex flex-row items-center  w-full justify-between">
            <CardTitle>{itemPost.name}</CardTitle>
            <p className="text-light-gray">
              {itemPost.resolved ? "resolved" : "unresolved"}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 mb-auto h-20">
          <p className="text-sm text-medium-gray">
            {formatPostDate(itemPost.createdAt.toDate())}
          </p>
          <p>
            {itemPost.description.length > 50
              ? itemPost.description.slice(0, 50) + "..."
              : itemPost.description + "\n\n\n"}
          </p>
        </CardContent>
        <CardFooter className="mt-auto w-full">
          <ItemInfoModal
            dialogTriggerText="more info"
            itemPost={itemPost}
            className="bg-primary hover:bg-primary-hover w-full"
          ></ItemInfoModal>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ItemCard;
