const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************
function exclude (actor, ...keys) {
  for (const key of keys) {
    delete actor[key]
  }
  return actor
}

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
    },
    include: {
      play_poster: {
        select: {
          id: true,
          url: true
        }
      },
      play_genre: {
        select: {
          id: true,
          genre: true
        }
      },
      classification: true,
      classification_detail: true,
      play_director: {
        select: {
          id: true,
          director: true
        }
      },
      play_producer: {
        select: {
          id: true,
          producer: true
        }
      },
      play_script_writer: {
        select: {
          id: true,
          script_writer: true
        }
      },
      play_actor: {
        select: {
          id: true,
          character_name: true,
          actor: true
        }
      }
    }
  })

  exclude(play, 'classification_id', 'classification_detail_id')

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

module.exports = router
