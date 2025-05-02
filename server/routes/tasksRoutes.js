const router = require('express').Router({ mergeParams: true });
const ctrl   = require('../controllers/task.controller');

router.route('/')
  .get(ctrl.getTasks)     // GET /api/users/:uid/tasks
  .post(ctrl.addTask);    // POST (create)

router.route('/:tid')
  .put(ctrl.updateTask)   // PUT /api/users/:uid/tasks/:tid
  .delete(ctrl.deleteTask);

module.exports = router;
