var models = require('../models')
const jwtUtils = require('../utils/jwt.utils')

module.exports =
{
    getAllTasks: async (req,res) => {
        var headerAuth = jwtUtils.getUserToken(req)
        var userId = jwtUtils.getUserId(headerAuth)
        return await models.Task.findAll({
            attributes: [
                "id",
                "UserId",
                "task_name",
                "starting_date",
                "ending_date",
                "status"
            ],
            where: {UserId: userId}
        })
    },

    getTaskById: async (taskId) => {
        return await models.Task.findOne({
            attributes: [
                "id",
                "UserId",
                "task_name",
                "starting_date",
                "ending_date",
                "status"
            ],
            where: { id: taskId }
        })
    },

    deleteTask: async (taskId) => {
        await models.Task.destroy({
            where: { id: taskId }
        })
    },

    addTask: async (req, res) => {
        var headerAuth = jwtUtils.getUserToken(req)
        var userId = jwtUtils.getUserId(headerAuth)

        let { task_name, starting_date, ending_date, status } = req.body

        // if (UserId == null || UserId == '' || UserId == undefined) {
        //     return res.status(400).send("UserId can not be null")
        // }

        let user = await models.User.findOne({
            attributes: [
                "id"
            ],
            where: { id: userId }
        })
        if (user == null) {
            return res.status(404).send("User not found")
        }

        let newTask = await models.Task.create({
            ...req.body,UserId:userId
        })

        let response = {
            message: "task has been added",
            status: 201,
            result: newTask
        }

        return res.status(201).send(JSON.stringify(response))

    },

    updateTask: async (req, res) => {
        let { id, UserId, task_name, starting_date, ending_date, status } = req.body
        
        let data = false

        let task = await models.Task.findOne({
            where: { id: id }
        })

        if (task == null) {
            return res.status(404).send("task does not exist")
        }

        let user = await models.User.findOne({
            attributes: [
                "id"
            ],
            where: { id: UserId }
        })
        if (user == null) {
            return res.status(404).send("User not found")
        }


        if (task_name != task.task_name) {
            data = true
        }

        if (starting_date != task.starting_date) {
            data = true
        }

        if (ending_date != task.ending_date) {
            data = true
        }

        if (status != task.status) {
            data = true
        }

        if (data === true) {
            let modifiedTask = await models.Task.update(
                {...req.body}, 
                { where: { id: task.id } 
            })

            let response = {
                message: "task has been modified",
                status: 201,
                result: req.body
            }
    
            return res.status(201).send(JSON.stringify(response))
        }


        let response = {
            message: "no data has been modified",
            status: 200,
            result: null
        }

        return res.status(200).send(JSON.stringify(response))
    }

}





// module.exports.getTaskById = async (id) => {
//     const [[record]] = await db.query("SELECT * FROM tasks_table where task_id = ? ",[id])
//         return record;
// }

// module.exports.deleteTask = async (id) => {
//     const [{affectedRows}] = await db.query("DELETE FROM tasks_table where task_id = ? ",[id])
//         return affectedRows;
// }

// module.exports.addOrEditTask = async (obj,id = 0) => {
//     const [[[{affectedRows}]]] = await db.query("call task_table_add_or_edit(?,?,?,?,?) ",[
//         id, obj.task_name, obj.starting_date, obj.ending_date, obj.status])
//         return affectedRows;
// }