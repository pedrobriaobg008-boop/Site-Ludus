(() => {
    const panel = document.querySelector('[data-profile-panel]');
    const toggle = document.querySelector('[data-profile-toggle]');
    if (!panel || !toggle || panel.dataset.profileReady) return;
    panel.dataset.profileReady = 'true';

    const STORAGE_KEY = 'ludus.profile.demo.v1';
    const STORAGE_VERSION = 1;
    const FALLBACK_GAME_IMAGE = '/ícone controle azul.png';
    const form = panel.querySelector('[data-profile-form]');
    const nameInput = panel.querySelector('[data-profile-name-input]');
    const lastGameImage = panel.querySelector('[data-profile-last-game-image]');
    const navAvatar = toggle.querySelector('[data-profile-nav-avatar]');
    const guestAvatar = navAvatar ? Array.from(navAvatar.childNodes, node => node.cloneNode(true)) : [];
    const numberFormat = new Intl.NumberFormat('pt-BR');

    // Sample progress only: no authentication, game rewards, or API requests.
    const DEMO_GAMES = [
        { name: 'Missão Verde', xp: 1200 },
        { name: 'Desafio das Palavras', xp: 750 },
        { name: 'Aventura dos Números', xp: 500 }
    ];
    const RANKS = [
        { name: 'Bronze', image: 'bronze', xp: 0, title: 'Primeiros passos' },
        { name: 'Prata', image: 'prata', xp: 1500, title: 'Explorador curioso' },
        { name: 'Ouro', image: 'ouro', xp: 4000, title: 'Mente brilhante' },
        { name: 'Platina', image: 'platina', xp: 8000, title: 'Grande descobridor' },
        { name: 'Diamante', image: 'diamante', xp: 14000, title: 'Estrela do conhecimento' },
        { name: 'Mestre', image: 'mestre', xp: 22000, title: 'Mestre do saber' }
    ];
    const totalXp = DEMO_GAMES.reduce((total, game) => total + game.xp, 0);
    const level = Math.floor(totalXp / 500) + 1;
    const rankIndex = RANKS.reduce((index, rank, current) => totalXp >= rank.xp ? current : index, 0);
    const rank = RANKS[rankIndex];
    const nextRank = RANKS[rankIndex + 1];
    let storageWarning = '';
    let positionPending = false;

    const cleanName = value => typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
    const validName = value => value.length > 0 && value.length <= 32 && !/[\u0000-\u001f\u007f]/.test(value);

    function safeUrl(value, sameOrigin = false) {
        if (typeof value !== 'string' || !value.trim() || value.length > 2048) return null;
        try {
            const url = new URL(value, window.location.origin);
            if (!['http:', 'https:'].includes(url.protocol)) return null;
            if (url.username || url.password || (sameOrigin && url.origin !== window.location.origin)) return null;
            return sameOrigin ? `${url.pathname}${url.search}${url.hash}` : url.href;
        } catch {
            return null;
        }
    }

    function cleanLastGame(value) {
        if (!value || typeof value !== 'object') return null;
        const name = cleanName(value.name);
        const url = safeUrl(value.url, true);
        if (!name || name.length > 140 || !url || !/^\/jogo\/[^/?#]+(?:[?#]|$)/.test(url)) return null;
        return { name, url, image: safeUrl(value.image) || FALLBACK_GAME_IMAGE };
    }

    function readProfile() {
        const emptyProfile = { version: STORAGE_VERSION, name: null, lastGame: null };
        try {
            const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
            if (!value || value.version !== STORAGE_VERSION) return emptyProfile;
            const name = cleanName(value.name);
            return {
                version: STORAGE_VERSION,
                name: validName(name) ? name : null,
                lastGame: cleanLastGame(value.lastGame)
            };
        } catch (error) {
            if (!(error instanceof SyntaxError)) {
                storageWarning = 'O navegador não permite salvar o perfil. A demonstração funciona nesta página.';
            }
            return emptyProfile;
        }
    }

    let profile = readProfile();

    function showFeedback(message = storageWarning) {
        const feedback = panel.querySelector('[data-profile-error]');
        if (!feedback) return;
        feedback.textContent = message;
        feedback.hidden = !message;
    }

    function saveProfile() {
        try {
            // Persist only the local demo identity and the last opened game.
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
            storageWarning = '';
        } catch {
            storageWarning = 'Não foi possível salvar neste navegador. As mudanças valem apenas nesta página.';
        }
        showFeedback();
    }

    function setText(selector, value) {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function render() {
        const signedIn = Boolean(profile.name);
        panel.querySelector('[data-profile-guest]')?.toggleAttribute('hidden', signedIn);
        panel.querySelector('[data-profile-member]')?.toggleAttribute('hidden', !signedIn);
        setText('[data-profile-nav-name]', signedIn ? profile.name.split(' ')[0] : 'Meu perfil');
        setText('[data-profile-nav-detail]', signedIn ? `Nível ${level} · ${rank.name}` : 'Entrar');
        toggle.setAttribute('aria-label', signedIn ? `Abrir perfil de ${profile.name}` : 'Abrir meu perfil');

        if (!signedIn) {
            if (navAvatar) navAvatar.replaceChildren(...guestAvatar.map(node => node.cloneNode(true)));
            showFeedback();
            return;
        }

        const names = profile.name.split(' ');
        const initials = [names[0], names.length > 1 ? names[names.length - 1] : '']
            .map(name => Array.from(name)[0] || '').join('').toLocaleUpperCase('pt-BR');
        if (navAvatar) navAvatar.textContent = initials;
        setText('[data-profile-name]', profile.name);
        setText('[data-profile-avatar]', initials);
        setText('[data-profile-level]', numberFormat.format(level));
        setText('[data-profile-xp]', numberFormat.format(totalXp));
        setText('[data-profile-rank]', rank.name);
        setText('[data-profile-rank-title]', rank.title);
        const rankImage = panel.querySelector('[data-profile-rank-image]');
        if (rankImage) {
            rankImage.src = `/images/ranks/${rank.image}.svg`;
            rankImage.alt = `Emblema da patente ${rank.name}`;
        }
        const progress = panel.querySelector('[data-profile-rank-progress]');
        if (progress) {
            progress.max = 100;
            progress.value = nextRank ? Math.round((totalXp - rank.xp) / (nextRank.xp - rank.xp) * 100) : 100;
            progress.textContent = `${progress.value}%`;
            progress.setAttribute('aria-label', nextRank ? `Progresso para ${nextRank.name}` : 'Patente máxima alcançada');
        }
        setText('[data-profile-next-rank]', nextRank ? `Próxima patente: ${nextRank.name}` : 'Patente máxima alcançada');
        setText('[data-profile-progress-text]', nextRank
            ? `Faltam ${numberFormat.format(nextRank.xp - totalXp)} XP para ${nextRank.name}`
            : 'Você chegou ao topo!');

        const lastGame = profile.lastGame;
        setText('[data-profile-last-game]', lastGame?.name || DEMO_GAMES[0].name);
        setText('[data-profile-last-game-note]', lastGame ? 'Seu último jogo neste navegador' : 'Uma aventura pela natureza');
        if (lastGameImage) {
            lastGameImage.src = lastGame?.image || '/missaoverde.png';
            lastGameImage.alt = '';
        }
        const lastGameLink = panel.querySelector('[data-profile-last-game-link]');
        if (lastGameLink) {
            lastGameLink.href = lastGame?.url || '/jogos';
            const action = lastGameLink.querySelector('[data-profile-last-game-action]') || lastGameLink;
            action.textContent = lastGame ? 'Jogar novamente' : 'Explorar jogos';
        }
        showFeedback();
    }

    function positionPanel() {
        positionPending = false;
        if (panel.hidden) return;
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const viewportWidth = document.documentElement.clientWidth;
        const navbar = document.querySelector('.navbar');
        const container = document.querySelector('.container-header');
        let top = Math.max(12, (navbar?.getBoundingClientRect().bottom || 0) + 12);
        // Short screens need the full viewport, even if the header has several rows.
        if (viewportHeight - top - 12 < Math.min(280, viewportHeight - 24)) top = 12;
        const right = viewportWidth <= 640 ? 12 : Math.max(12, viewportWidth - (container?.getBoundingClientRect().right || viewportWidth));
        panel.style.setProperty('--profile-top', `${top}px`);
        panel.style.setProperty('--profile-max-height', `${Math.max(24, viewportHeight - top - 12)}px`);
        panel.style.setProperty('--profile-right', `${right}px`);
        panel.style.right = `${right}px`;
    }

    function schedulePosition() {
        if (panel.hidden || positionPending) return;
        positionPending = true;
        window.requestAnimationFrame(positionPanel);
    }

    function closePanel(restoreFocus = true) {
        if (panel.hidden) return;
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        if (restoreFocus) toggle.focus({ preventScroll: true });
    }

    function openPanel() {
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        positionPanel();
        (profile.name ? panel : nameInput || panel).focus({ preventScroll: true });
    }

    toggle.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
    panel.querySelectorAll('[data-profile-close]').forEach(button => {
        button.addEventListener('click', () => closePanel());
    });
    document.addEventListener('click', event => {
        if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) {
            closePanel(panel.contains(document.activeElement));
        }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !panel.hidden) {
            event.preventDefault();
            closePanel();
        }
    });
    panel.addEventListener('focusout', event => {
        if (event.relatedTarget && !panel.contains(event.relatedTarget) && !toggle.contains(event.relatedTarget)) {
            closePanel(false);
        }
    });
    window.addEventListener('resize', schedulePosition);
    window.addEventListener('scroll', schedulePosition, { passive: true, capture: true });
    window.addEventListener('storage', event => {
        if (event.key !== STORAGE_KEY && event.key !== null) return;
        const activeElement = document.activeElement;
        const focusWasInside = panel.contains(activeElement);
        const wasSignedIn = Boolean(profile.name);
        storageWarning = '';
        profile = readProfile();
        render();
        if (wasSignedIn && !profile.name) {
            form?.reset();
            nameInput?.removeAttribute('aria-invalid');
        }
        if (!panel.hidden && focusWasInside && activeElement?.closest('[hidden]')) {
            (profile.name ? panel : nameInput || panel).focus({ preventScroll: true });
        }
        schedulePosition();
    });
    lastGameImage?.addEventListener('error', () => {
        const fallbackUrl = new URL(FALLBACK_GAME_IMAGE, window.location.origin).href;
        if (lastGameImage.src !== fallbackUrl) lastGameImage.src = FALLBACK_GAME_IMAGE;
    });
    window.visualViewport?.addEventListener('resize', schedulePosition);
    if ('ResizeObserver' in window) {
        const navbar = document.querySelector('.navbar');
        if (navbar) new ResizeObserver(schedulePosition).observe(navbar);
    }

    form?.addEventListener('submit', event => {
        event.preventDefault();
        const name = cleanName(nameInput?.value);
        if (!validName(name)) {
            showFeedback('Digite um nome de até 32 caracteres para experimentar o perfil.');
            nameInput?.setAttribute('aria-invalid', 'true');
            nameInput?.focus();
            return;
        }
        nameInput?.removeAttribute('aria-invalid');
        profile.name = name;
        saveProfile();
        render();
        positionPanel();
        panel.focus({ preventScroll: true });
    });
    nameInput?.addEventListener('input', () => {
        nameInput.removeAttribute('aria-invalid');
        showFeedback();
    });
    panel.querySelector('[data-profile-logout]')?.addEventListener('click', () => {
        profile.name = null;
        saveProfile();
        render();
        form?.reset();
        positionPanel();
        nameInput?.focus({ preventScroll: true });
    });

    const gameSection = document.querySelector('[data-profile-game-name]');
    if (gameSection) {
        const recordLastGame = () => {
            const game = cleanLastGame({
                name: gameSection.dataset.profileGameName,
                url: gameSection.dataset.profileGameUrl,
                image: gameSection.dataset.profileGameImage
            });
            if (!game) return;
            profile.lastGame = game;
            saveProfile();
            render();
        };
        const frame = gameSection.querySelector('iframe');
        frame?.addEventListener('load', recordLastGame, { once: true });
        gameSection.querySelector('#fullscreen-game-btn')?.addEventListener('click', recordLastGame);
        try {
            if (frame?.contentDocument?.readyState === 'complete' && frame.contentDocument.URL !== 'about:blank') recordLastGame();
        } catch {
            // Cross-origin games are recorded by their iframe load event or play link.
        }
    }

    toggle.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    render();
})();
