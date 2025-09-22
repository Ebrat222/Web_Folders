// ==========================================
// ADVANCED ANALYTICS & REAL-TIME FEATURES
// ==========================================

class AdvancedAnalytics {
    constructor() {
        this.metrics = new Map();
        this.realTimeData = new Map();
        this.charts = new Map();
        this.init();
    }

    init() {
        this.setupRealTimeMonitoring();
        this.initializeCharts();
        this.setupUserBehaviorTracking();
        this.startPerformanceMonitoring();
    }

    // Real-time Tournament Analytics
    setupRealTimeMonitoring() {
        // Monitor active tournaments
        setInterval(() => {
            this.updateTournamentMetrics();
            this.updatePlayerActivity();
            this.updateMatchProgress();
        }, 5000);

        // Real-time notifications
        this.setupNotificationSystem();
    }

    updateTournamentMetrics() {
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const metrics = {
            total: tournaments.length,
            active: tournaments.filter(t => t.status === 'active').length,
            completed: tournaments.filter(t => t.status === 'completed').length,
            participants: tournaments.reduce((sum, t) => sum + (t.players?.length || 0), 0)
        };

        this.metrics.set('tournaments', metrics);
        this.updateMetricsDisplay(metrics);
    }

    updatePlayerActivity() {
        const players = JSON.parse(localStorage.getItem('players') || '[]');
        const now = Date.now();
        const activeThreshold = 5 * 60 * 1000; // 5 minutes

        const activity = {
            online: players.filter(p => (now - (p.lastSeen || 0)) < activeThreshold).length,
            total: players.length,
            newToday: players.filter(p => 
                new Date(p.joinDate).toDateString() === new Date().toDateString()
            ).length
        };

        this.metrics.set('players', activity);
        this.updatePlayerActivityDisplay(activity);
    }

    // Advanced Data Visualization
    initializeCharts() {
        this.createTournamentChart();
        this.createPerformanceChart();
        this.createEngagementChart();
    }

    createTournamentChart() {
        const canvas = document.createElement('canvas');
        canvas.id = 'tournamentChart';
        canvas.width = 400;
        canvas.height = 200;
        
        const ctx = canvas.getContext('2d');
        this.charts.set('tournament', { canvas, ctx });
        
        // Add to dashboard if exists
        const dashboard = document.getElementById('analytics-dashboard');
        if (dashboard) {
            dashboard.appendChild(canvas);
        }
    }

