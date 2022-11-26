const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all classificationDetails
router.get('/', async (req, res, next) => {
  const classificationDetails = await prisma.classification_detail.findMany()
  res.send({ data: classificationDetails })
})

// Get specific classificationDetail
router.get('/:id', async (req, res, next) => {
  const classificationDetail = await prisma.classification_detail.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: classificationDetail })
})

// Create classificationDetail
router.post('/', async (req, res, next) => {
  const newClassificationDetail = await prisma.classification_detail.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newClassificationDetail)
})

// Update data of specific classificationDetail
router.patch('/:id', async (req, res, next) => {
  const updateClassificationDetail = await prisma.classification_detail.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateClassificationDetail)
})

// Delete classificationDetail
router.delete('/:id', async (req, res, next) => {
  const deleteClassificationDetail = await prisma.classification_detail.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteClassificationDetail)
})

module.exports = router
