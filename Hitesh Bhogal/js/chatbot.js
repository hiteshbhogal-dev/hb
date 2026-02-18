// AI Chatbot using Google Gemini API (Free)
// This chatbot answers questions about Hitesh Bhogal and marketing jargon

const GEMINI_API_KEY = 'AIzaSyDzFDl5eE_z3YfJ5iVNzqKqVRj-CqEr0Jc'; // Free tier API key - User should replace with their own

// Hitesh Bhogal's Professional Information
const HITESH_CONTEXT = `
You are an AI assistant for Hitesh Bhogal's professional portfolio. Here is information about him:

PROFESSIONAL SUMMARY:
Hitesh Bhogal is a Growth Marketing Visionary and AI-Native Strategist with 12+ years of experience driving digital transformation and brand innovation across MENA's insurance and tech sectors.

CURRENT ROLE:
- Position: Group Marketing Manager at Nexus Insurance Brokers (2023 - Present)
- Achievements: 154% YoY LinkedIn Growth, 3,400+ New Followers, 10,900+ Newsletter Subscribers, 159% Facebook Engagement, 265% Instagram Growth

PREVIOUS EXPERIENCE:
- Senior Marketing Specialist at SALAMA - Islamic Arab Insurance (2016-2023)
  * 50% Online Sales Boost
  * 30% Brand Recognition Increase
  * 20,000+ Qualified Leads/Year
  * Managed AED 2.1M in ad spend
  
- System Engineer at Infosys (2011-2013)
  * Built technical foundation with SIEBEL CRM
  * Full software development lifecycle experience

EDUCATION:
- SP Jain School of Global Management - Global Business Mindset
- Infosys - Technical Foundation

TRUSTED BY ORGANIZATIONS:
- Nexus Insurance Brokers
- SALAMA - Islamic Arab Insurance
- Infosys
- Stevie Awards
- SP Jain School of Global Management
- Nexus Wealth Management (NWM DIFC)
- GIGICO

EXPERTISE:
1. Growth Marketing: Performance-driven campaigns, SEO, SEM, conversion optimization, data analytics
2. AI-Native Strategy: Leveraging AI tools and automation to scale marketing operations
3. Brand Innovation: Building memorable brand experiences through creative storytelling
4. Digital Transformation: Leading fintech/insurtech integrations and digital product launches

RECOGNITION:
- Stevie® Awards Judge: Chair of Marketing, Media & Social Media Awards panel
- Best Digital Campaign Award: SALAMA Kind Beings of Dubai campaign
- Multiple Employee of the Month recognitions

KEY ACHIEVEMENTS:
- 12+ years of experience
- 154% YoY Growth metrics
- 20,000+ Qualified Leads Generated
- Managed AED 2.1M+ in advertising spend
- Led 360° campaigns increasing online sales by 50%

CONTACT:
- Email: hitesh.bhogal@gmail.com
- LinkedIn: linkedin.com/in/hitesh-bhogal
- Phone: +971 56 695 1976

When answering questions:
1. If asked about Hitesh, provide accurate information from above
2. If asked about marketing jargon or concepts, explain them clearly and professionally
3. Be helpful, professional, and concise
4. If you don't have specific information about Hitesh, acknowledge it honestly
`;

