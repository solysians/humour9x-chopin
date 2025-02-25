// app/api/logs/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const logEntry = await request.json();
    
    // Here you would typically store the log in a database
    console.log('Received application log:', logEntry);

    return NextResponse.json(
      { success: true, received: logEntry },
      {
        status: 200,
        headers: {
          // This header allows Chopin to track the request context
          'x-callback-url': request.headers.get('x-callback-url') || ''
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid log format' },
      { status: 400 }
    );
  }
}