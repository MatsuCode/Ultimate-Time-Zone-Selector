document.addEventListener("DOMContentLoaded", () => {

    // Plugins do DayJS
    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);

    const TZ_KEY = "preferredTimezone";
    const defaultTZ = "local";

    const modal = document.getElementById("tz-modal");
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.getElementById("close-modal");
    const applyBtn = document.getElementById("apply-tz");
    const tzSelect = document.getElementById("timezone-select");
    const clockElement = document.getElementById("clock");

    // Carregar timezone salva
    const savedTZ = localStorage.getItem(TZ_KEY) || defaultTZ;
    tzSelect.value = savedTZ;

    function atualizarRelogio() {
        const tz = localStorage.getItem(TZ_KEY) || defaultTZ;
        let now;

        try {
            if (tz === "local") {
                now = dayjs();
            } else {
                now = dayjs().tz(tz);
            }

            clockElement.innerText = now.format("DD/MM/YYYY HH:mm:ss");

        } catch (err) {
            console.error("Erro timezone:", err);
            clockElement.innerText = dayjs().format("DD/MM/YYYY HH:mm:ss");
        }
    }

    // Abrir modal
    openBtn.addEventListener("click", () => {
        modal.classList.add("active");
    });

    // Fechar modal
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Aplicar timezone
    applyBtn.addEventListener("click", () => {
        localStorage.setItem(TZ_KEY, tzSelect.value);
        atualizarRelogio();
        modal.classList.remove("active");
    });

    // Fechar clicando fora
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
});