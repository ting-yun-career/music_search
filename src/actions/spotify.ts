import { processString } from "../util/string";

export async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(process.env.spotify_credential as string).toString(
          "base64"
        ),
    },
  });
  return response.json();
}

// export async function saveToken(newToken) {}

//
/**
 * Searches Spotify for content based on a query string and type filters.
 *
 * usage:
 *
 * @param {string} apiToken A valid Spotify API access token.
 * @param {string} queryString The search query string.
 * @param {string[]} type An array of content types to search for (e.g., 'artist', 'album').
 * @returns {Promise<object>} A Promise that resolves to the search results object upon success, or rejects with an error.
 * @throws {Error} Rejects with an error object if the search fails or the API token is invalid or expired.
 *
 * @example
 * search(token1, 'Taylor Swift', ['artist','album'])
 *   .then(result => console.log('okay: ', result))
 *   .catch(error => console.log('fail: ', error));
 */
export async function search(
  apiToken: string,
  queryString: string,
  type: string[]
) {
  let promise;

  try {
    const { result } = processString(queryString, "queryString");
    if (result) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${result}&type=${type?.join(",")}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + apiToken },
        }
      );
      const resp = await response.json();
      if (resp?.error?.status) {
        console.log("error status: ", resp.error.status);
        if (resp.error.status === 401) {
          // invalid or expired
          const { access_token } = await getToken();
          console.log("new token: ", access_token);
          // new token:  {
          //   access_token: 'BQAtpyJd-UtnBG3L04TliT4FFfepdXkpwcjE5wVf0PNazXEqjPvU8F0mMkZzbwCmOcxe1nVlT0-mjNHCppwjePC65i4PANPbX3Mpc-c3biC2Ocjm5xA',
          //   token_type: 'Bearer',
          //   expires_in: 3600
          // }
        }
        promise = Promise.reject(resp.error);
      }
    }
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }

  return promise;
}
