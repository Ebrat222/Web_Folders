# Tournament Arena - Gaming Tournament Web Application

A modern, responsive web application for gaming tournaments with real-time features, user management, and payment integration.

## 🚀 Features

### 🎮 Core Features
- **Tournament Management**: Browse, join, and participate in various gaming tournaments
- **Multi-Game Support**: Free Fire, PUBG Mobile, and Ludo tournaments
- **Real-time Updates**: Live tournament status and player counts
- **User Dashboard**: Comprehensive profile and statistics tracking

### 💰 Wallet System
- **Secure Payments**: Integration with bKash, Nagad, and Rocket
- **Balance Management**: Separate deposit and winning balances
- **Transaction History**: Complete transaction tracking with status updates
- **Instant Withdrawals**: Quick withdrawal processing

### 🏆 Leaderboard & Rankings
- **Global Rankings**: Top players by wins, kills, and matches played
- **Time Filters**: Daily, monthly, and yearly leaderboards
- **Achievement System**: Track personal gaming statistics
- **Podium Display**: Visual representation of top performers

### 🎨 Design & User Experience
- **Light/Dark Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI/UX**: Clean, intuitive interface design
- **Accessibility**: WCAG compliant components
- **Progressive Enhancement**: Works without JavaScript for basic features

### 🔐 Admin Panel System
- **Secure Admin Authentication**: Multi-factor authentication with demo credentials
- **Comprehensive Dashboard**: Real-time statistics and user management
- **Tournament Management**: Create, edit, and monitor tournaments
- **User Oversight**: User accounts, permissions, and activity monitoring
- **Transaction Management**: Payment oversight and financial reporting
- **System Analytics**: Detailed reports and insights

### 📱 Additional Pages & Features
- **FAQ System**: Searchable, categorized frequently asked questions
- **Contact Support**: Multiple contact methods with form submission
- **Maintenance Mode**: Elegant server maintenance page with countdown
- **Theme System**: Persistent theme preferences with smooth transitions
- **Notification System**: Toast notifications and alert system

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with custom animations
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **JavaScript (ES6+)**: Modern JavaScript features and APIs
- **Font Awesome**: Comprehensive icon library
- **Google Fonts**: Inter font family for modern typography

### Backend Simulation
- **Firebase**: Real-time database and authentication (configured for demo)
- **Local Storage**: Client-side data persistence for demo purposes
- **RESTful Patterns**: Structured data management

### Design Features
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark Mode Support**: System-based dark mode detection
- **Modern UI/UX**: Clean, intuitive interface design
- **Accessibility**: WCAG compliant components
- **Progressive Enhancement**: Works without JavaScript for basic features

## 📁 Project Structure

```
tournament-app/
├── index.html          # Landing page with authentication
├── home.html           # User dashboard
├── matchlist.html      # Tournament listings
├── match.html          # Individual match details
├── wallet.html         # Payment and transaction management
├── profile.html        # User profile settings
├── top.html           # Leaderboard and rankings
├── maintenance.html    # Maintenance page
├── adminauth.html      # Admin authentication
├── adminhome.html      # Admin dashboard
├── contact.html        # Contact support page
├── faq.html           # Frequently asked questions
├── styles.css         # Global styles with theme support
├── app.js             # Core JavaScript functionality
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)
- Live server extension or local server setup

### Installation

1. **Clone or Download** the project files to your local machine

2. **Navigate** to the project directory:
   ```bash
   cd tournament-app
   ```

3. **Install Dependencies** (optional):
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   # Using npm
   npm run dev
   
   # Or using live-server directly
   live-server --port=3000 --entry-file=index.html
   
   # Or simply open index.html in your browser
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` or open `index.html` directly

## 🎯 Usage Guide

### For Users

1. **Registration/Login**:
   - Visit the landing page
   - Click "Start Playing Now" to register or "Already a Player?" to login
   - Use any email and password (demo mode)

2. **Dashboard Navigation**:
   - **Home**: View statistics and recent activity
   - **Matches**: Browse and join tournaments
   - **Wallet**: Manage payments and view transactions
   - **Profile**: Update personal information
   - **Leaderboard**: Check rankings and achievements

3. **Joining Tournaments**:
   - Browse available tournaments in the Matches section
   - Filter by game type (Free Fire, PUBG, Ludo)
   - View match details and rules
   - Join tournaments with sufficient balance

4. **Managing Wallet**:
   - Add money via bKash, Nagad, or Rocket
   - View transaction history
   - Withdraw winnings to mobile wallets

### For Developers

1. **Customization**:
   - Modify `styles.css` for theme changes
   - Update `app.js` for functionality enhancements
   - Edit HTML files for layout modifications

2. **Firebase Integration**:
   - Replace Firebase config in `app.js`
   - Set up Firebase project with Authentication and Realtime Database
   - Update security rules as needed

3. **Payment Integration**:
   - Integrate real payment gateways
   - Update transaction handling in `wallet.html`
   - Implement webhook handling for payment confirmations

## 🎨 Features Showcase

### Modern Landing Page
- Gradient backgrounds with animated elements
- Responsive navigation with mobile menu
- Call-to-action buttons with smooth animations
- Statistics preview for platform credibility

### Interactive Dashboard
- Real-time statistics cards
- Quick action buttons for common tasks
- Recent activity and upcoming matches
- Notification system with dropdown

### Advanced Match System
- Detailed match information with rules
- Progress bars for registration status
- Dynamic action buttons based on match state
- Prize pool distribution breakdown

### Comprehensive Wallet
- Visual balance cards with gradients
- Transaction filtering and search
- Modal-based deposit/withdrawal forms
- Status indicators for transaction states

### Dynamic Leaderboard
- Podium visualization for top 3 players
- Filterable rankings by time period and category
- Rank badges with special styling
- User avatar integration

## 🔧 Configuration

### Firebase Setup (for production)
1. Create a Firebase project
2. Enable Authentication and Realtime Database
3. Replace the config in `app.js`:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### Customization Options
- **Colors**: Modify CSS custom properties in `styles.css`
- **Fonts**: Change font imports in HTML head sections
- **Layout**: Adjust grid systems and spacing in component classes
- **Animations**: Customize transition durations and effects

## 📱 Mobile Support

- Fully responsive design for all screen sizes
- Touch-friendly interface elements
- Mobile-optimized navigation with hamburger menu
- Swipe gestures for carousel components
- Progressive Web App ready structure

## 🔐 Security Features

- Client-side form validation
- Secure authentication flow simulation
- Data sanitization for user inputs
- Protected routes with authentication checks
- Session management with automatic logout

## 🚀 Performance Optimizations

- Optimized images and assets
- Efficient CSS with minimal redundancy
- JavaScript code splitting and lazy loading concepts
- Compressed font loading
- Minimal external dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across devices
5. Submit a pull request with detailed description

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support and queries:
- Email: support@tournamentarena.com
- Phone: +880 1XXX-XXXXXX
- Social Media: Follow us on Facebook, Twitter, Instagram

## 🎯 Future Enhancements

- [ ] Real-time chat system
- [ ] Video streaming integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Advanced tournament bracket system

---

**Built with ❤️ for the gaming community**