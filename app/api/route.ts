import { NextRequest } from "next/server";
import { ItemPost, PostType } from "@/types";
import { faker } from "@faker-js/faker";
import { Timestamp } from "firebase/firestore";
export const GET = async (req: NextRequest) => {
  const userID = req.nextUrl.searchParams.get("userID");
  const name = req.nextUrl.searchParams.get("name");
  const location = req.nextUrl.searchParams.get("location");
  const dateRangeStart = req.nextUrl.searchParams.get("dateRangeStart");
  const dateRangeEnd = req.nextUrl.searchParams.get("dateRangeEnd");
  const resolved = req.nextUrl.searchParams.get("resolved");
  const postType = req.nextUrl.searchParams.get("postType") as PostType;

  const response: ItemPost[] = [];

  for (let i = 0; i < 10; i++) {
    response.push({
      userID: faker.string.uuid(),
      userName: faker.person.firstName(),
      postType: postType,
      resolved: resolved === "true",
      name: faker.commerce.productName(),
      contact: faker.phone.number(),
      description: faker.commerce.productDescription(),
      image: undefined,
      location: faker.location.city(),
      createdAt: Timestamp.fromDate(new Date()),
    });
  }

  console.log(response);
  return Response.json(response);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  return Response.json(
    {
      message: `POST data received: ${JSON.stringify(data)}`,
    },
    {
      status: 200,
    }
  );
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  return Response.json(
    {
      message: `PUT data received: ${JSON.stringify(data)}`,
    },
    {
      status: 200,
    }
  );
};

export const DELETE = async (req: NextRequest) => {
  const userIDQuery = req.nextUrl.searchParams.get("userID");
  return Response.json(
    {
      message: `received request to delete user with ID: ${userIDQuery}`,
    },
    {
      status: 200,
    }
  );
};
