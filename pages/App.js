import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Bank from "../artifacts/contracts/Bank.sol/EthersTransfer.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = Bank.abi;

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      console.error("Please install MetaMask to use this dApp!");
      return;
    }

    // Request access to the user's MetaMask account
    await window.ethereum.enable();

    // Create an ethers.js provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Get the user's Ethereum address
    const address = await signer.getAddress();
    setAccount(address);

    // Load the contract
    const ethersTransferContract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    setContract(ethersTransferContract);

    // Get the owner's name and address from the contract
    const ownerName = await ethersTransferContract.name();
    setOwnerName(ownerName);

    const ownerAddress = await ethersTransferContract.owner();
    setOwnerAddress(ownerAddress);

    // Get the user's balance from the provider
    const userBalance = await provider.getBalance(address);
    setBalance(ethers.utils.formatEther(userBalance));
  }

  async function handleTransfer() {
    try {
      if (!contract || !recipient || !transferAmount) {
        console.error("Invalid transfer details");
        alert("Please ensure all fields are filled correctly.");
        return;
      }
  
      // Transfer ethers to the recipient
      const transaction = await contract.transfer(recipient, {
        value: ethers.utils.parseEther(transferAmount),
        gasLimit: 500000,  // Increase the gas limit if necessary
      });
      await transaction.wait();
  
      // Refresh the user's balance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const userBalance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(userBalance));
  
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error occurred during transfer:", error);
      alert(`Error occurred during transfer: ${error.message}`);
    }
  }
  

  return (
    <div className="container">
      <div className="card">
        <h1>Ethers Bank</h1>
        <h2>Account: {account || "Not connected"}</h2>
        <h3>Balance: {balance} ETH</h3>
        <h3>Contract Owner: {ownerName || "Loading..."}</h3>
        <h4>Owner Address: {ownerAddress || "Loading..."}</h4>
        <br />
        <h3>Transfer Ethers</h3>
        <label>Recipient Address</label>
        <input
          type="text"
          placeholder="Enter recipient's address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <label>Amount (ETH)</label>
        <input
          type="number"
          placeholder="Enter amount to transfer"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
  );  
}

export default App;