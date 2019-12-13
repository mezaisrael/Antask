pragma solidity ^0.5.8;

import "./Antask-Interface.sol";

contract Antask is AntaskInterFace {
    struct Task {
        address owner;
        bytes32 description;
        // uint256 id;
        uint256 reward;
        uint256 timeToComplete;
        uint256 taskStartTime;
    }

    // maps id of task task
    // mapping (uint256 => Task) public availableTask;

    Task[] public availableTask;
    //map task id to array of address that have applied for the task
    mapping (uint => address[]) appliedForTask;


    constructor() public {

    }

    function createTask(bytes32 description, uint256 reward) external payable {
        // Task memory newTask = Task(msg.sender, description, reward, 0, 0);
        availableTask.push(Task(msg.sender, description, reward, 0, 0));
    }

    function createTask(bytes32 description, uint256 reward, uint256 timeToComplete) external payable {
        Task memory newTask = Task(msg.sender, description, reward, timeToComplete, 0);
        availableTask.push(newTask);
    }

    function getAvailabelTaskCount() external view returns(uint){
        return availableTask.length;
    }

    function applyForTasks(uint taskId) external{

    }

    function approveTask (address hiredUser) external {

    }


    function addSkills(bytes32 skill) external{

    }

    function markTaksComplete(uint256 taskId) external returns(bool res) {
        return false;
    }

    function rateUser(address user, uint rating, bytes32 comments) external {

    }

    function hireUser (address user) external {

    }

    function updatePayRate (uint256 taskId, uint256 newRate) external {

    }

    function () payable external{

    }



}
