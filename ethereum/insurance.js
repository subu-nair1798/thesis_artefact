import web3 from "./web3";
import Insurance from "./build/Campaign.json";

export default (address) => {
    return new web3.eth.Contract(
        Insurance.abi,
        address
    )
};