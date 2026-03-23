const intelligenceFeeds = [
    {
        name: 'MEED Finance',
        url: 'https://www.meed.com/rss-feeds',
        category: 'finance',
        region: 'uae'
    },
    {
        name: 'Gulf Today Business',
        url: 'https://www.gulftoday.ae/rss',
        category: 'finance',
        region: 'uae'
    },
    {
        name: 'Campaign RSS',
        url: 'https://www.campaignlive.co.uk/rss',
        category: 'marketing',
        region: 'mena'
    }
];

const fallbackIntelligence = [
    {
        title: 'Why trust-led demand generation matters more for insurers than raw reach.',
        source: 'Editorial seed',
        date: 'Fresh perspective',
        category: 'insurance',
        region: 'uae',
        summary: 'For insurers and brokers, visibility without credibility rarely converts. The most effective growth programs combine education, reassurance, and proof with performance media and CRM follow-through.',
        takeaway: 'Hitesh can use this theme to publish recurring commentary on how regulated brands can balance awareness, trust, and conversion.',
        link: '#contact'
    },
    {
        title: 'Banking, wealth, and insurance brands in the Gulf are under pressure to modernize content and customer journeys.',
        source: 'Editorial seed',
        date: 'Fresh perspective',
        category: 'finance',
        region: 'mena',
        summary: 'Across the region, premium financial brands must improve their digital experience while maintaining confidence, compliance, and executive polish.',
        takeaway: 'A market-intelligence section gives Hitesh a place to translate sector change into practical brand, content, and growth implications.',
        link: '#framework'
    },
    {
        title: 'Marketing teams in the Middle East are moving from campaign execution to systemized, AI-assisted growth operations.',
        source: 'Editorial seed',
        date: 'Fresh perspective',
        category: 'marketing',
        region: 'mena',
        summary: 'The leaders who win are combining strategy, automation, analytics, and executive storytelling rather than treating them as separate disciplines.',
        takeaway: 'This supports a stronger personal positioning story for Hitesh: operator, strategist, and modern marketing leader.',
        link: '#about'
    }
];

const state = {
    items: [...fallbackIntelligence],
    filter: 'all'
};

const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
const intelligenceGrid = document.getElementById('intelligenceGrid');
const intelligenceStatus = document.getElementById('intelligenceStatus');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        primaryNav.classList.toggle('open');
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function classifyItem(text = '') {
    const value = text.toLowerCase();
    if (/(insurance|broker|takaful|insurer)/.test(value)) return 'insurance';
    if (/(bank|finance|wealth|investment|fintech)/.test(value)) return 'finance';
    if (/(marketing|brand|advertising|media|campaign)/.test(value)) return 'marketing';
    return 'all';
}

function regionFromText(text = '') {
    const value = text.toLowerCase();
    return /(uae|dubai|abu dhabi)/.test(value) ? 'uae' : 'mena';
}

function renderItems() {
    if (!intelligenceGrid) return;

    const visible = state.items.filter((item) => {
        if (state.filter === 'all') return true;
        return item.category === state.filter || item.region === state.filter;
    }).slice(0, 6);

    intelligenceGrid.innerHTML = visible.map((item) => `
        <article class="intelligence-card">
            <div class="intelligence-meta">
                <span>${item.source}</span>
                <span>${item.date}</span>
                <span>${item.category}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="takeaway"><strong>Why it matters:</strong> ${item.takeaway}</div>
            <a class="read-more" href="${item.link}" ${item.link.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>Read more</a>
        </article>
    `).join('');

    intelligenceStatus.textContent = visible.length
        ? 'Updated with curated items and feed-friendly fallbacks for relevance and reliability.'
        : 'No items match this filter yet.';
}

async function fetchFeedPreview() {
    const requests = intelligenceFeeds.map(async (feed) => {
        const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed feed: ${feed.name}`);
        const data = await response.json();
        return (data.items || []).slice(0, 2).map((item) => {
            const combinedText = `${item.title || ''} ${item.description || ''}`;
            const category = classifyItem(combinedText) || feed.category;
            return {
                title: item.title || `${feed.name} update`,
                source: feed.name,
                date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Latest',
                category: category === 'all' ? feed.category : category,
                region: regionFromText(combinedText) || feed.region,
                summary: (item.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180) || 'Curated market update from a regional or industry source.',
                takeaway: 'This signal can be turned into commentary on brand trust, market movement, digital demand, or AI-enabled growth for the region.',
                link: item.link || '#intelligence'
            };
        });
    });

    const results = await Promise.allSettled(requests);
    const fetchedItems = results
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => result.value)
        .filter((item) => item.title && item.link);

    if (fetchedItems.length) {
        state.items = [...fetchedItems, ...fallbackIntelligence];
    }

    renderItems();
}

document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach((button) => button.classList.remove('active'));
        chip.classList.add('active');
        state.filter = chip.dataset.filter;
        renderItems();
    });
});

if (form && formMessage) {
    form.addEventListener('submit', () => {
        formMessage.textContent = 'Thanks — your message is being sent.';
        setTimeout(() => {
            formMessage.textContent = 'Thank you. Hitesh will review your note soon.';
            form.reset();
        }, 1200);
    });
}

renderItems();
fetchFeedPreview().catch(() => {
    intelligenceStatus.textContent = 'Live feeds are not available right now, so the section is showing curated fallback intelligence.';
    renderItems();
});
