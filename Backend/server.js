const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/productRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const userRoutes = require('./Routes/userRoutes');
const mongoose  = require('mongoose');
const config = require('./config/keys');
const app = express();



/******************************************MiddleWares  ********************************************/
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


/******************************************MongoDb Connection********************************************/

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('MongoDb Connected')).catch(err => console.log(err));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname , 'Frontend', 'build', 'index.html'));

    });
}



app.get('/', (req, res) => {
    res.send('Hey Server Here!')
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('listening to port 5000'));