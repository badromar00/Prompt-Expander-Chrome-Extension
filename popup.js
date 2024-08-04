document.addEventListener('DOMContentLoaded', function() {
  const shortPromptTextarea = document.getElementById('shortPrompt');
  const expandButton = document.getElementById('expandButton');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const expandedPromptContainer = document.getElementById('expandedPromptContainer');
  const expandedPromptElement = document.getElementById('expandedPrompt');
  const copyButton = document.getElementById('copyButton');

  expandButton.addEventListener('click', async function() {
      const shortPrompt = shortPromptTextarea.value.trim();
      if (!shortPrompt) {
          alert('Please enter a prompt to expand.');
          return;
      }

      loadingIndicator.classList.remove('hidden');
      expandButton.disabled = true;
      expandedPromptContainer.classList.add('hidden');

      try {
          const response = await chrome.runtime.sendMessage({
              action: "expandPrompt",
              shortPrompt: shortPrompt
          });

          if (response.error) {
              throw new Error(response.error);
          }

          expandedPromptElement.textContent = response.expandedPrompt;
          expandedPromptContainer.classList.remove('hidden');
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while expanding the prompt. Please try again.');
      } finally {
          loadingIndicator.classList.add('hidden');
          expandButton.disabled = false;
      }
  });

  copyButton.addEventListener('click', function() {
      const expandedPrompt = expandedPromptElement.textContent;
      navigator.clipboard.writeText(expandedPrompt).then(function() {
          alert('Expanded prompt copied to clipboard!');
      }, function(err) {
          console.error('Could not copy text: ', err);
      });
  });
});