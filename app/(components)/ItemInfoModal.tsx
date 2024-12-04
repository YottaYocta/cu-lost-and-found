import { ItemPostWithId, PostType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatDate, getDayDifference, LG_IMAGE_SIZE } from "@/util";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "./AuthContext";

const ItemInfoModal = ({
  itemPost,
  dialogTriggerText,
}: {
  itemPost: ItemPostWithId;
  dialogTriggerText: string;
}) => {
  const [showingContact, setShowingContact] = useState<boolean>(false);
  const authContext = useAuth();

  const deletePost = async () => {
    if (authContext && authContext.user) {
      const params = new URLSearchParams({
        postID: itemPost.postID,
      });
      const res = await fetch(`api?${params.toString()}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      window.location.reload();
    } else {
      console.error("invalid credentials");
    }
  };

  const resolvePost = async () => {
    if (authContext && authContext.user) {
      const res = await fetch("api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postID: itemPost.postID }),
      });

      const data = await res.json();
      console.log(data);
      window.location.reload();
    } else {
      console.error("invalid credentials");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-36">{dialogTriggerText}</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="flex items-center justify-center w-screen h-screen">
          <DialogContent>
            <Card className="p-8 flex flex-row gap-8">
              <div className="flex flex-col gap-6">
                {itemPost.image ? (
                  <Image
                    alt="an image of an object"
                    src={itemPost.image}
                    width={LG_IMAGE_SIZE}
                    height={LG_IMAGE_SIZE}
                  ></Image>
                ) : (
                  <Image
                    alt="placeholder image"
                    src={`https://placehold.co/${LG_IMAGE_SIZE}x${LG_IMAGE_SIZE}.png`}
                    width={LG_IMAGE_SIZE}
                    height={LG_IMAGE_SIZE}
                  ></Image>
                )}
                <div className="flex flex-col justify-between w-full gap-2">
                  <Label>Posted by:</Label>
                  <p>{itemPost.userName}</p>
                </div>

                <div className="flex flex-col justify-between w-full gap-2">
                  <Label>Time Posted</Label>
                  <div className="flex flex-col gap-0">
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
                    <p>{formatDate(itemPost.createdAt.toDate())}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between w-full gap-2">
                  <Label>Status</Label>
                  <p>{itemPost.resolved ? "resolved" : "unresolved"}</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <Label>
                    {itemPost.postType === PostType.MISSING
                      ? "MISSING ITEM"
                      : "ITEM SIGHTING"}
                  </Label>
                  <DialogTitle className="text-4xl">
                    {itemPost.name}
                  </DialogTitle>
                </div>
                <Button
                  className="w-64"
                  onClick={() => {
                    setShowingContact(!showingContact);
                  }}
                >
                  {showingContact ? itemPost.contact : "show contact"}
                </Button>

                <div className="flex flex-col gap-1">
                  <Label>Description</Label>
                  <p>{itemPost.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1 w-full">
                    <Label>Last Seen</Label>
                    <p>{itemPost.location}</p>
                  </div>
                  <div className="bg-neutral-600 w-full h-56"></div>
                </div>
                <DialogFooter className="mt-auto">
                  {authContext &&
                  authContext.user &&
                  authContext.user.uid === itemPost.userID ? (
                    <Button onClick={resolvePost}>Mark as Resolved</Button>
                  ) : (
                    <></>
                  )}
                  {authContext &&
                  authContext.user &&
                  authContext.user.uid === itemPost.userID ? (
                    <Button onClick={deletePost}>Delete</Button>
                  ) : (
                    <></>
                  )}
                  <DialogClose asChild>
                    <Button type="submit">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </Card>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default ItemInfoModal;
