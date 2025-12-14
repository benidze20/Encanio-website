document.addEventListener('DOMContentLoaded', () => {
    // Small utilities and shared options
    const COLORS = {
        primary: '#4f46e5',
        teal: '#06b6d4',
        success: '#10b981',
        warn: '#f59e0b',
        danger: '#ef4444',
        surface: '#ffffff'
    };

    function createGradient(ctx, height, color) {
        const g = ctx.createLinearGradient(0, 0, 0, height);
        g.addColorStop(0, color.replace('1)', '0.18)'));
        g.addColorStop(1, color.replace('1)', '0)'));
        return g;
    }

    function getCtx(id) {
        const el = document.getElementById(id);
        return el && el.getContext ? el.getContext('2d') : null;
    }

    function lineChart(id, labels, data) {
        const el = document.getElementById(id);
        if (!el) return null;
        const ctx = el.getContext('2d');
        // create a soft gradient fill under the line
        const grad = ctx.createLinearGradient(0, 0, 0, el.height || 160);
        grad.addColorStop(0, 'rgba(79,70,229,0.12)');
        grad.addColorStop(1, 'rgba(79,70,229,0.00)');

        return new Chart(el, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Activity',
                    data,
                    borderColor: COLORS.primary,
                    backgroundColor: grad,
                    tension: 0.32,
                    pointRadius: 3,
                    pointBackgroundColor: COLORS.primary,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 10,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#475569' } },
                    y: { grid: { color: 'rgba(15,23,42,0.04)' }, ticks: { color: '#475569' } }
                }
            }
        });
    }

    function doughnutChart(id, labels, values, colors) {
        const el = document.getElementById(id);
        if (!el) return null;
        return new Chart(el, {
            type: 'doughnut',
            data: { labels, datasets: [{ data: values, backgroundColor: colors }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: { legend: { position: 'bottom', labels: { color: '#475569' } } }
            }
        });
    }

    // Animate stat numbers from 0 -> target
    function animateStats() {
        document.querySelectorAll('.stat-value').forEach((el) => {
            const target = parseInt(el.textContent.replace(/[+,]/g, ''), 10) || 0;
            const start = 0;
            const duration = 900;
            const startTs = performance.now();
            requestAnimationFrame(function tick(now) {
                const progress = Math.min((now - startTs) / duration, 1);
                const current = Math.floor(start + (target - start) * progress);
                el.textContent = current.toLocaleString();
                if (progress < 1) requestAnimationFrame(tick);
            });
        });
    }

    // Build charts with sample data (safe guards)
    try {
        lineChart('activityChart', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], [12,19,8,14,18,10,22]);
        doughnutChart('distChart', ['Completed','Pending','Overdue'], [70,20,10], [COLORS.success, COLORS.warn, COLORS.danger]);
    } catch (err) {
        // fail quietly — Chart.js might not be ready in some contexts
        // console.warn('Charts not initialized:', err);
    }

    // run stat animations
    animateStats();

    // expose for debugging
    window.__encanCharts = { lineChart, doughnutChart };

});