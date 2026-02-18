// Interactive Marketing ROI Calculator
class ROICalculator {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        const form = document.getElementById('roiCalculatorForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.calculate());
            input.addEventListener('change', () => this.calculate());
        });

        // Reset button
        document.getElementById('resetCalculator')?.addEventListener('click', () => {
            form.reset();
            this.calculate();
        });
    }

    calculate() {
        // Get input values
        const budget = parseFloat(document.getElementById('marketingBudget')?.value) || 0;
        const channels = parseInt(document.getElementById('channelCount')?.value) || 1;
        const industry = document.getElementById('industry')?.value || 'insurance';
        const duration = parseInt(document.getElementById('duration')?.value) || 6;

        if (budget === 0) {
            this.displayResults(null);
            return;
        }

        // Industry multipliers (based on Hitesh's experience)
        const industryMultipliers = {
            insurance: 4.2,
            financial: 3.8,
            tech: 5.5,
            healthcare: 3.5,
            retail: 4.0,
            other: 3.0
        };

        // Channel multipliers
        const channelMultiplier = 1 + (channels - 1) * 0.15;

        // Duration multiplier (longer campaigns are more efficient)
        const durationMultiplier = 1 + (duration / 12) * 0.3;

        // Calculate ROI
        const baseMultiplier = industryMultipliers[industry] || 3.0;
        const totalMultiplier = baseMultiplier * channelMultiplier * durationMultiplier;
        const estimatedRevenue = budget * totalMultiplier;
        const roi = ((estimatedRevenue - budget) / budget) * 100;

        // Calculate leads (based on industry averages)
        const costPerLead = industry === 'insurance' ? 45 : 35;
        const effectiveBudget = budget * 0.7; // 70% goes to lead gen
        const estimatedLeads = Math.floor(effectiveBudget / costPerLead);

        // Calculate conversion rate
        const conversionRate = industry === 'insurance' ? 2.5 : 3.2;

        // Calculate customers
        const estimatedCustomers = Math.floor(estimatedLeads * (conversionRate / 100));

        const results = {
            budget,
            estimatedRevenue,
            roi,
            estimatedLeads,
            conversionRate,
            estimatedCustomers,
            duration,
            industry,
            channels
        };

        this.displayResults(results);
        this.createVisualization(results);
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('roiResults');
        if (!resultsContainer) return;

        if (!results) {
            resultsContainer.innerHTML = '<p class="roi-placeholder">Enter your marketing budget to see projected results...</p>';
            return;
        }

        const html = `
            <div class="roi-results-grid">
                <div class="roi-metric-card primary">
                    <div class="roi-metric-icon">💰</div>
                    <div class="roi-metric-value">$${results.estimatedRevenue.toLocaleString()}</div>
                    <div class="roi-metric-label">Estimated Revenue</div>
                    <div class="roi-metric-change">+${results.roi.toFixed(0)}% ROI</div>
                </div>
                
                <div class="roi-metric-card">
                    <div class="roi-metric-icon">👥</div>
                    <div class="roi-metric-value">${results.estimatedLeads.toLocaleString()}</div>
                    <div class="roi-metric-label">Qualified Leads</div>
                    <div class="roi-metric-sublabel">Based on ${results.duration}-month campaign</div>
                </div>
                
                <div class="roi-metric-card">
                    <div class="roi-metric-icon">✅</div>
                    <div class="roi-metric-value">${results.estimatedCustomers.toLocaleString()}</div>
                    <div class="roi-metric-label">New Customers</div>
                    <div class="roi-metric-sublabel">${results.conversionRate}% conversion rate</div>
                </div>
                
                <div class="roi-metric-card">
                    <div class="roi-metric-icon">📊</div>
                    <div class="roi-metric-value">${results.channels}</div>
                    <div class="roi-metric-label">Marketing Channels</div>
                    <div class="roi-metric-sublabel">${this.getChannelNames(results.channels)}</div>
                </div>
            </div>
            
            <div class="roi-breakdown">
                <h4>Investment Breakdown</h4>
                <div class="breakdown-item">
                    <span>Marketing Budget</span>
                    <span class="breakdown-value">$${results.budget.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>Estimated Revenue</span>
                    <span class="breakdown-value positive">$${results.estimatedRevenue.toLocaleString()}</span>
                </div>
                <div class="breakdown-item highlight">
                    <span>Net Profit</span>
                    <span class="breakdown-value">$${(results.estimatedRevenue - results.budget).toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>ROI Percentage</span>
                    <span class="breakdown-value">${results.roi.toFixed(0)}%</span>
                </div>
            </div>
            
            <div class="roi-cta">
                <p>Ready to achieve these results?</p>
                <a href="#contact" class="roi-cta-button">Let's Discuss Your Campaign</a>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }

    getChannelNames(count) {
        const channels = ['LinkedIn', 'Email', 'Facebook', 'Instagram', 'Google Ads', 'Content'];
        return channels.slice(0, count).join(', ');
    }

    createVisualization(results) {
        const canvas = document.getElementById('roiChart');
        if (!canvas) return;

        // Destroy previous chart if exists
        if (window.roiChartInstance) {
            window.roiChartInstance.destroy();
        }

        const ctx = canvas.getContext('2d');
        window.roiChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Investment', 'Revenue', 'Net Profit'],
                datasets: [{
                    label: 'Amount ($)',
                    data: [
                        results.budget,
                        results.estimatedRevenue,
                        results.estimatedRevenue - results.budget
                    ],
                    backgroundColor: [
                        '#FF6B35',
                        '#26DE81',
                        '#4ECDC4'
                    ],
                    borderRadius: 8,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof Chart !== 'undefined') {
            new ROICalculator();
        }
    });
} else {
    if (typeof Chart !== 'undefined') {
        new ROICalculator();
    }
}
