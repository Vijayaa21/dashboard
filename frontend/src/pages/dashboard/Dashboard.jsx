import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import taskService from '../../services/taskService';
import { Loading } from '../../components/ui';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ListTodo,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await taskService.getTasks({ limit: 5 });
        const tasks = response.data.tasks;
        const pagination = response.data.pagination;

        const pending = tasks.filter((t) => t.status === 'pending').length;
        const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
        const completed = tasks.filter((t) => t.status === 'completed').length;

        setStats({
          total: pagination.total,
          pending,
          inProgress,
          completed,
        });
        setRecentTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/20',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      gradient: 'from-yellow-500 to-amber-500',
      shadow: 'shadow-yellow-500/20',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: AlertCircle,
      gradient: 'from-purple-500 to-pink-500',
      shadow: 'shadow-purple-500/20',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-green-500',
      shadow: 'shadow-emerald-500/20',
    },
  ];

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'in-progress': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
        }}
      >
        <div className="relative z-10">
          <motion.div
            className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-5 h-5 text-yellow-200" />
            <span className="text-yellow-100 text-sm font-medium">Welcome back</span>
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.name}!</h1>
          <p className="mt-1 text-gray-800/80">
            Here's what's happening with your tasks today.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <motion.div 
          className="absolute right-6 bottom-6 hidden md:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <TrendingUp className="w-20 h-20 text-gray-900/20" />
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <motion.p 
                    className="text-3xl font-bold text-white mt-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <motion.div 
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
          <Link
            to="/dashboard/tasks"
            className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center gap-1 group"
          >
            View all 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {recentTasks.length === 0 ? (
            <div className="p-8 text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ListTodo className="w-8 h-8 text-gray-500" />
              </motion.div>
              <p className="text-gray-400">No tasks yet. Create your first task!</p>
            </div>
          ) : (
            recentTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className="p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div>
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {task.description || 'No description'}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}
                >
                  {task.status.replace('-', ' ')}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
