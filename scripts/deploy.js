const main = async () => {
  const MultisigWalletFactory = await hre.ethers.getContractFactory(
    "MultiSigWallet"
  );
  const MultisigWallet = await MultisigWalletFactory.deploy([
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
  ]);
  await MultisigWallet.deployed();

  const AccessRegistryFactory = await hre.ethers.getContractFactory(
    "AccessControlWallet"
  );
  const AccessRegistry = await AccessRegistryFactory.deploy(
    MultisigWallet.address,
    [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    ]
  );
  await AccessRegistry.deployed();

  console.log(
    "Multisig Wallet:",
    MultisigWallet.address
  );

  console.log(
    "Access Registry:",
    AccessRegistry.address
  );
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();