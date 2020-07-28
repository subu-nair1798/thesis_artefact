import web3 from "./web3";
import InsuranceFactory from "./build/InsuranceFactory.json"

const contractAddress = "0x40b843d2B5C71bD4769774384957f6E9437dFd6F"

const instance = new web3.eth.Contract(
    InsuranceFactory.abi,
    contractAddress
);

export default instance;