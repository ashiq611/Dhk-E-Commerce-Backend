const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Dummy data representing messages and users
let messages = [
  { id: 1, text: "Message 1", userId: 1 },
  { id: 2, text: "Message 2", userId: 2 },
  // More messages...
];

// Middleware for parsing JSON body
app.use(bodyParser.json());

// Route for updating a message
app.put("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const { text } = req.body;
  const userId = req.user.id; // Assuming user ID is stored in req.user

  // Find the message by ID
  const messageIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  const message = messages[messageIndex];

  // Check if the user is authorized to update the message
  if (message.userId !== userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Update the message text
  messages[messageIndex].text = text;
  res.json({ message: "Message updated successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
