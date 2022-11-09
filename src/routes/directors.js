const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const directors = await prisma.director.findMany()
  res.send({ data: directors })
})

router.get('/:id', async (req, res, next) => {
  const director = await prisma.director.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: director })
})

router.post('/', async (req, res, next) => {
  const newDirector = await prisma.director.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newDirector)
})

router.patch('/:id', async (req, res, next) => {
  const updateDirector = await prisma.director.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateDirector)
})

router.delete('/:id', async (req, res, next) => {
  const deleteDirector = await prisma.director.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteDirector)
})

module.exports = router
