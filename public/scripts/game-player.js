(() => {
    const container = document.querySelector('.jogo-iframe-container');
    const frame = container?.querySelector('iframe');
    if (!frame) return;

    const dimension = (value, fallback) => {
        const number = Number(value);
        return Number.isInteger(number) && number >= 240 && number <= 7680 ? number : fallback;
    };
    let width = dimension(container.dataset.width, 1280);
    let height = dimension(container.dataset.height, 800);
    let contentObserver;
    let mutationObserver;
    let pending = false;

    function fit() {
        const availableWidth = container.parentElement.clientWidth;
        if (!availableWidth) return;
        const scale = Math.min(1, availableWidth / width, Math.max(1, window.innerHeight - 120) / height);
        container.style.width = `${width * scale}px`;
        container.style.height = `${height * scale}px`;
        frame.style.width = `${width}px`;
        frame.style.height = `${height}px`;
        frame.style.transform = `scale(${scale})`;
    }

    function measure() {
        pending = false;
        try {
            const doc = frame.contentDocument;
            if (!doc?.body) return;
            const viewportWidth = doc.documentElement.clientWidth;
            const viewportHeight = doc.documentElement.clientHeight;
            let extraWidth = 0;
            let extraHeight = 0;
            // Centered Unity templates can overflow on the LEFT and TOP too.
            // scrollWidth alone misses that half of the clipped canvas.
            const elements = doc.querySelectorAll('canvas, #unity-container, #unity-footer, .webgl-content, .webgl-content .footer, embed, object');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (!rect.width || !rect.height) return;
                extraWidth = Math.max(extraWidth, -rect.left, rect.right - viewportWidth);
                extraHeight = Math.max(extraHeight, -rect.top, rect.bottom - viewportHeight);
                contentObserver?.observe(element);
            });
            const nextWidth = Math.min(7680, Math.ceil(Math.max(width + Math.max(0, extraWidth) * 2,
                doc.documentElement.scrollWidth, doc.body.scrollWidth)));
            const nextHeight = Math.min(7680, Math.ceil(Math.max(height + Math.max(0, extraHeight) * 2,
                doc.documentElement.scrollHeight, doc.body.scrollHeight)));
            if (nextWidth > width || nextHeight > height) {
                width = nextWidth;
                height = nextHeight;
                fit();
                scheduleMeasure();
            }
        } catch {
            // External hosts keep their configured viewport (same-origin policy).
        }
    }

    function scheduleMeasure() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(measure);
    }

    function watchContent() {
        contentObserver?.disconnect();
        mutationObserver?.disconnect();
        try {
            const doc = frame.contentDocument;
            if (!doc?.body) return;
            contentObserver = new ResizeObserver(scheduleMeasure);
            contentObserver.observe(doc.body);
            mutationObserver = new MutationObserver(scheduleMeasure);
            mutationObserver.observe(doc.body, { childList: true, subtree: true, attributes: true,
                attributeFilter: ['style', 'class', 'width', 'height', 'hidden'] });
            scheduleMeasure();
        } catch {
            // Cross-origin games use the resolution saved in the admin panel.
        }
    }

    frame.addEventListener('load', watchContent);
    new ResizeObserver(fit).observe(container.parentElement);
    window.addEventListener('resize', fit);
    fit();
    watchContent();
})();
