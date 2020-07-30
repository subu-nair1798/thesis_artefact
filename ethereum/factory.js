import web3 from "./web3";
import InsuranceFactory from "./build/InsuranceFactory.json"

const contractAddress = "0x0dEb19595c0FB3C410402D9B35200b0bDb181f54"

const instance = new web3.eth.Contract(
    InsuranceFactory.abi,
    contractAddress
);

export default instance;