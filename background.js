chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "expandPrompt") {
    expandPrompt(request.shortPrompt)
      .then(expandedPrompt => sendResponse({ expandedPrompt }))
      .catch(error => sendResponse({ error: error.message }));
    return true;  // Indicates that the response is sent asynchronously
  }
});

async function expandPrompt(shortPrompt) {
  const OPENAI_API_KEY = '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';
  const modelIdentifier = 'gpt-3.5-turbo';

  // Basic validation
  if (!OPENAI_API_KEY) throw new Error('API key is missing.');
  if (!modelIdentifier) throw new Error('Model identifier is missing.');
  if (!shortPrompt) throw new Error('Prompt is missing.');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: modelIdentifier,
      messages: [
        { role: "system", content: "You are a helpful assistant that expands short prompts into more detailed and descriptive ones. Do not answer the prompt. Give me a detailed and more descriptive prompt instead" },
        { role: "user", content: `Expand the following prompt: ${shortPrompt}` }
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`API Error (${response.status}):`, errorBody);
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}