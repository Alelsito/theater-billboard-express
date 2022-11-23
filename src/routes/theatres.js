const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all theatres
router.get('/', async (req, res, next) => {
  const theatres = await prisma.theatre.findMany()
  res.send({ data: theatres })
})

// Get specific theatre
router.get('/:id', async (req, res, next) => {
  const theatre = await prisma.theatre.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: theatre })
})

// Create theatre
router.post('/', async (req, res, next) => {
  const newTheatre = await prisma.theatre.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newTheatre)
})

// Update data of specific theatre
router.patch('/:id', async (req, res, next) => {
  const updateTheatre = await prisma.theatre.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateTheatre)
})

// Delete theatre
router.delete('/:id', async (req, res, next) => {
  const deleteTheatre = await prisma.theatre.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteTheatre)
})

module.exports = router
