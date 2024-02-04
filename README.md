# TheJourNull Decentralized Journal Publishing Platform

TheJourNull is a decentralized application (dApp) for publishing and purchasing scientific journals. Built on the Ethereum blockchain, it uses the SepoliaETH test network for transactions and JourCoin (JRC), an ERC-20 token, as the platform's currency.

## Features

### Journal Publishing

Researchers can publish their papers with the following details:

- **Paper Title**: A string representing the title of the paper.
- **Paper Domain**: A string indicating the research domain.
- **File**: The research paper file, uploaded to IPFS for decentralized storage.
- **Number of Reviewers**: An integer indicating the desired peer reviews.
- **Extra Days**: An integer specifying additional days for the review.

The smart contract calculates the review time and price based on input and stores the paper's IPFS hash.

### IPFS Link Access Control

The smart contract maintains a list of Ethereum addresses that have access to each journal's IPFS link:

- Initially, only the paper's publisher has access.
- As buyers purchase access to the paper, their addresses are added to the access list.
- The smart contract checks this list to control access to the IPFS link.

### Browse Journals

Users can browse journals, each displaying:

- **Title**
- **Topic**
- **Index Score**
- **JRC Price**
- **Access Button**: Based on ownership, users will either see a "Get" button to buy access or a direct link to the IPFS content.

### Journal Access Workflow

When a user selects a journal:

1. **Ownership Check**: The smart contract checks if the user's address is in the paper's access list.
2. **IPFS Link Display**: If the user owns the paper, the IPFS link is revealed.
3. **Buy Option**: If the user doesn't own the paper, the "Buy" button is displayed.

### Buying a Journal

Upon clicking "Buy":

1. MetaMask prompts the user to complete the transaction.
2. If the transaction is successful:
   - The user's address is added to the paper's access list.
   - The IPFS link becomes available to the user.
   - The "Buy" button is replaced with the IPFS link.
   - A success message (code 1) is displayed.
3. If the transaction fails:
   - The IPFS link remains hidden.
   - The "Buy" button remains.
   - An error message (code 2) is shown.

### New Tab for Journal Details

Clicking on a journal entry opens a new tab with the same template, dynamically filled with the selected journal's details. The user's address is retrieved from MetaMask to determine access rights.

## Setup and Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the local development server with `npm start`.
4. Ensure MetaMask is connected to the Sepolia test network.

## How to Use

- To submit a journal, go to 'Publish Journals'.
- To view journals, visit 'Browse Journals'. 
- To buy JRC tokens, navigate to 'Buy Tokens'.

## Development and Contributions

The project is open to contributions. Feel free to fork, submit issues, and pull requests.

## License

This project is licensed under the MIT License.