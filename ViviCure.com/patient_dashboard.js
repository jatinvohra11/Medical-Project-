document.addEventListener('DOMContentLoaded', () => {

    // --- Daily Quote Feature ---
    const quotes = [
        "Health is a state of complete harmony of the body, mind, and spirit.",
        "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.",
        "A healthy outside starts from the inside.",
        "The greatest wealth is health.",
        "Take care of your body. It's the only place you have to live.",
        "An apple a day keeps the doctor away.",
        "The first wealth is health."
    ];
    const quoteElement = document.getElementById('daily-quote');
    // Get a quote based on the day of the year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    quoteElement.textContent = `"${quotes[dayOfYear % quotes.length]}"`;


    // --- Logout Functionality ---
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        // In a real app, you'd clear tokens/session data here.
        // For now, just redirect to the login page.
        window.location.href = 'index.html';
    });


    // --- Chatbot Functionality ---
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const apiKey = ""; // API key is handled by the environment

    const sendMessage = async () => {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        // Display user's message
        appendMessage(userMessage, 'user');
        chatInput.value = '';

        // Display typing indicator
        const typingIndicator = appendMessage('ViviCure Assistant is typing...', 'bot-typing');

        try {
            // Prepare the payload for the Gemini API
            const prompt = `You are a friendly and helpful virtual assistant for ViviCure, a digital healthcare platform. Your role is to assist patients with their non-urgent questions. Do not provide medical advice. If asked for medical advice, gently decline and suggest they consult with one of the specialists. Here is the user's question: "${userMessage}"`;
            
            const payload = {
              contents: [{
                role: "user",
                parts: [{ text: prompt }]
              }]
            };

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            // Make the API call
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const result = await response.json();
            
            let botResponse = 'Sorry, I had trouble understanding that. Could you please rephrase?';
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              botResponse = result.candidates[0].content.parts[0].text;
            }
             
            // Remove typing indicator and display bot's response
            chatWindow.removeChild(typingIndicator);
            appendMessage(botResponse, 'bot');

        } catch (error) {
            console.error('Chatbot API Error:', error);
            chatWindow.removeChild(typingIndicator);
            appendMessage('Sorry, something went wrong. Please try again later.', 'bot');
        }
    };

    // Helper function to add a message to the chat window
    const appendMessage = (message, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        
        const p = document.createElement('p');
        p.textContent = message;
        messageDiv.appendChild(p);

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
        return messageDiv; // Return the element for removal (typing indicator)
    };

    // Event listeners for sending a message
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
