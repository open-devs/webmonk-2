const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/index');
const cron = require('node-cron');
const { cronService } = require('./services/cron.service');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3030;

// set up express
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', routes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err.status === 404) res.status(404).json({ message: 'Not found' });
    else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

mongoose.connect(
    process.env.MONGODB_CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) console.error(err);
        console.log('MONGODB connected successfully');
    }
);

cron.schedule('0 23 * * *', async () => {
    await cronService();
    console.log("CRON")
});

app.listen(PORT, () =>
    console.log(`Express server currently running on port 3030`)
);
