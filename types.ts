import { Timestamp } from "firebase/firestore";

export enum PostType {
  MISSING = "missing",
  SIGHTING = "sighting",
}

export interface ItemPost {
  userName: string;
  userID: string;
  postType: PostType;
  resolved: boolean;
  name: string;
  contact: string;
  description: string;
  image: string | null;
  location: string;
  createdAt: Timestamp;
}

export interface ItemPostWithId extends ItemPost {
  postID: string;
}

export const isItemPost = (object: any): object is ItemPost => {
  return (
    typeof object.userName === "string" &&
    typeof object.userID === "string" &&
    typeof object.postType === "string" &&
    (object.postType === PostType.MISSING ||
      object.postType === PostType.SIGHTING) &&
    typeof object.resolved === "boolean" &&
    typeof object.name === "string" &&
    typeof object.contact === "string" &&
    typeof object.description === "string" &&
    (typeof object.image === "string" || object.image === null) &&
    typeof object.location === "string" &&
    object.createdAt instanceof Timestamp
  );
};

export interface ItemQueryFilters {
  name: string;
  userID: string | undefined;
  location: string | undefined;
  dateRangeStart: Date;
  dateRangeEnd: Date;
  postType: PostType;
  resolved: boolean;
}

export interface CreateItemPostRequestData {
  userName: string;
  userID: string;
  postType: PostType;
  name: string;
  contact: string;
  description: string;
  image: string | null;
  location: string;
}
