// // app/api/timestamp/route.js
// import { Oracle } from "@chopinframework/next";

// export async function GET() {
//     const timestamp = await Oracle.now();
//     return new Response(JSON.stringify({ timestamp }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//     });
// }

export async function GET() {
    return new Response(JSON.stringify({ 
      timestamp: Date.now(),
      isoDate: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  }