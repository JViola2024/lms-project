const express = require('express');
const router = express.Router();

const {
  getSubjects,
  getSubjectById,
  createSubject,
  editSubject,
  deleteSubjectById,
  deleteSubjects,
} = require('../controllers/subjectController');

router.get('/subjects', getSubjects);
router.get('/subjects/:id', getSubjectById);
router.post('/subjects', createSubject);
router.put('/subjects/:id', editSubject);
router.delete('/subjects/all', deleteSubjects);
router.delete('/subjects/:id', deleteSubjectById);

module.exports = router;
