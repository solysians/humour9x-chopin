import { getAddress } from "@chopinframework/next";
import { validateAddress } from "@/utils/authUtils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const address = await getAddress(); // Remove `request`

    if (!address || !validateAddress(address)) {
      return new Response(JSON.stringify({
        error: "Invalid authentication credentials",
        code: "INVALID_AUTH",
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      address,
      timestamp: new Date().toISOString(),
      sessionValidUntil: new Date(Date.now() + 3600000).toISOString(), // 1 hour
    }), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Auth-Provider": "Chopin Framework",
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("API Auth Error:", error);
    return new Response(JSON.stringify({
      error: "Authentication service unavailable",
      code: "AUTH_SERVICE_ERROR",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}
