const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
require('dotenv').config();

const TEST_TOKEN = process.env.TEST_API_TOKEN;

function requireBearerToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || token !== TEST_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}


router.post('/', requireBearerToken, async (req, res) => {
    const body = req.body;
    await fs.appendFile('api/log.txt', `\n${new Date()} - ${body.temp}`)
    
    res.send();
})

router.get('/', async (req, res) => {   

    const log = await fs.readFile('api/log.txt', 'utf8');

   const entries = log
    .split('\n').filter(entry => entry != '')
    .map(entry => {
        const [date, temp] = entry.split(' - ');
        return {
            date: (new Date(date)).toISOString(),
            temp: Number(temp)
        }
    })

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'application/json')
    res.json(entries);

})

module.exports = {router};