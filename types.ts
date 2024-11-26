import { Timestamp, GeoPoint } from "firebase/firestore";

export enum PostType {
  MISSING = "missing",
  SIGHTING = "sighting",
}

export interface ItemPost {
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
