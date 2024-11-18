const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = 'http://localhost:3000/api/spotify-callback'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return new Response('Pas de code d erreur', { status: 400 })
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    }),
  })

  const data = await response.json()

  return new Response(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>Configuration Spotify</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 600px;
              margin: 2rem auto;
              padding: 0 1rem;
              line-height: 1.5;
              background: #000;
              color: #fff;
            }
            pre {
              background: #111;
              padding: 1rem;
              overflow-x: auto;
              border-radius: 0.5rem;
              border: 1px solid #333;
              white-space: pre-wrap;
              word-break: break-all;
            }
            .warning {
              color: #f43f5e;
              font-weight: bold;
            }
            .steps {
              background: #111;
              padding: 1.5rem;
              border-radius: 0.5rem;
              border: 1px solid #333;
              margin: 2rem 0;
            }
            .steps ol {
              margin: 0;
              padding-left: 1.5rem;
            }
            .steps li {
              margin-bottom: 0.5rem;
            }
            code {
              background: #222;
              padding: 0.2rem 0.4rem;
              border-radius: 0.25rem;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <h1>Configuration Spotify</h1>
          
          <div class="steps">
            <h2>Instructions :</h2>
            <ol>
              <li>Copiez le refresh token ci-dessous</li>
              <li>Créez ou modifiez le fichier <code>.env.local</code> à la racine du projet</li>
              <li>Ajoutez ou mettez à jour la variable <code>SPOTIFY_REFRESH_TOKEN</code></li>
              <li>Redémarrez votre serveur de développement</li>
            </ol>
          </div>

          <h3>Votre Refresh Token :</h3>
          <pre><code>${data.refresh_token}</code></pre>
          
          <p class="warning">⚠️ Important : Ne partagez jamais ce token ! Il donne accès à votre compte Spotify.</p>
          
          <p>Format pour votre fichier .env.local :</p>
          <pre><code>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</code></pre>
        </body>
      </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}