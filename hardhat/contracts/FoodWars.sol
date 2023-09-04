// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodWars {
    struct Restaurant {
        string name;
        string identifier;
        address payable owner;
        uint256 totalTips;
    }

    Restaurant[] public restaurants;
    address payable public contractAuthor;
    uint256 constant authorFeePercentage = 5; // 5%

    // Common MetaMask/Token functions
    string public constant name = "FoodWars";
    string public constant symbol = "FW";
    uint8 public constant decimals = 18;

    event RestaurantAdded(uint restaurantId, string name, string identifier, address owner);
    event Tipped(uint restaurantId, uint256 tipAmount, uint256 authorFee);
    event UnrecognizedSelector(bytes4 selector);

    constructor() {
        contractAuthor = payable(msg.sender);
    }


    fallback() external {
        emit UnrecognizedSelector(msg.sig);
        revert("Fallback: Function not found");
    }

    function addRestaurant(string memory _name, string memory _identifier) external {
        restaurants.push(Restaurant({
            name: _name,
            identifier: _identifier,
            owner: payable(msg.sender),
            totalTips: 0
        }));
        emit RestaurantAdded(restaurants.length - 1, _name, _identifier, msg.sender);
    }

    function tipRestaurant(string memory _identifier) external payable {
    int256 restaurantIndex = findRestaurantIndexByIdentifier(_identifier);
    require(restaurantIndex != -1, "Invalid restaurant identifier");
    
    uint256 authorFee = (msg.value * authorFeePercentage) / 100;
    uint256 tipAmount = msg.value - authorFee;

    restaurants[uint(restaurantIndex)].totalTips += tipAmount;
    contractAuthor.transfer(authorFee);
    restaurants[uint(restaurantIndex)].owner.transfer(tipAmount);

    emit Tipped(uint(restaurantIndex), tipAmount, authorFee);
}

    function findRestaurantIndexByIdentifier(string memory _identifier) internal view returns (int256) {
    for(uint i = 0; i < restaurants.length; i++) {
        if (keccak256(abi.encodePacked(restaurants[i].identifier)) == keccak256(abi.encodePacked(_identifier))) {
            return int(i);
        }
    }
    return -1;
}


    function getAllRestaurants() external view returns (Restaurant[] memory) {
        return restaurants;
    }

    function getRestaurantsCount() external view returns (uint) {
        return restaurants.length;
    }
}
