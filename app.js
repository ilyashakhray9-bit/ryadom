(() => {
  "use strict";
  const candidate = window.RYADOM_CONFIG?.vkUrl?.trim() || "";
  let vkUrl = "";
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === "https:" && ["vk.com", "www.vk.com", "vk.ru", "www.vk.ru"].includes(parsed.hostname) && parsed.pathname.length > 1 && !parsed.username && !parsed.password) {
      vkUrl = parsed.href;
    }
  } catch { /* Отсутствующая или неверная ссылка оставляет честное состояние «скоро». */ }
  if (vkUrl) {
    document.querySelectorAll("[data-vk]").forEach(link => {
      link.href = vkUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
      link.querySelector("[data-vk-label]").textContent = "Перейти в группу ВК";
    });
    document.querySelector(".hero-note").textContent = "Общение проходит во ВКонтакте. Можно начать с знакомства с правилами.";
    document.querySelector("#join > p:not(.eyebrow)").innerHTML = "Присоединяйся к сообществу во ВКонтакте.<br>Делись, слушай или просто будь рядом.";
    document.querySelector("#join-status").textContent = "Ссылка откроется в новой вкладке. Регистрация на сайте не нужна.";
  }
  document.querySelectorAll('[aria-disabled="true"]').forEach(link => {
    link.removeAttribute("href");
    link.addEventListener("click", event => event.preventDefault());
  });
})();
