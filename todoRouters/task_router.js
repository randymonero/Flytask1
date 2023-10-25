
const express = require('express');
const router = express.Router()

const taskController = require('../controller/task_controller')


router.post('/', async (req, res) => {
    await taskController.addTask(req, res)

})

router.get('/', async (req, res) => {
    const tasks = await taskController.getAllTasks(req, res)
    let response = {
        message: "Tasks list",
        status: 200,
        result: tasks
    }
    res.status(200).json(response)
})

router.get('/:id', async (req, res) => {
    const task = await taskController.getTaskById(req.params.id)
    let response = {
        message: `Task has been opened`,
        status: 200,
        result: task
    }
    res.status(200).json(response)
})

router.delete('/:id', async (req, res) => {
    await taskController.deleteTask(req.params.id)
    let response = {
        message: 'Task has been deleted',
        status: 200,
        result: null
    }
    res.status(200).json(response)
})


router.put('/:id', async (req, res) => {
    await taskController.updateTask(req, res)
})

// router.put ('/:id',async (req,res) =>{
//     const affectedRows = await taskController.addOrEditTask(req.body,req.params.id)
//     //    if 
//     res.status(201).send('updated successfully')
// })



module.exports = router;
// await task.addOrEditTask(req.body)