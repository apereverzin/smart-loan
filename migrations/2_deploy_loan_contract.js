const LoanRegister = artifacts.require("LoanRegister");
const Loan = artifacts.require("Loan");

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(LoanRegister);
    await deployer.deploy(
                    Loan,
                    LoanRegister.address,
                    "c1",
                    "SmartDebt",
                    "LNC",
                    100000
                  );
    });
};
