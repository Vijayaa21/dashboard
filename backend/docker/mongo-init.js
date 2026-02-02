// MongoDB initialization script
// This runs when the container is first created

db = db.getSiblingDB('dashboard');

// Create application user
db.createUser({
  user: 'dashboard_user',
  pwd: 'dashboard_password',
  roles: [
    { role: 'readWrite', db: 'dashboard' }
  ]
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.tasks.createIndex({ user: 1, status: 1 });
db.tasks.createIndex({ user: 1, priority: 1 });
db.tasks.createIndex({ user: 1, createdAt: -1 });

print('MongoDB initialization completed');
