import { ItemPost, PostType } from "@/types";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { ItemQueryFilters } from "@/types";

const queryItems = async (filters: ItemQueryFilters): Promise<ItemPost[]> => {
  const params = new URLSearchParams({
    name: filters.name,
    dateRangeStart: filters.dateRangeStart.getTime().toString(),
    dateRangeEnd: filters.dateRangeEnd.getTime().toString(),
    postType: filters.postType,
    resolved: filters.resolved.toString(),
  });

  if (filters.userID !== undefined && filters.userID.trim().length > 0) {
    params.append("userID", filters.userID);
  }

  if (filters.location !== undefined && filters.location.trim().length > 0) {
    params.append("location", filters.location);
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
        image: undefined,
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

const ItemList = ({
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((item, index) => {
        return <ItemCard key={index} itemPost={item}></ItemCard>;
      })}
    </div>
  );
};

export default ItemList;
