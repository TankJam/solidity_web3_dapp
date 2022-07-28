const main = async () => {

  // 编译我们的合约并在 artifacts 目录下生成我们使用合约所需的必要文件
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // 部署合约
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  // 记录合约交互次数
  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  /* 
    发送几个 waves!
  */
 let waveTxn = await waveContract.wave("A message!");
 await waveTxn.wait();

 const [_, randomPerson] = await hre.ethers.getSigners();
 waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
 await waveTxn.wait();

 let allWaves = await waveContract.getAllWaves();
 console.log(allWaves);

  };
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // 无错误退出节点进程
    } catch (error) {
      console.log(error);
      process.exit(1); // 退出节点进程，同时显示“未捕获的致命异常”错误
    }
    // 在此处阅读有关节点退出 ('process.exit(num)') 状态代码的更多信息：https://stackoverflow.com/a/47163396/7974948
  };
  runMain();