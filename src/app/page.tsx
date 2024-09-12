// import { getToken } from "./actions/actions";
// export const revalidate = 0;

"use client";

import { fetchSiteData } from "./actions/actions";

export default function Home() {
  // function fetchToken() {
  //   getToken().then(resp => {
  //     console.log('tokenResp', resp)
  //   })
  // }

  function doRetrieveToken() {
    fetchSiteData().then((siteData) => console.log(siteData));
  }

  return (
    <>
      <div>Main</div>
      <button onClick={() => doRetrieveToken()}>Retrieve Token</button>
    </>
  );
}
