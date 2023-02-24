// console.log('potato')

import { expect } from "chai";

// function myFunction(){
//     return true
// }
// myFunction = () => {
//     return "Hello World!";
//   }
// describe('myTitle', myFunction);

describe("My Title", ()=>{
    it("should work", ()=>{
        return true;
    })

    it("1 + 1 should equal to 2", ()=>{
        expect(1 + 1).to.equal(2)
    })

    it("1 + 1 should not equal to 2", ()=>{
        expect(1 + 1).to.not.equal(2);
    })
})