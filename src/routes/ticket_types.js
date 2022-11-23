const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all ticketTypes
router.get('/', async (req, res, next) => {
  const ticketTypes = await prisma.ticket_type.findMany()
  res.send({ data: ticketTypes })
})

// Get specific ticketType
router.get('/:id', async (req, res, next) => {
  const ticketType = await prisma.ticket_type.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: ticketType })
})

// Create ticketType
router.post('/', async (req, res, next) => {
  const newTicketType = await prisma.ticket_type.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newTicketType)
})

// Update data of specific ticketType
router.patch('/:id', async (req, res, next) => {
  const updateTicketTypeTheatre = await prisma.ticket_type.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateTicketTypeTheatre)
})

// Delete ticketType
router.delete('/:id', async (req, res, next) => {
  const deleteTicketType = await prisma.ticket_type.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteTicketType)
})

module.exports = router
