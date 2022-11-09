const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const theatres = await prisma.theatre.findMany()
  res.send({ data: theatres })
})

router.get('/:id', async (req, res, next) => {
  const theatre = await prisma.theatre.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: theatre })
})

router.post('/', async (req, res, next) => {
  const newTheatre = await prisma.theatre.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newTheatre)
})

router.patch('/:id', async (req, res, next) => {
  const updateTheatre = await prisma.theatre.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateTheatre)
})

router.delete('/:id', async (req, res, next) => {
  const deleteTheatre = await prisma.theatre.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteTheatre)
})

module.exports = router
