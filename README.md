🪙 Fund Me DApp

A simple decentralized crowdfunding application built using HTML, JavaScript, and Ethers.js that connects to MetaMask and allows users to:

Connect their Ethereum wallet

Fund a smart contract with ETH

Check the contract’s balance

Withdraw funds (owner only)

This project demonstrates how to integrate a smart contract with a basic frontend using Ethers.js v6.

 Features

 Wallet Connection — Connects to MetaMask and displays the connected address

 Fund Functionality — Send ETH to the deployed smart contract

 Withdraw Functionality — Allows the contract owner to withdraw funds

 Check Balance — Displays the contract’s ETH balance in the console

 Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript
Blockchain	Solidity, Hardhat
Web3 Library	Ethers.js (v6)
Wallet	MetaMask
 Project Structure
FundMeApp/
│
├── index.html          # Frontend UI
├── index.js            # Ethers.js logic for connecting and interacting
├── constants.js        # ABI and contract address
└── README.md           # Documentation
