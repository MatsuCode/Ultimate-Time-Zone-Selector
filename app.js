document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();

    if (window.dayjs_plugin_utc) dayjs.extend(window.dayjs_plugin_utc);
    if (window.dayjs_plugin_timezone) dayjs.extend(window.dayjs_plugin_timezone);

    const TZ_KEY = 'preferredTimezone';
    const defaultTZ = 'local';

    const tzSelect = document.getElementById('timezone-select');
    const applyBtn = document.getElementById('apply-tz');

    const availableZones = ['local','UTC','America/Sao_Paulo','America/New_York','Europe/London','Europe/Paris','Asia/Tokyo','Asia/Shanghai','Australia/Sydney'];

    if (tzSelect) {
        // ensure select contains our options (in case HTML changed)
        const existing = Array.from(tzSelect.options).map(o => o.value);
        if (existing.length === 0) {
            availableZones.forEach(z => {
                const opt = document.createElement('option');
                opt.value = z;
                opt.innerText = z === 'local' ? 'Sistema (local)' : z;
                tzSelect.appendChild(opt);
            });
        }
        const saved = localStorage.getItem(TZ_KEY) || defaultTZ;
        tzSelect.value = saved;
    }

    function atualizarRelogio() {
        const clockElement = document.getElementById('clock');
        const tz = localStorage.getItem(TZ_KEY) || defaultTZ;
        let now;
        if (tz === 'local' || !dayjs.tz) {
            now = dayjs();
        } else {
            now = dayjs().tz(tz);
        }
        const currentTime = now.format('DD/MM/YYYY HH:mm:ss');
        if (clockElement) clockElement.innerText = currentTime;
    }

    if (applyBtn && tzSelect) {
        applyBtn.addEventListener('click', () => {
            localStorage.setItem(TZ_KEY, tzSelect.value);
            atualizarRelogio();
        });
    }

    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
});

