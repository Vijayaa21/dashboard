import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ item, index }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Link
          to={item.path}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 shadow-lg shadow-amber-500/30'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
          }`}
        >
          <Icon className={`w-5 h-5 transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`} />
          <span className="font-medium">{item.label}</span>
          {isActive && (
            <motion.div
              className="ml-auto w-2 h-2 bg-gray-900 rounded-full"
              layoutId="activeIndicator"
            />
          )}
        </Link>
      </motion.div>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <motion.div 
        className="p-6 border-b border-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Logo size="md" />
      </motion.div>

      {/* User Info */}
      <motion.div 
        className="p-4 border-b border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50">
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-gray-900 font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <NavLink key={item.path} item={item} index={index} />
        ))}
      </nav>

      {/* Logout */}
      <motion.div 
        className="p-4 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </motion.div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900 border border-gray-800 rounded-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-6 h-6 text-amber-500" />
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div 
              className="absolute left-0 top-0 h-full w-72 bg-gray-900 border-r border-gray-800 shadow-2xl flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <motion.button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-800 text-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
