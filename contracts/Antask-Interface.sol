pragma solidity ^0.5.8;

interface AntaskInterFace {
    function createTask(bytes32 Description) external payable;
    function createTask(
        bytes32 Description,
        uint256 timeToComplete
    ) external payable;

    function getAvailabelTaskCount() external view returns(uint) ;

    function getApplicantsForTask(uint taskId) external view returns(address[] memory);

    //users can choose a task to complete
    function applyForTasks(uint taskId) external;

    // call to pick from list of applicants a user to complete a task
    function hireUserForTask(address user, uint taskId) external;

    // worker should call this when he has completed the task
    function markTaksComplete(uint256 taskId) external;

    function approveTask(uint taskId, address payable hiredUser) external;

    // // users should only add their top skill to avoid gas fees
    // function addSkills(bytes32 skill) external;

    // // will probably need a modifer requiring that the caller of this function
    // // must have done a done business with @param user. It should also be
    // // between 0 and 5
    // function rateUser(address user, uint rating, bytes32 comments) external;

    // function updatePayRate(uint256 taskId, uint256 newRate) external;
}
