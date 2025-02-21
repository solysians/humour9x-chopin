import { getAddress } from "@chopinframework/next";

export async function GET(request) {
  const address = await getAddress(request);

  if (!address) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ address }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
