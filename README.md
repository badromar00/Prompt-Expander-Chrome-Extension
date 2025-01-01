# Prompt Expander Chrome Extension

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fjppghndledbflnfchbckhokienfhfkg)](https://chromewebstore.google.com/detail/prompt-expander/fjppghndledbflnfchbckhokienfhfkg)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/fjppghndledbflnfchbckhokienfhfkg)](https://chromewebstore.google.com/detail/prompt-expander/fjppghndledbflnfchbckhokienfhfkg)

Prompt Expander helps you turn short, simple prompts into detailed questions when working with AI language models like ChatGPT. Instead of struggling to write the perfect prompt, just type a basic idea and let the extension expand it into a clear, complete question that will get you better answers.

[🚀 Install from Chrome Web Store](https://chromewebstore.google.com/detail/prompt-expander/fjppghndledbflnfchbckhokienfhfkg)

## Features

- **Smart Prompt Expansion**: Transforms short prompts into detailed, context-rich queries
- **Customizable Word Count**: Choose between 50, 100, or 150 words for expanded prompts
- **History Management**: Save and access your previous prompts
- **One-Click Copy**: Easily copy expanded prompts to clipboard
- **User-Friendly Interface**: Clean and intuitive design

## Technology Stack

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Chrome Extension APIs

- **Backend**:
  - OpenAI API
  - Fine-tuned GPT model

- **Development Tools**:
  - Chrome Extension Manifest V3
  - Axios for API requests
  - Chrome Storage API for data persistence

## Model Training

The extension uses a custom fine-tuned GPT model specifically trained for prompt expansion. The training process involved:

1. **Data Preparation**: 
   - Created a dataset of short prompts and their expanded versions
   - Formatted data into JSONL format for OpenAI's fine-tuning API
   - Implemented systematic prompt engineering principles

2. **Fine-Tuning**:
   - Used OpenAI's fine-tuning API
   - Optimized for prompt expansion tasks
   - Trained on diverse topics and writing styles

3. **Model Evaluation**:
   - Tested on various prompt types
   - Validated output quality and consistency
   - Iteratively improved based on results

## Installation

1. Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/prompt-expander/fjppghndledbflnfchbckhokienfhfkg)
2. Click "Add to Chrome"
3. Follow the installation prompts
4. The extension icon will appear in your Chrome toolbar

## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter your short prompt in the text area
3. Select desired word count (50, 100, or 150 words)
4. Click "Expand Prompt"
5. Copy the expanded prompt using the "Copy to Clipboard" button

## Benefits

- **Time-Saving**: Quickly generate detailed prompts without manual refinement
- **Improved Accuracy**: Get better responses from LLMs with more detailed queries
- **Consistency**: Maintain high-quality prompt structure across different topics
- **Learning Tool**: Understand effective prompt engineering principles
- **Productivity**: Streamline your workflow with LLMs

## Technical Details

### Storage
- Uses Chrome's local storage API for saving prompt history
- Implements efficient data management for optimal performance

### API Integration
- Secure communication with OpenAI's API
- Robust error handling and response management
- Rate limiting and quota management

### Security
- No data collection or third-party sharing
- Local storage of user preferences and history
- Secure API key management

## Development

To set up the development environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/badromar00/Prompt-Expander-Chrome-Extension.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
