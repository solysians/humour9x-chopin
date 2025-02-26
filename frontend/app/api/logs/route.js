// app/api/logs/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const logEntry = await request.json();
        const callbackUrl = request.headers.get("x-callback-url");

        console.log("Received log:", logEntry);

        // Forward context to Chopin if callback URL is provided
        if (callbackUrl) {
            await fetch(callbackUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logEntry),
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Invalid log format" }, { status: 400 });
    }
}