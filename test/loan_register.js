const LoanRegister = artifacts.require("LoanRegister");

contract("LoanRegister", function(accounts) {
  it("LoanRegister should be deployed", function(done) {
    var loanRegister = LoanRegister.deployed();
    assert.isTrue(true);
    done();
  });
});

contract("LoanRegister", accounts => {
  it("Should register loan contract", () => {
    let contractInstance;
    let contractOwner;

    return LoanRegister.deployed()
      .then(instance => {
        contractInstance = instance;
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          0,
          "cnt should be 1"
        );
      })
      .then(() => {
          return contractInstance.getLoanById("contract1");
      })
      .then(val => {
        assert.equal(
          val,
          0,
          "Contract " + accounts[4] + " should not be registered"
        );
      })
      .then(() => {
        contractInstance.registerLoan("contract1", accounts[4]);
      })
      .then(() => {
        return contractInstance.getLoanById("contract1");
      })
      .then(val => {
        assert.equal(
          val,
          accounts[4],
          "Registered contract with id 'contract1' wasn't " + accounts[4]
        );
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          2,
          "Count should be 2"
        );
      })
      .then(() => {
        contractInstance.registerLoan("contract1", accounts[5]);
      })
      .then(assert.fail)
      .catch(function(error) {
        assert(
          error.message,
          'ContractId already registered',
          'Should throw "ContractId already registered" exception.'
        )
      })
      .then(() => {
        return contractInstance.getLoanById("contract1");
      })
      .then(val => {
        assert.equal(
          val,
          accounts[4],
          "Registered contract with id 'contract1' wasn't " + accounts[4]
        );
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          2,
          "Count should be 2"
        );
      })
      .then(val => {
        return contractInstance.registerLoan("contract2", accounts[4]);
      })
      .then(assert.fail)
      .catch(function(error) {
        assert(
          error.message,
          'Contract address already registered',
          'Should throw "Contract address already registered" exception.'
        )
      })
      .then(val => {
        return contractInstance.registerLoan("contract2", accounts[4]);
      })
      .then(assert.fail)
      .catch(function(error) {
        assert(
          error.message,
          'Contract address already registered',
          'Should throw "Contract address already registered" exception.'
        )
      })
      .then(() => {
        return contractInstance.getCount();
      })
      .then(val => {
        assert.equal(
          val,
          2,
          "Count should be 2"
        );
      })
      ;
  });
});
