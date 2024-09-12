"use client";
import { getToken, fetchSiteData } from "./actions/actions";

export default function Home() {
  function genToken() {
    getToken().then((resp) => {
      console.log("tokenResp", resp);
    });
  }

  function doRetrieveToken() {
    fetchSiteData().then((siteData) => console.log(siteData));
  }

  return (
    <>
      <div>Main</div>
      <button onClick={() => genToken()}>Generate Token</button>
      <div></div>
      <button onClick={() => doRetrieveToken()}>Retrieve Token</button>
    </>
  );
}
