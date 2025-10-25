import { abi, contractAddress } from "./constants.js";


const connectButton = document.getElementById('ConnectButton');
connectButton.addEventListener('click', connect);

const fundButton =document.getElementById('FundButton');
fundButton.addEventListener('click', fund);

const balanceButton = document.getElementById('BalanceButton');
balanceButton.addEventListener('click', getBalance);

const withdrawButton = document.getElementById('WithdrawButton');
withdrawButton.addEventListener('click', withdraw);

async function connect(){
    if (typeof window.ethereum !== 'undefined') {
        try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                connectButton.innerText = 'Connected: ' + accounts[0];
            } catch (error) {
                connectButton.innerText = 'Connection Failed';
            }
        } else {
                console.error('MetaMask is not installed. Please install it to use this app.');
            }
        }


async function fund(ethAmount){
    ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount)
            });
            await listenForTransactionMine(transactionResponse, provider);
            console.log("Funding Complete!");
        } catch (error) {
            console.error(error);
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations.`
            );
            resolve();
        });
    });
}

async function getBalance(){
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            const balance = await provider.getBalance(contractAddress);
            console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
        } catch (error) {
            console.error(error);
        }
    }
}

async function withdraw(){
    console.log("Withdrawing...");
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMine(transactionResponse, provider);
            console.log("Withdrawal Complete!");
        } catch (error) {
            console.error(error);
        }
    }
}