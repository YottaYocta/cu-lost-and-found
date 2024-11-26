export const GET = async (req: Request) => {
  return Response.json(
    {
      "message:": "This is the Missing Items Route",
    },
    {
      status: 200,
    }
  );
};
