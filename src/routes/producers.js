const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all producers
router.get('/', async (req, res, next) => {
  const producers = await prisma.producer.findMany()
  res.send({ data: producers })
})

// Get specific producer
router.get('/:id', async (req, res, next) => {
  const producer = await prisma.producer.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: producer })
})

// Create producer
router.post('/', async (req, res, next) => {
  const newProducer = await prisma.producer.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newProducer)
})

// Update data of specific producer
router.patch('/:id', async (req, res, next) => {
  const updateProducer = await prisma.producer.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateProducer)
})

// Delete producer
router.delete('/:id', async (req, res, next) => {
  const deleteProducer = await prisma.producer.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteProducer)
})

// PLAY_PRODUCER ----------------

// Get all producers of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const producers = await prisma.play_producer.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      producer: true
    }
  })

  play.producers = producers

  res.send({ data: { play } })
})

// Get specific play_producer
router.get('/:producerId/play/:playId', async (req, res, next) => {
  const playProducer = await prisma.play_producer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    },
    include: {
      producer: true
    }
  })

  res.send({ data: { playProducer } })
})

// Insert into play_producer
router.post('/:producerId/play/:playId', async (req, res, next) => {
  const newPlayProducer = await prisma.play_producer.create({
    data: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    }
  })

  res.status(201).json(newPlayProducer)
})

// Update play_producer
router.patch('/:producerId/play/:playId', async (req, res, next) => {
  const updatePlayProducer = await prisma.play_producer.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayProducer)
})

// Delete specific play_producer
router.delete('/:producerId/play/:playId', async (req, res, next) => {
  const deletePlayProducer = await prisma.play_producer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    }
  })

  res.status(200).json(deletePlayProducer)
})

module.exports = router
