const main = async () => {

    // 导入以太坊签名
    // 为了将某些东西部署到区块链上，我们需要有一个钱包地址！ Hardhat 在后台神奇地为我们做这件事，
    // 但在这里我抓取了合约所有者的钱包地址，我还抓取了一个随机的钱包地址，并将其命名为 randomPerson。稍后这将更有意义
    const [owner, randomPerson] = await hre.ethers.getSigners();

    // 编译我们的合约并在 artifacts 目录下生成我们使用合约所需的必要文件
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // 每次部署都是一个全新的区块
    const waveContract = await waveContractFactory.deploy();
    // 合约正式部署到我们的本地区块链
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    // 上面的代码只是为了查看部署我们合约的人的地址。原因：好奇！😊😊😊。
    console.log("Contract deployed to:", owner.address);


    /* 
        挥手的钱包地址等于部署合约的地址
            1.调用了我们的 wave 函数。
            2.改变了状态变量。
            3.读取了状态变量的值。

        PS:这几乎是大多数智能合约的基础。读取函数、调用函数、并更改状态变量。
        我们现在拥有继续开发我们史诗般的 WavePortal 所需的构建块。
        很快，我们将能够从我们将要开发的 React 应用程序中调用这些函数!!!
        
        fuck: 竟然要用react，离不开前端了，凸(艹皿艹 )！！！
    */

    // 在run.js调用合约方法
    // 基本上，我们需要手动调用我们的函数！就像我们使用任何普通的 API 一样。
    // 首先我调用函数来获取总挥手数。然后，我挥手一次。最后，我再次抓取 waveCount 以查看它是否发生了变化。
    let waveCount;
    waveCount = await waveContract.getTotalWaves();  

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    // 模拟其他用户点击我们的功能
    // randomPerson 随机抓去的一个地址
    waveTxn = await waveContract.connect(randomPerson).wave();
    // 查看当前操作次数
    waveCount = await waveContract.getTotalWaves();


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