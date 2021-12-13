const express = require("express");
const multer = require("multer");

//const upload = multer({dest: 'public/uploads/'});
 
//create disk storage to show the picture
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: storage });
const { addRestraunt , listRestraunts , updateRestraunt, particularRestraunt, deleteRestraunt} = require("../services/restraunt");

const router = express.Router();

router.post("/add",upload.single("image"), addRestraunt);
router.get("/list",listRestraunts);
router.put("/update/:id",upload.single("image"), updateRestraunt);
router.get("/particular/:id",particularRestraunt);
router.delete("/delete/:id",deleteRestraunt);
module.exports = router;