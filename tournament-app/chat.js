// ==========================================
// REAL-TIME CHAT & COLLABORATION SYSTEM
// ==========================================

class ChatSystem {
    constructor() {
        this.messages = new Map();
        this.activeUsers = new Set();
        this.typingUsers = new Map();
        this.chatRooms = new Map();
        this.emojiPicker = null;
        this.init();
    }

    init() {
        this.createChatInterface();
        this.setupEventListeners();
        this.initializeEmojiPicker();
        this.startHeartbeat();
        this.loadChatHistory();
    }

    createChatInterface() {
        if (document.getElementById('chat-system')) return;

        const chatHTML = `
            <div id="chat-system" class="fixed bottom-4 right-4 z-50">
                <!-- Chat Toggle Button -->
                <button id="chat-toggle" class="chat-toggle-btn bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <span id="unread-badge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                </button>

                <!-- Chat Window -->
                <div id="chat-window" class="chat-window hidden">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-80 h-96 flex flex-col">
                        <!-- Chat Header -->
                        <div class="chat-header bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                            <div class="flex items-center space-x-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="font-semibold">Tournament Chat</span>
                                <span id="online-count" class="text-xs opacity-75">(0 online)</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button id="chat-settings" class="hover:bg-blue-700 p-1 rounded">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </button>
                                <button id="chat-minimize" class="hover:bg-blue-700 p-1 rounded">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Active Users -->
                        <div id="active-users" class="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b">
                            <div class="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                                <span>Active:</span>
                                <div id="user-avatars" class="flex space-x-1"></div>
                            </div>
                        </div>

                        <!-- Messages Area -->
                        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
                            <div class="text-center text-gray-500 text-sm py-4">
                                Welcome to Tournament Chat! 🏆
                            </div>
                        </div>

                        <!-- Typing Indicator -->
                        <div id="typing-indicator" class="px-4 py-2 text-xs text-gray-500 italic hidden">
                            Someone is typing...
                        </div>

                        <!-- Message Input -->
                        <div class="chat-input border-t bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                            <div class="flex items-center space-x-2">
                                <button id="emoji-btn" class="text-gray-400 hover:text-gray-600 p-1 rounded">
                                    😊
                                </button>
                                <div class="flex-1 relative">
                                    <input 
                                        id="message-input" 
                                        type="text" 
                                        placeholder="Type a message..." 
                                        class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        maxlength="500"
                                    />
                                    <span id="char-count" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">500</span>
                                </div>
                                <button id="send-btn" class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Emoji Picker -->
                <div id="emoji-picker" class="emoji-picker hidden absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 w-64">
                    <div class="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
                        ${this.generateEmojiGrid()}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
        this.applyChatStyles();
    }

    generateEmojiGrid() {
        const emojis = [
            '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
            '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
            '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
            '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
            '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
            '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
            '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
            '🏆', '🥇', '🥈', '🥉', '🎯', '🎪', '🎨', '🎭'
        ];

        return emojis.map(emoji => 
            `<button class="emoji-btn hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded text-lg" data-emoji="${emoji}">${emoji}</button>`
        ).join('');
    }

    applyChatStyles() {
        const styles = `
            <style>
                .chat-toggle-btn {
                    animation: pulse 2s infinite;
                }
                
                .chat-window {
                    animation: slideInUp 0.3s ease-out;
                }
                
                .chat-window.hidden {
                    animation: slideOutDown 0.3s ease-in;
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideOutDown {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                }
                
                .message-bubble {
                    max-width: 80%;
                    word-wrap: break-word;
                }
                
                .message-sent {
                    margin-left: auto;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .message-received {
                    background: white;
                    border: 1px solid #e5e7eb;
                }
                
                .typing-dots {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background-color: #9ca3af;
                    animation: typing 1.4s infinite ease-in-out;
                }
                
                .typing-dots:nth-child(1) { animation-delay: -0.32s; }
                .typing-dots:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes typing {
                    0%, 80%, 100% {
                        transform: scale(0);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                .user-avatar {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    setupEventListeners() {
        // Toggle chat window
        document.getElementById('chat-toggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // Minimize chat
        document.getElementById('chat-minimize').addEventListener('click', () => {
            this.toggleChat();
        });

        // Send message
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Typing indicator
        let typingTimer;
        document.getElementById('message-input').addEventListener('input', (e) => {
            this.updateCharCount(e.target.value);
            
            if (!this.isTyping) {
                this.isTyping = true;
                this.broadcastTyping(true);
            }
            
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                this.isTyping = false;
                this.broadcastTyping(false);
            }, 1000);
        });

        // Emoji picker
        document.getElementById('emoji-btn').addEventListener('click', () => {
            this.toggleEmojiPicker();
        });

        // Emoji selection
        document.getElementById('emoji-picker').addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-btn')) {
                this.insertEmoji(e.target.dataset.emoji);
            }
        });

        // Click outside to close emoji picker
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#emoji-picker') && !e.target.closest('#emoji-btn')) {
                this.hideEmojiPicker();
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.toggle('hidden');
        
        if (!chatWindow.classList.contains('hidden')) {
            this.markMessagesAsRead();
            document.getElementById('message-input').focus();
        }
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;

        const messageData = {
            id: Date.now().toString(),
            text: message,
            sender: this.getCurrentUser(),
            timestamp: Date.now(),
            type: 'text'
        };

        this.addMessage(messageData);
        this.saveMessage(messageData);
        input.value = '';
        this.updateCharCount('');
        
        // Broadcast to other users (simulated)
        this.broadcastMessage(messageData);
    }

    addMessage(messageData) {
        const messagesContainer = document.getElementById('chat-messages');
        const isOwn = messageData.sender.id === this.getCurrentUser().id;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message-bubble p-3 rounded-lg ${isOwn ? 'message-sent' : 'message-received'}`;
        
        const timeString = new Date(messageData.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageElement.innerHTML = `
            ${!isOwn ? `<div class="text-xs text-gray-500 mb-1">${messageData.sender.name}</div>` : ''}
            <div class="message-text">${this.formatMessage(messageData.text)}</div>
            <div class="text-xs ${isOwn ? 'text-blue-200' : 'text-gray-400'} mt-1">${timeString}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        });
    }

