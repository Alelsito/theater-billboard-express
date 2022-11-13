const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all directors
router.get('/', async (req, res, next) => {
  const directors = await prisma.director.findMany()
  res.send({ data: directors })
})

// Get specific director
router.get('/:id', async (req, res, next) => {
  const director = await prisma.director.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: director })
})

// Create director
router.post('/', async (req, res, next) => {
  const newDirector = await prisma.director.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newDirector)
})

// Update data of specific director
router.patch('/:id', async (req, res, next) => {
  const updateDirector = await prisma.director.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateDirector)
})

// Delete director
router.delete('/:id', async (req, res, next) => {
  const deleteDirector = await prisma.director.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteDirector)
})

// PLAY_DIRECTOR ----------------

// Get all directors of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const directors = await prisma.play_director.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      director: true
    }
  })

  play.directors = directors

  res.send({ data: { play } })
})

// Get specific play_director
router.get('/:directorId/play/:playId', async (req, res, next) => {
  const playDirector = await prisma.play_director.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    },
    include: {
      director: true
    }
  })

  res.send({ data: { playDirector } })
})

// Insert into play_director
router.post('/:directorId/play/:playId', async (req, res, next) => {
  const newPlayDirector = await prisma.play_director.create({
    data: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    }
  })

  res.status(201).json(newPlayDirector)
})

// Update play_director
router.patch('/:directorId/play/:playId', async (req, res, next) => {
  const updatePlayDirector = await prisma.play_director.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayDirector)
})

// Delete specific play_director
router.delete('/:directorId/play/:playId', async (req, res, next) => {
  const deletePlayDirector = await prisma.play_director.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    }
  })

  res.status(200).json(deletePlayDirector)
})

module.exports = router
