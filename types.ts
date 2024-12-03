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
  image?: string;
  location: string;
  createdAt: Timestamp;
}

export interface ItemQueryFilters {
  name: string;
  userID: string | undefined;
  location: string | undefined;
  dateRangeStart: Date;
  dateRangeEnd: Date;
  postType: PostType;
  resolved: boolean;
}
