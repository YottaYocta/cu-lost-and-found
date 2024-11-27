import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ItemPost } from "@/types";
import { formatDate, getDayDifference, SM_IMAGE_SIZE } from "@/util";
import ItemInfoModal from "./ItemInfoModal";

const ItemCard = ({ itemPost }: { itemPost: ItemPost }) => {
  return (
    <Card className="flex flex-row w-[480px] overflow-clip">
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
      <div className="flex flex-col items-start">
        <CardHeader>
          <CardTitle>{itemPost.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <p>{formatDate(itemPost.createdAt.toDate())}</p>
            <p>{getDayDifference(itemPost.createdAt.toDate(), new Date())}</p>
          </div>
          <p>{itemPost.location}</p>
          <p>{itemPost.resolved ? "Resolved" : "Unresolved"}</p>
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
