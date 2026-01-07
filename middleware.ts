export const config = {
  matcher: '/:path*',
}

export default function middleware(request: Request) {
  const country = request.headers.get('x-vercel-ip-country') || 'XX'

  const TIER1 = [
    'US','GB','CA','AU','NZ',
    'DE','FR','NL','BE','CH','AT',
    'IT','ES','PT',
    'SE','NO','DK','FI','IE',
    'JP','KR','SG','IL','AE'
  ]

  if (TIER1.includes(country)) {
    const response = new Response(null, {
      headers: {
        'Set-Cookie': 'tier1=1; Path=/; SameSite=Lax'
      }
    })
    return response
  }

  return
}
