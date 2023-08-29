// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodWars {
    struct Restaurant {
        string name;
        string identifier; // This will store values like "642a8b19d767d2274c542c96"
        address payable owner;
        uint256 totalTips;
    }

    mapping(uint => Restaurant) public restaurants;
    uint public restaurantsCount = 0;

    address payable public contractAuthor = payable(msg.sender);
    uint256 authorFeePercentage = 5; // 5% fee for the contract author

     event UnrecognizedSelector(bytes4 selector);

    fallback() external {
        emit UnrecognizedSelector(msg.sig);
    }

    event RestaurantAdded(uint restaurantId, string name, string identifier, address owner);
    event Tipped(uint restaurantId, uint256 tipAmount, uint256 authorFee);

    function addRestaurant(string memory _name, string memory _identifier) public {  
        restaurantsCount++;
        restaurants[restaurantsCount] = Restaurant({
            name: _name,
            identifier: _identifier,
            owner: payable(msg.sender),
            totalTips: 0
        });
        emit RestaurantAdded(restaurantsCount, _name, _identifier, msg.sender);
    }

    function tipRestaurant(uint _restaurantId) public payable {
        require(_restaurantId <= restaurantsCount, "Restaurant not found");

        uint256 authorFee = (msg.value * authorFeePercentage) / 100;
        uint256 tipAmount = msg.value - authorFee;

        restaurants[_restaurantId].totalTips += tipAmount;
        contractAuthor.transfer(authorFee);
        restaurants[_restaurantId].owner.transfer(tipAmount);

        emit Tipped(_restaurantId, tipAmount, authorFee);
    }
}
