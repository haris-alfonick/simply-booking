
const Contact = require('../models/Contect')
exports.createContact = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;

        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contact = await Contact.create({ fullName, email, subject, message });

        res.status(201).json({
            message: "Message submitted successfully",
            contact,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
