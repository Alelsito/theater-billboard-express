const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const orders = await prisma.order.findMany()
  res.send({ data: orders })
})

router.get('/:id', async (req, res, next) => {
  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: order })
})

router.post('/', async (req, res, next) => {
  const newOrder = await prisma.order.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newOrder)
})

router.patch('/:id', async (req, res, next) => {
  const updateOrder = await prisma.order.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateOrder)
})

router.delete('/:id', async (req, res, next) => {
  const deleteOrder = await prisma.order.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteOrder)
})

module.exports = router
