const express = require('express')
const router = express.Router()
const protect = require('../middlewares/authmiddleware')
const Client = require('../models/Client')

router.get('/', protect, async (req, res) => {
    const clients = Client.find({ createdBy: req.user.userId })
    res.send(clients)
})

router.post('/', protect, async (req, res) => {
    const { name, email, phone, company, status, notes } = req.body;
    const newClient = new Client.save({ name, email, phone, company, status, notes, createdBy: req.user.userId })
    await newClient.save()
    res.json(newClient)
})

router.get('/:id', protect, (req, res) => {
    const id = req.params.id
    const client = await Client.findById(id);

    if (!client) {
        return res.status(404).send("Client not found")
    } else {
        res.json(client)
    }
})

router.put('/:id', protect, async(req,res)=>{
    const update = req.body;
    const id = req.params.id;
    const updatedClient = await Client.findByIdAndUpdate(id,update,{new:true})
    res.json(client)
})

router.delete('/:id', protect, async(req,res)=>{
    const id = req.params.id;
    await Client.findByIdAndDelete(id);
    res.json("Client Deleted")
})

module.exports = router;