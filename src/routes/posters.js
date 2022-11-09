const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const posters = await prisma.play_poster.findMany()
  res.send({ data: posters })
})

router.get('/:id', async (req, res, next) => {
  const poster = await prisma.play_poster.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: poster })
})

router.post('/', async (req, res, next) => {
  const newPoster = await prisma.play_poster.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newPoster)
})

router.patch('/:id', async (req, res, next) => {
  const updatePoster = await prisma.play_poster.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updatePoster)
})

router.delete('/:id', async (req, res, next) => {
  const deletePoster = await prisma.play_poster.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deletePoster)
})

module.exports = router