    formatMessage(text) {
        // Convert URLs to links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        text = text.replace(urlRegex, '<a href="$1" target="_blank" class="underline text-blue-400">$1</a>');
        
        // Convert @mentions to highlights
        const mentionRegex = /@(\w+)/g;
        text = text.replace(mentionRegex, '<span class="bg-blue-100 text-blue-800 px-1 rounded">@$1</span>');
        
        return text;
    }

    updateCharCount(text) {
        const charCount = document.getElementById('char-count');
        const remaining = 500 - text.length;
        charCount.textContent = remaining;
        charCount.className = remaining < 50 ? 'absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-red-400' : 
                              'absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400';
    }

    toggleEmojiPicker() {
        const picker = document.getElementById('emoji-picker');
        picker.classList.toggle('hidden');
    }

    hideEmojiPicker() {
        document.getElementById('emoji-picker').classList.add('hidden');
    }

    insertEmoji(emoji) {
        const input = document.getElementById('message-input');
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        
        input.value = text.substring(0, start) + emoji + text.substring(end);
        input.setSelectionRange(start + emoji.length, start + emoji.length);
        input.focus();
        
        this.updateCharCount(input.value);
        this.hideEmojiPicker();
    }

    getCurrentUser() {
        let user = JSON.parse(localStorage.getItem('currentChatUser') || 'null');
        if (!user) {
            user = {
                id: 'user_' + Date.now(),
                name: 'Player ' + Math.floor(Math.random() * 1000),
                avatar: this.generateAvatar()
            };
            localStorage.setItem('currentChatUser', JSON.stringify(user));
        }
        return user;
    }

    generateAvatar() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateActiveUsers() {
        const userAvatars = document.getElementById('user-avatars');
        const onlineCount = document.getElementById('online-count');
        
        // Simulate active users
        const activeUserCount = Math.floor(Math.random() * 10) + 1;
        onlineCount.textContent = `(${activeUserCount} online)`;
        
        userAvatars.innerHTML = '';
        for (let i = 0; i < Math.min(activeUserCount, 5); i++) {
            const avatar = document.createElement('div');
            avatar.className = 'user-avatar';
            avatar.style.backgroundColor = this.generateAvatar();
            avatar.textContent = String.fromCharCode(65 + i);
            userAvatars.appendChild(avatar);
        }
        
        if (activeUserCount > 5) {
            const more = document.createElement('div');
            more.className = 'user-avatar bg-gray-400';
            more.textContent = `+${activeUserCount - 5}`;
            userAvatars.appendChild(more);
        }
    }

