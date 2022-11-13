const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all posters
router.get('/', async (req, res, next) => {
  const posters = await prisma.play_poster.findMany()
  res.send({ data: posters })
})

// Get specific poster
router.get('/:id', async (req, res, next) => {
  const poster = await prisma.play_poster.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: poster })
})

// Create poster
router.post('/', async (req, res, next) => {
  const newPoster = await prisma.play_poster.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newPoster)
})

// Update data of specific poster
router.patch('/:id', async (req, res, next) => {
  const updatePoster = await prisma.play_poster.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updatePoster)
})

// Delete poster
router.delete('/:id', async (req, res, next) => {
  const deletePoster = await prisma.play_poster.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deletePoster)
})

// PLAY_POSTER ----------------

// Get all posters of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    include: {
      play_poster: true
    }
  })

  res.send({ data: { play } })
})

// Get specific poster of specific play
router.get('/:posterId/play/:playId', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.playId)
    }
  })

  const poster = await prisma.play_poster.findUnique({
    where: {
      id: parseInt(req.params.posterId)
    }
  })

  play.poster = poster

  res.send({ data: { play } })
})

module.exports = router
