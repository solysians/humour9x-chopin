import { Oracle } from '@chopinframework/core';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const callbackUrl = request.headers.get('x-callback-url');
    console.log("Oracle Callback URL:", callbackUrl); 

    const oracle = new Oracle(callbackUrl);
    console.log("Oracle instance created:", oracle);

    const timestamp = await oracle.notarize(() => Date.now());
    console.log("Oracle timestamp generated:", timestamp); 


    return NextResponse.json({ 
      timestamp,
      environment: process.env.NODE_ENV 
    });
  } catch (error) {
    console.error("Oracle error:", error); 
    return NextResponse.json(
      { error: 'Failed to get Oracle timestamp' },
      { status: 500 }
    );
  }
}