const express = require('express');
const {
  getPublicRooms,
  getEnrolledRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  joinRoom,
  leaveRoom
} = require('../controllers/roomController');

const router = express.Router();

// Each route handles its own token internally
router.get('/public', getPublicRooms);
router.get('/enrolled', getEnrolledRooms);
router.get('/:id', getRoomById);
router.post('/', createRoom);
router.patch('/:id/join', joinRoom);
router.patch('/:id/leave', leaveRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
