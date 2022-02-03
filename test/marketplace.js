const Marketplace2_0 = artifacts.require('Marketplace2_0.sol');
const Racer = artifacts.require('Racers.sol');
const Matic = artifacts.require('MaticToken.sol');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

let maticaddress, raceraddress, marketplaceaddress;

contract("All", function (accounts) {
  it("Deployed Matic: ", async function () {
    x = await Matic.deployed();
    maticaddress = x.address;
    return assert.isTrue(true);
  });
  it("Deployed Racer: ", async function () {
    y = await Racer.deployed();
    raceraddress = y.address;
    return assert.isTrue(true);
  });
  it("Deployed Marketplace: ", async function () {
    marketplaceaddress = await Marketplace2_0.deployed();
    console.log(marketplaceaddress);
    return assert.isTrue(true);
  });
  it("Initialize Racer", async () => {
    Racer.deployed().then((instance) => {
      return instance.initialize();
    }).catch((e) => {
      console.log(e);
    });
  });
  it("Initialize Marketplace", async () => {
    Marketplace2_0.deployed().then((instance) => {
      return instance.initialize(raceraddress, maticaddress);
    }).catch((e) => {
      console.log(e);
    });
  });
  it("Mint Racer 123 and 456", async() => {
    Racer.deployed().then(async (instance) => {
      let ft = await instance.safeMint(accounts[0], 123)
      let st = await instance.safeMint(accounts[0], 456)
      // console.log({ft, st});
      return assert.isTrue(true);
    }).catch((e) => {
      console.log(e);
    });
  })
  it("List minted Racer 123", async() => {
    Marketplace2_0.deployed().then((instance) => {
      return instance.listRacer(123, 1);
    }).catch((e) => {
      console.log(e);
    });
  });
  it("Buy Listed Racer 123", async() => {
    Marketplace2_0.deployed().then((instance) => {
      return instance.buyRacer(123);
    }).catch((e) => {
      console.log(e);
    });
  });
  it("try buy unlisted Racer 456", async() => {
    Marketplace2_0.deployed().then((instance) => {
      return instance.buyRacer(456);
    }).catch((e) => {
      if(e.toString().includes("transfer caller is not owner")) {
        console.log("transfer caller is not owner");
        assert.isTrue(true);
      }
      console.log(e);
    });
  });
  it("list and delist racer 456", async() => {
    Marketplace2_0.deployed().then((instance) => {
      await instance.listRacer(456, 1);
      return instance.delistRacer(456);
    }).catch((e) => {
      console.log(e);
    });
  });
});

//transfer caller is not owner