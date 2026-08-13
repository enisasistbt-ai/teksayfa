export async function GET() {
  return new Response("google.com, pub-5441545128970618, DIRECT, f08c47fec0942fa0\n", {
    headers: { "Content-Type": "text/plain" },
  });
}
