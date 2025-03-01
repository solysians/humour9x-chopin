import { Oracle } from '@chopinframework/core';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const callbackUrl = request.headers.get('x-callback-url');
    const oracle = new Oracle(callbackUrl);
    const timestamp = await oracle.notarize(() => Date.now());
    return NextResponse.json({ 
      timestamp,
      environment: process.env.NODE_ENV 
    });
  } catch (error) {
    console.error("Oracle error:", error); // Log any errors
    return NextResponse.json(
      { error: 'Failed to get Oracle timestamp' },
      { status: 500 }
    );
  }
}