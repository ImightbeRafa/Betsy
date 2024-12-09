// LOCATION: src/app/api/sales/stream/route.ts
// PURPOSE: Server-Sent Events (SSE) endpoint for real-time updates

export const dynamic = 'force-dynamic'

export async function GET() {
    if (!process.env.NEXT_PUBLIC_SCRIPT_URL) {
      throw new Error('Script URL not configured');
    }
  
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    };
  
    const stream = new ReadableStream({
      async start(controller) {
        let isActive = true;
        
        const sendUpdate = async () => {
          if (!isActive) return;
          
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SCRIPT_URL}?type=list`);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
  
            const text = await response.text();
            controller.enqueue(`data: ${text}\n\n`);
          } catch (error: any) {
            console.error('Sales Stream API Error:', error);
            controller.enqueue(`data: ERROR:${error.message}\n\n`);
          }
        };
  
        // Initial update
        await sendUpdate();
        
        // Set up periodic updates
        const interval = setInterval(sendUpdate, 30000);
        
        return () => {
          isActive = false;
          clearInterval(interval);
          controller.close();
        };
      }
    });
  
    return new Response(stream, { headers });
}