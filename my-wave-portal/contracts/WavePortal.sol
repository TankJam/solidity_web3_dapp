// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "../node_modules/hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    /* 
        solidity 里面的事件
    */

    // 日志事件
    event NewWave(address indexed from, uint256 timestamp, string message);

    /* 
        创建一个名叫 Wave 的结构体
        结构体是一种自定义的数据类型，可以在其中自定义想要保存的内容
    */
    struct Wave{
        address waver;  // 挥手用户的钱包地址
        string message;  // 用户发送的消息
        uint256 timestamp;  // 用户挥手时的时间戳
    }

    /* 
        声明一个存储数组 waves， 以存结构体。
        目的是为了保持任何人发送给我所有 waves 的原因!
    */
    Wave[] waves;

    constructor() {
        console.log("I AM SMART CONTRACT. POG.");
    }

    /* 
        wave函数，需要一个 _message 字符串，用于接收前端发送过来的消息;
    */
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved w/ message %s", msg.sender, _message);

        /* 
            将 wave 数据存储在数组中
        */
        waves.push(
            Wave(msg.sender, _message, block.timestamp)
        );

        /* 
            记录日志
        */
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    /* 
        getAllWaves函数，返回数组waves，这可以让更容易实现 网站检索;
    */
    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }


    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}