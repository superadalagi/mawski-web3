const CLIENT_ID = 'Ov23liLyZzC51xuQ4JIt';

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');
  if (provider !== 'github') return new Response('Invalid provider', { status: 400 });

  const callback = `${url.origin}/api/auth/callback`;
  const github = new URL('https://github.com/login/oauth/authorize');
  github.searchParams.set('client_id', CLIENT_ID);
  github.searchParams.set('redirect_uri', callback);
  github.searchParams.set('scope', 'repo');
  github.searchParams.set('state', crypto.randomUUID());
  return Response.redirect(github.toString(), 301);
}
