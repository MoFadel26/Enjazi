const express = require('express');
const {
  getPublicRooms,
  getEnrolledRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  joinRoom,
  leaveRoom,
  getAllRooms
} = require('../controllers/roomController');
const { protectRoute } = require('../middleware/protectRoute');


const router = express.Router();


// Each route handles its own token internally
router.get('/public', protectRoute, getPublicRooms);
router.get('/enrolled', protectRoute, getEnrolledRooms);
router.get('/all', protectRoute, getAllRooms);
router.get('/:id', protectRoute, getRoomById);

router.post('/', protectRoute, createRoom);

router.patch('/:id/join', protectRoute, joinRoom);
router.patch('/:id/leave', protectRoute, leaveRoom);

router.put('/:id', protectRoute, updateRoom);

router.delete('/:id', protectRoute, deleteRoom);

module.exports = router;
