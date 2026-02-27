document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o MicroModal (Certifique-se que o id no HTML é modal-1)
    // O erro "MicroModal is not defined" parará de ocorrer com o CDN no HTML.
    if (typeof MicroModal !== 'undefined') {
        MicroModal.init({
            onClose: modal => console.info(`${modal.id} fechado`),
            openTrigger: 'data-micromodal-trigger',
            closeTrigger: 'data-micromodal-close',
            disableScroll: true
        });
    }

    // 2. Extensão do Day.js (Importante: a ordem no HTML garante que esses objetos existam aqui)
    if (window.dayjs_plugin_utc) dayjs.extend(window.dayjs_plugin_utc);
    if (window.dayjs_plugin_timezone) dayjs.extend(window.dayjs_plugin_timezone);

    const TZ_KEY = 'preferredTimezone';
    const defaultTZ = 'local';

    const tzSelect = document.getElementById('timezone-select');
    const applyBtn = document.getElementById('apply-tz');
    const clockElement = document.getElementById('clock');

    // 3. Configuração Inicial do Select
    if (tzSelect) {
        const saved = localStorage.getItem(TZ_KEY) || defaultTZ;
        tzSelect.value = saved;
    }

    // 4. Função do Relógio (Otimizada)
    function atualizarRelogio() {
        if (!clockElement) return;

        const tz = localStorage.getItem(TZ_KEY) || defaultTZ;
        let now;

        try {
            if (tz === 'local') {
                now = dayjs();
            } else {
                // dayjs.tz é fornecido pelo plugin de timezone
                now = dayjs().tz(tz);
            }
            
            clockElement.innerText = now.format('DD/MM/YYYY HH:mm:ss');
        } catch (e) {
            console.error("Erro ao processar fuso horário:", e);
            clockElement.innerText = dayjs().format('DD/MM/YYYY HH:mm:ss');
        }
    }

    // 5. Evento de Clique
    if (applyBtn && tzSelect) {
        applyBtn.addEventListener('click', () => {
            localStorage.setItem(TZ_KEY, tzSelect.value);
            atualizarRelogio();
            // O MicroModal fecha automaticamente devido ao atributo data-micromodal-close no HTML
        });
    }

    // 6. Loop do Relógio
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
});