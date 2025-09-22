// ==========================================
// TOURNAMENT ARENA - PREMIUM APPLICATION
// ==========================================

// Performance Optimization
class PerformanceManager {
    static init() {
        // Preload critical resources
        this.preloadCriticalAssets();
        
        // Optimize images
        this.optimizeImages();
        
        // Enable service worker for caching
        this.registerServiceWorker();
        
        // Performance monitoring
        this.monitorPerformance();
    }
    
    static preloadCriticalAssets() {
        const criticalAssets = [
            'https://cdn.tailwindcss.com',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        ];
        
        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = asset.includes('.css') ? 'style' : 'script';
            link.href = asset;
            document.head.appendChild(link);
        });
    }
    
    static optimizeImages() {
        // Lazy loading for images
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    static registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .catch(err => console.log('SW registration failed'));
        }
    }
    
    static monitorPerformance() {
        // Track page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Advanced Animation System
class AnimationEngine {
    static init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTransitions();
    }
    
    static setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    static setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    static setupTransitions() {
        // Add smooth page transitions
        const style = document.createElement('style');
        style.textContent = `
            .page-transition {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
            }
            .page-transition.loaded {
                opacity: 1;
                transform: translateY(0);
            }
            .animate-in {
                animation: slideInUp 0.6s ease forwards;
            }
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Security Manager
class SecurityManager {
    static init() {
        this.setupCSRFProtection();
        this.sanitizeInputs();
        this.setupRateLimiting();
    }
    
    static setupCSRFProtection() {
        // Generate CSRF token
        const token = this.generateCSRFToken();
        localStorage.setItem('csrfToken', token);
        
        // Add to all forms
        document.querySelectorAll('form').forEach(form => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'csrf_token';
            input.value = token;
            form.appendChild(input);
        });
    }
    
    static generateCSRFToken() {
        return Array.from(crypto.getRandomValues(new Uint8Array(32)), 
            byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    static sanitizeInputs() {
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.value = this.value.replace(/<script[^>]*>.*?<\/script>/gi, '');
            });
        });
    }
    
    static setupRateLimiting() {
        const actionCounts = new Map();
        
        window.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const now = Date.now();
                const key = e.target.textContent;
                const lastAction = actionCounts.get(key) || 0;
                
                if (now - lastAction < 1000) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                
                actionCounts.set(key, now);
            }
        });
    }
}

// Firebase configuration and utilities
class FirebaseService {
    constructor() {
        this.initializeFirebase();
        this.currentUser = null;
        this.authListeners = [];
    }

    initializeFirebase() {
        // Initialize Firebase (you'll need to replace with your config)
        const firebaseConfig = {
            apiKey: "your-api-key",
            authDomain: "your-project.firebaseapp.com",
            databaseURL: "https://your-project-default-rtdb.firebaseio.com",
            projectId: "your-project-id",
            storageBucket: "your-project.appspot.com",
            messagingSenderId: "123456789",
            appId: "your-app-id"
        };

        // This would normally initialize Firebase, but for demo purposes
        // we'll simulate the functionality
        console.log('Firebase initialized with config:', firebaseConfig);
        
        // Simulate existing user session
        const savedUser = localStorage.getItem('tournamentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.notifyAuthListeners(this.currentUser);
        }
    }

    // Authentication methods
    async signInWithEmailAndPassword(email, password) {
        try {
            // Simulate Firebase auth
            const user = {
                uid: 'user_' + Date.now(),
                email: email,
                displayName: email.split('@')[0],
                photoURL: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=667eea&color=fff`
            };
            
            this.currentUser = user;
            localStorage.setItem('tournamentUser', JSON.stringify(user));
            this.notifyAuthListeners(user);
            return { user };
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    }

    async createUserWithEmailAndPassword(email, password) {
        try {
            const user = {
                uid: 'user_' + Date.now(),
                email: email,
                displayName: email.split('@')[0],
                photoURL: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=667eea&color=fff`
            };
            
            // Create user profile in database
            await this.createUserProfile(user.uid, {
                email: email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                balance: 0,
                winningBalance: 0,
                totalPlayed: 0,
                totalKills: 0,
                totalWins: 0,
                referrals: 0,
                createdAt: new Date().toISOString()
            });
            
            this.currentUser = user;
            localStorage.setItem('tournamentUser', JSON.stringify(user));
            this.notifyAuthListeners(user);
            return { user };
        } catch (error) {
            throw new Error('Registration failed: ' + error.message);
        }
    }

    async signOut() {
        this.currentUser = null;
        localStorage.removeItem('tournamentUser');
        this.notifyAuthListeners(null);
    }

    onAuthStateChanged(callback) {
        this.authListeners.push(callback);
        // Call immediately with current state
        callback(this.currentUser);
    }

    notifyAuthListeners(user) {
        this.authListeners.forEach(callback => callback(user));
    }

    // Database methods
    async createUserProfile(uid, data) {
        const profiles = this.getFromStorage('userProfiles', {});
        profiles[uid] = data;
        localStorage.setItem('userProfiles', JSON.stringify(profiles));
    }

    async getUserProfile(uid) {
        const profiles = this.getFromStorage('userProfiles', {});
        return profiles[uid] || null;
    }

    async updateUserProfile(uid, data) {
        const profiles = this.getFromStorage('userProfiles', {});
        profiles[uid] = { ...profiles[uid], ...data };
        localStorage.setItem('userProfiles', JSON.stringify(profiles));
    }

    async getMatches() {
        return this.getFromStorage('matches', this.getDefaultMatches());
    }

    async getMatch(id) {
        const matches = await this.getMatches();
        return matches.find(match => match.id === id);
    }

    async getLeaderboard(type = 'wins', period = 'all') {
        const profiles = this.getFromStorage('userProfiles', {});
        const users = Object.values(profiles);
        
        // Sort based on type
        const sortKey = type === 'wins' ? 'totalWins' : 
                       type === 'kills' ? 'totalKills' : 'totalPlayed';
        
        return users.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0)).slice(0, 10);
    }

    async getTransactions(uid) {
        const transactions = this.getFromStorage('transactions', {});
        return transactions[uid] || [];
    }

    async addTransaction(uid, transaction) {
        const transactions = this.getFromStorage('transactions', {});
        if (!transactions[uid]) transactions[uid] = [];
        
        transaction.id = 'txn_' + Date.now();
        transaction.timestamp = new Date().toISOString();
        transactions[uid].push(transaction);
        
        localStorage.setItem('transactions', JSON.stringify(transactions));
        return transaction;
    }

    // Utility methods
    getFromStorage(key, defaultValue) {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    }

    getDefaultMatches() {
        return [
            {
                id: 'match_1',
                title: 'Free Fire Solo Championship',
                game: 'freefire',
                entryFee: 50,
                prizePool: 1000,
                maxPlayers: 100,
                currentPlayers: 85,
                status: 'upcoming',
                startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                rules: ['No hacking or cheating', 'Play fair', 'Respect other players']
            },
            {
                id: 'match_2',
                title: 'PUBG Squad Battle',
                game: 'pubg',
                entryFee: 100,
                prizePool: 2000,
                maxPlayers: 64,
                currentPlayers: 64,
                status: 'live',
                startTime: new Date().toISOString(),
                rules: ['Team of 4 players', 'No third-party software', 'Follow game rules']
            },
            {
                id: 'match_3',
                title: 'Ludo Tournament',
                game: 'ludo',
                entryFee: 25,
                prizePool: 500,
                maxPlayers: 50,
                currentPlayers: 32,
                status: 'upcoming',
                startTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
                rules: ['Standard ludo rules', 'No disconnection allowed', 'Fair play required']
            }
        ];
    }
}

// Utility functions
class Utils {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    }

    static formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    static formatTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    static generateAvatar(name) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=200`;
    }

    static showToast(message, type = 'info', duration = 4000) {
        // Enhanced toast system with better UX
        const existingToasts = document.querySelectorAll('.toast');
        
        // Stack toasts instead of replacing them
        const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 
                    type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const colors = {
            success: { bg: '#10b981', border: '#065f46' },
            error: { bg: '#ef4444', border: '#991b1b' },
            warning: { bg: '#f59e0b', border: '#92400e' },
            info: { bg: '#3b82f6', border: '#1e40af' }
        };
        
        const color = colors[type] || colors.info;
        
        toast.style.cssText = `
            background: ${color.bg};
            color: white;
            padding: 16px;
            margin-bottom: 12px;
            border-radius: 12px;
            border-left: 4px solid ${color.border};
            box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            max-width: 400px;
            font-weight: 500;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
        `;
        
        toast.querySelector('.toast-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        toast.querySelector('.toast-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: background 0.2s ease;
            margin-left: auto;
        `;
        
        toastContainer.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });
        
        // Progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255,255,255,0.3);
            width: 100%;
            transform-origin: left;
            animation: progress ${duration}ms linear;
        `;
        toast.appendChild(progressBar);
        
        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 400);
            }
        }, duration);
    }
    
    static createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 10000;
            pointer-events: none;
        `;
        
        // Add progress animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes progress {
                from { transform: scaleX(1); }
                to { transform: scaleX(0); }
            }
            .toast-close:hover {
                background: rgba(255,255,255,0.2) !important;
            }
            .toast { pointer-events: auto; }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(container);
        return container;
    }

    static showLoading(show = true) {
        let loader = document.getElementById('global-loader');
        
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'global-loader';
                loader.className = 'loading';
                loader.innerHTML = '<div class="spinner"></div>';
                document.body.appendChild(loader);
            }
            loader.style.display = 'flex';
        } else {
            if (loader) {
                loader.style.display = 'none';
            }
        }
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        return password.length >= 6;
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Navigation helper
class Navigation {
    static init() {
        // Add active class to current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    static goTo(page) {
        window.location.href = page;
    }

    static goBack() {
        window.history.back();
    }
}

// Form validation helper
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
    }

    addRule(fieldName, validator, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => {
                this.validateField(fieldName, validator, message);
            });
        }
    }

    validateField(fieldName, validator, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const value = field.value.trim();
        
        if (!validator(value)) {
            this.errors[fieldName] = message;
            this.showFieldError(field, message);
            return false;
        } else {
            delete this.errors[fieldName];
            this.clearFieldError(field);
            return true;
        }
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: #dc3545; font-size: 12px; margin-top: 4px;';
        errorElement.textContent = message;
        
        field.style.borderColor = '#dc3545';
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '#e9ecef';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    isValid() {
        return Object.keys(this.errors).length === 0;
    }
}

// Initialize Firebase service
const firebase = new FirebaseService();

// Enhanced User Experience Manager
class UXManager {
    static init() {
        this.setupKeyboardNavigation();
        this.setupOfflineSupport();
        this.setupLoadingStates();
        this.setupErrorBoundaries();
    }
    
    static setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal, [id$="modal"]');
                modals.forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        modal.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }
                });
            }
            
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    static setupOfflineSupport() {
        window.addEventListener('online', () => {
            Utils.showToast('Connection restored!', 'success');
        });
        
        window.addEventListener('offline', () => {
            Utils.showToast('You are offline. Some features may be limited.', 'warning', 0);
        });
    }
    
    static setupLoadingStates() {
        // Enhanced loading for all buttons
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
                const button = e.target;
                const originalText = button.textContent;
                
                // Add loading state
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
                
                // Remove loading after reasonable time if not manually handled
                setTimeout(() => {
                    if (button.disabled && button.textContent.includes('Loading')) {
                        button.disabled = false;
                        button.textContent = originalText;
                    }
                }, 5000);
            }
        });
    }
    
    static setupErrorBoundaries() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            Utils.showToast('An error occurred. Please try again.', 'error');
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            Utils.showToast('A network error occurred. Please check your connection.', 'error');
        });
    }
}

// Advanced Data Manager
class DataManager {
    static init() {
        this.setupLocalStorageBackup();
        this.setupDataValidation();
        this.setupCacheManagement();
    }
    
    static setupLocalStorageBackup() {
        const backup = () => {
            const data = {
                timestamp: Date.now(),
                userProfiles: localStorage.getItem('userProfiles'),
                transactions: localStorage.getItem('transactions'),
                matches: localStorage.getItem('matches')
            };
            localStorage.setItem('backup', JSON.stringify(data));
        };
        
        // Backup every 5 minutes
        setInterval(backup, 5 * 60 * 1000);
        backup(); // Initial backup
    }
    
    static setupDataValidation() {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            try {
                // Validate JSON
                if (typeof value === 'string' && value.startsWith('{')) {
                    JSON.parse(value);
                }
                originalSetItem.call(this, key, value);
            } catch (e) {
                console.error('Invalid data format for key:', key);
            }
        };
    }
    
    static setupCacheManagement() {
        // Clear old cache data
        const clearOldCache = () => {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.includes('cache_')) {
                    const data = JSON.parse(localStorage.getItem(key) || '{}');
                    if (data.timestamp && Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
                        localStorage.removeItem(key);
                    }
                }
            });
        };
        
        clearOldCache();
        setInterval(clearOldCache, 60 * 60 * 1000); // Every hour
    }
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    // Core initialization
    Navigation.init();
    
    // Enhanced systems
    PerformanceManager.init();
    AnimationEngine.init();
    SecurityManager.init();
    UXManager.init();
    DataManager.init();
    
    // Add page transition
    document.body.classList.add('page-transition');
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Enhanced focus management
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation button:focus,
        .keyboard-navigation input:focus,
        .keyboard-navigation select:focus,
        .keyboard-navigation textarea:focus {
            outline: 2px solid #667eea !important;
            outline-offset: 2px !important;
        }
        
        body:not(.keyboard-navigation) *:focus {
            outline: none !important;
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});

// Export enhanced APIs
window.FirebaseService = FirebaseService;
window.Utils = Utils;
window.Navigation = Navigation;
window.FormValidator = FormValidator;
window.PerformanceManager = PerformanceManager;
window.AnimationEngine = AnimationEngine;
window.SecurityManager = SecurityManager;
window.UXManager = UXManager;
window.DataManager = DataManager;
window.firebase = firebase;