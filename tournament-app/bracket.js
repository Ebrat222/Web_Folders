// ==========================================
// ADVANCED TOURNAMENT BRACKET SYSTEM
// ==========================================

class TournamentBracket {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentTournament = null;
        this.zoomLevel = 1;
        this.init();
    }

    init() {
        this.createBracketInterface();
        this.setupEventListeners();
        this.loadTournaments();
    }

    createBracketInterface() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="tournament-bracket-system">
                <div class="bracket-controls bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center space-x-4">
                            <select id="tournament-select" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Select Tournament</option>
                            </select>
                            <button id="create-tournament-btn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                Create Tournament
                            </button>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button id="zoom-out-btn" class="p-2 hover:bg-gray-100 rounded">🔍-</button>
                            <button id="zoom-in-btn" class="p-2 hover:bg-gray-100 rounded">🔍+</button>
                            <button id="export-bracket-btn" class="px-3 py-1 text-sm bg-blue-600 text-white rounded">Export</button>
                        </div>
                    </div>
                    
                    <div id="tournament-stats" class="mt-4 grid grid-cols-4 gap-4 hidden">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600" id="total-players">0</div>
                            <div class="text-sm text-gray-600">Players</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600" id="completed-matches">0</div>
                            <div class="text-sm text-gray-600">Completed</div>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-yellow-600" id="pending-matches">0</div>
                            <div class="text-sm text-gray-600">Pending</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600" id="current-round">1</div>
                            <div class="text-sm text-gray-600">Round</div>
                        </div>
                    </div>
                </div>

                <div class="bracket-container bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto" style="height: 600px;">
                    <div id="bracket-canvas" class="bracket-canvas p-8 transition-transform duration-300">
                        <div class="flex items-center justify-center h-full text-gray-500">
                            <div class="text-center">
                                <div class="text-4xl mb-4">🏆</div>
                                <p>Select a tournament to view the bracket</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="match-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold">Match Details</h3>
                                <button id="close-modal" class="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div id="match-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.applyBracketStyles();
    }

    applyBracketStyles() {
        const styles = `
            <style>
                .match-node {
                    background: white;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    min-width: 200px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin: 10px;
                }
                
                .match-node:hover {
                    border-color: #3b82f6;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
                }
                
                .match-node.completed {
                    border-color: #10b981;
                    background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
                }
                
                .match-node.in-progress {
                    border-color: #f59e0b;
                    background: linear-gradient(135deg, #fffbeb 0%, #fefce8 100%);
                    animation: pulse 2s infinite;
                }
                
                .player-slot {
                    padding: 12px;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .player-slot:last-child {
                    border-bottom: none;
                }
                
                .player-slot.winner {
                    background: #ecfdf5;
                    font-weight: 600;
                    color: #065f46;
                }
                
                .player-slot.loser {
                    background: #fef2f2;
                    color: #991b1b;
                    opacity: 0.7;
                }
                
                .bracket-round {
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 40px;
                }
                
                .round-header {
                    text-align: center;
                    background: #3b82f6;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 16px;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                
                .bracket-connector {
                    border-top: 2px solid #d1d5db;
                    position: relative;
                    margin: 5px 0;
                }
                
                .champion-indicator {
                    text-align: center;
                    font-size: 24px;
                    animation: bounce 1s infinite;
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    setupEventListeners() {
        document.getElementById('tournament-select').addEventListener('change', (e) => {
            if (e.target.value) this.loadTournament(e.target.value);
        });

        document.getElementById('create-tournament-btn').addEventListener('click', () => {
            this.createNewTournament();
        });

        document.getElementById('zoom-in-btn').addEventListener('click', () => {
            this.zoomBracket(1.2);
        });

        document.getElementById('zoom-out-btn').addEventListener('click', () => {
            this.zoomBracket(0.8);
        });

        document.getElementById('export-bracket-btn').addEventListener('click', () => {
            this.exportBracket();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('match-modal').classList.add('hidden');
        });
    }

    loadTournaments() {
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const select = document.getElementById('tournament-select');
        
        select.innerHTML = '<option value="">Select Tournament</option>';
        tournaments.forEach(tournament => {
            const option = document.createElement('option');
            option.value = tournament.id;
            option.textContent = `${tournament.name} (${tournament.players?.length || 0} players)`;
            select.appendChild(option);
        });
    }

    loadTournament(tournamentId) {
        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        const tournament = tournaments.find(t => t.id === tournamentId);
        
        if (!tournament) return;
        
        this.currentTournament = tournament;
        this.renderBracket(tournament);
        this.updateStats(tournament);
        document.getElementById('tournament-stats').classList.remove('hidden');
    }

    renderBracket(tournament) {
        const canvas = document.getElementById('bracket-canvas');
        
        if (!tournament.players || tournament.players.length < 2) {
            canvas.innerHTML = '<div class="text-center text-gray-500 p-8">Not enough players</div>';
            return;
        }

        const bracket = this.generateBracket(tournament.players);
        canvas.innerHTML = '';
        
        bracket.forEach((round, roundIndex) => {
            const roundDiv = document.createElement('div');
            roundDiv.className = 'bracket-round';
            
            const header = document.createElement('div');
            header.className = 'round-header';
            header.textContent = roundIndex === bracket.length - 1 ? 'Final' : `Round ${roundIndex + 1}`;
            roundDiv.appendChild(header);
            
            round.forEach(match => {
                const matchNode = this.createMatchNode(match);
                roundDiv.appendChild(matchNode);
            });
            
            canvas.appendChild(roundDiv);
        });
    }

    generateBracket(players) {
        const rounds = Math.ceil(Math.log2(players.length));
        const bracket = [];
        
        // First round
        const firstRound = [];
        for (let i = 0; i < players.length; i += 2) {
            firstRound.push({
                id: `match_${Math.floor(i/2)}_0`,
                round: 1,
                player1: players[i],
                player2: players[i + 1] || { name: 'BYE', id: 'bye' },
                winner: players[i + 1] ? null : players[i],
                completed: !players[i + 1]
            });
        }
        bracket.push(firstRound);
        
        // Subsequent rounds
        for (let round = 2; round <= rounds; round++) {
            const roundMatches = [];
            const previousRound = bracket[round - 2];
            
            for (let i = 0; i < previousRound.length; i += 2) {
                roundMatches.push({
                    id: `match_${Math.floor(i/2)}_${round-1}`,
                    round: round,
                    player1: null,
                    player2: null,
                    winner: null,
                    completed: false
                });
            }
            bracket.push(roundMatches);
        }
        
        return bracket;
    }

    createMatchNode(match) {
        const node = document.createElement('div');
        node.className = `match-node ${match.completed ? 'completed' : 'upcoming'}`;
        
        node.innerHTML = `
            <div class="player-slot ${match.winner?.id === match.player1?.id ? 'winner' : match.completed ? 'loser' : ''}">
                <span>${match.player1?.name || 'TBD'}</span>
                <span class="text-xs text-gray-500">${match.player1?.seed || ''}</span>
            </div>
            <div class="player-slot ${match.winner?.id === match.player2?.id ? 'winner' : match.completed ? 'loser' : ''}">
                <span>${match.player2?.name || 'TBD'}</span>
                <span class="text-xs text-gray-500">${match.player2?.seed || ''}</span>
            </div>
        `;
        
        node.addEventListener('click', () => this.showMatchModal(match));
        return node;
    }

    updateStats(tournament) {
        const totalMatches = tournament.players ? tournament.players.length - 1 : 0;
        const completed = tournament.matches?.filter(m => m.completed).length || 0;
        
        document.getElementById('total-players').textContent = tournament.players?.length || 0;
        document.getElementById('completed-matches').textContent = completed;
        document.getElementById('pending-matches').textContent = totalMatches - completed;
        document.getElementById('current-round').textContent = this.getCurrentRound(tournament);
    }

    getCurrentRound(tournament) {
        const matches = tournament.matches || [];
        const completed = matches.filter(m => m.completed).length;
        return Math.floor(Math.log2(tournament.players?.length || 2)) - Math.floor(Math.log2(tournament.players?.length - completed)) || 1;
    }

    createNewTournament() {
        const name = prompt('Tournament Name:') || 'New Tournament';
        const playerCount = parseInt(prompt('Number of Players:')) || 8;
        const players = [];
        
        for (let i = 1; i <= playerCount; i++) {
            players.push({
                id: `player_${i}_${Date.now()}`,
                name: prompt(`Player ${i} Name:`) || `Player ${i}`,
                seed: i
            });
        }
        
        const tournament = {
            id: 'tournament_' + Date.now(),
            name,
            players,
            matches: [],
            status: 'upcoming',
            createdAt: Date.now()
        };
        
        let tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        tournaments.push(tournament);
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        
        this.loadTournaments();
        document.getElementById('tournament-select').value = tournament.id;
        this.loadTournament(tournament.id);
    }

    zoomBracket(factor) {
        this.zoomLevel = Math.max(0.5, Math.min(2, this.zoomLevel * factor));
        document.getElementById('bracket-canvas').style.transform = `scale(${this.zoomLevel})`;
    }

    exportBracket() {
        if (!this.currentTournament) return;
        
        const data = {
            tournament: this.currentTournament,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentTournament.name.replace(/\s+/g, '_')}_bracket.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    showMatchModal(match) {
        const modal = document.getElementById('match-modal');
        const content = document.getElementById('match-content');
        
        content.innerHTML = `
            <div class="space-y-4">
                <div class="text-center">
                    <h4 class="font-semibold">Round ${match.round}</h4>
                </div>
                
                <div class="space-y-2">
                    <div class="p-3 bg-gray-50 rounded ${match.winner?.id === match.player1?.id ? 'ring-2 ring-green-500' : ''}">
                        <div class="font-medium">${match.player1?.name || 'TBD'}</div>
                    </div>
                    <div class="text-center text-gray-400">vs</div>
                    <div class="p-3 bg-gray-50 rounded ${match.winner?.id === match.player2?.id ? 'ring-2 ring-green-500' : ''}">
                        <div class="font-medium">${match.player2?.name || 'TBD'}</div>
                    </div>
                </div>
                
                ${match.completed ? 
                    `<div class="p-3 bg-green-50 rounded text-green-800">
                        Winner: ${match.winner?.name}
                    </div>` : 
                    `<button onclick="window.TournamentBracket.simulateMatch('${match.id}')" 
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Simulate Match
                    </button>`
                }
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    simulateMatch(matchId) {
        // Simple match simulation
        const winner = Math.random() > 0.5 ? 'player1' : 'player2';
        console.log(`Match ${matchId} simulated, winner: ${winner}`);
        document.getElementById('match-modal').classList.add('hidden');
    }
}

// Initialize Tournament Bracket System
window.TournamentBracket = new TournamentBracket('tournament-bracket-container');