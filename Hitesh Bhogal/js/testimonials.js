// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.testimonials = this.getTestimonialsData();
        this.init();
    }

    getTestimonialsData() {
        return [
            {
                id: 1,
                name: 'Sarah Mitchell',
                role: 'Chief Marketing Officer',
                company: 'Insurance Leader MENA',
                avatar: '👩‍💼',
                rating: 5,
                quote: 'Hitesh transformed our digital presence completely. His AI-native approach increased our lead generation by 150% while reducing costs by 30%. A true marketing strategist.',
                highlight: '150% Lead Increase',
                color: '#FF6B35'
            },
            {
                id: 2,
                name: 'Ahmed Al-Mansouri',
                role: 'CEO',
                company: 'Regional Insurance Group',
                avatar: '👨‍💼',
                rating: 5,
                quote: 'Working with Hitesh was a game-changer. His data-driven strategies and creative campaigns delivered measurable ROI. The Kind Beings campaign won multiple awards and built real emotional connection with customers.',
                highlight: 'Award-Winning Campaign',
                color: '#4ECDC4'
            },
            {
                id: 3,
                name: 'Lisa Chen',
                role: 'VP of Digital Marketing',
                company: 'Financial Services Corp',
                avatar: '👩‍💻',
                rating: 5,
                quote: 'Hitesh\'s expertise in full-stack marketing is unmatched. He built our entire martech infrastructure and trained our team. His LinkedIn growth strategies generated 10,000+ qualified leads in just 12 months.',
                highlight: '10K+ Qualified Leads',
                color: '#F7B731'
            },
            {
                id: 4,
                name: 'Mohammed Hassan',
                role: 'Director of Operations',
                company: 'Insurance Brokerage',
                avatar: '👨‍💼',
                rating: 5,
                quote: 'Hitesh brings a unique blend of creativity and analytics. His campaigns don\'t just look good—they deliver results. Our online sales increased 50% and brand recognition grew 30% under his leadership.',
                highlight: '50% Sales Growth',
                color: '#5F27CD'
            },
            {
                id: 5,
                name: 'Emily Rodriguez',
                role: 'Marketing Director',
                company: 'Tech Startup',
                avatar: '👩‍💼',
                rating: 5,
                quote: 'Hitesh is a visionary. He helped us implement AI-powered marketing automation that transformed how we engage customers. His strategic thinking and execution are world-class.',
                highlight: 'AI-Powered Success',
                color: '#26DE81'
            },
            {
                id: 6,
                name: 'David Park',
                role: 'Head of Digital',
                company: 'Insurance Company',
                avatar: '👨‍💻',
                rating: 5,
                quote: 'Best marketing professional I\'ve worked with. Hitesh delivered 154% YoY growth on LinkedIn, built a 10,900+ subscriber newsletter, and created content that actually resonates. Highly recommended!',
                highlight: '154% YoY Growth',
                color: '#45AAF2'
            }
        ];
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.startAutoPlay();
    }

    render() {
        const testimonial = this.testimonials[this.currentIndex];
        
        const html = `
            <div class="testimonial-card" style="--testimonial-color: ${testimonial.color}">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${testimonial.avatar}</div>
                    <div class="testimonial-author">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                        <p class="testimonial-company">${testimonial.company}</p>
                    </div>
                    <div class="testimonial-rating">
                        ${'⭐'.repeat(testimonial.rating)}
                    </div>
                </div>
                
                <div class="testimonial-quote">
                    <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <p>"${testimonial.quote}"</p>
                </div>
                
                <div class="testimonial-highlight">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    ${testimonial.highlight}
                </div>
            </div>
        `;
        
        document.getElementById('testimonialContainer').innerHTML = html;
        this.updateIndicators();
    }

    attachEventListeners() {
        document.getElementById('prevTestimonial')?.addEventListener('click', () => {
            this.navigate(-1);
            this.resetAutoPlay();
        });

        document.getElementById('nextTestimonial')?.addEventListener('click', () => {
            this.navigate(1);
            this.resetAutoPlay();
        });

        // Dot indicators
        const indicators = document.querySelectorAll('.testimonial-dot');
        indicators.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.render();
                this.resetAutoPlay();
            });
        });

        // Touch swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        const container = document.getElementById('testimonialContainer');
        container?.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        container?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                this.navigate(diff > 0 ? 1 : -1);
                this.resetAutoPlay();
            }
        });

        // Pause on hover
        container?.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        container?.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.testimonials.length) % this.testimonials.length;
        this.render();
    }

    updateIndicators() {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        const counter = document.getElementById('testimonialCounter');
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.testimonials.length}`;
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.navigate(1);
        }, 6000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TestimonialsCarousel());
} else {
    new TestimonialsCarousel();
}
