"use client";
import { fetchSiteData, updateSiteData } from "./actions/mongodb";
import { getToken } from "./actions/spotify";

export default function Home() {
  function handleGenToken() {
    getToken().then((resp) => {
      console.log("tokenResp", resp);
    });
  }

  function handleRetrieveToken() {
    fetchSiteData().then((siteData) => console.log(siteData));
  }

  function handleUpdateSiteData() {
    updateSiteData({
      favourites: {
        artists: [
          {
            id: "abc",
            name: "Taylor Swift",
          },
        ],
      },
    });
  }

  return (
    <>
      <div>Main</div>
      <button onClick={() => handleGenToken()}>Generate Token</button>
      <div></div>
      <button onClick={() => handleRetrieveToken()}>Retrieve Token</button>
      <div></div>
      <button onClick={() => handleUpdateSiteData()}>Update Site Data</button>
    </>
  );
}