class AIChatbot {
    constructor() {
        this.messages = [];
        this.isOpen = false;
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatUI();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatUI() {
        // Create chat container
        const chatHTML = `
            <div id="ai-chatbot-container" class="chatbot-closed">
                <!-- Chat Button -->
                <button id="chat-toggle-btn" class="chat-toggle-btn" aria-label="Toggle AI Assistant">
                    <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span class="chat-badge">AI</span>
                </button>

                <!-- Chat Window -->
                <div id="chat-window" class="chat-window">
                    <!-- Chat Header -->
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                            </div>
                            <div>
                                <div class="chat-title">AI Assistant</div>
                                <div class="chat-status">
                                    <span class="status-dot"></span>
                                    Online
                                </div>
                            </div>
                        </div>
                        <button id="chat-close-btn" class="chat-close-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Chat Messages -->
                    <div id="chat-messages" class="chat-messages"></div>

                    <!-- Chat Input -->
                    <div class="chat-input-container">
                        <div class="chat-suggestions" id="chat-suggestions">
                            <button class="suggestion-chip">Tell me about Hitesh</button>
                            <button class="suggestion-chip">What is Growth Marketing?</button>
                            <button class="suggestion-chip">His achievements</button>
                        </div>
                        <div class="chat-input-wrapper">
                            <input 
                                type="text" 
                                id="chat-input" 
                                class="chat-input" 
                                placeholder="Ask about Hitesh or marketing..." 
                                maxlength="500"
                            />
                            <button id="chat-send-btn" class="chat-send-btn" aria-label="Send message">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chat-toggle-btn');
        const closeBtn = document.getElementById('chat-close-btn');
        const sendBtn = document.getElementById('chat-send-btn');
        const input = document.getElementById('chat-input');
        const suggestions = document.querySelectorAll('.suggestion-chip');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isTyping) {
                this.sendMessage();
            }
        });

        suggestions.forEach(chip => {
            chip.addEventListener('click', (e) => {
                input.value = e.target.textContent;
                this.sendMessage();
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('ai-chatbot-container');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        
        if (this.isOpen) {
            container.classList.remove('chatbot-closed');
            container.classList.add('chatbot-open');
            toggleBtn.classList.add('active');
            document.getElementById('chat-input').focus();
        } else {
            container.classList.remove('chatbot-open');
            container.classList.add('chatbot-closed');
            toggleBtn.classList.remove('active');
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            role: 'assistant',
            content: `👋 Hi! I'm Hitesh's AI assistant. I can help you learn about his experience, achievements, and answer marketing questions. What would you like to know?`
        };
        this.addMessage(welcomeMsg);
    }

    addMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${message.role}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${this.formatMessage(message.content)}
            </div>
            <div class="message-time">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push(message);
    }

    formatMessage(content) {
        // Convert markdown-style formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '<br>• ');
    }

    addTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message assistant typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage({ role: 'user', content: message });
        input.value = '';
        
        // Hide suggestions after first message
        const suggestions = document.getElementById('chat-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
        
        // Show typing indicator
        this.isTyping = true;
        this.addTypingIndicator();
        
        try {
            const response = await this.getAIResponse(message);
            this.removeTypingIndicator();
            this.addMessage({ role: 'assistant', content: response });
        } catch (error) {
            console.error('Chatbot error:', error);
            this.removeTypingIndicator();
            this.addMessage({ 
                role: 'assistant', 
                content: 'Sorry, I encountered an error. Please try again or contact Hitesh directly at hitesh.bhogal@gmail.com' 
            });
        }
        
        this.isTyping = false;
    }

    async getAIResponse(userMessage) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${HITESH_CONTEXT}\n\nUser Question: ${userMessage}\n\nProvide a helpful, professional, and concise response (max 150 words).`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 300,
                    }
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;
            return aiResponse;
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to basic responses if API fails
            return this.getFallbackResponse(userMessage);
        }
    }

    getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hitesh') || lowerMessage.includes('about') || lowerMessage.includes('who')) {
            return `Hitesh Bhogal is a Growth Marketing Visionary with 12+ years of experience. Currently Group Marketing Manager at Nexus Insurance Brokers, he's an AI-Native Strategist who has achieved 154% YoY growth, generated 20,000+ leads, and managed AED 2.1M in ad spend. He's also a Stevie® Awards Judge.`;
        }
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return `Hitesh has worked at Nexus Insurance Brokers (2023-Present), SALAMA Insurance (2016-2023), and Infosys (2011-2013). He's driven significant growth: 154% YoY LinkedIn growth, 50% online sales boost, and 30% brand recognition increase.`;
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return `You can reach Hitesh at:\n📧 Email: hitesh.bhogal@gmail.com\n💼 LinkedIn: linkedin.com/in/hitesh-bhogal\n📱 Phone: +971 56 695 1976`;
        }
        
        if (lowerMessage.includes('marketing') || lowerMessage.includes('growth')) {
            return `Growth Marketing focuses on data-driven experimentation across marketing channels to rapidly grow a business. Hitesh specializes in performance campaigns, SEO, SEM, conversion optimization, and AI-native strategies to achieve measurable results.`;
        }
        
        if (lowerMessage.includes('achievement') || lowerMessage.includes('award')) {
            return `Hitesh's achievements include:\n• Stevie® Awards Judge (Marketing panel chair)\n• Best Digital Campaign Award\n• 154% YoY Growth\n• 20,000+ Qualified Leads Generated\n• Multiple Employee of the Month awards`;
        }
        
        return `I can help you learn about Hitesh Bhogal's professional experience, achievements, and marketing expertise. Ask me about his work history, skills, or marketing concepts!`;
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AIChatbot());
} else {
    new AIChatbot();
}