    startHeartbeat() {
        // Update active users every 30 seconds
        setInterval(() => {
            this.updateActiveUsers();
        }, 30000);
        
        // Initial update
        this.updateActiveUsers();
    }

    saveMessage(messageData) {
        let messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push(messageData);
        
        // Keep only last 100 messages
        if (messages.length > 100) {
            messages = messages.slice(-100);
        }
        
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    loadChatHistory() {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.forEach(message => {
            this.addMessage(message);
        });
    }

    broadcastMessage(messageData) {
        // Simulate receiving messages from other users
        setTimeout(() => {
            if (Math.random() > 0.7) {
                const responses = [
                    'Great match!',
                    'Good luck everyone! 🍀',
                    'Who\'s ready for the next round?',
                    'That was intense! 🔥',
                    'GG everyone!'
                ];
                
                const randomResponse = {
                    id: Date.now().toString() + '_bot',
                    text: responses[Math.floor(Math.random() * responses.length)],
                    sender: {
                        id: 'bot_' + Math.random(),
                        name: 'Player ' + Math.floor(Math.random() * 1000),
                        avatar: this.generateAvatar()
                    },
                    timestamp: Date.now(),
                    type: 'text'
                };
                
                this.addMessage(randomResponse);
                this.saveMessage(randomResponse);
                this.showNewMessageNotification();
            }
        }, 2000 + Math.random() * 5000);
    }

    broadcastTyping(isTyping) {
        const indicator = document.getElementById('typing-indicator');
        if (isTyping) {
            indicator.innerHTML = `
                <span class="typing-dots"></span>
                <span class="typing-dots"></span>
                <span class="typing-dots"></span>
                Someone is typing...
            `;
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    }

    showNewMessageNotification() {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow.classList.contains('hidden')) {
            this.updateUnreadBadge();
        }
    }

    updateUnreadBadge() {
        const badge = document.getElementById('unread-badge');
        let count = parseInt(badge.textContent) || 0;
        count++;
        badge.textContent = count;
        badge.classList.remove('hidden');
    }

    markMessagesAsRead() {
        const badge = document.getElementById('unread-badge');
        badge.classList.add('hidden');
        badge.textContent = '0';
    }

    initializeEmojiPicker() {
        // Emoji picker is already initialized in createChatInterface
    }
}

// Voice Chat System
class VoiceChatSystem {
    constructor() {
        this.isConnected = false;
        this.isMuted = false;
        this.localStream = null;
        this.peerConnections = new Map();
    }

    async startVoiceChat() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.isConnected = true;
            this.updateVoiceChatUI();
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    }

    toggleMute() {
        if (this.localStream) {
            this.isMuted = !this.isMuted;
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = !this.isMuted;
            });
            this.updateVoiceChatUI();
        }
    }

    updateVoiceChatUI() {
        // Add voice chat controls to the chat interface
        const voiceControls = document.getElementById('voice-controls');
        if (!voiceControls) {
            const controls = document.createElement('div');
            controls.id = 'voice-controls';
            controls.className = 'flex items-center space-x-2 p-2 border-t';
            controls.innerHTML = `
                <button id="voice-toggle" class="text-sm px-3 py-1 rounded ${this.isConnected ? 'bg-green-500 text-white' : 'bg-gray-300'}">
                    ${this.isConnected ? '🎤 Connected' : '🎤 Connect'}
                </button>
                <button id="mute-toggle" class="text-sm px-3 py-1 rounded ${this.isMuted ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}">
                    ${this.isMuted ? '🔇 Muted' : '🔊 Unmuted'}
                </button>
            `;
            
            const chatWindow = document.querySelector('.chat-window .bg-white');
            chatWindow.appendChild(controls);
            
            // Add event listeners
            document.getElementById('voice-toggle').addEventListener('click', () => {
                if (this.isConnected) {
                    this.stopVoiceChat();
                } else {
                    this.startVoiceChat();
                }
            });
            
            document.getElementById('mute-toggle').addEventListener('click', () => {
                this.toggleMute();
            });
        }
    }

    stopVoiceChat() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        this.isConnected = false;
        this.updateVoiceChatUI();
    }
}

// Initialize Chat System
window.ChatSystem = new ChatSystem();
window.VoiceChatSystem = new VoiceChatSystem();