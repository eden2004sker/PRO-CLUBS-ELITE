const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/proclubs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Contract Schema
const contractSchema = new mongoose.Schema({
  playerName: String,
  clubName: String,
  startDate: Date,
  endDate: Date,
  salary: Number,
  clauses: String,
  createdAt: { type: Date, default: Date.now }
});

const Contract = mongoose.model('Contract', contractSchema);

// Create Contract
app.post('/contracts/create', async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.json({ message: 'Contract created', contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Contracts
app.get('/contracts', async (req, res) => {
  const contracts = await Contract.find();
  res.json(contracts);
});

// Delete Contract
app.delete('/contracts/:id', async (req, res) => {
  await Contract.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contract deleted' });
});

// Serve Frontend
app.get('/', (req, res) => {
  res.send(`
    <form id="contractForm">
      <input type="text" name="playerName" placeholder="Player Name" required />
      <input type="text" name="clubName" placeholder="Club Name" required />
      <input type="date" name="startDate" required />
      <input type="date" name="endDate" required />
      <input type="number" name="salary" placeholder="Salary" required />
      <textarea name="clauses" placeholder="Contract Clauses"></textarea>
      <button type="submit">Create Contract</button>
    </form>
    <script>
      document.getElementById('contractForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch('/contracts/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);
      });
    </script>
  `);
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));