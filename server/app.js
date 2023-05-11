require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/uploads', express.static('uploads'));
app.use(cors({origin: '*', methods: 'GET,PUT,POST,DELETE'}));

app.use(router);
app.use((req, res) => res.status(404).send('Not Found'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
