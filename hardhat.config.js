require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks : {
    bsctestnet : {
      url : process.env.RPC_URL,
      chainId : 97,
      accounts : [process.env.PVT_KEY]
    },
  },
};
