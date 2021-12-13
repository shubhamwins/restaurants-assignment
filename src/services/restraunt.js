const Restraunt = require("../models/restraunt");
const addRestraunt = async (req, res, next) => {
    const { restrauntName, restrauntAddress, restrauntTiming } = req.body;
    console.log(req.body);
    try {
        let restraunt = await Restraunt.create({
            restrauntName: restrauntName,
            restrauntAddress: restrauntAddress,
            restrauntTiming: restrauntTiming,
        //     restrauntopeningTiming: restrauntopeningTiming,
        //     restrauntclosingTiming: restrauntclosingTiming,
         });
        console.log(restraunt)
        res.json({ restraunt });
    }

    catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};
module.exports = {
    addRestraunt,
};