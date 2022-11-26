const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all classifications
router.get('/', async (req, res, next) => {
  const classifications = await prisma.classification.findMany()
  res.send({ data: classifications })
})

// Get specific classification
router.get('/:id', async (req, res, next) => {
  const classification = await prisma.classification.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: classification })
})

// Create classification
router.post('/', async (req, res, next) => {
  const newClassification = await prisma.classification.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newClassification)
})

// Update data of specific classification
router.patch('/:id', async (req, res, next) => {
  const updateClassification = await prisma.classification.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateClassification)
})

// Delete classification
router.delete('/:id', async (req, res, next) => {
  const deleteClassification = await prisma.classification.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteClassification)
})

module.exports = router
