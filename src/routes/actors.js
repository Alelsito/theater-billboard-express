const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const actors = await prisma.actor.findMany()
  res.send({ data: actors })
})

router.get('/:id', async (req, res, next) => {
  const actor = await prisma.actor.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: actor })
})

router.post('/', async (req, res, next) => {
  const newActor = await prisma.actor.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newActor)
})

router.patch('/:id', async (req, res, next) => {
  const updateActor = await prisma.actor.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateActor)
})

router.delete('/:id', async (req, res, next) => {
  const deleteActor = await prisma.actor.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteActor)
})

module.exports = router
