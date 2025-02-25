// app/api/chopin/verify/route.js
export async function GET() {
    try {
      const statusResponse = await fetch("http://localhost:4000/_chopin/status");
      if (!statusResponse.ok) throw new Error("Chopin unavailable");
      
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Chopin service unavailable",
        details: error.message 
      }), {
        status: 503
      });
    }
  }