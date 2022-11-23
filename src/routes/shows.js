const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD *************

// Get all shows
router.get('/', async (req, res, next) => {
  const shows = await prisma.show.findMany()
  res.send({ data: shows })
})

// Get specific show
router.get('/:id', async (req, res, next) => {
  const show = await prisma.show.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ data: show })
})

// Create show
router.post('/', async (req, res, next) => {
  const newShow = await prisma.show.create({ // INSERT
    data: req.body
  })

  res.status(201).json(newShow)
})

// Update data of specific show
router.patch('/:id', async (req, res, next) => {
  const updateShow = await prisma.show.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })

  res.status(200).json(updateShow)
})

// Delete show
router.delete('/:id', async (req, res, next) => {
  const deleteShow = await prisma.show.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json(deleteShow)
})

// PLAY_SHOW ----------------

function exclude (actor, ...keys) {
  for (const key of keys) {
    delete actor[key]
  }
  return actor
}

// Get all shows of specific play
router.get('/play/:id', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      name: true,
      show: {
        include: {
          theatre: {
            select: {
              id: true,
              name: true,
              address: true,
              country: true
            }
          }
        }
      }
    }
  })

  play.show.forEach(s => { exclude(s, 'play_id', 'theatre_id') })

  res.send({ data: { play } })
})

// Get specific show of specific play
router.get('/:showId/play/:playId', async (req, res, next) => {
  const play = await prisma.play.findUnique({
    where: {
      id: parseInt(req.params.playId)
    },
    select: {
      id: true,
      name: true
    }
  })

  const show = await prisma.show.findUnique({
    where: {
      id: parseInt(req.params.showId)
    },
    include: {
      theatre: {
        select: {
          id: true,
          name: true,
          address: true,
          country: true
        }
      }
    }
  })

  exclude(show, 'play_id', 'theatre_id')

  play.show = show

  res.send({ data: { play } })
})

module.exports = router
