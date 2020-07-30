const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require("../ethereum/build/InsuranceFactory.json");
const compiledInsurance = require("../ethereum/build/Insurance.json");

let accounts;
let factory;
let insuranceAddress;
let insurance;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "4000000" });

    await factory.methods.createInsurance(accounts[1], "10", "25", "test", "1000", "9999", "1000", "male", "honda", "2010")
        .send({ from: accounts[0], gas: "4000000" });

    [insuranceAddress] = await factory.methods.getDeployedInsurance().call();
    insurance = await new web3.eth.Contract(compiledInsurance.abi, insuranceAddress);
});

describe("Insurance", () => {
    it("deploys an insurance factory and an insurance contract", () => {
        assert.ok(factory.options.address);
        assert.ok(insurance.options.address);
    });

    it("marks caller as insurer", async () => {
        const insurer = await insurance.methods.insurer().call();
        assert.equal(insurer, accounts[0]);
    })

    it("allows customer to pay premium", async () => {
        const customer = await insurance.methods.customer_address().call();
        const annualPremium = await insurance.methods.annual_premium().call();

        let originalBalance = await web3.eth.getBalance(customer);
        originalBalance = parseFloat(originalBalance);
        console.log(originalBalance);

        await insurance.methods.payPremium().send({
            from: customer,
            value: annualPremium
        });

        let newBalance = await web3.eth.getBalance(customer);
        newBalance = parseFloat(newBalance);
        console.log(newBalance);

        assert(originalBalance > newBalance);
    });

    it("allows a customer to apply for an insurance claim", async () => {
        await insurance.methods
            .createClaim("1000", "1000", "1000", "Vehicle Theft", "No Collision", "Minor Damage", "Police", "10", "0", false, "0", "2", true)
            .send({ from: accounts[1], gas: "4000000" });
        
        const claim = await insurance.methods.claimsArray(0).call();
        const claimDetails = await insurance.methods.claimDetailsArray(0).call();

        assert.equal("Vehicle Theft", claimDetails.incident_type);
        assert.equal(1000, claim.injury_claim);
    });

    it("processes a premium payment and a claim", async () => {
        const annualPremium = await insurance.methods.annual_premium().call();

        await insurance.methods.payPremium().send({
            from: accounts[1],
            value: annualPremium
        });

        let originalBalance = await web3.eth.getBalance(accounts[0]);
        originalBalance = parseFloat(originalBalance);
        console.log(originalBalance);

        await insurance.methods
            .createClaim("1000", "1000", "1000", "Vehicle Theft", "No Collision", "Minor Damage", "Police", "10", "0", false, "0", "2", true)
            .send({ from: accounts[1], gas: "4000000" });
        
        let claim = await insurance.methods.claimsArray(0).call();
        let totalClaimAmount = parseFloat(claim.injury_claim) + parseFloat(claim.property_claim) + parseFloat(claim.vehicle_claim);
        
        console.log(totalClaimAmount)
        
        await insurance.methods.approveClaim(0).send({
            from: accounts[0],
            gas: "4000000"
        })

        let newBalance = await web3.eth.getBalance(accounts[0]);
        newBalance = parseFloat(newBalance);
        console.log(newBalance);

        claim = await insurance.methods.claimsArray(0).call();

        assert.equal(true, claim.complete);
        assert.equal(true, claim.claim_decision);
        assert(newBalance < originalBalance);
    });
});