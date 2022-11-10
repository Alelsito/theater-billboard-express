const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD

// Get all plays
router.get('/', async (req, res, next) => {
  const plays = await prisma.play.findMany()
  res.send({ data: plays })
})

// Get specific play (by :id)
router.get('/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: play })
})

// Create play
router.post('/', async (req, res, next) => {
  const newPlay = await prisma.play.create({
    data: req.body
  })

  res.status(201).json(newPlay)
})

// Update data of specific play (by :id)
router.patch('/:id', async (req, res, next) => {
  const updatePlay = await prisma.play.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updatePlay)
})

// Delete play (by :id)
router.delete('/:id', async (req, res, next) => {
  const deletePlay = await prisma.play.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deletePlay)
})

// SPECIFIC REQUESTS

// Get all directors of specific play
router.get('/:id/director', async (req, res, next) => {
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

// Refactor ♻
// Get all posters of specific play
router.get('/:id/poster', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const posters = await prisma.play_poster.findMany({
    where: {
      play_id: parseInt(req.params.id)
    }
  })

  play.posters = posters

  res.send({ data: { play } })
})

// Get all genres of specific play
router.get('/:id/genre', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const genres = await prisma.play_genre.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      genre: true
    }
  })

  play.genres = genres

  res.send({ data: { play } })
})

module.exports = router
