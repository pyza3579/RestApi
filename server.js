const express = require('express');
const db = require('./db.js');
const { uuid } = require('uuidv4');
const app = express();


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());  

app.get('/testimonials', (req, res) => {
  res.send(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.send(db.testimonials.filter(item => item.id == req.params.id)); //dlaczego req.params.id?
});

app.get('/testimonials/random', (req, res) => {
  const randomItem = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];
  res.send(randomItem);//chyba nie dziala?
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body
  const payload = {
    id: uuid(),
    author: author,
    text: text, 
  };
    db.testimonials.push(payload);
    res.send({message: 'OK'});
});

app.put('testimonials/:id', (req, res) => {
  const { author, text } = req.body
  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
}
  const opinion = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials[index] = changedTestimonial;
    res.send({message: 'OK'});
});

app.delete('/testimonials:id', (req, res) => {
  const opinion = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials.splice(index, 1);

    res.send({message: 'OK'});
});

app.get('/concerts', (req, res) => {
  res.send(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  res.send(db.concerts.filter(item => item.id == req.params.id)); //dlaczego req.params.id?
});

app.post('/concerts', (req, res) => { 
  const { performer, genre, price, day, image } = req.body
  const payload = {
    id: uuid(),
    performer: performer,
    genre: genre, 
    price: price,
    day: day,
    image: image,
  };
    db.concerts.push(payload);
    res.send({message: 'OK'});
});

app.delete('/concerts:id', (req, res) => {
  const opinion = db.concerts.filter(item => item.id == req.params.id);
  const index = db.concerts.indexOf(opinion);
  db.concerts.splice(index, 1);
    res.send({message: 'OK'});
});

app.put('concerts/:id', (req, res) => {
  const { performer, genre, price, day, image  } = req.body
  const changedTestimonial = {
    performer: performer,
    genre: genre, 
    price: price,
    day: day,
    image: image,
  }
  const opinion = db.concerts.filter(item => item.id == req.params.id);
  const index = db.concerts.indexOf(opinion);
  db.concerts[index] = changedTestimonial;
    res.send({message: 'OK'});
});


app.get('/seats', (req, res) => {
    res.send(db.seats);
});

app.get('/seats/:id', (req, res) => {
  res.send(db.seats.filter(item => item.id == req.params.id)); //dlaczego req.params.id?
});

app.post('/seats', (req, res) => {
  const { seat, day, client, email } = req.body
  const payload = {
    id: uuid(),
    seat: seat,
    day: day,
    client: client, 
    email: email,
  };
    db.seats.push(payload);
    res.send({message: 'OK'});
});

app.delete('/seats:id', (req, res) => {
  const opinion = db.seats.filter(item => item.id == req.params.id);
  const index = db.seats.indexOf(opinion);
  db.seats.splice(index, 1);
    res.send({message: 'OK'});
});

app.put('seats/:id', (req, res) => {
  const {  seat, day, client, email  } = req.body
  const changedTestimonial = {
    seat: seat,
    day: day,
    client: client, 
    email: email,
  }
  const opinion = db.seats.filter(item => item.id == req.params.id);
  const index = db.seats.indexOf(opinion);
  db.seats[index] = changedTestimonial;
    res.send({message: 'OK'});
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})