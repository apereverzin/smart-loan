// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Pausable.sol";


contract LoanRegister is Pausable {

    uint256 cnt = 0;

    mapping (string => address) _loanContracts;

    mapping (address => uint) public _registeredAddresses;

    mapping (uint256 => address) public _indexedAddresses;

    mapping (uint256 => string) public _indexedIds;

    constructor() {
        _owner = _msgSender();
    }

    function registerLoan(string memory contractId_, address loan_) public returns (bool) {
        // Loan must NOT be registered
        require(_loanContracts[contractId_] == address(0), "ContractId already registered");
        require(_registeredAddresses[loan_] == 0, "Contract address already registered");

        _loanContracts[contractId_] = loan_;

        _indexedAddresses[cnt] = loan_;
        _indexedIds[cnt] = contractId_;
        cnt+=1;
        _registeredAddresses[loan_] = 1;

        emit SetLoan(contractId_, loan_);

        return true;
    }

    function getCount() public view returns (uint256) {
        return cnt;
    }

    function getIdByIndex(uint256 ind) public view returns (address) {
        return _indexedAddresses[ind];
    }

    function getLoanByIndex(uint256 ind) public view returns (string memory) {
        return _indexedIds[ind];
    }

    function getLoanById(string memory contractId_) public view returns (address) {
        return _loanContracts[contractId_];
    }

    event SetLoan(string contractId, address loan);
}
