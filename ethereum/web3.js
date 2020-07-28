import Web3 from "web3";

let web3;

if (
  typeof window !== "undefined" &&
  (typeof window.ethereum !== "undefined" || typeof window.web3 !== "undefined")
) {
  if (typeof window.ethereum !== "undefined") {
    // Ethereum user detected. Let's use the injected provider.
    web3 = new Web3(window.ethereum);

    if (typeof window.ethereum.autoRefreshOnNetworkChange !== "undefined") {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }

    window.ethereum.on("chainChanged", () => {
      document.location.reload();
    });

    // Request approval from the user to use an ethereum address they can be identified by.
    window.ethereum
      .enable()
      .then(_accounts => {
        // no need to do anything here
      })
      .catch(function(error) {
        // Handle error. Likely the user rejected the login.
        console.error(error);
        alert(
          "Sorry, this application requires user approval to function correctly."
        );
      });
  } else {
    web3 = new Web3(window.web3.currentProvider);
  }
} else {
  // We are on the server OR MetaMask is not running.
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/d1d22a6bf235434cbd9cef0031eae3bd"
  );

  web3 = new Web3(provider);
}

export default web3;