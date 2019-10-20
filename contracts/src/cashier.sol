pragma solidity ^0.5.9;

import "./playerhelper.sol";

contract Cashier is PlayerHelper {
    function deposit() external payable {
        require(msg.value >= 0.01 ether,"Insufficient funds.");
        uint coins = msg.value * conversionRate / 10**18;
        _addCoins(msg.sender, coins);
    }

    function withdraw() external checkBalanceForMin(msg.sender, 0) {
        uint coins = players[addressToPlayer[msg.sender]].coins;
        msg.sender.transfer(0.01 ether * coins);
        _reduceCoins(msg.sender, coins);
    }
}