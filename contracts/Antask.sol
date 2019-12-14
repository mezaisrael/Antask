pragma solidity ^0.5.8;

import "./Antask-Interface.sol";

contract Antask is AntaskInterFace {

    enum TaskState { Open, InProgress, Finished, Approved }
    enum StarRating { One, Two, Three, Four, Five }

    struct Task {
        address owner;
        bytes32 description;
        uint256 reward;
        uint256 timeToComplete;
        uint256 taskStartTime;
        TaskState state;
        address[] applied;
        address assignedUser; //person doing the job this can be an array in a future version
    }

    struct User {
        StarRating rating;
        uint256[] taskPosted;
    }

    Task[] public allTask;

    // map an address to a User
    mapping (address => User) public Users;

    event complitedTask(address worker, address owner, uint taskId);

    function createTask(bytes32 description) external payable {
        Task memory newTask = Task(
            msg.sender,
            description,
            msg.value,
            0,
            0,
            TaskState.Open,
            new address[](0),
            address(0)
        );

        uint taskId = allTask.push(newTask) -1;
        Users[msg.sender].taskPosted.push(taskId);
    }

    function createTask(bytes32 description, uint256 timeToComplete) external payable {
        Task memory newTask = Task(
            msg.sender,
            description,
            msg.value,
            timeToComplete,
            0,
            TaskState.Open,
            new address[](0),
            address(0)
        );

        uint taskId = allTask.push(newTask) -1;
        Users[msg.sender].taskPosted.push(taskId);
    }

    function getAvailabelTaskCount() external view returns(uint){
        return allTask.length;
    }

    function getApplicantsForTask(uint taskId) external view returns(address[] memory) {
        return allTask[taskId].applied;
    }

    function applyForTasks(uint taskId) external{
        require (
            allTask[taskId].state == TaskState.Open,
            "Task status should be open ");


        allTask[taskId].applied.push(msg.sender);
    }

    function hireUserForTask(address userAddr, uint taskId) external {
        require (
            allTask[taskId].state == TaskState.Open,
            "Task must be open for users to apply"
        );
        Task storage task = allTask[taskId];
        //mark the task in progress. In the future maybe this should
        // be done manually by the contract caller since I could add the
        // option to have multiple people working on one task
        task.state = TaskState.InProgress;
        task.assignedUser = userAddr;
        task.taskStartTime = now;
    }

    function markTaksComplete(uint256 taskId) external {
        Task storage task = allTask[taskId];

        require(
            task.assignedUser == msg.sender,
            'only user working on the task can mark the task complete'
        );

        require(
            task.state == TaskState.InProgress,
            'status of task should be in progress'
        );

        task.state = TaskState.Finished;
    }

    // when the worker has Finished a task Finished this
    // call this function to approve the task and release the reward
    function approveTask (address hiredUser) external {

    }


    function addSkills(bytes32 skill) external{

    }

    function rateUser(address user, uint rating, bytes32 comments) external {

    }

    function updatePayRate (uint256 taskId, uint256 newRate) external {

    }

    function () payable external{

    }

}
