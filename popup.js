document.addEventListener('DOMContentLoaded', () => {
  const shortPromptInput = document.getElementById('shortPrompt');
  const expandButton = document.getElementById('expandButton');
  const resultDiv = document.getElementById('result');

  expandButton.addEventListener('click', () => {
    const shortPrompt = shortPromptInput.value;
    chrome.runtime.sendMessage({ action: "expandPrompt", shortPrompt }, (response) => {
      resultDiv.textContent = response.expandedPrompt;
    });
  });
});