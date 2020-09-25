import web3 from "./web3";
import InsuranceFactory from "./build/InsuranceFactory.json"

const contractAddress = "" // contract address of the rinkeby ethereum node

const instance = new web3.eth.Contract(
    InsuranceFactory.abi,
    contractAddress
);

export default instance;
