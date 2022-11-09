const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const genres = await prisma.genre.findMany()
  res.send({ data: genres })
})

router.get('/:id', async (req, res, next) => {
  const genre = await prisma.genre.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: genre })
})

router.post('/', async (req, res, next) => {
  const newGenre = await prisma.genre.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newGenre)
})

router.patch('/:id', async (req, res, next) => {
  const updateGenre = await prisma.genre.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateGenre)
})

router.delete('/:id', async (req, res, next) => {
  const deleteGenre = await prisma.genre.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteGenre)
})

module.exports = router
