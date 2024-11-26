export const GET = async (req: Request) => {
  return Response.json(
    {
      "Message:": "This is the Sightings Route",
    },
    {
      status: 200,
    }
  );
};
