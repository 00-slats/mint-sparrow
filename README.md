# Mint Sparrow (Built for Base)

Mint Sparrow is a small, browser-based Base checker that verifies network identity and performs fast, read-only queries for balances and the latest block tip using official Base RPC endpoints.

---

## Base network context

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

---

## Repository layout

- app/mint-sparrow.ts  
  Minimal UI for Coinbase Wallet connection and Base read-only queries.

- contracts/  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - minimaltoken.sol — simple stateful contract for interaction testing  
  - ERC20.sol — lightweight registry contract used for read-only queries
    
- package.json  
  Dependency manifest referencing Coinbase SDKs and multiple Base/Coinbase repositories.

- README.md  
  Technical documentation and testnet deployment records.

---

## What it does

- Connects a Coinbase Wallet (EIP-1193)  
- Confirms chainId is Base-compatible (8453 / 84532)  
- Reads ETH balance for the connected wallet or any address  
- Reads latest block number (tip)  
- Prints Basescan links for verification  

No transactions are signed or broadcast.

---

## License

MIT License  
Copyright (c) 2025 YOUR_NAME

---

## Author

Public contact: 00-slats.swerve@icloud.com

GitHub: https://github.com/mint-sparrow

---

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract minimaltoken.sol address:  
0x2AbfBC8FFf413B8b8826E4b3058C03440B18b213

Deployment and verification:
- https://sepolia.basescan.org/address/0x2AbfBC8FFf413B8b8826E4b3058C03440B18b213
- https://sepolia.basescan.org/0x2AbfBC8FFf413B8b8826E4b3058C03440B18b213/0#code  

Contract ERC20.sol address:  
0x2A4a0B1040ea404f50Fc61E0Bc77D5e85840A275

Deployment and verification:
- https://sepolia.basescan.org/address/0x2A4a0B1040ea404f50Fc61E0Bc77D5e85840A275
- https://sepolia.basescan.org/0x2A4a0B1040ea404f50Fc61E0Bc77D5e85840A275/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
