const Spots = require("../models/spots");

const create = async (req, res) => {
    try {
        const fields = req.fields;
        const files = req.files;
        let spot = new Spots(fields);
        spot.postedBy = req.user._id;
        if (files.image) {
            spot.image.data = fs.readFileSync(files.image.path);
            spot.image.contentType = files.image.type;
        }
        spot.save((err, result) => {
            if (err) {
                console.log("saving spot err => ", err);
                res.status(400).send("Creating Spot");
            }
            res.status(200).json(result);
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
}
exports.create = create;