import web3 from "./web3";
import InsuranceFactory from "./build/InsuranceFactory.json"

const contractAddress = "0x6Cb2E4e829F67f8aE62faee5F4ceeE82D0082bae"

const instance = new web3.eth.Contract(
    InsuranceFactory.abi,
    contractAddress
);

export default instance;