// app.js - Complete Node.js file with integrated front-end and back-end

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Serve static files (CSS, JS) for the front-end
app.use(express.static('public'));

// Serve the HTML form directly from a string
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Career Data Form</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 900px;
          margin: 30px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #333;
          font-size: 28px;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          font-size: 16px;
          color: #555;
        }
        input[type="text"], input[type="number"], input[type="email"], select, textarea {
          width: 100%;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          margin-top: 5px;
        }
        input[type="submit"] {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          margin-top: 10px;
        }
        input[type="submit"]:hover {
          background-color: #45a049;
        }
        .row {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }
        .col {
          flex: 1;
        }
        textarea {
          height: 100px;
        }
        .form-header {
          font-weight: bold;
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Career Data Input Form</h1>
        <form id="careerForm" action="/get-recommendation" method="POST">
          <div class="form-group">
            <label for="name">What is your name?</label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="gender">What is your gender?</label>
            <select id="gender" name="gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="course">What was your course in UG?</label>
            <input type="text" id="course" name="course" required>
          </div>

          <div class="form-group">
            <label for="specialization">What is your UG specialization (Major Subject)?</label>
            <input type="text" id="specialization" name="specialization" required>
          </div>

          <div class="form-group">
            <label for="interests">What are your interests?</label>
            <textarea id="interests" name="interests" required></textarea>
          </div>

          <div class="form-group">
            <label for="skills">What are your skills? (Select multiple if necessary)</label>
            <input type="text" id="skills" name="skills" required>
          </div>

          <div class="form-group">
            <label for="cgpa">What was the average CGPA or Percentage obtained in undergraduation?</label>
            <input type="number" id="cgpa" name="cgpa" required>
          </div>

          <div class="form-group">
            <label for="certifications">Did you do any certification courses additionally?</label>
            <select id="certifications" name="certifications" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div class="form-group">
            <label for="certificate_course">If yes, please specify your certificate course title:</label>
            <input type="text" id="certificate_course" name="certificate_course">
          </div>

          <div class="form-group">
            <label for="working_status">Are you working?</label>
            <select id="working_status" name="working_status" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div class="form-group">
            <label for="job_title">If yes, what is/was your first job title in your current field of work?</label>
            <input type="text" id="job_title" name="job_title">
          </div>

          <div class="form-group">
            <label for="masters">Have you done masters after undergraduation?</label>
            <select id="masters" name="masters" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div class="form-group">
            <label for="masters_field">If yes, mention your field of masters:</label>
            <input type="text" id="masters_field" name="masters_field">
          </div>

          <input type="submit" value="Submit">
        </form>

        <div id="recommendation" style="display: none;">
          <h2>Career Recommendation:</h2>
          <p id="recommendationText"></p>
        </div>
      </div>

      <script>
        // Handle form submission via AJAX
        const form = document.getElementById('careerForm');
        form.onsubmit = async function(event) {
          event.preventDefault(); // Prevent form from submitting the traditional way

          // Collect form data
          const formData = new FormData(form);

          // Send the form data to the server
          const response = await fetch('/get-recommendation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
          });

          const result = await response.json();

          // Show the recommendation on the page
          document.getElementById('recommendation').style.display = 'block';
          document.getElementById('recommendationText').innerText = result.recommendation;
        };
      </script>
    </body>
    </html>
  `);
});

// Replace with your own OpenAI API key
const OPENAI_API_KEY = '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';

// Route to handle form submission and send data to ChatGPT
app.post('/get-recommendation', async (req, res) => {
  const userData = req.body;  // Get user data from the form submission

  // Create the prompt for ChatGPT based on the user's data
  const prompt = `
  Based on the following user data, provide a career recommendation:
  Name: ${userData.name}
  Gender: ${userData.gender}
  UG Course: ${userData.course}
  Specialization: ${userData.specialization}
  Interests: ${userData.interests}
  Skills: ${userData.skills}
  CGPA/Percentage: ${userData.cgpa}
  Certification Courses: ${userData.certifications}
  Job Title: ${userData.job_title}
  Master's Degree: ${userData.masters_field}

  Recommendation:
  `;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Send the recommendation back to the client
    res.json({ recommendation: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({ error: 'Something went wrong while fetching recommendation' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
