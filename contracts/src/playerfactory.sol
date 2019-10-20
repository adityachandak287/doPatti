pragma solidity ^0.5.9;

import "./ownable.sol";

contract PlayerFactory is Ownable {

    event NewPlayer(address addr, uint coins);

    uint cardModulus = 52;
    uint coinChange = 10;
    uint conversionRate = 100;
    struct Player {
        uint coins;
        uint8 card; //1 to 52
    }
    Player[] public players;


    mapping (address => uint) addressToPlayer;
    mapping (uint => address) playerToAddress;

    function _setCoinChange(uint _coinChange) external onlyOwner {
        coinChange = _coinChange;
    }
    function _createPlayer(uint _coins) internal {
        players.push(Player(_coins,0));
        addressToPlayer[msg.sender] = players.length - 1;
        playerToAddress[players.length - 1] = msg.sender;
        emit NewPlayer(msg.sender, _coins);
    }

    function getCoins() public view returns(uint) {
        return players[addressToPlayer[msg.sender]].coins;
    }
    modifier _isNewPlayer() {
        bool flag = true;
        for(uint i = 0;i<players.length;i++)   {
            if(msg.sender == playerToAddress[i])    {
                flag = false;
                break;
            }
        }
        require(flag==true,"Player exists.");
        _;
    }

    function newPlayer() public _isNewPlayer payable{
        require(msg.value >= 0.01 ether,"Player already exists.");
        uint coins = msg.value * conversionRate / 10**18;
        _createPlayer(coins);
    }
}