const Antask = artifacts.require("Antask");

contract('Antask', async (accounts) => {
    user1 = accounts[0]
    user2 = accounts[1]
    user3 = accounts[2]

    it('should add new task', async () => {
        AntaskInstance = await Antask.deployed()

        let expectedDescription = 'pick up dry cleaner'
        let descrip = web3.utils.fromUtf8(expectedDescription)

        await AntaskInstance.methods['createTask(bytes32,uint256,uint256)'](descrip, 10, 1000)
        let taskCount = await AntaskInstance.getAvailabelTaskCount.call()
        let expected = 1

        assert.equal(taskCount, 1, 'incorrect task count')

        let task = await AntaskInstance.allTask.call(0)
        let actualTaskDes = web3.utils.hexToUtf8(task['description'])

        assert.equal(
            actualTaskDes,
            expectedDescription,
            `description should be "${expectedDescription}"`
        )
        assert.equal(task['state'].toString(), 0, 'status should be open(0)')
    })

    it('have the correct parameters', async () => {
        let task = await AntaskInstance.allTask.call(0)
        let actualReward = task.reward.toString()
        let actualTimeToComplete = task.timeToComplete.toString()

        assert.equal(actualReward, 10, "Incorrect reward")
        assert.equal(actualTimeToComplete, 1000, "Incorrect alloted time")
    })

    it('can apply for task', async () => {
        await AntaskInstance.applyForTasks(0, {from: user2})
        let applicants = await AntaskInstance.getApplicantsForTask(0)

        assert.equal(1, applicants.length, 'wrong number of applicants')
        assert.notEqual(user1, applicants[0], 'user1 is not the applicant')
        assert.equal(user2, applicants[0], 'wrong applicant')
    })

    it('can hire from list of applicants', async () => {
        await AntaskInstance.applyForTasks(0, {from: user3})

        //user1 hires user2 to complete his task
        await AntaskInstance.hireUserForTask(user2, 0)

        let task = await AntaskInstance.allTask.call(0)

    })
})
