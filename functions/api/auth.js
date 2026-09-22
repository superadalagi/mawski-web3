const CLIENT_ID = 'Ov23liLyZzC51xuQ4JIt';
const REDIRECT_URI = 'https://web3.mawski.my.id/api/auth/callback';

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const github = new URL('https://github.com/login/oauth/authorize');
  github.searchParams.set('client_id', CLIENT_ID);
  github.searchParams.set('redirect_uri', REDIRECT_URI);
  github.searchParams.set('scope', 'repo');
  github.searchParams.set('state', crypto.randomUUID());
  return Response.redirect(github.toString(), 302);
}
