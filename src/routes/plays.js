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

// PLAY_POSTER ----------------

// Get all posters of specific play
router.get('/:id/poster', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    include: {
      play_poster: true
    }
  })

  res.send({ data: { play } })
})

// PLAY_GENRE ----------------

// Get all genres of specific play
router.get('/:id/genre', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const genres = await prisma.play_genre.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      genre: true
    }
  })

  play.genres = genres

  res.send({ data: { play } })
})

// Get specific play_genre
router.get('/:playId/genre/:genreId', async (req, res, next) => {
  const playGenre = await prisma.play_genre.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    }
  })

  res.status(200).json(playGenre)
})

// Insert into play_genre
router.post('/:playId/genre/:genreId', async (req, res, next) => {
  const newPlayGenre = await prisma.play_genre.create({
    data: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    }
  })

  res.status(201).json(newPlayGenre)
})

// Update play_genre
router.patch('/:playId/genre/:genreId', async (req, res, next) => {
  const updatePlayGenre = await prisma.play_genre.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    },
    data: req.body
  })

  res.status(201).json(updatePlayGenre)
})

// Delete specific play_genre
router.delete('/:playId/genre/:genreId', async (req, res, next) => {
  const deletePlayGenre = await prisma.play_genre.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      genre_id: parseInt(req.params.genreId)
    }
  })

  res.status(200).json(deletePlayGenre)
})

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

// PLAY_DIRECTOR ----------------

// Get all directors of specific play
router.get('/:id/director', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const directors = await prisma.play_director.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      director: true
    }
  })

  play.directors = directors

  res.send({ data: { play } })
})

// Get specific play_director
router.get('/:playId/director/:directorId', async (req, res, next) => {
  const playDirector = await prisma.play_director.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    }
  })

  res.status(200).json(playDirector)
})

// Insert into play_director
router.post('/:playId/director/:directorId', async (req, res, next) => {
  const newPlayDirector = await prisma.play_director.create({
    data: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    }
  })

  res.status(201).json(newPlayDirector)
})

// Update play_director
router.patch('/:playId/director/:directorId', async (req, res, next) => {
  const updatePlayDirector = await prisma.play_director.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayDirector)
})

// Delete specific play_director
router.delete('/:playId/director/:directorId', async (req, res, next) => {
  const deletePlayDirector = await prisma.play_director.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      director_id: parseInt(req.params.directorId)
    }
  })

  res.status(200).json(deletePlayDirector)
})

// PLAY_PRODUCER ----------------

// Get all producers of specific play
router.get('/:id/producer', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  const producers = await prisma.play_producer.findMany({
    where: {
      play_id: parseInt(req.params.id)
    },
    select: {
      producer: true
    }
  })

  play.producers = producers

  res.send({ data: { play } })
})

// Get specific play_producer
router.get('/:playId/producer/:producerId', async (req, res, next) => {
  const playProducer = await prisma.play_producer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    }
  })

  res.status(200).json(playProducer)
})

// Insert into play_producer
router.post('/:playId/producer/:producerId', async (req, res, next) => {
  const newPlayProducer = await prisma.play_producer.create({
    data: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    }
  })

  res.status(201).json(newPlayProducer)
})

// Update play_producer
router.patch('/:playId/producer/:producerId', async (req, res, next) => {
  const updatePlayProducer = await prisma.play_producer.updateMany({
    where: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    },
    data: req.body
  })

  res.status(200).json(updatePlayProducer)
})

// Delete specific play_producer
router.delete('/:playId/producer/:producerId', async (req, res, next) => {
  const deletePlayProducer = await prisma.play_producer.findFirst({
    where: {
      play_id: parseInt(req.params.playId),
      producer_id: parseInt(req.params.producerId)
    }
  })

  res.status(200).json(deletePlayProducer)
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
    }
  })

  res.status(200).json(playScriptWriter)
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
    }
  })

  res.status(200).json(playActor)
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
