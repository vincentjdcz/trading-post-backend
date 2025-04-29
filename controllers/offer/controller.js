const { default: mongoose } = require('mongoose');
const Offer = require('../../models/offer/model');

const createOffer = async (req, res) => {
    console.log("In CreateOffer");
    try {
        console.log("In try");
        console.log("req.body", req.body);
        // Convert postId string to a MongoDB ObjectId
        const postId = new mongoose.Types.ObjectId(req.body.postId);

        const offer = new Offer({...req.body, postId: postId})
        console.log("created Offer");
        await offer.save();
        console.log("Saved Offer");
        res.status(201).json({message: "Offer created successfully"})
    } catch (error) {
        console.error("Error creating offer:", error); // Log full error
        res.status(500).json({error: error.message})
    }
   
}

const getAllOffersForPost = async (req, res) => {
    try {
        const postId = req.params.postId;
    if(!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({error: "Invalid postId"});

    }
    const offers = await Offer.find({postId: new mongoose.Types.ObjectId(postId)});
    res.status(200).json(offers);
    } catch(error) {
        console.error("Error fetching offers: ", error);
        res.status(500).json({error: error.message});
    }
    
};

const getOffer = async (req, res) => {
    console.log("Searching for offer..");
    try {
        const offerId = req.params.offerId;
        if(!mongoose.Types.ObjectId.isValid(offerId)) {
            return res.status(400).json({error: "Invalid offerId"});
        }
        const offer = await Offer.findById(offerId).populate("postId", "cardName userId userName");
        res.status(200).json(offer);
    } catch(error) {
        console.error("Error getching offer: ", error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {createOffer, getAllOffersForPost, getOffer}