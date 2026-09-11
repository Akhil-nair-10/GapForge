const express = require('express')
const multer = require('multer')
const { AiController } = require('../controllers/ai.controllers')

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.post(
    '/generate',
    upload.single('resume'),
    AiController.generateAnalysis
)

module.exports = router