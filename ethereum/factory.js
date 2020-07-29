import web3 from "./web3";
import InsuranceFactory from "./build/InsuranceFactory.json"

const contractAddress = "0xa827F405B4CD2432ED4e90e602AE8efe6D815554"

const instance = new web3.eth.Contract(
    InsuranceFactory.abi,
    contractAddress
);

export default instance;