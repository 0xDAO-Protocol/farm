// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC20/IERC20.sol';
import "./ERC20/ERC20.sol";
import './ERC20/SafeERC20.sol';
import './utils/Ownable.sol';
import './interfaces/IMasterChef.sol';


contract EmissionKiller is IERC20, ERC20 {
    using SafeERC20 for IERC20;

    uint public immutable pid;
    IMasterChef public constant chef = IMasterChef(0xa7821C3e9fC1bF961e280510c471031120716c3d);
    IERC20 public constant OXD = IERC20(0xc165d941481e68696f43EE6E99BFB2B23E0E3114);
    address public constant multisig = 0xa96D2F0978E317e7a97aDFf7b5A76F4600916021;


    constructor (string memory name, string memory symbol, uint _pid) ERC20 (name, symbol) {
        _mint(address(this), 1);
        pid = _pid;
    }

    function kill() external returns (bool) {
        onlyOwner();
        approve(address(chef), 1);
        chef.deposit(pid, 1);
        return true;
    }

    function claimOXD() public returns (bool) {
        onlyOwner();
        chef.deposit(pid, 0);
        return true;
    }

    function destroy(uint amount, bool claim) public returns (bool) {
        onlyOwner();
        if (claim) {
          claimOXD();
        }
        OXD.transfer(0x000000000000000000000000000000000000dEaD, amount);
        return true;
    }

    function destroyAll(bool claim) external returns (bool) {
        onlyOwner();
        if (claim) {
          claimOXD();
        }
        destroy(OXD.balanceOf(address(this)), false);
        return true;
    }

    function divert(uint amount, address target, bool claim) public returns (bool) {
        onlyOwner();
        if (claim) {
          claimOXD();
        }
        OXD.transfer(target, amount);
        return true;
    }

    function divertAll(address target, bool claim) external returns (bool) {
        onlyOwner();
        if (claim) {
          claimOXD();
        }
        divert(OXD.balanceOf(address(this)), target, false);
        return true;
    }

    function onlyOwner() private view {
        require(msg.sender == multisig, "not owner");
    }

}
