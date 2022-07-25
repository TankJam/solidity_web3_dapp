const main = async () => {
    // 获取以太坊获取合约地址
    const [deployer] = await hre.ethers.getSigners();
    // 获取用户额度
    const accountBalance = await deployer.getBalance();
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    // 加载本地写好的合约
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // 部署合约
    const waveContract = await waveContractFactory.deploy(); 
    // 部署完成
    await waveContract.deployed();

    // 查看当前合约地址
    console.log("WavePortal address: ", waveContract.address);

  };
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  runMain();