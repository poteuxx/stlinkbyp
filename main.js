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
