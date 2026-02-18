// Marketing Insights Deck - Interactive Card System
class MarketingInsightsDeck {
    constructor() {
        this.currentIndex = 0;
        this.currentCategory = 'all';
        this.favorites = this.loadFavorites();
        this.insights = this.getInsightsData();
        this.init();
    }

    getInsightsData() {
        return [
            // Marketing Facts
            {
                id: 1,
                category: 'facts',
                icon: '📊',
                title: 'Daily Ad Exposure',
                front: 'How many ads does the average person see daily?',
                back: '5,000-10,000 ads per day! Digital transformation has exponentially increased ad exposure.',
                color: '#FF6B35'
            },
            {
                id: 2,
                category: 'facts',
                icon: '📧',
                title: 'Email Marketing ROI',
                front: 'What\'s the average ROI of email marketing?',
                back: '4,200% ROI - That\'s $42 for every $1 spent! Still the highest ROI channel in digital marketing.',
                color: '#4ECDC4'
            },
            {
                id: 3,
                category: 'facts',
                icon: '🎥',
                title: 'Video Marketing Power',
                front: 'How much does video boost conversions?',
                back: '86% increase in landing page conversions! Video is the fastest-growing content format.',
                color: '#F7B731'
            },
            {
                id: 4,
                category: 'facts',
                icon: '📱',
                title: 'Mobile-First World',
                front: 'What percentage of web traffic is mobile?',
                back: '58.99% of global website traffic! Mobile-first design is no longer optional.',
                color: '#5F27CD'
            },
            // Campaign Success Stories
            {
                id: 5,
                category: 'campaigns',
                icon: '🍎',
                title: 'Apple "Think Different"',
                front: 'How much did Apple invest in "Think Different"?',
                back: '$100M budget generated $6.5B revenue. ROI: 6,400%. Changed Apple\'s trajectory forever.',
                color: '#A55EEA'
            },
            {
                id: 6,
                category: 'campaigns',
                icon: '✔️',
                title: 'Nike "Just Do It"',
                front: 'Impact of Nike\'s "Just Do It" campaign?',
                back: '1,000% sales increase! From $800M to $9.2B in 10 years. Created a cultural movement.',
                color: '#FC5C65'
            },
            {
                id: 7,
                category: 'campaigns',
                icon: '👨',
                title: 'Old Spice Viral Success',
                front: 'Old Spice "The Man Your Man Could Smell Like"?',
                back: '107M YouTube views, 2,700% traffic increase, 107% sales boost in first month!',
                color: '#26DE81'
            },
            {
                id: 8,
                category: 'campaigns',
                icon: '🎯',
                title: 'Dove "Real Beauty"',
                front: 'Dove\'s Real Beauty Campaign Results?',
                back: '$4B revenue increase! Reached 1.8B+ people, 70% sales growth. Purpose-driven marketing at its best.',
                color: '#FD79A8'
            },
            // Marketing Trends 2024-2026
            {
                id: 9,
                category: 'trends',
                icon: '🤖',
                title: 'AI in Marketing',
                front: 'How is AI transforming marketing?',
                back: '80% of marketers use AI tools. Personalization, automation, predictive analytics are the new normal.',
                color: '#00D2D3'
            },
            {
                id: 10,
                category: 'trends',
                icon: '🎬',
                title: 'Short-Form Video',
                front: 'Short-form video content trends?',
                back: 'TikTok & Reels drive 67% higher engagement. 85% of businesses now use short-form video.',
                color: '#EE5A6F'
            },
            {
                id: 11,
                category: 'trends',
                icon: '🔍',
                title: 'Voice Search Optimization',
                front: 'Voice search impact on marketing?',
                back: '50% of all searches will be voice by 2026. Conversational AI and SEO strategies evolving rapidly.',
                color: '#45AAF2'
            },
            {
                id: 12,
                category: 'trends',
                icon: '🌍',
                title: 'Sustainability Marketing',
                front: 'Consumers care about sustainability?',
                back: '73% of Gen Z willing to pay more for sustainable brands. ESG marketing is crucial for brand loyalty.',
                color: '#26DE81'
            },
            // Marketing Wisdom
            {
                id: 13,
                category: 'wisdom',
                icon: '💡',
                title: 'Content is King',
                front: 'Bill Gates, 1996',
                back: '"Content is where I expect much of the real money will be made." - Still true 28 years later!',
                color: '#A55EEA'
            },
            {
                id: 14,
                category: 'wisdom',
                icon: '🎯',
                title: 'Customer Focus',
                front: 'Peter Drucker',
                back: '"The aim of marketing is to know and understand the customer so well the product sells itself."',
                color: '#FC5C65'
            },
            {
                id: 15,
                category: 'wisdom',
                icon: '⚡',
                title: 'Speed Matters',
                front: 'Seth Godin',
                back: '"Marketing is no longer about the stuff you make, but the stories you tell." Storytelling wins.',
                color: '#F7B731'
            },
            {
                id: 16,
                category: 'wisdom',
                icon: '🚀',
                title: 'Innovation First',
                front: 'Gary Vaynerchuk',
                back: '"Marketers ruin everything." - Don\'t follow trends, create them. Innovation beats imitation.',
                color: '#5F27CD'
            },
            // Big Budgets & Stats
            {
                id: 17,
                category: 'stats',
                icon: '💰',
                title: 'Super Bowl Ads',
                front: 'Cost of Super Bowl ad 2024?',
                back: '$7M for 30 seconds! Reaches 115M+ viewers. Brands spend $500M+ on Super Bowl marketing.',
                color: '#FF6B35'
            },
            {
                id: 18,
                category: 'stats',
                icon: '📺',
                title: 'Global Ad Spending',
                front: 'Total global ad spend 2024?',
                back: '$1.1 TRILLION! Digital ads: $667B (60%). Fastest growth: Connected TV & Retail Media.',
                color: '#4ECDC4'
            },
            {
                id: 19,
                category: 'stats',
                icon: '👥',
                title: 'Influencer Marketing',
                front: 'Influencer marketing industry size?',
                back: '$21.1B industry! 90% of marketers find it effective. Micro-influencers drive highest engagement.',
                color: '#FD79A8'
            },
            {
                id: 20,
                category: 'stats',
                icon: '🎮',
                title: 'Gaming Marketing',
                front: 'Marketing in gaming industry?',
                back: '$3B spent on in-game ads! 3.2B gamers worldwide. Brands like Gucci & Nike entering metaverse.',
                color: '#26DE81'
            }
        ];
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.startAutoRotate();
    }

