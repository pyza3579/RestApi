// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { uuid } = require('uuidv4');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomItem = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];
    res.json(randomItem);//chyba nie dziala?
});
  
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

 

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body
  const payload = {
    id: uuid(),
    author: author,
    text: text, 
  };
    db.testimonials.push(payload);
    res.json({message: 'OK'});
});
  
router.route('testimonials/:id').put((req, res) => {
  const { author, text } = req.body
  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
}
  const opinion = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials[index] = changedTestimonial;
    res.json({message: 'OK'});
});
  
router.route('/testimonials:id').delete((req, res) => {
  const opinion = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials.splice(index, 1);
  
    res.json({message: 'OK'});
});
/* ... */

module.exports = router;