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



    
## 三、构建连接到我们的钱包并与我们的 WaveContract 对话的 web3 应用程序
### 1、构建一个基本的React应用程序，并且设置连接到metamask钱包
  - 1.前置准备
    - https://replit.com/ 通过github登录该网站
    - 点击 run 按钮启动react程序
    - 测试 编辑 app.jsx 查看是否更新

  - 2.连接metamask
    - 为什么我们需要 Metamask？因为我们需要能够调用位于区块链上的智能合约上的函数。而且，要做到这一点，我们需要一个包含我们以太坊地址和私钥的钱包。
    - 点击页面中的 Wave at Me 按钮连接钱包

### 2、将智能合约部署到真实的测试网
  - 1.先关闭本地节点的区块链
  - 2.在 Alchemy（最简单部署到以太坊的工具） 注册一个账号，然后在里面创建一个app
    - 1）进入：https://www.alchemy.com/
    - 2）选择 Ethemurme 
    - 3）Create your first app
      - 必填： TEAM NAME 
      - 必填： APP NAME 
      - 选择： NETWORK ---> Binkeby
    - 4）进入面板页面
      - 点击刚才 APP NAME 的 VIEW DETAILS 
      - 点击 VIEW KEY 
        - 复制API的URL，后续需要使用
          - https://eth-rinkeby.alchemyapi.io/v2/a0ZA6TtUZ5z9qCWJ6ohNAdiTwA6iEdOi

  - 3.将合约部署到区块链，是将gas费用交给专门管理以太坊的矿工，矿工在全球每个角落中
    - 让矿工将我的智能合约添加到区块链中，让他公布给所有人去访问
    - Alchemy 本质上帮助我们广播我们的合约创建交易，以便矿工尽快获取它。一旦交易被挖掘出来，
    - 它就会作为合法交易被广播到区块链。从那里，每个人都会更新他们的区块链副本。

  - 4.测试网
    - 1）广播我们的交易
    - 2）等待实际矿工领取
    - 3）等待它被开采
    - 4）等待它被广播回区块链，告诉所有其他矿工更新他们的副本;

  - 5.获取一些假的ETH
    - 1）通过水龙头为Rinkeby获取一些假的ETH
      - https://faucets.chain.link/
      - 5个小时才能获取一次测试网以太币

  - 6.部署到 Rinkeby 测试网络
    - 1）更改 hardhat.config.js 文件
      require("@nomicfoundation/hardhat-toolbox");
      /** @type import('hardhat/config').HardhatUserConfig */
      module.exports = {
        solidity: "0.8.9",
        networks: {
          rinkebr:{
            url:"Alchemy中的的以太坊API",
            accounts: ["钱包私钥"]  // 注意，秘钥不能上传到github，否则钱包很危险
          }
        }
      };

      - 需要登录区块
      - 公共地址：相当于用户名
      - 私钥：相当于密码

    - 2) 执行命令
      - npx hardhat run scripts/deploy.js --network rinkeby

    - 3) 查看部署结果
      - Deploying contracts with account:  0x53D92bA4E1C4E42C3c2D68F2A383c55CadDD812b   ->   部署合约的钱包地址
      - Account balance:  100000000000000000                                            ->   账户余额，单位为 wei
      - WavePortal address:  0x5551197f04eBf94940c5882fc21b049fADc988dB                 ->   合约地址

    - 4）去以太坊查看部署好的合约地址
      - https://rinkeby.etherscan.io/address/0x5551197f04eBf94940c5882fc21b049fADc988dB


### 3、将钱包连接到web应用程序（使用window.ethereum()）
  - 1.在右边src下的app.jsx中测试
    - 点击运行按钮  
      - 看到以下代码
        /*
        * 首先确保我们可以访问 window.ethereum
        */
        const { ethereum } = window;

        if (!ethereum) {
          console.log("Make sure you have metamask!");
        } else {
          console.log("We have the ethereum object", ethereum);
        }

### 4、检查是否可以访问用户账户
  - 检查我们是否被授权实际访问用户的钱包。一旦我们可以访问它，我们就可以调用我们的智能合约