    render() {
        const filtered = this.currentCategory === 'all' 
            ? this.insights 
            : this.insights.filter(i => i.category === this.currentCategory);

        const insight = filtered[this.currentIndex % filtered.length];
        
        const deckHTML = `
            <div class="insights-deck-card" style="--card-color: ${insight.color}">
                <div class="card-inner" id="insightCard">
                    <div class="card-front">
                        <div class="card-icon">${insight.icon}</div>
                        <h3 class="card-title">${insight.title}</h3>
                        <p class="card-question">${insight.front}</p>
                        <div class="flip-hint">Tap to reveal →</div>
                    </div>
                    <div class="card-back">
                        <div class="card-icon">${insight.icon}</div>
                        <h3 class="card-title">${insight.title}</h3>
                        <p class="card-answer">${insight.back}</p>
                        <button class="favorite-btn ${this.favorites.includes(insight.id) ? 'active' : ''}" 
                                data-id="${insight.id}">
                            ${this.favorites.includes(insight.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('insightCardContainer').innerHTML = deckHTML;
        this.updateProgress(filtered.length);
        this.updateCategoryButtons();
    }

    attachEventListeners() {
        // Card flip
        document.addEventListener('click', (e) => {
            if (e.target.closest('.insights-deck-card')) {
                document.querySelector('.card-inner').classList.toggle('flipped');
            }
        });

        // Navigation
        document.getElementById('prevCard')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigate(-1);
        });

        document.getElementById('nextCard')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigate(1);
        });

        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.filterCategory(btn.dataset.category);
            });
        });

        // Favorites
        document.addEventListener('click', (e) => {
            if (e.target.closest('.favorite-btn')) {
                e.stopPropagation();
                const id = parseInt(e.target.closest('.favorite-btn').dataset.id);
                this.toggleFavorite(id);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
            if (e.key === ' ') {
                e.preventDefault();
                document.querySelector('.card-inner')?.classList.toggle('flipped');
            }
        });

        // Touch swipe
        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                this.navigate(diff > 0 ? 1 : -1);
            }
        });
    }

    navigate(direction) {
        const filtered = this.currentCategory === 'all' 
            ? this.insights 
            : this.insights.filter(i => i.category === this.currentCategory);
        
        this.currentIndex = (this.currentIndex + direction + filtered.length) % filtered.length;
        
        // Unflip card
        document.querySelector('.card-inner')?.classList.remove('flipped');
        
        setTimeout(() => this.render(), 300);
    }

    filterCategory(category) {
        this.currentCategory = category;
        this.currentIndex = 0;
        document.querySelector('.card-inner')?.classList.remove('flipped');
        setTimeout(() => this.render(), 300);
    }

    toggleFavorite(id) {
        const index = this.favorites.indexOf(id);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(id);
        }
        this.saveFavorites();
        this.render();
    }

    loadFavorites() {
        return JSON.parse(localStorage.getItem('insightsFavorites') || '[]');
    }

    saveFavorites() {
        localStorage.setItem('insightsFavorites', JSON.stringify(this.favorites));
    }

    updateProgress(total) {
        const progress = ((this.currentIndex % total) + 1);
        const progressEl = document.getElementById('cardProgress');
        if (progressEl) {
            progressEl.textContent = `${progress} / ${total}`;
        }
    }

    updateCategoryButtons() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === this.currentCategory);
        });
    }

    startAutoRotate() {
        // Optional: Auto-rotate cards every 15 seconds
        // Uncomment if desired
        // setInterval(() => {
        //     if (!document.querySelector('.card-inner').classList.contains('flipped')) {
        //         this.navigate(1);
        //     }
        // }, 15000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MarketingInsightsDeck());
} else {
    new MarketingInsightsDeck();
}
