require('dotenv').config()
const express = require('express');
const path = require('path');
const urlRoute = require('./routers/url');
const { default: mongoose } = require('mongoose');
const Url = require('./models/url');
const userRouter = require('./routers/user');
const cookieParser = require('cookie-parser')



const app = express();
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("db connected successfully") })
    .catch((err) => { console.log('error while connecting db', err); }
    )

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(cookieParser())


app.get('/url/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Short ID:', id);

    try {
        const data = await Url.findOneAndUpdate(
            { shortId: id }, // Ensure shortId exists in your database schema
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );

        // Log the data to check if it's null
        if (!data) {
            console.log('No document found with this shortId');
            return res.status(404).send('Short URL not found');
        }

        console.log('Redirect URL:', data.redirectUrl);

        // Redirect to the original URL
        res.redirect(data.redirectUrl);
    } catch (error) {
        console.log('Error occurred:', error);
        res.status(500).send('Server error');
    }
});


app.get('/analytics/:id', async (req, res) => {
    const id = req.params.id;

    const result = await Url.findOne({ shortId: id })

    res.render('index', { totalClick: result.visitHistory.length })
    //  res.json({ totalClick: result.visitHistory.length })
})

app.use('/url', urlRoute)


app.get('/', (req, res) => {
    res.render('index')
})


app.use('/user', userRouter)

app.listen(process.env.PORT);