# Multisig Wallet

## Assignment

1. Write a scalable multi-signature wallet contract, which requires a minimum of 60% authorization by the signatory wallets to perform a transaction. 
2. Write an access registry contract that stores the signatories of this multi-sig wallet by address. This access registry contract will have its own admin. Further, the access registry contract must be capable of adding, revoking, renouncing, and transfer of signatory functionalities.


### Clone repository :-

1. Run the command `npm install` to install dependencies. Import openzepplin by `npm install @openzeppelin/contracts`.

2. Then compile `npx hardhat compile` where you should see "Compiled 5 solidity files successfully".

3. Test smart contracts in local hardhat node by `npm hardhat test`.

4. Create an `.env` file in which mention "PVT_KEY=" and "RPC_URL="

5. Deploy to testnet `npx hardhat run scripts/deploy.js --network bsctestnet`

* Reference to this project is [Gnosis MultisigWallet](https://github.com/gnosis/MultiSigWallet)

* I have deployed in BSC Testnet. Here are the contract deployment addresses.

=> Multisig Wallet: [0xBC0132300F4F49221b9b0bFB9aB171E7db53BA00](https://testnet.bscscan.com/address/0xBC0132300F4F49221b9b0bFB9aB171E7db53BA00)

=> Access Registry: [0x859F3285F030Fc15e91CD52454c3885c3e2B7eB0](https://testnet.bscscan.com/address/0x859F3285F030Fc15e91CD52454c3885c3e2B7eB0)
