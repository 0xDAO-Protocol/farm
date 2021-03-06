// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./ERC20/ERC20.sol";
import "./utils/Ownable.sol";

/**
 * @title 0xDAO Governance Token
 * @author 0xDAO
 */
contract OXD is ERC20, Ownable {
    constructor() ERC20("0xDAO", "OXD") {}

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }
}