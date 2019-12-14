const Antask = artifacts.require("Antask");

contract('Antask', async (accounts) => {
    user1 = accounts[0]
    user2 = accounts[1]
    user3 = accounts[2]

    let expectWeiReward = 100000000000000 //the reward for the task
    let expectTimeToComplete = 1000
    let expectTaskDes = 'pick up dry cleaner'

    it('should add new task', async () => {
        AntaskInstance = await Antask.deployed()

        let descrip = web3.utils.fromUtf8(expectTaskDes)

        await AntaskInstance.methods['createTask(bytes32,uint256)']
        (descrip, expectTimeToComplete, {from: user1, value: expectWeiReward})

        let taskCount = await AntaskInstance.getAvailabelTaskCount.call()
        let expected = 1

        assert.equal(taskCount, 1, 'incorrect task count')

        let task = await AntaskInstance.allTask.call(0)
        let actualTaskDes = web3.utils.hexToUtf8(task['description'])

        assert.equal(
            actualTaskDes,
            expectTaskDes,
            `description should be "${expectTaskDes}"`
        )
        assert.equal(task['state'].toString(), 0, 'status should be open(0)')
    })

    it('have the correct parameters', async () => {
        let task = await AntaskInstance.allTask.call(0)
        let actualReward = task.reward.toString()
        let actualTimeToComplete = task.timeToComplete.toString()

        assert.equal(actualReward, expectWeiReward, "Incorrect reward")
        assert.equal(actualTimeToComplete, expectTimeToComplete, "Incorrect alloted time")
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

        // user1 hires user2 to complete his task
        await AntaskInstance.hireUserForTask(user2, 0)

        let task = await AntaskInstance.allTask.call(0)

        assert.equal(task['state'].toString(), 1, 'status should be inProgress(1)')
    })

    it('can complete task if user is assgined to it', async () => {
        try{
            //user that are not doing a the task cant mark it as completed
            let a = await AntaskInstance.markTaksComplete(0, {from: user3})
            assert.fail('this should not be able to run')
        } catch(error) {
            assert.isOk("throws error")
        }
        await AntaskInstance.markTaksComplete(0, {from: user2})
        let task = await AntaskInstance.allTask.call(0)
        assert.equal(task['state'], 2,'state should be completed (2)')
    })

    it('can approve task', async () => {
        let balance = await web3.eth.getBalance(user2)
        await AntaskInstance.approveTask(0, user2, {from: user1})
        let balanceAfter = await web3.eth.getBalance(user2)

        assert.isAbove(
            Number(balanceAfter),
            Number(balance),
            'balance should be greated after completing a task'
        );
    })

})
