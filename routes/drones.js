const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();


// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {

    const response = await Drone.find().select({name: 1})
    console.log(response)

    res.render("drones/list.hbs", {
      allDrones: response
    })
  }catch(err) {
    next(err)
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs", {

  })
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  console.log(req.body)

  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  })
  .then(() => {
    res.redirect("/drones")
  })
  .catch((err) => {
    next(err)
  })
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  
  try {
    const droneToEdit = await Drone.findById(req.params.droneId)

    res.render("drones/update-form.hbs", {
      droneToEdit
    })
  } catch(err) {
    next(err)
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const response = await Drone.findByIdAndUpdate(req.params.droneId, {
      name: req.body.name,
      propellers: req.body.propellers,
      maxSpeed: req.body.maxSpeed
    })

    res.redirect(`/drone/${req.params.droneId}/edit`)

  } catch(err) {
    next(err)
  }
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  console.log("borrando drone", req.params.droneId)
  Drone.findByIdAndDelete(req.params.droneId)
  .then(() => {
    res.redirect("/drones")
  })
  .catch((err) => {
    next(err)
  })
});

module.exports = router;
