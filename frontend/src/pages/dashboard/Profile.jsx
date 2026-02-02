import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { Button, Input } from '../../components/ui';
import { User, Mail, Save, Calendar, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authService.updateProfile(formData);
      updateUser(response.data.user);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <motion.div 
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Banner */}
        <div 
          className="h-32 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Avatar & Info */}
        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-4">
            <motion.div 
              className="w-32 h-32 bg-gray-900 rounded-full border-4 border-gray-900 shadow-lg flex items-center justify-center ring-4 ring-amber-500/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-4xl font-bold bg-gradient-to-br from-amber-400 to-orange-500 text-transparent bg-clip-text">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
          <p className="text-gray-400">{user?.email}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Member since {new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Profile Form Card */}
      <motion.div 
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
              <p className="text-sm text-gray-500">Update your personal information</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
              icon={User}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              icon={Mail}
            />
          </motion.div>

          <motion.div 
            className="flex justify-end pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button type="submit" loading={loading} icon={Save}>
              Save Changes
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
