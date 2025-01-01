document.addEventListener('DOMContentLoaded', function() {
    const shortPromptTextarea = document.getElementById('shortPrompt');
    const expandButton = document.getElementById('expandButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const expandedPromptContainer = document.getElementById('expandedPromptContainer');
    const expandedPromptElement = document.getElementById('expandedPrompt');
    const copyButton = document.getElementById('copyButton');
    const previousPromptsList = document.getElementById('previousPromptsList');
    
    // Load previous prompts when popup opens
    loadPreviousPrompts();
  
    // Event listener for the Expand Button
    expandButton.addEventListener('click', async function() {
        const shortPrompt = shortPromptTextarea.value.trim();
        const wordCount = document.querySelector('input[name="wordCount"]:checked').value;  // Get selected word count from radio buttons
        
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
                shortPrompt: shortPrompt,
                wordCount: wordCount 
            });
  
            if (response.error) {
                throw new Error(response.error);
            }
  
            const expandedPrompt = response.expandedPrompt;
            expandedPromptElement.textContent = expandedPrompt;
            expandedPromptContainer.classList.remove('hidden');
  
            // Save the new prompt
            savePrompt(shortPrompt, expandedPrompt);
  
            // Refresh the list of previous prompts
            loadPreviousPrompts();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while expanding the prompt. Please try again.');
        } finally {
            loadingIndicator.classList.add('hidden');
            expandButton.disabled = false;
        }
    });
  
    // Copy expanded prompt to clipboard
    copyButton.addEventListener('click', function() {
        const expandedPrompt = expandedPromptElement.textContent;
        navigator.clipboard.writeText(expandedPrompt).then(function() {
            alert('Expanded prompt copied to clipboard!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    });
  
    // Load previous prompts from storage
    previousPromptsList.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === "LI") {
            const promptData = JSON.parse(e.target.dataset.prompt);
            shortPromptTextarea.value = promptData.short;
            expandedPromptElement.textContent = promptData.expanded;
            expandedPromptContainer.classList.remove('hidden');
        }
    });
  });
  
  function savePrompt(shortPrompt, expandedPrompt) {
    chrome.storage.local.get({prompts: []}, function(result) {
        let prompts = result.prompts;
        prompts.unshift({short: shortPrompt, expanded: expandedPrompt, timestamp: Date.now()});
        // Keep only the latest 10 prompts
        prompts = prompts.slice(0, 10);
        chrome.storage.local.set({prompts: prompts});
    });
  }
  
  function loadPreviousPrompts() {
    chrome.storage.local.get({prompts: []}, function(result) {
        const prompts = result.prompts;
        previousPromptsList.innerHTML = '';
        prompts.forEach(function(prompt) {
            const li = document.createElement('li');
            li.textContent = prompt.short;
            li.title = 'Click to load this prompt';
            li.dataset.prompt = JSON.stringify(prompt);
            previousPromptsList.appendChild(li);
        });
    });
  }
  