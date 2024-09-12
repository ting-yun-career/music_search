"use server";

import { kvRead, kvSave } from "@/util/kv";
import libQueryString from "querystring";

export async function checkToken() {
  const token = await kvRead("spotifyToken");
  const { status } = await fetch(
    `https://api.spotify.com/v1/search?q=abc&type=artist`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  return status === 200;
}

export async function refreshToken() {
  const isTokenValid = await checkToken();

  if (!isTokenValid) {
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
    const { access_token } = await response.json();
    await kvSave("spotifyToken", access_token);
  }
}

//
/**
 * Searches Spotify for content based on a query string and type filters.
 *
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
  queryString: string,
  type: string[] = ["artist", "album"]
) {
  if (!(await checkToken())) {
    await refreshToken();
  }

  let promise;

  try {
    const apiToken = await kvRead("spotifyToken");

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${libQueryString.escape(
        queryString
      )}&type=${type?.join(",")}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + apiToken },
      }
    );
    const resp = await response.json();
    promise = Promise.resolve({ status: "success", data: resp });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }

  return promise;
}
