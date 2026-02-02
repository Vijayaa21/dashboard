import Task from '../models/Task.model.js';
import { ApiError } from '../middleware/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

// @desc    Create a new task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    user: req.user._id,
  });

  logger.info(`Task created: ${task._id} by user: ${req.user.email}`);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: { task },
  });
});

// @desc    Get all tasks for logged in user
// @route   GET /api/v1/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const { search, status, priority, sortBy, order, page = 1, limit = 10 } = req.query;

  // Build query
  const query = { user: req.user._id };

  // Filter by status
  if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
    query.status = status;
  }

  // Filter by priority
  if (priority && ['low', 'medium', 'high'].includes(priority)) {
    query.priority = priority;
  }

  // Search by title or description
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  // Sorting
  const sortOrder = order === 'asc' ? 1 : -1;
  const sortField = sortBy || 'createdAt';
  const sortOptions = { [sortField]: sortOrder };

  // Execute query
  const [tasks, total] = await Promise.all([
    Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    Task.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: {
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
});

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.json({
    success: true,
    data: { task },
  });
});

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  let task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Update fields
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  await task.save();

  logger.info(`Task updated: ${task._id} by user: ${req.user.email}`);

  res.json({
    success: true,
    message: 'Task updated successfully',
    data: { task },
  });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  logger.info(`Task deleted: ${req.params.id} by user: ${req.user.email}`);

  res.json({
    success: true,
    message: 'Task deleted successfully',
  });
});