    drawTournamentChart() {
        const chart = this.charts.get('tournament');
        if (!chart) return;

        const { ctx, canvas } = chart;
        const metrics = this.metrics.get('tournaments') || {};
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw chart background
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw data
        const data = [metrics.active || 0, metrics.completed || 0];
        const colors = ['#10b981', '#3b82f6'];
        const total = data.reduce((sum, val) => sum + val, 0);
        
        if (total > 0) {
            let currentAngle = 0;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 80;
            
            data.forEach((value, index) => {
                const sliceAngle = (value / total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = colors[index];
                ctx.fill();
                
                currentAngle += sliceAngle;
            });
        }
    }

    // Real-time Notification System
    setupNotificationSystem() {
        this.notificationQueue = [];
        this.createNotificationContainer();
        
        // Listen for tournament events
        this.addEventListener('tournamentUpdate', this.handleTournamentNotification.bind(this));
        this.addEventListener('playerJoin', this.handlePlayerNotification.bind(this));
        this.addEventListener('matchComplete', this.handleMatchNotification.bind(this));
    }

    createNotificationContainer() {
        if (document.getElementById('notification-container')) return;

        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';
        document.body.appendChild(container);
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `
            notification-item transform translate-x-full opacity-0
            bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 p-4
            transition-all duration-300 ease-in-out
            ${type === 'success' ? 'border-green-500' : 
              type === 'error' ? 'border-red-500' : 
              type === 'warning' ? 'border-yellow-500' : 'border-blue-500'}
        `;

        const icon = type === 'success' ? '✓' : 
                    type === 'error' ? '✗' : 
                    type === 'warning' ? '⚠' : 'ℹ';

        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <span class="text-lg">${icon}</span>
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                        ${message}
                    </p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <span class="sr-only">Close</span>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `;

        const container = document.getElementById('notification-container');
        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // User Behavior Tracking
    setupUserBehaviorTracking() {
        this.trackPageViews();
        this.trackUserInteractions();
        this.trackTimeSpent();
    }

    trackPageViews() {
        const pageView = {
            page: window.location.pathname,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };

        let pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
        pageViews.push(pageView);
        
        // Keep only last 100 page views
        if (pageViews.length > 100) {
            pageViews = pageViews.slice(-100);
        }
        
        localStorage.setItem('pageViews', JSON.stringify(pageViews));
    }

    trackUserInteractions() {
        ['click', 'scroll', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                this.recordInteraction(eventType, e);
            });
        });
    }

    recordInteraction(type, event) {
        const interaction = {
            type,
            timestamp: Date.now(),
            target: event.target.tagName,
            className: event.target.className
        };

        let interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
        interactions.push(interaction);
        
        // Keep only last 50 interactions
        if (interactions.length > 50) {
            interactions = interactions.slice(-50);
        }
        
        localStorage.setItem('userInteractions', JSON.stringify(interactions));
    }

    // Performance Monitoring
    startPerformanceMonitoring() {
        this.monitorMemoryUsage();
        this.monitorNetworkPerformance();
        this.monitorRenderPerformance();
    }

    monitorMemoryUsage() {
        if (performance.memory) {
            setInterval(() => {
                const memory = {
                    used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                    total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
                    timestamp: Date.now()
                };

                this.metrics.set('memory', memory);
                this.updatePerformanceDisplay(memory);
            }, 10000);
        }
    }

    monitorNetworkPerformance() {
        if (navigator.connection) {
            const connection = navigator.connection;
            const networkInfo = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };

            this.metrics.set('network', networkInfo);
        }
    }

    // Dashboard Updates
    updateMetricsDisplay(metrics) {
        const elements = {
            'total-tournaments': metrics.total,
            'active-tournaments': metrics.active,
            'completed-tournaments': metrics.completed,
            'total-participants': metrics.participants
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                this.animateNumber(element, parseInt(element.textContent) || 0, value);
            }
        });

        // Update chart
        this.drawTournamentChart();
    }

    updatePlayerActivityDisplay(activity) {
        const elements = {
            'online-players': activity.online,
            'total-players': activity.total,
            'new-players-today': activity.newToday
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                this.animateNumber(element, parseInt(element.textContent) || 0, value);
            }
        });
    }

    animateNumber(element, start, end, duration = 1000) {
        const range = end - start;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.round(start + (range * this.easeOutQuart(progress)));
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // Event System
    addEventListener(event, callback) {
        if (!this.eventListeners) {
            this.eventListeners = new Map();
        }
        
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        
        this.eventListeners.get(event).push(callback);
    }

    dispatchEvent(event, data) {
        if (this.eventListeners && this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => callback(data));
        }
    }

    // Notification Handlers
    handleTournamentNotification(data) {
        this.showNotification(`Tournament "${data.name}" has been ${data.action}`, 'info');
    }

    handlePlayerNotification(data) {
        this.showNotification(`${data.playerName} joined the tournament`, 'success');
    }

    handleMatchNotification(data) {
        this.showNotification(`Match completed: ${data.winner} defeated ${data.loser}`, 'success');
    }

    // Export Analytics Data
    exportAnalytics() {
        const data = {
            metrics: Object.fromEntries(this.metrics),
            timestamp: Date.now(),
            pageViews: JSON.parse(localStorage.getItem('pageViews') || '[]'),
            interactions: JSON.parse(localStorage.getItem('userInteractions') || '[]')
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `tournament-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize Analytics
window.TournamentAnalytics = new AdvancedAnalytics();