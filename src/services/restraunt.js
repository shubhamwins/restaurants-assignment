const Restraunt = require("../models/restraunt");
const listRestraunts = async (req, res, next) => {
    //   const { user, content } = req.body;
    try {
      // other servic
      let restraunts = [];
  
      // call database for getting users list
  
      restraunts = await Restraunt.find({ isActive: true });
      //restraunts = await Restraunt.find({ status: RolesEnum.ACTIVE });
      res.json({ restraunts });
    } catch (err) {
      //console.log(e.message);
      res.sendStatus(500) && next(err);
    }
  
  };
const addRestraunt = async (req, res, next) => {
     const imagename = req.file.filename;
     const url = `http://localhost:4000/uploads/${imagename}`;

    const { restrauntName, restrauntAddress, restrauntTiming } = req.body;
    console.log(req.file);
    
    try {
        let restraunt = await Restraunt.create({
            restrauntName: restrauntName,
            restrauntAddress: restrauntAddress,
            restrauntTiming: restrauntTiming,
            image: url,
      
         });
        console.log(restraunt)
        res.json({ restraunt });
    }

    catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

const updateRestraunt = async (req, res, next) => {
    const imagename = req.file.filename;
     const url = `http://localhost:4000/uploads/${imagename}`;

    const { restrauntName , restrauntAddress , restrauntTiming  } =
      req.body;
    console.log(req.body);
    try {
      // Insert one new `Character` document
      let restUpdate = await Restraunt.updateOne({
        restrauntName: restrauntName,
        restrauntAddress: restrauntAddress,
        restrauntTiming: restrauntTiming,
        image: url,      });
      // other service call (or same service, different function can go here)
      res.json({ restUpdate });
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500) && next(e);
    }
  };

  const particularRestraunt = async (req,res,next) => {
    console.log(req.headers);
    try{
   const particularRestraunt = await Restraunt.findById(req.params.id);
   if(!req.params.id){
     return res.status(400).send();
   }
   res.send(particularRestraunt);
 } catch(e) {
   res.sendStatus(500)  && next(e);
 }
 };

 const deleteRestraunt = async (req, res, next) => {
    console.log(req.headers);
    try {
      // Insert one new `Character` document
      const deleteRestraunt = await Restraunt.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        // other service call (or same service, different function can go here)
        return res.status(400).send();
      }
      res.send(deleteRestraunt);
    } catch (e) {
      res.sendStatus(500) && next(e);
    }
    };
  
module.exports = {
    listRestraunts,
    addRestraunt,
    updateRestraunt,
    particularRestraunt,
    deleteRestraunt,
};