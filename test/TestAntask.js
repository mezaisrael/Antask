const Antask = artifacts.require("Antask");

contract('Antask', (accounts) => {
    it('should add new task', async () => {
        AntaskInstance = await Antask.deployed()

        let expectedDescription = "pick up dry cleaner"
        let descrip = web3.utils.fromUtf8(expectedDescription)

        // await AntaskInstance.createTask(descrip, 10, 1000, {from:accounts[0]})
        await AntaskInstance.methods['createTask(bytes32,uint256,uint256)'](descrip, 10, 1000)
        let taskCount = await AntaskInstance.getAvailabelTaskCount.call()
        let expected = 1

        assert.equal(taskCount, 1, 'there is 1 availableTask')

        let tasks = await AntaskInstance.availableTask.call(0)
        let actualTaskDes = web3.utils.hexToUtf8(tasks['description'])

        assert.equal(
            actualTaskDes,
            expectedDescription,
            `description should be "${expectedDescription}"`
        )
    })
})
