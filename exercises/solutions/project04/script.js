// 1. Измерение и вывод метрик производительности в консоль
window.addEventListener('load', () => {
    // Проверяем поддержку Performance API
    if ('performance' in window) {
        // Получаем метрику LCP (Largest Contentful Paint)
        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`%c[Performance] LCP: ${Math.round(lastEntry.startTime)}ms`, 'color: #007bff; font-weight: bold;');
        });

        try {
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
            // Игнорируем, если тип не поддерживается браузером
        }
    }
});

// 2. Отслеживание работы отложенной загрузки (Lazy Loading) для элементов галереи
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    console.log(`[LazyLoad] Изображение вошло в область видимости:`, img.alt);
                    // Прекращаем наблюдение за уже загруженным элементом
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});