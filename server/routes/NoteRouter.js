const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/Auth');
const Note = require('../models/Note');

// ✅ Create a new note
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const note = new Note({
            title,
            content,
            user: req.user._id
        });

        await note.save();

        res.status(201).json({ message: 'Note created successfully', note });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ✅ Get all notes for the logged-in user
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ✅ (Optional) Get a single note by ID
router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ✅ (Optional) Update a note
router.put('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });

        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ✅ (Optional) Delete a note
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!deleted) return res.status(404).json({ message: 'Note not found' });

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
