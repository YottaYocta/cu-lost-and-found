import { PostType } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface AddPostProps {
  postName: string;
  setPostName: Dispatch<SetStateAction<string>>;
  contactInformation: string;
  setContactInformation: Dispatch<SetStateAction<string>>;
  imageLink: string;
  setImageLink: Dispatch<SetStateAction<string>>;
  postDescription: string;
  setPostDescription: Dispatch<SetStateAction<string>>;
  postType: PostType;
}

export const AddPost = ({}: AddPostProps) => {
  return <div></div>;
};
