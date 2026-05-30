// Mouse Glow Effect
const glow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    glow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
});

// Bypass Logic
const input = document.getElementById('target-url');
const button = document.getElementById('bypass-trigger');
const statusArea = document.getElementById('status-area');
const resultArea = document.getElementById('result-area');
const resultLink = document.getElementById('result-link');

button.addEventListener('click', async () => {
    const url = input.value.trim();
    
    if (!url) {
        statusArea.innerText = 'Please enter a valid URL!';
        statusArea.style.color = '#f43f5e';
        return;
    }

    // Reset UI
    statusArea.style.color = 'var(--text-dim)';
    statusArea.innerText = 'Initializing ST·Engine...';
    resultArea.style.display = 'none';
    button.disabled = true;
    button.style.opacity = '0.5';

    try {
        // Animation Sequence
        await sleep(800);
        statusArea.innerText = 'Tunneling through ad-networks...';
        await sleep(1200);
        statusArea.innerText = 'Extracting destination link...';
        await sleep(600);

        // Simple mock of a redirected result
        // In a real app, this would call an API like Zen's or a custom backend
        const mockResult = "https://example.com/unlocked-content-" + Math.random().toString(36).substring(7);
        
        statusArea.innerText = 'Success! Bypass complete.';
        statusArea.style.color = '#10b981';
        
        resultLink.href = mockResult;
        resultLink.innerText = mockResult;
        resultArea.style.display = 'block';

    } catch (error) {
        statusArea.innerText = 'Error: Link extraction failed. Try again.';
        statusArea.style.color = '#f43f5e';
    } finally {
        button.disabled = false;
        button.style.opacity = '1';
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Copy to Clipboard
const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultLink.innerText);
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i data-lucide="check" style="width: 16px;"></i>';
    lucide.createIcons();
    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
        lucide.createIcons();
    }, 2000);
});

// Modal Logic
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('modal-close');

const modalData = {
    support: {
        title: "Support Center",
        body: "Need help with a link? Join our official community on Discord or reach out via email at <a href='mailto:ostiguytechnologie@gmail.com' style='color: var(--secondary); text-decoration: underline;'>ostiguytechnologie@gmail.com</a>. Our team typically responds within 24 hours."
    },
    privacy: {
        title: "Privacy Policy",
        body: "ST·Link Bypass does not store any of your target URLs. We do not use persistent cookies or track your browsing history. Your anonymity is our priority."
    },
    terms: {
        title: "Terms of Service",
        body: "This tool is provided for educational purposes. Users are responsible for adhering to the terms of service of the websites they interact with."
    },
    api: {
        title: "Developer API",
        body: "Our high-speed bypass API is available for enterprise integration. Contact our team for API keys and documentation access."
    }
};

function showModal(type) {
    const data = modalData[type];
    if (!data) return;
    modalContent.innerHTML = `
        <h2 class="modal-title">${data.title}</h2>
        <div class="modal-body">${data.body}</div>
        <button class="primary-btn" style="margin-top: 2rem; width: 100%;" onclick="document.getElementById('modal-overlay').style.display='none'">Got it</button>
    `;
    overlay.style.display = 'flex';
}

// Global handler for all interactive links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const text = link.innerText.toLowerCase();

        // 1. Handle Modal Links
        if (href === '#' || href === 'javascript:void(0)') {
            e.preventDefault();
            if (text.includes('support')) showModal('support');
            else if (text.includes('privacy')) showModal('privacy');
            else if (text.includes('terms')) showModal('terms');
            else if (text.includes('api')) showModal('api');
        }
        
        // 2. Smooth Scroll for Anchor Links (Mobile browsers fallback)
        if (href && href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

closeBtn.addEventListener('click', () => overlay.style.display = 'none');
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.style.display = 'none';
});

// Add subtle animations to cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(card);
});

