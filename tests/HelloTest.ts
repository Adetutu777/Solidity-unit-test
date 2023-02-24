import {expect } from  "chai";
import{ ethers } from "hardhat";
// why we get ethers from hardhat, it has access to helpers function from hardhat, check the documentation on lesson 6, ccheck the url to hardhat ethers

// describe is from mocha to organise the test
describe("Hello World", ()=>{
    it("should return Hello World!", async ()=>{
//    const signers = await ethers.getSigners()
//    signers in bracket makes it print the signers and whats ahead
//    console.log({signers})

// how to deploy a smart contract
// getContractFctory is from hardhat & contract factory is from ethers , it allows you to deploy a smart contract
// check the ContractFactory unders ethers documentation
// getContractFcatroy here gets address from one of the adress connected in the virtual machine
const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld")
const helloWorldContract = await helloWorldContractFactory.deploy();
// deployed is a method from etehrs, a promise resolved when the contract is included in the block

await helloWorldContract.deployed()
// check the contract section under ethers doc to see how the call the contract as shown below, contract & MethodNAME
// helloWorldContract.METHOD_NAME = ''
// METHODNAME here is helloworld from HelloWorld.sol, line 15
const text = await helloWorldContract.helloWorld();
expect(text).to.eq("Hello World!");
// check below, this will fail because the Hello world is not same as that on the Hello World from HelloWorld.sol because that has exclamation mark
// expect(text).to.eq("Hello World");
// Whats TYPECHain
    });

    // set the owner to deployer account
    it("should set the owner to deployer account", async ()=>{
        const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld")
        const helloWorldContract = await helloWorldContractFactory.deploy();
        // getSigners is helper function from hardhat et ethers
        const signers = await ethers.getSigners()
        // why its at position 0(zero), whenever we use the helperfunction getcontract factory, the signer i.e the signer by default asign it is the signer at position 0
        const deployerAccount = signers[0]
        await helloWorldContract.deployed()
        const owner = await helloWorldContract.owner();
        console.log(deployerAccount.address)
        expect(owner).to.eq(deployerAccount.address);
            });
})

// instead of writing the it in diffrent places, we can simplify it by making our code readable by using the Hooks from mocha, here we will use the beforeEach
// using the beforeEach method, check the beforeeach.tx