import { Timestamp, GeoPoint } from "firebase/firestore";

export enum PostType {
  MISSING = "missing",
  SIGHTING = "sighting",
}

export interface ItemPost {
  userId: string;
  type: PostType;
  resolved: boolean;
  name: string;
  description: string;
  image?: string;
  location: GeoPoint;
  createdAt: Timestamp;
}
