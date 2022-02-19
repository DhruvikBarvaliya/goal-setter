const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
// @desc Set goal
// @route POST /api/goal
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        // res.status(400).json({ message: "Please Add Field" })
        res.status(400)
        throw new Error("Please Add a Text Field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('User Not Found')
    }
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User Not Authorize')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedGoal)

})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('User Not Found')
    }
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User Not Authorize')
    }
    // await Goal.findByIdAndDelete(req.params.id)
    await Goal.findByIdAndRemove(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal
}