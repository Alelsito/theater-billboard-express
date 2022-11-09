const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const shows = await prisma.show.findMany()
  res.send({ data: shows })
})

router.get('/:id', async (req, res, next) => {
  const show = await prisma.show.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: show })
})

router.post('/', async (req, res, next) => {
  const newShow = await prisma.show.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newShow)
})

router.patch('/:id', async (req, res, next) => {
  const updateShow = await prisma.show.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateShow)
})

router.delete('/:id', async (req, res, next) => {
  const deleteShow = await prisma.show.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteShow)
})

module.exports = router
