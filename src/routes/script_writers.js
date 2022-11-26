const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all genres
router.get('/', async (req, res, next) => {
  const scriptWriters = await prisma.script_writer.findMany()
  res.send({ data: scriptWriters })
})

// Get specific genre
router.get('/:id', async (req, res, next) => {
  const scriptWriter = await prisma.script_writer.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: scriptWriter })
})

// Create genre
router.post('/', async (req, res, next) => {
  const newScriptWriter = await prisma.script_writer.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newScriptWriter)
})

// Update data of specific genre
router.patch('/:id', async (req, res, next) => {
  const updateScriptWriter = await prisma.script_writer.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateScriptWriter)
})

// Delete genre
router.delete('/:id', async (req, res, next) => {
  const deleteScriptWriter = await prisma.script_writer.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteScriptWriter)
})

// PLAY_SCRIPT_WRITER ----------------

// Get all scriptWriters of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      name: true,
      play_script_writer: {
        select: {
          script_writer: true
        }
      }
    }
  })

  res.send({ data: { play } })
})

// Get specific play_script_writer
router.get('/:scriptwriterId/play/:playId', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.playId)
    },
    select: {
      id: true,
      name: true
    }
  })

  const playScriptWriter = await prisma.play_script_writer.findUnique({
    where: {
      id: parseInt(req.params.scriptwriterId)
    },
    select: {
      script_writer: true
    }
  })

  play.play_script_writer = playScriptWriter

  res.send({ data: { play } })
})

// Insert into play_script_writer
router.post('/:scriptwriterId/play/:playId', async (req, res, next) => {
  const newPlayScriptWriter = await prisma.play_script_writer.create({
    data: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    }
  })

  res.status(201).json(newPlayScriptWriter)
})

// Update play_script_writer
router.patch('/:scriptwriterId/play/:playId', async (req, res, next) => {
  const updatePlayScriptWriter = await prisma.play_script_writer.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayScriptWriter)
})

// Delete specific play_script_writer
router.delete('/:scriptwriterId/play/:playId', async (req, res, next) => {
  const deletePlayScriptWriter = await prisma.play_script_writer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    }
  })

  res.status(200).json(deletePlayScriptWriter)
})

module.exports = router
