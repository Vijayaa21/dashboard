import { Edit2, Trash2, Calendar, Flag } from 'lucide-react';
import { Button } from '../ui';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onEdit, onDelete, isDeleting }) => {
  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'in-progress': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  const priorityColors = {
    low: 'text-blue-400',
    medium: 'text-amber-400',
    high: 'text-red-400',
  };

  const priorityBgColors = {
    low: 'bg-blue-500/10',
    medium: 'bg-amber-500/10',
    high: 'bg-red-500/10',
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <motion.div 
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5 hover:border-gray-700 transition-all duration-300 group"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title and Status */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className={`font-semibold text-white ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}
            >
              {task.status.replace('-', ' ')}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            {/* Priority */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${priorityBgColors[task.priority]} ${priorityColors[task.priority]}`}>
              <Flag className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{priorityLabels[task.priority]}</span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${isOverdue ? 'bg-red-500/10 text-red-400' : 'bg-gray-800 text-gray-400'}`}>
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs">{formatDate(task.dueDate)}</span>
                {isOverdue && <span className="text-xs font-medium">(Overdue)</span>}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-amber-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => onDelete(task._id)}
            disabled={isDeleting}
            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
