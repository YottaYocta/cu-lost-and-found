import { NextRequest } from "next/server";
export const GET = async (req: NextRequest) => {
  const userIDQuery = req.nextUrl.searchParams.get("userID");
  return Response.json({
    message: `This is the base API route, and you tried to get data for user with ID ${userIDQuery}`,
  });
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
