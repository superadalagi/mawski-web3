const CLIENT_ID = 'Ov23liLyZzC51xuQ4JIt';

const callbackPage = (token) => {
  const safe = JSON.stringify(token).replace(/</g, '\\u003c');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Authorizing Decap</title></head><body><p>Authorizing Decap...</p><script>
const receiveMessage = () => {
  window.opener.postMessage('authorization:github:success:${safe}', '*');
  window.removeEventListener('message', receiveMessage, false);
};
window.addEventListener('message', receiveMessage, false);
window.opener.postMessage('authorizing:github', '*');
</script></body></html>`;
};

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');
  if (provider && provider !== 'github') return new Response('Invalid provider', { status: 400 });
  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing GitHub authorization code.', { status: 400 });
  if (!env.GITHUB_CLIENT_SECRET) return new Response('OAuth secret is not configured.', { status: 500 });

  const redirectUri = `${url.origin}/api/auth/callback`;
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: redirectUri })
  });
  const token = await tokenResponse.json();
  if (!token.access_token) return new Response('GitHub OAuth exchange failed.', { status: 502 });
  return new Response(callbackPage(token.access_token), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
