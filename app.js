const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./src/routes/index')
const playRouter = require('./src/routes/plays')
const posterRouter = require('./src/routes/posters')
const directorRouter = require('./src/routes/directors')
const producerRouter = require('./src/routes/producers')
const scriptWriterRouter = require('./src/routes/script_writers')
const actorRouter = require('./src/routes/actors')
const genreRouter = require('./src/routes/genres')
const classificationRouter = require('./src/routes/classifications')
const classificationDetailRouter = require('./src/routes/classification_details')
const showRouter = require('./src/routes/shows')
const countryRouter = require('./src/routes/countries')
const theatreRouter = require('./src/routes/theatres')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/', indexRouter)
app.use('/api/v1/play', playRouter)
app.use('/api/v1/poster', posterRouter)
app.use('/api/v1/director', directorRouter)
app.use('/api/v1/producer', producerRouter)
app.use('/api/v1/scriptwriter', scriptWriterRouter)
app.use('/api/v1/actor', actorRouter)
app.use('/api/v1/genre', genreRouter)
app.use('/api/v1/classification', classificationRouter)
app.use('/api/v1/classificationdetail', classificationDetailRouter)
app.use('/api/v1/show', showRouter)
app.use('/api/v1/country', countryRouter)
app.use('/api/v1/theatre', theatreRouter)

app.use('*', (req, res, next) =>
  res.status(404).send({ message: 'Not found' })
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
