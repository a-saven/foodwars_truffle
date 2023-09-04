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
    uint256 constant authorFeePercentage = 5; // Constant for fixed fee percentage.

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

    function tipRestaurant(uint _restaurantId) external payable {
        require(_restaurantId < restaurants.length, "Restaurant not found");

        uint256 authorFee = (msg.value * authorFeePercentage) / 100;
        uint256 tipAmount = msg.value - authorFee;

        restaurants[_restaurantId].totalTips += tipAmount;
        contractAuthor.transfer(authorFee);
        restaurants[_restaurantId].owner.transfer(tipAmount);

        emit Tipped(_restaurantId, tipAmount, authorFee);
    }

    function getAllRestaurants() external view returns (Restaurant[] memory) {
        return restaurants;
    }

    function getRestaurantsCount() external view returns (uint) {
        return restaurants.length;
    }
}
