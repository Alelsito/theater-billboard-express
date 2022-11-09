const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const producers = await prisma.producer.findMany()
  res.send({ data: producers })
})

router.get('/:id', async (req, res, next) => {
  const producer = await prisma.producer.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: producer })
})

router.post('/', async (req, res, next) => {
  const newProducer = await prisma.producer.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newProducer)
})

router.patch('/:id', async (req, res, next) => {
  const updateProducer = await prisma.producer.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateProducer)
})

router.delete('/:id', async (req, res, next) => {
  const deleteProducer = await prisma.producer.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteProducer)
})

module.exports = router
