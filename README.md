# ETHAVAX3

This is a decentralized token management application powered by Solidity and the Ethereum network. Users can mint, transfer, and burn tokens seamlessly, leveraging secure smart contracts. The app integrates with MetaMask for a user-friendly Web3 experience, offering transparent token operations and real-time balance updates.

## Installation

1. Install the dependencies by running `npm install`.
2. Once the dependencies have been installed, run `remixd` to start the remix daemon
3. Open new terminal and Start the local blockchain using Hardhat by running `npx hardhat node`.
4. On Remix, click on workspace selection and select `- connect to localhost -`
5. Compile the contract on Remix
6. Under Deploy & run transactions on Remix, select `Dev - Hardhat Provider` as the Environment
7. Select `MyToken.sol` as the contract
8. Enter the name and symbol for the token
9. Deploy the contract
10. run this code on remix ide

## Usage

**Minting Tokens (Owner Only)**

1. Ensure your wallet is connected to the Ethereum network using MetaMask or another wallet provider.
2. Access the mint function of the contract.
3. Provide the recipient's address and the amount of tokens to mint.
4. Confirm the transaction in MetaMask.
5. The recipient's balance and the total supply of tokens will be updated.

**Burning Tokens**

1. Connect your wallet to the application.
2. Navigate to the burn function.
3. Enter the amount of tokens you wish to burn from your own balance.
4. Confirm the transaction in MetaMask.
5. Your token balance and the total supply will be reduced.

**Transferring Tokens**

1. Connect your wallet to the Ethereum network.
2. Ensure your wallet has sufficient token balance for the transfer.
3. Fill in the recipient's Ethereum address and the token amount to transfer.
4. Click the "Transfer" button to initiate the transaction.
5. Confirm the transaction in MetaMask.
6. The recipient's balance will update, and your balance will decrease accordingly.

## Authors

Metacrafter Earl Rodney N. Escario

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
