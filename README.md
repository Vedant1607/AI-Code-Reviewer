# 🤖 AI Code Reviewer

An intelligent, AI-powered code review tool that provides instant feedback on your code quality, security, performance, and readability. Built with modern web technologies and powered by Claude AI.

## ✨ Features

- **🔍 Instant Code Analysis**: Get real-time, comprehensive code reviews
- **🎯 Multi-aspect Feedback**: Receives feedback on correctness, security, performance, and readability
- **💻 Interactive Code Editor**: Built-in syntax-highlighted editor with monospace font support
- **📝 Markdown-Formatted Reviews**: Beautifully formatted review output with syntax highlighting
- **🔒 Secure Backend**: Rate limiting, CORS protection, and Helmet.js security headers
- **⚡ Fast & Responsive**: Built with React and Vite for optimal performance

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **Code Editor**: react-simple-code-editor with PrismJS syntax highlighting
- **Markdown Rendering**: react-markdown with rehype-highlight for code blocks
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express
- **AI Integration**: OpenAI API (using Claude Sonnet 4.5 model via OpenRouter)
- **Security**: Helmet.js, CORS, express-rate-limit
- **Architecture**: MVC pattern with controllers, routes, and services

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenRouter API key (or Google AI API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vedant1607/AI-Code-Reviewer.git
   cd AI-Code-Reviewer
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   # OR
   GOOGLE_API_KEY=your_google_api_key_here
   
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📖 Usage

1. Open the application in your browser
2. Paste or write your code in the left editor panel
3. Click the **Review** button
4. View the AI-generated code review in the right panel

The AI reviewer analyzes your code and provides:
- **Correctness**: Logic errors and bugs
- **Security**: Potential vulnerabilities
- **Performance**: Optimization opportunities
- **Readability**: Code style and maintainability suggestions

## 🔧 API Endpoints

### POST `/ai/get-review`
Submit code for review

**Request Body:**
```json
{
  "code": "your code here"
}
```

**Response:**
```json
{
  "review": "AI-generated review in markdown format"
}
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Request Size Limits**: 10MB max payload
- **Security Headers**: Helmet.js protection
- **Input Validation**: Required code validation

## 🎨 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite, TailwindCSS |
| Backend | Node.js, Express |
| AI Model | Claude Sonnet 4.5 (via OpenRouter) |
| Editor | react-simple-code-editor, PrismJS |
| Styling | TailwindCSS, GitHub Dark theme |
| Security | Helmet, CORS, Rate Limiting |

## 📁 Project Structure

```
AI-Code-Reviewer/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (AI integration)
│   │   └── app.js           # Express app configuration
│   ├── server.js            # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main component
│   │   ├── App.css          # Styles
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 🔮 Future Enhancements

- [ ] Support for multiple programming languages
- [ ] Save and share code reviews
- [ ] Compare code versions
- [ ] Integration with GitHub/GitLab
- [ ] Custom review templates
- [ ] Dark/Light theme toggle

## 👨‍💻 Author

**Vedant Patel** - [GitHub](https://github.com/Vedant1607)

---

⭐ If you find this project useful, please consider giving it a star!
