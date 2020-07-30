// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.7.0;

contract InsuranceFactory {
    address[] public deployedInsurance;

    function createInsurance(address payable customer_address, uint months_as_customerArg,
                            uint ageArg, string memory policy_cslArg, uint policy_deductableArg,
                            uint annual_premiumArg, uint umbrella_limitArg, string memory sexArg,
                            string memory auto_makeArg, uint auto_yearArg) public {

        address newInsurance = address(new Insurance(msg.sender, customer_address, months_as_customerArg,
                                        ageArg, policy_cslArg, policy_deductableArg, annual_premiumArg,
                                        umbrella_limitArg, sexArg, auto_makeArg, auto_yearArg));

        deployedInsurance.push(newInsurance);
    }

    function getDeployedInsurance() public view returns(address[] memory) {
        return deployedInsurance;
    }
}
contract Insurance {
    struct Claim {
        uint injury_claim;
        uint property_claim;
        uint vehicle_claim;
        bool complete;
        bool claim_decision;
    }

    struct ClaimDetails {
        string incident_type;
        string collision_type;
        string incident_severity;
        string authorities_contacted;
        uint incident_hour;
        uint number_of_vehicles_involved;
        bool property_damage;
        uint bodily_injuries;
        uint witnesses;
        bool police_report_available;
    }

    Claim[] public claimsArray;
    ClaimDetails[] public claimDetailsArray;
    address payable public insurer;
    address payable public customer_address;
    uint public months_as_customer;
    uint public age;
    string public policy_csl;
    uint public policy_deductable;
    uint public annual_premium;
    uint public umbrella_limit;
    string public sex;
    string public auto_make;
    uint public auto_year;

    modifier restricted() {
        require(msg.sender == insurer, "Only the insurer can access this function");
        _;
    }

    constructor(address payable insurerArg, address payable customerAddressArg,
                uint months_as_customerArg, uint ageArg, string memory policy_cslArg,
                uint policy_deductableArg, uint annual_premiumArg, uint umbrella_limitArg,
                string memory sexArg, string memory auto_makeArg, uint auto_yearArg) public {

        insurer = insurerArg;
        customer_address = customerAddressArg;
        months_as_customer = months_as_customerArg;
        age = ageArg;
        policy_csl = policy_cslArg;
        policy_deductable = policy_deductableArg;
        annual_premium = annual_premiumArg;
        umbrella_limit = umbrella_limitArg;
        sex = sexArg;
        auto_make = auto_makeArg;
        auto_year = auto_yearArg;
    }

    function payPremium() public payable {
        require(msg.sender == customer_address, "Only insured customers can pay the premium");
        insurer.transfer(msg.value);
    }

    function createClaim(uint injury_claim, uint property_claim, uint vehicle_claim, string memory incident_type,
                        string memory collision_type, string memory incident_severity,
                        string memory authorities_contacted, uint incident_hour, uint number_of_vehicles_involved,
                        bool property_damage, uint bodily_injuries, uint witnesses, bool police_report_available) public {

        require(msg.sender == customer_address, "Only insured customers can apply for a claim");

        Claim memory newClaim = Claim({
            injury_claim: injury_claim,
            property_claim: property_claim,
            vehicle_claim: vehicle_claim,
            complete: false,
            claim_decision: false
        });

        claimsArray.push(newClaim);

        ClaimDetails memory newClaimsDetails = ClaimDetails({
            incident_type: incident_type,
            collision_type: collision_type,
            incident_severity: incident_severity,
            authorities_contacted: authorities_contacted,
            incident_hour: incident_hour,
            number_of_vehicles_involved: number_of_vehicles_involved,
            property_damage: property_damage,
            bodily_injuries: bodily_injuries,
            witnesses: witnesses,
            police_report_available: police_report_available
        });

        claimDetailsArray.push(newClaimsDetails);
    }

    function approveClaim(uint index) public payable restricted {
        Claim storage claim = claimsArray[index];

        require(!claim.complete, "Claim already processed");

        uint total_claim_amount = claim.injury_claim + claim.property_claim + claim.vehicle_claim;

        customer_address.transfer(total_claim_amount);
        claim.complete = true;
        claim.claim_decision = true;
    }

    function denyClaim(uint index) public restricted {
        Claim storage claim = claimsArray[index];

        require(!claim.complete, "Claim already processed");

        claim.complete = true;
        claim.claim_decision = false;
    }

    function getSummary() public view returns(address, uint, uint, string memory, uint, uint, uint, string memory, string memory, uint) {
        return(
            customer_address,
            months_as_customer,
            age,
            policy_csl,
            policy_deductable,
            annual_premium,
            umbrella_limit,
            sex,
            auto_make,
            auto_year);
    }

    function getClaimsCount() public view returns(uint) {
        return claimsArray.length;
    }

}