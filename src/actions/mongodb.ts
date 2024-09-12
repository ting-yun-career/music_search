"use server";

import { MongoClient } from "mongodb";

// private functions

async function getMongoCollection() {
  const uri = `mongodb+srv://${process.env.mongodb_credential}@cluster0.ccshp9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db("machobear");
  const collection = database.collection("music_search");
  return { client, collection };
}

async function fetchMongoDoc() {
  const connection = await getMongoCollection();
  const collection = connection.collection;
  const client = connection.client;
  const doc = await collection.findOne({ name: "music_search" });
  return { collection, client, doc };
}

// public functions

/**
 * Fetches site data from the MongoDB database and applies security processing.
 *
 * @returns {Promise<{status: string, siteData?: any}>}
 */
export async function fetchSiteData() {
  let result, promise;
  try {
    result = await fetchMongoDoc();
    if (!result.doc) {
      throw Error("Unable to find MongoDB document");
    }
    // Apply necessary processing to siteData before passing it out
    // eg.
    // * PII masking/truncation
    // * descryption
    // * transform/mashup
    promise = Promise.resolve({
      status: "success",
      siteData: result.doc.siteData,
    });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  } finally {
    result?.client?.close();
  }

  return promise;
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
      {} // UpdateOptions
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
