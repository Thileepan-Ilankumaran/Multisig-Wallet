const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

let wallet;
let accounts;
let accessWallet;


beforeEach( async () => {
    accounts = await ethers.getSigners();
    const MultisigWallet = await ethers.getContractFactory("MultiSigWallet");
    wallet = await MultisigWallet.deploy([
      accounts[0].address,
      accounts[1].address,
      accounts[2].address,
      accounts[3].address
    ]);
    await wallet.deployed();

    await accounts[0].sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("100.0")
    });

    const AccessWalletFactory = await ethers.getContractFactory("AccessControlWallet");
    accessWallet = await AccessWalletFactory.deploy(wallet.address, [
        accounts[0].address,
        accounts[1].address,
        accounts[2].address,
        accounts[3].address
    ]);
    await accessWallet.deployed();
} );

describe("Access Wallet Tests", () => {

    it("Adding Owners", async () => {
        let ownersInitial = accessWallet.getOwners();
        await accessWallet.addOwner(accounts[5].address);

        let ownersFinal = accessWallet.getOwners();
        assert(ownersFinal, ownersInitial + 1, "Owner Addition Fails");
    });

    it("Removing Owners", async () => {
        let ownersInitial = await accessWallet.getOwners();
        await accessWallet.removeOwner(accounts[0].address);

        let ownersFinal = await accessWallet.getOwners();
        assert(ownersFinal, ownersInitial - 1, "Revoking fails");
    });

    it("Renouncing Admin", async () => {
        await accessWallet.renounceAdmin(accounts[1].address);
        let final_admin = await accessWallet.getAdmin();

        assert(final_admin, accounts[1], "Admin Transfer Fails");
    });

    it("Transfer Owner", async () => {
        let transfer = await accessWallet.transferOwner(accounts[1].address, accounts[5].address);
        let receipt = await transfer.wait();
        let data = receipt.events[1].args;
        expect(data.owner).to.equal(accounts[5].address);
    });
});
