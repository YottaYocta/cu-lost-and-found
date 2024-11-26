import { ItemPost, PostType } from "@/types";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";

export interface ItemQueryFilters {
  name: string;
  userID: string | undefined;
  location: string;
  dateRangeStart: Date;
  dateRangeEnd: Date;
  postType: PostType;
  resolved: boolean;
}

const queryItems = async (filters: ItemQueryFilters): Promise<ItemPost[]> => {
  const params = new URLSearchParams({
    name: filters.name,
    location: filters.location,
    dateRangeStart: filters.dateRangeStart.getTime().toString(),
    dateRangeEnd: filters.dateRangeEnd.getTime().toString(),
    postType: filters.postType,
    resolved: filters.resolved.toString(),
  });

  if (filters.userID !== undefined && filters.userID.trim().length > 0) {
    params.append("userID", filters.userID);
  }

  try {
    const res = await fetch(`api?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`http status error: ${res.status}`);
    const data = await res.json();

    return data.map(
      (item: any): ItemPost => ({
        userID: item.userID,
        postType: item.postType as PostType,
        resolved: item.resolved,
        name: item.name,
        description: item.description,
        image: item.image,
        location: item.location,
        contact: item.contact,
        createdAt: new Timestamp(
          item.createdAt.seconds,
          item.createdAt.nanoseconds
        ),
      })
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const ItemList = ({
  itemQueryFilters,
}: {
  itemQueryFilters: ItemQueryFilters;
}) => {
  const [items, setItems] = useState<ItemPost[]>([]);

  const updateItemList = async (): Promise<void> => {
    const itemQueryResult = await queryItems(itemQueryFilters);
    console.log(itemQueryResult);
    setItems(itemQueryResult);
  };

  useEffect(() => {
    updateItemList();
  }, [itemQueryFilters]);

  return (
    <div className="flex flex-wrap flex-row">
      {items.map((item, index) => {
        return <ItemCard key={index} itemPost={item}></ItemCard>;
      })}
    </div>
  );
};
