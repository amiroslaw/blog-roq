// GitHub comments via utterances (same repo as the old Scully blog).
// Mounts the utterances iframe into .page-comments and keeps its theme in
// sync with the site's dark-mode toggle.

const REPO = 'amiroslaw/blog-comments';
const ISSUE_TERM = 'og:title';
const UTTERANCES_ORIGIN = 'https://utteranc.es';

const isDark = () => document.documentElement.classList.contains('dark');
const currentTheme = () => (isDark() ? 'github-dark' : 'github-light');

function mount() {
    const container = document.querySelector('.page-comments');
    if (!container || container.querySelector('script[src^="https://utteranc.es"]')) {
        return;
    }
    const script = document.createElement('script');
    script.src = `${UTTERANCES_ORIGIN}/client.js`;
    script.setAttribute('repo', REPO);
    script.setAttribute('issue-term', ISSUE_TERM);
    script.setAttribute('theme', currentTheme());
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
}

function syncTheme() {
    const iframe = document.querySelector('iframe.utterances-frame');
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
            { type: 'set-theme', theme: currentTheme() },
            UTTERANCES_ORIGIN
        );
    }
}

function watchDarkMode() {
    new MutationObserver(syncTheme).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
    });
}

function onReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
        fn();
    }
}

onReady(() => {
    if (!document.querySelector('.page-comments')) {
        return;
    }
    mount();
    watchDarkMode();
});
