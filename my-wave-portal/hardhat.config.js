require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/a0ZA6TtUZ5z9qCWJ6ohNAdiTwA6iEdOi",
      accounts: ["a11247a03a4be4808433fbc82b4bd262735a701e8346eae379b25791f0b13156"]
    }
  }
};