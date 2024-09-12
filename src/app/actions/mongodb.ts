"use server";

import { MongoClient } from "mongodb";

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

    const { siteData } = musicDoc;

    // here we may apply custom processing to siteData before passing to frontend
    // * PII masking/truncation
    // * encryption/descryption
    // * transform/mashup

    return Promise.resolve({ status: "success", siteData });
  } catch (error) {
    return Promise.reject({ status: "fail", error });
  } finally {
    await client.close();
  }
}

export async function updateSiteData(siteData: SiteData) {
  let siteDataJson;

  try {
    siteDataJson = JSON.stringify(siteData);
  } catch (error) {
    return Promise.reject({
      status: "fail",
      message: "Unable to parse the site data",
    });
  }

  let collection, client, promise;
  try {
    const connection = await getMongoCollection();
    collection = connection.collection;
    client = connection.client;

    const result = await collection.updateOne(
      { name: "music_search" },
      { $set: { siteData: siteDataJson } },
      {}
    );

    if (!result.acknowledged) {
      promise = Promise.reject({
        status: "fail",
        message: "Unable to update siteData",
      });
    }

    promise = Promise.resolve({
      status: "success",
    });
  } catch (error) {
    promise = Promise.reject({
      status: "fail",
      message: "Unable to establish MongoDB connection",
    });
  } finally {
    client?.close();
  }

  return promise;
}
