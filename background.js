chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "expandPrompt") {
    expandPrompt(request.shortPrompt, request.wordCount)
      .then(expandedPrompt => sendResponse({ expandedPrompt }))
      .catch(error => sendResponse({ error: error.message }));
    return true;  // Indicates that the response is sent asynchronously
  }
});

async function expandPrompt(shortPrompt, wordCount) {
  const OPENAI_API_KEY = '';
  const modelIdentifier = '';

  // Basic validation
  if (!OPENAI_API_KEY) throw new Error('API key is missing.');
  if (!modelIdentifier) throw new Error('Model identifier is missing.');
  if (!shortPrompt) throw new Error('Prompt is missing.');

  // Estimate max tokens based on word count (1 word ≈ 1.5 tokens)
  const tokenCount = Math.floor(wordCount * 1.5); 

  let expandedPrompt = '';
  let isComplete = false;

  while (!isComplete) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: modelIdentifier,
        messages: [
          { role: "system", content: `You are an expert prompt engineer specializing in expanding and enhancing user prompts to optimize LLM output. Your task is to take short, simple prompts and transform them into detailed, nuanced instructions that will elicit high-quality responses from language models in approximately ${wordCount} words. Follow these guidelines: ...` },
          { role: "user", content: `Expand the following prompt: ${shortPrompt}` }
        ],
        temperature: 0.7,
        max_tokens: tokenCount,  // Use the calculated token count
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
    expandedPrompt += data.choices[0].message.content.trim();

    // Check if the expanded prompt ends with a full sentence
    if (/[.!?]$/.test(expandedPrompt)) {
      isComplete = true;
    } else {
      shortPrompt = '';  // Continue the prompt without adding more context
    }
  }

  return expandedPrompt;
}
