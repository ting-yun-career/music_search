'use server';

import libQueryString from 'querystring';

const client_id = '516b373f0f8043b49068db0a9b75df25'; 
const client_secret = 'd7f348b994ac4125a2f71d476e9438c1';

// const token1 = 'BQAtpyJd-UtnBG3L04TliT4FFfepdXkpwcjE5wVf0PNazXEqjPvU8F0mMkZzbwCmOcxe1nVlT0-mjNHCppwjePC65i4PANPbX3Mpc-c3biC2Ocjm5xA';

export async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });

  return response.json();
}

function processString(str: string, type: string) {
  try {
    if (type === 'queryString')
      return { result: libQueryString.escape(str) };
  } catch (error) {
    return { error }
  }

  return { result: str };
}

// usage: search(token1, 'Taylor Swift', ['artist','album']).then(result => console.log('okay: ', result)).catch(error => console.log('fail: ', error));
export async function search(apiToken: string, queryString: string, type: string[]) {
  const { result, error } = processString(queryString, 'queryString');

  if (error) {
    return Promise.reject(error);
  }

  if (result) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${result}&type=${type?.join(',')}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + apiToken },
    });
    const resp = await response.json();

    if (resp?.error?.status) {
      console.log('error status: ', resp.error.status);

      if (resp.error.status === 401) { // invalid or expired token
        const {access_token} = await getToken();
        console.log('new token: ', access_token);
        
        // new token:  {
        //   access_token: 'BQAtpyJd-UtnBG3L04TliT4FFfepdXkpwcjE5wVf0PNazXEqjPvU8F0mMkZzbwCmOcxe1nVlT0-mjNHCppwjePC65i4PANPbX3Mpc-c3biC2Ocjm5xA',
        //   token_type: 'Bearer',
        //   expires_in: 3600
        // }

        // must save on server side
      }
      return Promise.reject(resp.error);
    }

    return Promise.resolve(resp);
  }
}

