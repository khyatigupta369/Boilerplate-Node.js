require('dotenv').config();
require('module-alias/register')
require('./config/database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const http = require('http')
const server = http.createServer(app);

const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true)
app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
)
app.use(morgan('dev'));

app.use(
    morgan('dev', {
        skip(req, res) {
            if (res) {
            }
            if (req.originalUrl.indexOf('path') >= 0) {
                return true
            }
            return false
        },
    })
)

app.get('/Ping', async (req, res) => {
    res.status(200).send('Ping Successful from main app.js')
})

const api = express.Router()

const logger = require('./middleware/logger')
const universalParams = require('./middleware/universalParams')

api.use(logger)
api.use(universalParams)
app.use('/api', api)

const apiParams = {
    api,
}
require('./api/api')(apiParams)

app.use('/', router)

router.all('/*', (req, res) => {
    res.status(404).send('Not Found')
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

