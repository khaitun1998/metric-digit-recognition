const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const router = require('./routes/route.js');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

const app = express();
let port;
process.env.NODE_ENV === 'development' ? port = 3000 : port = 3002

require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    createParentPath: true
}))

let client = redis.createClient(6379, process.env.REDIS_ADDRESS);
client.auth(process.env.REDIS_PASSWORD);

app.use(session({
    store: new RedisStore({ client }),
    key: 'user_sid',
    secret: process.env.COOKIE_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    httpOnly: false,
    cookie: {
        maxAge: 900000
    }
}));

app.use('/', router);

app.listen(port);
