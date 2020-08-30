const express = require('express');
const e = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
    res.send('HomePage');
})


app.post('/orders', (req, res) => {
    req.accepts('application/json');

    if(!req.body) return res.sendStatus(400);

    requiresFields = ['adress', 'cartItems', 'email', 'name'];
    for (field of requiresFields) {
        if(req.body.hasOwnProperty(field)) {
            continue;
        } else {
            return res.sendStatus(400);
        }  
    }

    res.sendStatus(200);
    res.send('OrderPage');
    
});


app.listen(PORT);
console.log(`Running on port ${PORT}`);