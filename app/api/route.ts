import { NextRequest } from "next/server";
import { ItemPost, PostType } from "@/types";
import { faker } from "@faker-js/faker";
import { Timestamp } from "firebase/firestore";

const fakeDB: ItemPost[] = [];

for (let i = 0; i < 100; i++) {
  fakeDB.push({
    userID: faker.string.uuid(),
    userName: faker.person.firstName(),
    postType: Math.random() > 0.5 ? PostType.MISSING : PostType.SIGHTING,
    resolved: Math.random() > 0.5,
    name: faker.commerce.productName(),
    contact: faker.phone.number(),
    description: faker.commerce.productDescription(),
    image: undefined,
    location: faker.location.city(),
    createdAt: Timestamp.fromDate(faker.date.recent({ days: 50 })),
  });
}

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

  const filtered = fakeDB.filter((item) => {
    return (
      (name !== null && name.length !== 0
        ? item.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        : true) &&
      (resolved !== null ? item.resolved === (resolved === "true") : true) &&
      (location !== null && location.length !== 0
        ? item.location
            .toLowerCase()
            .trim()
            .includes(location.toLowerCase().trim())
        : true) &&
      (userID !== null && userID.trim().length > 0
        ? item.userID === userID
        : true) &&
      item.createdAt.toMillis() >= dateRangeStart.getTime() &&
      item.createdAt.toMillis() <= dateRangeEnd.getTime() &&
      (postType !== null ? item.postType === postType : true)
    );
  });

  return Response.json(filtered);
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
