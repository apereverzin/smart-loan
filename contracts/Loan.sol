// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;


import "./Pausable.sol";
import "./SafeMath.sol";
import "./LoanRegister.sol";
import "./ERC20.sol";

contract Loan is ERC20, Pausable {

    using SafeMath for uint256;

    LoanRegister private _loanRegister;

    string private _contractId;

    uint256 private _supply;

    constructor(
        LoanRegister loanRegister_,
        string memory contractId_,

        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    )
    ERC20(name_, symbol_) {
        _owner = _msgSender();

        _loanRegister = loanRegister_;
        _contractId = contractId_;
        _loanRegister.registerLoan(_contractId, address(this));

        _supply = totalSupply_;
    }

    function getContractId() public virtual returns (string memory) {
        return _contractId;
    }
}
