const Restraunt = require("../models/restraunt");
const joi = require("joi");
const path = require("path");
const fs = require("fs");
const listRestraunts = async (req, res, next) => {
  //   const { user, content } = req.body;
  try {
    // other servic
    let restraunts = [];

    // call database for getting users list

    restraunts = await Restraunt.find({ isActive: true });
    const result = { responseCode: 200, responseMessgae: "List of Restraunts", restrauntData: restraunts };
    res.json({ result });

  } catch (e) {
    res.status(400).send({ message: e.message })
  }

};
const restraunt_validate = joi.object({
  restrauntName: joi.string().trim().required(),
  restrauntAddress: joi.object().keys({
    street: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required()

  }),
  restrauntTiming: joi.object().keys({
    weekTiming: joi.array().min(1).required(),
    holidayTiming: joi.array().min(1).required(),
  }),
  //image: joi.string().required()

})


const addRestraunt = async (req, res, next) => {

  if (!req.file) {
    res.json({ error: "image not found", status: 500 });
    next()
  }
  else {
    const imagename = req.file.filename;
    const url = `http://localhost:4000/uploads/${imagename}`;

    const { restrauntName, restrauntAddress, restrauntTiming } = req.body;


    try {
      let options = { abortEarly: false };
      let { error, value } = await restraunt_validate.validate(req.body, options)
      if (error) {
        throw (error)
      }
      let restraunt = await Restraunt.create({
        restrauntName: restrauntName,
        restrauntAddress: restrauntAddress,
        restrauntTiming: restrauntTiming,
        image: url,

      });

      const result = { responseCode: 200, responseMessgae: "List of Restraunts", restrauntData: restraunt };
      res.json({ result });

    }

    catch (error) {
      console.log(error)
      let errors = {}
      console.log(error.details)
      error.details.map(item => {
        errors[item.path] = item.message;
      })

      res.status(400).send({ errors: errors });
    }
  }

};

const updateRestraunt = async (req, res, next) => {

  if (!req.file) {
    const { restrauntName, restrauntAddress, restrauntTiming } =
      req.body;
    const id = req.params.id;

    const post = await Restraunt.findById({ "_id": id })

    console.log(post)
    console.log("hello1")
    // Insert one new `Character` document
    let restUpdate1 = await Restraunt.updateOne({ _id: id }, {
      restrauntName: restrauntName,
      restrauntAddress: restrauntAddress,
      restrauntTiming: restrauntTiming,

    });
    res.json({ restUpdate1 });
    // res.json({ error: "image not found", status: 500 });
    // next()
  }
  else {
    const imagename = req.file.filename;
    const url = `http://localhost:4000/uploads/${imagename}`;

    const { restrauntName, restrauntAddress, restrauntTiming } =
      req.body;
    const id = req.params.id;
    console.log(req.body);

    try {

      let options = { abortEarly: false };
      let { error, value } = await restraunt_validate.validate(req.body, options)
      if (error) {
        throw (error)
      }
      const post = await Restraunt.findById({ "_id": id })
      console.log(post)
      console.log("hello1")
      // Insert one new `Character` document
      let restUpdate = await Restraunt.updateOne({ _id: id }, {
        restrauntName: restrauntName,
        restrauntAddress: restrauntAddress,
        restrauntTiming: restrauntTiming,
        image: url,
      });
      //For image deletion
      // getting image name
      const imgLink = post.image
      console.log("hello")
      console.log(imgLink)
      const removedStr = `http://localhost:4000/uploads/`;
      // getting image name from image link
      const imgName = imgLink.replace(removedStr, "")
      console.log(imgName)



      // getting path to picture
      const imgPath = path.join(__dirname, '../../public/uploads/', imgName)
      console.log(imgPath);

      console.log(fs.unlink)
      fs.unlink(imgPath, (error) => {
        if (error) {
          console.log('error in deleting image')
        }
      })

      // other service call (or same service, different function can go here)
      res.json({ restUpdate });
    } catch (error) {
      console.log(error)
      let errors = {}
      error.details.map(item => {
        errors[item.path] = item.message;
      })

      res.status(400).send({ errors: errors });
    }
  }

};

const particularRestraunt = async (req, res, next) => {
  console.log(req.headers);
  try {

    const particularRestraunt = await Restraunt.find({ "_id": req.params.id.toString() });
    console.log(req.params.id)
    const result = { responseCode: 200, responseMessgae: "Restraunt Data", restrauntData: particularRestraunt };
    res.send(result);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const deleteRestraunt = async (req, res, next) => {

  try {
    // Insert one new `Character` document
    const post = await Restraunt.findById({ "_id": req.params.id })
    const imgLink = post.image
    console.log("hello")
    console.log(imgLink)
    const removedStr = `http://localhost:4000/uploads/`;
    // getting image name from image link
    const imgName = imgLink.replace(removedStr, "")
    console.log(imgName)
    const imgPath = path.join(__dirname, '../../public/uploads/', imgName)
    console.log(imgPath);

    console.log(fs.unlink)
    fs.unlink(imgPath, (error) => {
      if (error) {
        console.log('error in deleting image')
      }
    })


    const deleteRestraunt = await Restraunt.findByIdAndDelete(req.params.id);
    //const 
    const result = { responseCode: 200, responseMessgae: "Restraunt Deleted", deletedRestraunt: deleteRestraunt };
    res.send(result);
  } catch (e) {
    res.sendStatus(400).send({ message: e.message });
  }
};

module.exports = {
  listRestraunts,
  addRestraunt,
  updateRestraunt,
  particularRestraunt,
  deleteRestraunt,
};