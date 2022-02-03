const Marketplace2_0 = artifacts.require('Marketplace2_0.sol');
const Racer = artifacts.require('Racers.sol');
const Matic = artifacts.require('MaticToken.sol');

module.exports = function(deployer){
    deployer.deploy(Matic);
    deployer.deploy(Racer);
    deployer.deploy(Marketplace2_0);
};