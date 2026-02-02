import { useState, useEffect, useCallback } from 'react';
import taskService from '../../services/taskService';
import { Button, Input, Select, Modal, Loading } from '../../components/ui';
import TaskForm from '../../components/tasks/TaskForm';
import TaskCard from '../../components/tasks/TaskCard';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  RefreshCw,
  ListTodo,
  CheckSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const response = await taskService.getTasks(params);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchTasks();
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setIsDeleting(true);
    try {
      await taskService.deleteTask(taskId);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, formData);
        toast.success('Task updated successfully');
      } else {
        await taskService.createTask(formData);
        toast.success('Task created successfully');
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save task');
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-amber-500" />
            Tasks
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and track your tasks
          </p>
        </div>
        <Button onClick={handleCreateTask} icon={Plus}>
          Add Task
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
              />
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="All Status"
              />
            </div>

            {/* Priority Filter */}
            <div className="w-full lg:w-48">
              <Select
                options={priorityOptions}
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                placeholder="All Priority"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button type="submit" variant="secondary" icon={Filter}>
                Apply
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearFilters}
                icon={RefreshCw}
              />
            </div>
          </div>
        </form>
      </motion.div>

      {/* Tasks List */}
      {loading ? (
        <Loading text="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <motion.div 
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ListTodo className="w-10 h-10 text-gray-500" />
          </motion.div>
          <h3 className="text-lg font-medium text-white">No tasks found</h3>
          <p className="text-gray-400 mt-1">
            {search || statusFilter || priorityFilter
              ? 'Try adjusting your filters'
              : 'Create your first task to get started'}
          </p>
          {!search && !statusFilter && !priorityFilter && (
            <Button onClick={handleCreateTask} className="mt-4" icon={Plus}>
              Create Task
            </Button>
          )}
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            <div className="grid gap-4">
              {tasks.map((task, index) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    isDeleting={isDeleting}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <motion.div 
              className="flex items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="secondary"
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
              >
                Previous
              </Button>
              <span className="text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-lg">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="secondary"
                disabled={pagination.page === pagination.pages}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
              >
                Next
              </Button>
            </motion.div>
          )}
        </>
      )}

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
