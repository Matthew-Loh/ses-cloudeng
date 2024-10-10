//I tried to use the latest Redis Version, but got stuck on Promises, Await, Async + connection management. Went back to 2.8.0
const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    url: 'redis://redis-server:6379'
});


client.on('ready', () => {
    console.log('Connected to Redis.');
    client.set('visits', 0);
    app.get('/', (req, res) => {
      client.get('visits', (err, visits) => {

        res.send('Congrats you are the Visitor ' + visits);
        client.set('visits', parseInt(visits) + 1);
        });
    });

    app.listen(3000, () => {
        console.log(`Server running on http://localhost:3000`);
    });

});
