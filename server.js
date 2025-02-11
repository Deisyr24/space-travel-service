const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Set up views directory and template engine (Nunjucks)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the destination page
app.get('/destination', (req, res) => {
    res.render('destination.njk');
});

// ✅ Route to process form submission and render the summary page
app.post('/summary', (req, res) => {
    const { first_name, last_name, address_line1, address_line2, county, country, postcode, destination } = req.body;

    res.render('summary', {
        firstName: first_name,
        lastName: last_name,
        addressLine1: address_line1,
        addressLine2: address_line2 || "N/A",
        county: county,
        country: country,
        postcode: postcode,
        destination: destination
    });
});

// ✅ Route for confirmation page (now renders the styled confirmation page)
app.post('/confirmation', (req, res) => {
    res.render('confirmation');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
