# solidity_web3_dapp
 Solidity 以太坊智能合约构建 Web3 DAPP实验室

## 一、准备:
    - PC端编程学习，请使用 Google 浏览器，因为 Google 浏览器支持 Metamask 钱包的安装。
    - 打开实验室时，如果遇到问题，请先用 Github账号先登录这个网站，然后再继续回到实验室继续学习即可。
        - https://replit.com/onboarding/welcome


## 二、编写 WavePortal 智能合约并将其部署到本地以太坊区块链
### 1、设置环境以开始区块链编程
    - 搭建 hardhat 环境，通过本地的网络来编译和测试智能合约代码
        - 区块链公链:
            - 将编写好的只能合约部署到区块链中，用户想要读取区块链中的数据需要使用手续费;
            - 全球的用户都能访问部署在公链上的智能合约;

### 2、Hardhat 的魔力  
    1.我们将经常使用一个名为 Hardhat 的工具。这将让我们轻松启动本地以太坊网络，并为我们提供假测试 ETH 和假测试帐户。请记住，它就像一个本地服务器，只是“服务器”是区块链。
    2.快速编译智能合约并在我们的本地区块链上进行测试。

    环境搭建:
        1) 搭建node/npm环境
            -  https://nodejs.org/en/about/releases/
        2) 安装当前 LTS Node.js 版本的 Hardhat 并运行
            -  https://hardhat.org/tutorial/setting-up-the-environment

        3) 在当前项目下创建hardhot环境
            - 3.1 初始化
              - mkdir my-wave-portal
              - cd my-wave-portal
              - npm init -y
              - npm install --save-dev hardhat
            - 3.2 启动示例项目
              - npx hardhot
                - javascript 一直回车即可
              - 安装 hardhat-waffle 和 hardhat-ethers（用于生成以太坊虚拟钱包）
                - npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
              - npx hardhat accounts 生成虚拟钱包账户

### 3、配置run.js 去执行写好的合约
    1.创建一个合约
      - 合约可以记录操作次数
      - 可以查看操作记录以及操作用户的 address 地址

    2.模拟一个随机地址的用户来对当前合约进行操作
      // 编译我们的合约并在 artifacts 目录下生成我们使用合约所需的必要文件
      const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
      // 每次部署都是一个全新的区块
      const waveContract = await waveContractFactory.deploy();

### 4、编写本地部署合约的脚本
    - scripts/run.js 运行时生命周期
      1.创建一个新的本地以太坊网络
      2.部署合约
      3.脚本结束后，hardhat 自动销毁本地网络

    - 需要保持本地网络始终活着，以便可以进行测试
      - 新建一个 终端 窗口，进入当前合约项目根目录
      - 执行命令启动一个保持活跃的本地以太坊网络，hardhat 为我们提供了20个账户，并为他们提供了10000ETH;
        - npx hardhat node 

    - 创建一个新区块
      - 在scripts文件夹下，创建一个名为deploy.js的文件，内容与run.js类似
        const main = async () => {
          const [deployer] = await hre.ethers.getSigners();
          const accountBalance = await deployer.getBalance();
          console.log("Deploying contracts with account: ", deployer.address);
          console.log("Account balance: ", accountBalance.toString());
          const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
          const waveContract = await waveContractFactory.deploy();
          await waveContract.deployed();
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


    - 在以太坊活跃状态下执行命令
      - npx hardhat run scripts/deploy.js --network localhost



    