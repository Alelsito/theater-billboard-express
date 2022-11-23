const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all showTickets
router.get('/', async (req, res, next) => {
  const showTickets = await prisma.show_ticket.findMany()
  res.send({ data: showTickets })
})

// Get specific showTicket
router.get('/:id', async (req, res, next) => {
  const showTicket = await prisma.show_ticket.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: showTicket })
})

// Create showTicket
router.post('/', async (req, res, next) => {
  const newShowTicket = await prisma.show_ticket.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newShowTicket)
})

// Update data of specific showTicket
router.patch('/:id', async (req, res, next) => {
  const updateShowTicket = await prisma.show_ticket.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateShowTicket)
})

// Delete showTicket
router.delete('/:id', async (req, res, next) => {
  const deleteShowTicket = await prisma.show_ticket.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteShowTicket)
})

module.exports = router
