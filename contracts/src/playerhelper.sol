pragma solidity ^0.5.9;
import "./playerfactory.sol";

contract PlayerHelper is PlayerFactory {
    
    event newCard(address addr, uint8 card);
    
    uint randNonce = 0;
    mapping(uint8 => bool) private deck;

    modifier checkBalance() {
        require(players[addressToPlayer[msg.sender]].coins >= coinChange, "Insufficient balance");
        _;
    }

    function getRandomCard() public checkBalance {
        randNonce++;
        uint8 rand = uint8(uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % cardModulus) + 1;
        while(deck[rand] != true)   {
            randNonce++;
            rand = uint8(uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % cardModulus) + 1;
        }
        deck[rand] = true;
        players[addressToPlayer[msg.sender]].card = rand;
        emit newCard(msg.sender, rand);
    }

    function getWinner(address[] memory _addr) public returns(address[] memory) {
        uint8 index = 1;
        uint8 indexCard = players[addressToPlayer[_addr[0]]].card % 13 + 1;
        uint8 counter = 0;
        for(uint8 i = 0;i<_addr.length;i++)   {
            uint8 tempCard = players[addressToPlayer[_addr[i]]].card % 13 + 1;
            if(tempCard > indexCard)    {
                indexCard = tempCard;
                index = i;
            }
            else if(tempCard == indexCard)  {
                counter++;
            }
        }
        if(counter == _addr.length - 1) {
            address[] memory temp = new address[](0);
            return temp;
        }

        address[] memory winners = new address[](_addr.length);
        uint8 ind = 0;
        for(uint8 i = 0; i < _addr.length;i++) {
            uint8 tempCard = players[addressToPlayer[_addr[i]]].card % 13 + 1;
            if(tempCard == indexCard)   {
                winners[ind] = _addr[i];
                ind++;
            }
        }

        uint pot = ind*coinChange;
        uint winnerShare = pot / ind;

        for(uint8 i = 0; i < _addr.length; i++) {
            uint8 tempCard = players[addressToPlayer[_addr[i]]].card % 13 + 1;
            if(tempCard == indexCard)   {
                _addCoins(playerToAddress[i], winnerShare);
            }
            else{
                _reduceCoins(playerToAddress[i], coinChange);
            }
        }
        
        //Reshuffling deck
        for(uint8 i=1;i<=52;i++) {
            deck[i] = false;
        }
        
        return winners;
    }

    function _addCoins(address _addr,uint _coins) internal {
        players[addressToPlayer[_addr]].coins += _coins;
    }

    modifier checkBalanceForMin(address _addr, uint _min)    {
        require(players[addressToPlayer[msg.sender]].coins >= _min,"Insufficient funds.");
        _;
    }

    function _reduceCoins(address _addr, uint _coins) internal checkBalanceForMin(_addr, _coins)  {
        players[addressToPlayer[_addr]].coins -= _coins;
    }
}