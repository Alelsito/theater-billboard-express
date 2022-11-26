const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all genres
router.get('/', async (req, res, next) => {
  const genres = await prisma.genre.findMany()
  res.send({ data: genres })
})

// Get specific genre
router.get('/:id', async (req, res, next) => {
  const genre = await prisma.genre.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: genre })
})

// Create genre
router.post('/', async (req, res, next) => {
  const newGenre = await prisma.genre.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newGenre)
})

// Update data of specific genre
router.patch('/:id', async (req, res, next) => {
  const updateGenre = await prisma.genre.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateGenre)
})

// Delete genre
router.delete('/:id', async (req, res, next) => {
  const deleteGenre = await prisma.genre.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteGenre)
})

// PLAY_GENRE ----------------

// Get all genres of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      name: true,
      play_genre: {
        select: {
          genre: true
        }
      }
    }
  })

  res.send({ data: { play } })
})

// Get specific play_genre
router.get('/:genreId/play/:playId', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.playId)
    },
    select: {
      id: true,
      name: true
    }
  })

  const playGenre = await prisma.play_genre.findUnique({
    where: {
      id: parseInt(req.params.genreId)
    },
    select: {
      genre: true
    }
  })

  play.play_genre = playGenre

  res.send({ data: { play } })
})

// Insert into play_genre
router.post('/:genreId/play/:playId', async (req, res, next) => {
  const newPlayGenre = await prisma.play_genre.create({
    data: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    }
  })

  res.status(201).json(newPlayGenre)
})

// Update play_genre
router.patch('/:genreId/play/:playId', async (req, res, next) => {
  const updatePlayGenre = await prisma.play_genre.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    },
    data: req.body
  })

  res.status(201).json(updatePlayGenre)
})

// Delete specific play_genre
router.delete('/:genreId/play/:playId', async (req, res, next) => {
  const deletePlayGenre = await prisma.play_genre.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    }
  })

  res.status(200).json(deletePlayGenre)
})

module.exports = router
