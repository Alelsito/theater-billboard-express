const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all actors
router.get('/', async (req, res, next) => {
  const actors = await prisma.actor.findMany()
  res.send({ data: actors })
})

// Get specific actor
router.get('/:id', async (req, res, next) => {
  const actor = await prisma.actor.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: actor })
})

// Create actor
router.post('/', async (req, res, next) => {
  const newActor = await prisma.actor.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newActor)
})

// Update data of specific actor
router.patch('/:id', async (req, res, next) => {
  const updateActor = await prisma.actor.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateActor)
})

// Delete actor
router.delete('/:id', async (req, res, next) => {
  const deleteActor = await prisma.actor.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteActor)
})

// PLAY_ACTOR ----------------

// Get all actors of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      name: true,
      play_actor: {
        select: {
          id: true,
          character_name: true,
          actor: true
        }
      }
    }
  })

  res.send({ data: { play } })
})

// Get specific play_actor
router.get('/:actorId/play/:playId', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.playId)
    },
    select: {
      id: true,
      name: true
    }
  })

  const playActor = await prisma.play_actor.findUnique({
    where: {
      id: parseInt(req.params.actorId)
    },
    select: {
      id: true,
      character_name: true,
      actor: true
    }
  })

  play.actors = playActor

  res.send({ data: { play } })
})

// Insert into play_actor
router.post('/:actorId/play/:playId', async (req, res, next) => {
  const newPlayActor = await prisma.play_actor.create({
    data: {
      play_id: parseInt(req.params.playId),
      actor_id: parseInt(req.params.actorId),
      character_name: req.body.character_name
    }
  })

  res.status(201).json(newPlayActor)
})

// Update play_actor
router.patch('/:actorId/play/:playId', async (req, res, next) => {
  const updatePlayActor = await prisma.play_actor.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      actor_id: parseInt(req.params.actorId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayActor)
})

// Delete specific play_actor
router.delete('/:actorId/play/:playId', async (req, res, next) => {
  const deletePlayActor = await prisma.play_actor.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      actor_id: parseInt(req.params.actorId)
    }
  })

  res.status(200).json(deletePlayActor)
})

module.exports = router
