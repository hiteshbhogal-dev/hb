// Interactive Stats Dashboard with Live Counters and Charts
class StatsDashboard {
    constructor() {
        this.stats = {
            experience: { current: 0, target: 12, suffix: '+', label: 'Years Experience' },
            growth: { current: 0, target: 154, suffix: '%', label: 'YoY Growth' },
            leads: { current: 0, target: 20000, suffix: '+', label: 'Leads Generated' },
            campaigns: { current: 0, target: 50, suffix: '+', label: 'Campaigns Launched' },
            roi: { current: 0, target: 320, suffix: '%', label: 'Avg ROI Generated' },
            awards: { current: 0, target: 8, suffix: '', label: 'Industry Awards' }
        };
        this.init();
    }

    init() {
        this.observeSection();
    }

    observeSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    this.animateCounters();
                    this.createCharts();
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.getElementById('statsLive');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        Object.keys(this.stats).forEach((key, index) => {
            setTimeout(() => {
                this.animateCounter(key);
            }, index * 150);
        });
    }

    animateCounter(key) {
        const stat = this.stats[key];
        const duration = 2000;
        const steps = 60;
        const increment = stat.target / steps;
        const stepDuration = duration / steps;

        let step = 0;
        const counter = setInterval(() => {
            step++;
            stat.current = Math.min(stat.current + increment, stat.target);
            this.updateDisplay(key);

            if (step >= steps) {
                stat.current = stat.target;
                this.updateDisplay(key);
                clearInterval(counter);
            }
        }, stepDuration);
    }

    updateDisplay(key) {
        const stat = this.stats[key];
        const element = document.getElementById(`stat-${key}`);
        if (element) {
            const value = stat.target > 100 
                ? Math.floor(stat.current).toLocaleString()
                : Math.floor(stat.current);
            element.textContent = value + stat.suffix;
        }
    }

    createCharts() {
        this.createGrowthChart();
        this.createChannelChart();
        this.createTimelineChart();
    }

    createGrowthChart() {
        const canvas = document.getElementById('growthChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'LinkedIn Growth',
                    data: [100, 120, 145, 178, 220, 280, 354],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Instagram Growth',
                    data: [100, 115, 138, 165, 215, 290, 365],
                    borderColor: '#F7B731',
                    backgroundColor: 'rgba(247, 183, 49, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#ffffff' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#ffffff' }
                    }
                }
            }
        });
    }

    createChannelChart() {
        const canvas = document.getElementById('channelChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['LinkedIn', 'Email', 'Facebook', 'Instagram', 'Website', 'Other'],
                datasets: [{
                    data: [35, 25, 15, 12, 10, 3],
                    backgroundColor: [
                        '#FF6B35',
                        '#4ECDC4',
                        '#5F27CD',
                        '#F7B731',
                        '#26DE81',
                        '#45AAF2'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#ffffff', padding: 15 }
                    }
                }
            }
        });
    }

    createTimelineChart() {
        const canvas = document.getElementById('timelineChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Leads Generated',
                    data: [4500, 5200, 5800, 6500],
                    backgroundColor: '#FF6B35'
                }, {
                    label: 'Conversion Rate %',
                    data: [22, 24, 26, 28],
                    backgroundColor: '#4ECDC4'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#ffffff' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#ffffff' }
                    }
                }
            }
        });
    }
}

// Initialize when DOM and Chart.js are ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof Chart !== 'undefined') {
            new StatsDashboard();
        }
    });
} else {
    if (typeof Chart !== 'undefined') {
        new StatsDashboard();
    }
}
