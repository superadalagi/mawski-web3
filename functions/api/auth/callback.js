const CLIENT_ID = 'Ov23liLyZzC51xuQ4JIt';
const REDIRECT_URI = 'https://web3.mawski.my.id/api/auth/callback';

export async function onRequestGet({ request, env }) {
  const incoming = new URL(request.url);
  const code = incoming.searchParams.get('code');
  if (!code) return new Response('Missing GitHub authorization code.', { status: 400 });
  if (!env.GITHUB_CLIENT_SECRET) return new Response('OAuth secret is not configured.', { status: 500 });

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: REDIRECT_URI })
  });
  const token = await tokenResponse.json();
  if (!token.access_token) return new Response('GitHub OAuth exchange failed.', { status: 502 });

  const payload = JSON.stringify({ token: token.access_token, provider: 'github' });
  const escaped = payload.replace(/\\/g, '\\\\').replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
  return new Response(`<!doctype html><meta charset="utf-8"><title>Login complete</title><p>You may close this window.</p><script>window.opener.postMessage('authorization:github:success:${escaped}', '*'); window.close();</script>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
