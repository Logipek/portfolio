import { redirect } from 'next/navigation'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = 'http://localhost:3000/api/spotify-callback'
const scope = 'user-read-currently-playing user-read-playback-state'

export async function GET() {
  const params = new URLSearchParams({
    client_id: client_id!,
    response_type: 'code',
    redirect_uri,
    scope,
  })

  return Response.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  )
}