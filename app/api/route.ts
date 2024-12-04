import { NextRequest } from "next/server";
import { isItemPost, ItemPost, ItemPostWithId, PostType } from "@/types";
import {
  addDoc,
  collection,
  Timestamp,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { chainFilter } from "@/util";

const getItemPosts = async (): Promise<ItemPostWithId[]> => {
  const itemPostsCollectionRef = collection(db, "itemPosts");
  const querySnapshot = await getDocs(itemPostsCollectionRef);
  const posts: ItemPostWithId[] = [];
  querySnapshot.forEach((document) => {
    const data = document.data();
    if (isItemPost(data)) {
      console.log("VALID DATA: ", document.data());
      const dataWithId: ItemPostWithId = {
        ...data,
        postID: document.id,
      };
      posts.push(dataWithId);
    } else {
      console.warn(
        `WARNING: object with id ${document.id} is not formatted properly`
      );
    }
  });
  return posts;
};

export const GET = async (req: NextRequest) => {
  const userID = req.nextUrl.searchParams.get("userID");
  const name = req.nextUrl.searchParams.get("name");
  const location = req.nextUrl.searchParams.get("location");
  const dateRangeStart: Date = new Date(
    parseInt(req.nextUrl.searchParams.get("dateRangeStart") || "0", 10)
  );
  const dateRangeEnd: Date = new Date(
    parseInt(req.nextUrl.searchParams.get("dateRangeEnd") || "0", 10)
  );
  const resolved = req.nextUrl.searchParams.get("resolved");
  const postType = req.nextUrl.searchParams.get("postType") as PostType;

  const posts = await getItemPosts();

  const filters = [
    (itemPost: ItemPostWithId) =>
      name !== null && name.trim().length > 0
        ? itemPost.name !== null &&
          itemPost.name.toLowerCase().includes(name.trim().toLowerCase())
        : true,
    (itemPost: ItemPostWithId) =>
      resolved !== null ? itemPost.resolved === (resolved === "true") : true,
    (itemPost: ItemPostWithId) =>
      location !== null && location.length !== 0
        ? itemPost.location
            .toLowerCase()
            .trim()
            .includes(location.toLowerCase().trim())
        : true,
    (itemPost: ItemPostWithId) =>
      userID !== null && userID.trim().length > 0
        ? itemPost.userID === userID
        : true,
    (itemPost: ItemPostWithId) =>
      itemPost.createdAt.toMillis() >= dateRangeStart.getTime() &&
      itemPost.createdAt.toMillis() <= dateRangeEnd.getTime(),
    (itemPost: ItemPostWithId) =>
      postType !== null ? itemPost.postType === postType : true,
  ];

  const filtered = chainFilter(posts, filters);
  return Response.json(filtered);
};

const createPost = async (data: ItemPost) => {
  try {
    await addDoc(collection(db, "itemPosts"), data);
    return `Document for ${data.userName}'s ${data.name} created successfully!`;
  } catch (err) {
    console.error(err);
  }
};

export const POST = async (req: NextRequest) => {
  const data: unknown = await req.json();
  if (isItemPost(data)) {
    const newItemPost: ItemPost = {
      userName: data.userName,
      userID: data.userID,
      postType: data.postType,
      resolved: false,
      name: data.name,
      contact: data.contact,
      description: data.description,
      image: data.image,
      location: data.location,
      createdAt: Timestamp.fromDate(new Date()),
    };

    const message = createPost(newItemPost);

    return Response.json(
      {
        message: `POST successful: ${message}`,
      },
      {
        status: 200,
      }
    );
  }
  return Response.json(
    {
      message: `POST unsuccessful: malformed data`,
    },
    {
      status: 400,
    }
  );
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  if (data.postID !== null) {
    const docRef = doc(collection(db, "itemPosts"), data.postID);
    updateDoc(docRef, { resolved: true });
    return Response.json(
      {
        message: `PUT data received: ${JSON.stringify(data)}`,
      },
      {
        status: 200,
      }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const postIDQuery = req.nextUrl.searchParams.get("postID");
  if (postIDQuery !== null) {
    const itemPostsCollectionRef = collection(db, "itemPosts");
    await deleteDoc(doc(itemPostsCollectionRef, postIDQuery));
    return Response.json(
      {
        message: `received request to delete post with ID: ${postIDQuery}`,
      },
      {
        status: 200,
      }
    );
  }
  return Response.json(
    {
      message: `ERROR could not delete post with ID: ${postIDQuery}`,
    },
    {
      status: 500,
    }
  );
};
