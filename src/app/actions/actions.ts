"use server";

import libQueryString from "querystring";
import { MongoClient } from "mongodb";

/**
 * Processes site data to ensure security.
 *
 * @param {any} siteData - The site data to process.
 * @returns {any} The processed site data.
 */
function securityProcessing(siteData: any) {
  // Implement security measures here, such as masking, decryption, encryption, etc.
  return siteData;
}

async function getMongoCollection() {
  const uri = `mongodb+srv://${process.env.mongodb_credential}@cluster0.ccshp9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const client = new MongoClient(uri);
  await client.connect();

  const database = client.db("machobear");
  const collection = database.collection("music_search");

  return { client, collection };
}

/**
 * Fetches site data from the MongoDB database and applies security processing.
 *
 * @returns {Promise<{status: string, siteData?: any}>}
 */
export async function fetchSiteData() {
  let collection, client;
  try {
    const connection = await getMongoCollection();
    collection = connection.collection;
    client = connection.client;
  } catch (error) {
    return Promise.reject({
      status: "fail",
      message: "Unable to establish MongoDB connection",
    });
  }

  try {
    const musicDoc = await collection.findOne({ name: "music_search" });

    if (!musicDoc) {
      return Promise.reject({
        status: "fail",
        message: "Unable to find MongoDB document",
      });
    }

    const { siteData: _siteData } = musicDoc;
    const siteData = securityProcessing(_siteData);

    return Promise.resolve({ status: "success", siteData });
  } catch (error) {
    return Promise.reject({ status: "fail", error });
  } finally {
    await client.close();
  }
}

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

function processString(str: string, type: string) {
  try {
    if (type === "queryString") return { result: libQueryString.escape(str) };
  } catch (error) {
    return { error };
  }

  return { result: str };
}

// usage: search(token1, 'Taylor Swift', ['artist','album']).then(result => console.log('okay: ', result)).catch(error => console.log('fail: ', error));
export async function search(
  apiToken: string,
  queryString: string,
  type: string[]
) {
  const { result, error } = processString(queryString, "queryString");

  if (error) {
    return Promise.reject(error);
  }

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
        // invalid or expired token
        const { access_token } = await getToken();
        console.log("new token: ", access_token);

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
