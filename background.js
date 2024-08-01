chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "expandPrompt") {
    const expandedPrompt = expandPrompt(request.shortPrompt);
    sendResponse({ expandedPrompt });
  }
  return true;  // Indicates that the response is sent asynchronously
});

function expandPrompt(shortPrompt) {
  // This is a simple example. You might want to use more sophisticated methods
  // or integrate with an API for better results.
  const expansions = {
    "describe": "Provide a detailed description of",
    "compare": "Compare and contrast the following items, discussing their similarities and differences:",
    "explain": "Explain in depth, providing examples and context for",
  };

  let expandedPrompt = shortPrompt;
  for (const [key, value] of Object.entries(expansions)) {
    expandedPrompt = expandedPrompt.replace(new RegExp(`\\b${key}\\b`, 'gi'), value);
  }

  return expandedPrompt + " Please provide a comprehensive response with specific details and examples.";
}