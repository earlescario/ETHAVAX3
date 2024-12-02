// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Token {
    uint256 public totalSupply;
    address public owner;
    string public name = "Earl Rodney";
    string public symbol = "ER";
    uint8 public decimals = 15;

    mapping(address => uint256) public balances;

    // Events for better transaction logging
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }

    // Mint function
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to the zero address.");
        require(amount > 0, "Amount must be greater than 0.");

        balances[to] += amount;
        totalSupply += amount;

        emit Mint(to, amount); // Emit event for minting
    }

    // Burn function
    function burn(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0.");
        require(amount <= balances[msg.sender], "Amount exceeds balance.");

        balances[msg.sender] -= amount;
        totalSupply -= amount;

        emit Burn(msg.sender, amount); // Emit event for burning
    }

    // Transfer function
    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Cannot transfer to the zero address.");
        require(amount > 0, "Amount must be greater than 0.");
        require(amount <= balances[msg.sender], "Amount exceeds balance.");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount); // Emit event for transfer
    }
}
