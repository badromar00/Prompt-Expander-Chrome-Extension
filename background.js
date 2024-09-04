chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "expandPrompt") {
    expandPrompt(request.shortPrompt)
      .then(expandedPrompt => sendResponse({ expandedPrompt }))
      .catch(error => sendResponse({ error: error.message }));
    return true;  // Indicates that the response is sent asynchronously
  }
});

async function expandPrompt(shortPrompt) {

  const OPENAI_API_KEY = 'API KEY';
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
        { role: "system", content: "You are an expert prompt engineer specializing in expanding and enhancing user prompts to optimize LLM output. Your task is to take short, simple prompts and transform them into detailed, nuanced instructions that will elicit high-quality responses from language models. Follow these guidelines: 1. Analyze the core intent of the original prompt. 2. Expand on key concepts, adding relevant context and background information.3. Incorporate specific instructions for desired output format, length, or style.4. Include relevant constraints or parameters to focus the LLM's response.5. Add prompts for creative or unique perspectives when appropriate.6. Ensure the expanded prompt is clear, coherent, and free of ambiguity.7. Tailor the language and complexity to the presumed target LLM.8. Include instructions for the LLM to explain its reasoning or provide examples when relevant.9. Anticipate potential misunderstandings and preemptively address them.10. Encourage comprehensive and well-structured responses from the LLM.Remember, your role is solely to expand and enhance the given prompt. Do not attempt to answer or fulfill the prompt itself. Provide only the improved, expanded version of the original prompt." },
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
