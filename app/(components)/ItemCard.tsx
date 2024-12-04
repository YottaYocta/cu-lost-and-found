import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ItemPostWithId } from "@/types";
import { formatDate, getDayDifference, SM_IMAGE_SIZE } from "@/util";
import ItemInfoModal from "./ItemInfoModal";

const ItemCard = ({ itemPost }: { itemPost: ItemPostWithId }) => {
  return (
    <Card className="flex flex-row w-[512px] overflow-clip">
      {itemPost.image ? (
        <Image
          alt="an image of an object"
          src={itemPost.image}
          width={SM_IMAGE_SIZE}
          height={SM_IMAGE_SIZE}
        ></Image>
      ) : (
        <Image
          alt="placeholder image"
          src={`https://placehold.co/${SM_IMAGE_SIZE}x${SM_IMAGE_SIZE}.png`}
          width={SM_IMAGE_SIZE}
          height={SM_IMAGE_SIZE}
        ></Image>
      )}
      <div className="flex flex-col items-start w-full">
        <CardHeader className="w-full">
          <div className="flex flex-row items-center  w-full justify-between">
            <CardTitle>{itemPost.name}</CardTitle>
            <p className="opacity-50">
              {itemPost.resolved ? "resolved" : "unresolved"}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col justify-between ">
            <p>{formatDate(itemPost.createdAt.toDate())}</p>
            <p>
              {(() => {
                const dayDifference = getDayDifference(
                  itemPost.createdAt.toDate(),
                  new Date()
                );
                if (dayDifference === 0) {
                  return "Posted today";
                } else if (dayDifference === 1) {
                  return "Posted yesterday";
                } else {
                  return `Posted ${dayDifference} days ago`;
                }
              })()}
            </p>
          </div>
          <p>{itemPost.location}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <ItemInfoModal
            dialogTriggerText="more info"
            itemPost={itemPost}
          ></ItemInfoModal>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ItemCard;
