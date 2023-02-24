import {expect } from  "chai";
import{ ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("Hello World", ()=>{
    // this function is going to have everything we have repeated.
    // now the variable inside this function cannot be accessed in the function in line 15, we need to move it a global scope, instead of make it a const, we can make it a variable in the highest scope
   let helloWorldContract : HelloWorld;
    beforeEach(async ()=>{
        const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld")
        // moving the const out
        // const helloWorldContract = await helloWorldContractFactory.deploy();
        helloWorldContract = await helloWorldContractFactory.deploy();
        await helloWorldContract.deployed()
    })
    it("should return Hello World!", async ()=>{

    const text = await helloWorldContract.helloWorld();
    expect(text).to.eq("Hello World!");
        });

    // set the owner to deployer account
    it("should set the owner to deployer account", async ()=>{
        const signers = await ethers.getSigners()
        const deployerAccount = signers[0]
        await helloWorldContract.deployed()
        const owner = await helloWorldContract.owner();
        console.log(deployerAccount.address)
        expect(owner).to.eq(deployerAccount.address);
            });

            it("should not allow anyone other than owner to call transferOwnership", async ()=>{
          
               const signers = await ethers.getSigners();
               let owner = await helloWorldContract.owner()
               console.log("The owner before is " + owner)
          const tx = await helloWorldContract.transferOwnership(signers[1].address);
          await tx.wait();
          owner = await helloWorldContract.owner();
          console.log("The owner after is " + owner)
            })
})