const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hola mundo');
});

router.post('add', (req, res) => {
    res.send('recibido');
})
module.exports = router;