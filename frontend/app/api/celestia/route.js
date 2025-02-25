// app/api/celestia/route.js
import { NextResponse } from "next/server";
import { getAddress } from "@chopinframework/next";

export async function POST(request) {
  try {
    const address = await getAddress();
    const { logId } = await request.json();
    
    // Retrieve log from database
    const logEntry = await prisma.log.findUnique({
      where: { id: logId }
    });

    // Prepare Celestia payload
    const celestiaPayload = {
      type: "CELESTIA_SUBMISSION",
      content: logEntry.content,
      metadata: {
        ...logEntry.metadata,
        verified: true,
        submissionDate: new Date()
      }
    };

    // Forward to Chopin queued endpoint
    const response = await fetch(`http://localhost:4000/api/celestia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-callback-url": `${process.env.BASE_URL}/_chopin/callback`
      },
      body: JSON.stringify(celestiaPayload)
    });

    if (!response.ok) {
      throw new Error("Celestia submission failed");
    }

    return NextResponse.json({
      success: true,
      transactionHash: "0x...", // Add real transaction hash
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Submission failed: " + error.message },
      { status: 500 }
    );
  }
}