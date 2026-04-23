import authRoutes from './authRoutes.js';
// Import other module routes here as we build them
// import taskRoutes from '#modules/tasks/routes/taskRoutes.js';
// import financeRoutes from '#modules/finance/routes/financeRoutes.js';
// import notesRoutes from '#modules/notes/routes/notesRoutes.js';

const routes = (app) => {
  // Auth routes
  app.use('/api/auth', authRoutes);

  // Module routes (to be added)
  // app.use('/api/tasks', taskRoutes);
  // app.use('/api/finance', financeRoutes);
  // app.use('/api/notes', notesRoutes);
};

export default routes;
