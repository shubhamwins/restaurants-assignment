const Restraunt = require("../models/restraunt");
const joi = require("joi");
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
    weekTiming: joi.array().optional(),
    holidayTiming: joi.array().optional(),
  }),
  
  
})


const addRestraunt = async (req, res, next) => {
  const imagename = req.file.filename;
  const url = `http://localhost:4000/uploads/${imagename}`;

  const { restrauntName, restrauntAddress, restrauntTiming } = req.body;
  console.log(req.file);





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
    error.details.map(item => {
      errors[item.path] = item.message;
    })

    res.status(400).send({ errors: errors });
  }
};

const updateRestraunt = async (req, res, next) => {
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
    // Insert one new `Character` document
    let restUpdate = await Restraunt.updateOne({ _id: id }, {
      restrauntName: restrauntName,
      restrauntAddress: restrauntAddress,
      restrauntTiming: restrauntTiming,
      image: url,
    });
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
};

const particularRestraunt = async (req, res, next) => {
  console.log(req.headers);
  try {

    const particularRestraunt = await Restraunt.find({ "_id": req.params.id.toString() });
    console.log(req.params.id)
    const result = {responseCode: 200, responseMessgae:"Restraunt Data", restrauntData: particularRestraunt};
    res.send(result);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const deleteRestraunt = async (req, res, next) => {

  try {
    // Insert one new `Character` document
    const deleteRestraunt = await Restraunt.findByIdAndDelete(req.params.id);
    // if (!req.params.id) {
    //   // other service call (or same service, different function can go here)
    //   return res.status(400).send();
    // }
    const result = {responseCode: 200, responseMessgae:"Restraunt Deleted", deletedRestraunt: deleteRestraunt};
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