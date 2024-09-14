"use server";

import { kvRead, kvSave } from "@/util/kv";
import libQueryString from "querystring";
import axios from "axios";

// private

async function checkToken() {
  console.log("checkToken");
  const apiToken = await kvRead("spotifyToken");
  console.log("old token", "...." + apiToken?.slice(-6));
  try {
    // ping search endpoint to see if token is still good
    await axios.get(`https://api.spotify.com/v1/search?q=abc&type=artist`, {
      headers: { Authorization: "Bearer " + apiToken },
    });
    console.log("token still good");
    return true;
  } catch {
    console.log("token is expired");
    return false;
  }
}

async function refreshToken() {
  console.log("refresh token");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(process.env.spotify_credential as string).toString(
            "base64"
          ),
      },
    }
  );
  const { access_token } = response?.data;
  await kvSave("spotifyToken", access_token);
}

async function checkAndRefreshToken() {
  if (!(await checkToken())) {
    await refreshToken();
  }
}

// public

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
  type: string[] = ["artist", "album"],
  limit: number = 3
) {
  await checkAndRefreshToken();

  let promise;

  try {
    const apiToken = await kvRead("spotifyToken");

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${libQueryString.escape(
        queryString
      )}&type=${type?.join(",")}&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + apiToken },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      promise = Promise.resolve({ status: "success", data });
    } else {
      promise = Promise.reject({ status: "fail", error: data.error });
    }
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }

  return promise;
}

export async function getArtist(id: string) {
  console.log("getArtist");
  await checkAndRefreshToken();

  let promise;
  try {
    const apiToken = await kvRead("spotifyToken");
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      { headers: { Authorization: "Bearer " + apiToken } }
    );
    promise = Promise.resolve({ status: "success", data: response.data });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }
  return promise;
}

export async function getArtistAlbum(id: string) {
  console.log("getArtistAlbum");
  await checkAndRefreshToken();

  let promise;
  try {
    const apiToken = await kvRead("spotifyToken");
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      { headers: { Authorization: "Bearer " + apiToken } }
    );
    console.log(response.data);
    promise = Promise.resolve({ status: "success", data: response.data });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }
  return promise;
}

export async function getAlubm(id: string) {
  await checkAndRefreshToken();

  let promise;
  try {
    const apiToken = await kvRead("spotifyToken");
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      { headers: { Authorization: "Bearer " + apiToken } }
    );
    promise = Promise.resolve({ status: "success", data: response.data });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }
  return promise;
}
