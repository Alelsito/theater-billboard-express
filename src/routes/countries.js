const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const countries = await prisma.country.findMany()
  res.send({ data: countries })
})

router.get('/:id', async (req, res, next) => {
  const country = await prisma.country.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: country })
})

router.post('/', async (req, res, next) => {
  const newCountry = await prisma.country.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newCountry)
})

router.patch('/:id', async (req, res, next) => {
  const updateCountry = await prisma.country.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateCountry)
})

router.delete('/:id', async (req, res, next) => {
  const deleteCountry = await prisma.country.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteCountry)
})

module.exports = router
