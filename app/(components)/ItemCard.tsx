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

export const ItemCard = ({ itemPost }: { itemPost: ItemPost }) => {
  return (
    <Card className="flex flex-row">
      {itemPost.image ? (
        <Image
          alt="an image of an object"
          src={itemPost.image}
          width={300}
          height={300}
        ></Image>
      ) : (
        <Image
          alt="placeholder image"
          src={"https://placehold.co/300x300.png"}
          width={300}
          height={300}
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
          <p>itemPost.location</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button>More Info</Button>
        </CardFooter>
      </div>
    </Card>
  );
};
