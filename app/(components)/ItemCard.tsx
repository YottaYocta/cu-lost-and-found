import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ItemPost } from "@/types";
import { formatTimestamp, getDayDifference } from "@/util";
import { Button } from "@/components/ui/button";

const IMAGE_SIZE = 150;

const ItemCard = ({ itemPost }: { itemPost: ItemPost }) => {
  return (
    <Card className="flex flex-row w-[480px] overflow-clip">
      {itemPost.image ? (
        <Image
          alt="an image of an object"
          src={itemPost.image}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
        ></Image>
      ) : (
        <Image
          alt="placeholder image"
          src={`https://placehold.co/${IMAGE_SIZE}x${IMAGE_SIZE}.png`}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
        ></Image>
      )}
      <div className="flex flex-col items-start">
        <CardHeader>
          <CardTitle>{itemPost.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <p>{formatTimestamp(itemPost.createdAt)}</p>
            <p>{getDayDifference(itemPost.createdAt.toDate(), new Date())}</p>
          </div>
          <p>{itemPost.location}</p>
          <p>{itemPost.resolved ? "Resolved" : "Unresolved"}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button>More Info</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ItemCard;
