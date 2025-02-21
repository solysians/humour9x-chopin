import { getAddress } from "@chopinframework/next";

export async function GET(req) {
  const address = await getAddress();
  return new Response(JSON.stringify({ address }), { status: 200 });
}
