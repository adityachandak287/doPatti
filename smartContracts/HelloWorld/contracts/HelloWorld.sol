pragma solidity ^0.5.8;

contract HelloWorld   {
    uint age = 20;
    
    function getAge() public returns (uint) {
        return age;
    }
    
    function setAge(uint _age) public {
        age = _age;
    }
}