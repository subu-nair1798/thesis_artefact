const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/InsuranceFactory.json");
const abiFactory = compiledFactory["abi"];
const bytecodeFactory = compiledFactory["evm"]["bytecode"]["object"];

const provider = new HDWalletProvider(
    "slight post clutch clinic avoid parrot leader release force swing wide join",
    "https://rinkeby.infura.io/v3/d1d22a6bf235434cbd9cef0031eae3bd"
)

const web3 = new Web3(provider)
const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log("Attempting to deploy from the account: ", accounts[0])

    const result = await new web3.eth.Contract(abiFactory)
        .deploy({ data: "0x" + bytecodeFactory})
        .send({ from: accounts[0] })
    
    console.log(abiFactory)
    console.log("Contract deployed at: ", result.options.address)
}

deploy()