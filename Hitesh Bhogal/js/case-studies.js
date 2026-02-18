// Case Studies Interactive Section
class CaseStudies {
    constructor() {
        this.currentIndex = 0;
        this.caseStudies = this.getCaseStudiesData();
        this.init();
    }

    getCaseStudiesData() {
        return [
            {
                id: 1,
                company: 'SALAMA Islamic Arab Insurance',
                logo: 'https://assets.dfm.ae/images/default-source/default-album/salama-logo1.jpg?sfvrsn=aa6c5481_0',
                campaign: 'Kind Beings of Dubai - Purpose-Driven Marketing',
                challenge: 'Launch SALAMA as a compassionate insurance brand in competitive UAE market',
                solution: 'Created emotional storytelling campaign highlighting real people helping Dubai community',
                metrics: {
                    before: {
                        awareness: 12,
                        engagement: 0.8,
                        leads: 850,
                        sales: 100
                    },
                    after: {
                        awareness: 42,
                        engagement: 3.2,
                        leads: 2800,
                        sales: 150
                    }
                },
                highlights: [
                    '30% increase in brand recognition',
                    '50% boost in online sales',
                    'Won Best Digital & New Media Campaign',
                    '20,000+ qualified leads annually',
                    '25% improvement in lead conversion'
                ],
                duration: '2016-2023',
                color: '#26DE81'
            },
            {
                id: 2,
                company: 'Nexus Insurance Brokers',
                logo: 'https://www.nexusadvice.com/wp-content/uploads/2021/03/nexus-logo-s.png',
                campaign: 'AI-Native LinkedIn Growth Strategy',
                challenge: 'Build thought leadership and generate B2B leads in insurance brokerage',
                solution: 'Implemented data-driven content strategy with AI-powered personalization and engagement',
                metrics: {
                    before: {
                        followers: 1340,
                        engagement: 1.2,
                        newsletter: 4280,
                        leads: 100
                    },
                    after: {
                        followers: 3400,
                        engagement: 3.1,
                        newsletter: 10900,
                        leads: 254
                    }
                },
                highlights: [
                    '154% YoY LinkedIn Growth',
                    '3,400+ new followers in 12 months',
                    '10,900+ newsletter subscribers',
                    '159% Facebook engagement increase',
                    '265% Instagram growth'
                ],
                duration: '2023-Present',
                color: '#FF6B35'
            },
            {
                id: 3,
                company: 'Digital Transformation Projects',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
                campaign: 'Full-Stack Marketing Technology Implementation',
                challenge: 'Modernize marketing infrastructure for insurance industry',
                solution: 'Built integrated martech stack with CRM, automation, analytics, and AI tools',
                metrics: {
                    before: {
                        automation: 15,
                        efficiency: 100,
                        roi: 180,
                        time: 100
                    },
                    after: {
                        automation: 85,
                        efficiency: 240,
                        roi: 320,
                        time: 40
                    }
                },
                highlights: [
                    '85% marketing automation achieved',
                    '240% increase in team efficiency',
                    '320% average ROI on campaigns',
                    '40% faster campaign deployment',
                    'Reduced cost per lead by 45%'
                ],
                duration: '2020-2024',
                color: '#5F27CD'
            }
        ];
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const study = this.caseStudies[this.currentIndex];
        
        const html = `
            <div class="case-study-card" style="--case-color: ${study.color}">
                <div class="case-header">
                    <img src="${study.logo}" alt="${study.company}" class="case-logo">
                    <div class="case-meta">
                        <h3 class="case-company">${study.company}</h3>
                        <p class="case-duration">${study.duration}</p>
                    </div>
                </div>
                
                <h2 class="case-campaign">${study.campaign}</h2>
                
                <div class="case-story">
                    <div class="case-section">
                        <h4>Challenge</h4>
                        <p>${study.challenge}</p>
                    </div>
                    <div class="case-section">
                        <h4>Solution</h4>
                        <p>${study.solution}</p>
                    </div>
                </div>
                
                <div class="case-metrics">
                    <h4>Results</h4>
                    <div class="metrics-comparison">
                        ${this.renderMetrics(study.metrics)}
                    </div>
                </div>
                
                <div class="case-highlights">
                    ${study.highlights.map(h => `
                        <div class="highlight-badge">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            ${h}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('caseStudyContainer').innerHTML = html;
        this.updateNavigation();
        this.animateMetrics();
    }

    renderMetrics(metrics) {
        const keys = Object.keys(metrics.before);
        return keys.map(key => {
            const before = metrics.before[key];
            const after = metrics.after[key];
            const increase = Math.round(((after - before) / before) * 100);
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            
            return `
                <div class="metric-item">
                    <div class="metric-label">${label}</div>
                    <div class="metric-bars">
                        <div class="metric-bar before-bar" style="width: ${(before / after) * 100}%">
                            <span>${before}${this.getSuffix(key)}</span>
                        </div>
                        <div class="metric-bar after-bar" style="width: 100%">
                            <span>${after}${this.getSuffix(key)}</span>
                        </div>
                    </div>
                    <div class="metric-change">+${increase}%</div>
                </div>
            `;
        }).join('');
    }

    getSuffix(key) {
        const suffixes = {
            awareness: '%',
            engagement: '%',
            followers: '',
            newsletter: '',
            leads: '',
            sales: '%',
            automation: '%',
            efficiency: '%',
            roi: '%',
            time: '%'
        };
        return suffixes[key] || '';
    }

    animateMetrics() {
        setTimeout(() => {
            document.querySelectorAll('.metric-bar').forEach(bar => {
                bar.style.opacity = '1';
                bar.style.transform = 'scaleX(1)';
            });
        }, 300);
    }

    attachEventListeners() {
        document.getElementById('prevCase')?.addEventListener('click', () => {
            this.navigate(-1);
        });

        document.getElementById('nextCase')?.addEventListener('click', () => {
            this.navigate(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const caseSection = document.getElementById('caseStudies');
            if (this.isInViewport(caseSection)) {
                if (e.key === 'ArrowLeft') this.navigate(-1);
                if (e.key === 'ArrowRight') this.navigate(1);
            }
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.caseStudies.length) % this.caseStudies.length;
        this.render();
    }

    updateNavigation() {
        const indicator = document.getElementById('caseIndicator');
        if (indicator) {
            indicator.textContent = `${this.currentIndex + 1} / ${this.caseStudies.length}`;
        }
    }

    isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CaseStudies());
} else {
    new CaseStudies();
}
