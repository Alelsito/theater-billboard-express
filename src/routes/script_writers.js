const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  const scriptWriters = await prisma.script_writer.findMany()
  res.send({ data: scriptWriters })
})

router.get('/:id', async (req, res, next) => {
  const scriptWriter = await prisma.script_writer.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: scriptWriter })
})

router.post('/', async (req, res, next) => {
  const newScriptWriter = await prisma.script_writer.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newScriptWriter)
})

router.patch('/:id', async (req, res, next) => {
  const updateScriptWriter = await prisma.script_writer.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateScriptWriter)
})

router.delete('/:id', async (req, res, next) => {
  const deleteScriptWriter = await prisma.script_writer.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteScriptWriter)
})

module.exports = router
