const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");
const buildPath = path.resolve(__dirname, "build");

fs.removeSync(buildPath);

const insurancePath = path.resolve(__dirname, "contracts", "Insurance.sol");
const source = fs.readFileSync(insurancePath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "Insurance.sol": {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};

const ouput = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Insurance.sol"];

fs.ensureDirSync(buildPath);

for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, `${contract}.json`),
        output[contract]
    );
}