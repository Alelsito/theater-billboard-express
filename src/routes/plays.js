const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all plays
router.get('/', async (req, res, next) => {
  const plays = await prisma.play.findMany()
  res.send({ data: plays })
})

// Get specific play
router.get('/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: play })
})

// Create play
router.post('/', async (req, res, next) => {
  const newPlay = await prisma.play.create({
    data: req.body
  })

  res.status(201).json(newPlay)
})

// Update data of specific play
router.patch('/:id', async (req, res, next) => {
  const updatePlay = await prisma.play.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updatePlay)
})

// Delete play
router.delete('/:id', async (req, res, next) => {
  const deletePlay = await prisma.play.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deletePlay)
})

// SPECIFIC REQUESTS *************

// PLAY_CLASSIFICATION & PLAY_CLASSIFICATION_DETAIL ----------------

// Get classification and classification_detail of specific play
router.get('/:id/classification', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    include: {
      classification: true,
      classification_detail: true
    }
  })

  res.send({ data: { play } })
})

// PLAY_SCRIPT_WRITER ----------------

// Get all scriptWriters of specific play
router.get('/:id/scriptwriter', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const scriptWriters = await prisma.play_script_writer.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      script_writer: true
    }
  })

  play.scriptWriters = scriptWriters

  res.send({ data: { play } })
})

// Get specific play_script_writer
router.get('/:playId/scriptwriter/:scriptwriterId', async (req, res, next) => {
  const playScriptWriter = await prisma.play_script_writer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    },
    include: {
      script_writer: true
    }
  })

  res.send({ data: { playScriptWriter } })
})

// Insert into play_script_writer
router.post('/:playId/scriptwriter/:scriptwriterId', async (req, res, next) => {
  const newPlayScriptWriter = await prisma.play_script_writer.create({
    data: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    }
  })

  res.status(201).json(newPlayScriptWriter)
})

// Update play_script_writer
router.patch('/:playId/scriptwriter/:scriptwriterId', async (req, res, next) => {
  const updatePlayScriptWriter = await prisma.play_script_writer.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayScriptWriter)
})

// Delete specific play_script_writer
router.delete('/:playId/scriptwriter/:scriptwriterId', async (req, res, next) => {
  const deletePlayScriptWriter = await prisma.play_script_writer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      script_writer_id: parseInt(req.params.scriptwriterId)
    }
  })

  res.status(200).json(deletePlayScriptWriter)
})

// PLAY_ACTOR ----------------

// Get all actors of specific play
function exclude (actor, ...keys) {
  for (const key of keys) {
    delete actor[key]
  }
  return actor
}

router.get('/:id/actor', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const actors = await prisma.play_actor.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    include: {
      actor: true
    }
  })

  const actorsDataClean = actors.map(a => {
    exclude(a, 'id', 'play_id', 'actor_id')
    return a
  })

  play.actors = actorsDataClean

  res.send({ data: { play } })
})

// Get specific play_actor
router.get('/:playId/actor/:actorId', async (req, res, next) => {
  const playActor = await prisma.play_actor.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      actor_id: parseInt(req.params.actorId)
    },
    include: {
      actor: true
    }
  })

  res.send({ data: { playActor } })
})

// Insert into play_actor
router.post('/:playId/actor/:actorId', async (req, res, next) => {
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
router.patch('/:playId/actor/:actorId', async (req, res, next) => {
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
router.delete('/:playId/actor/:actorId', async (req, res, next) => {
  const deletePlayActor = await prisma.play_actor.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      actor_id: parseInt(req.params.actorId)
    }
  })

  res.status(200).json(deletePlayActor)
})

module.exports = router
