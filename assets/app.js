(function () {
  const downloadUrl = window.LOCALMIND_DOWNLOAD_URL || "";
  document.querySelectorAll("[data-download-link]").forEach((el) => {
    if (downloadUrl) {
      el.setAttribute("href", downloadUrl);
      el.setAttribute("download", "LocalMind-1.0.0-setup.exe");
    } else {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        alert("下载地址还没有配置。请先在 assets/config.js 里填写安装包直链。");
      });
    }
  });

  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = document.querySelector(".carousel-dots");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");
  const animationMs = 480;
  let index = 0;
  let timer;
  let animating = false;

  if (!slides.length || !dotsWrap || !prev || !next) return;

  function renderDots() {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `查看第 ${i + 1} 张产品图`);
      dot.addEventListener("click", () => {
        const direction = i >= index ? 1 : -1;
        show(i, true, direction);
      });
      dotsWrap.appendChild(dot);
    });
  }

  function updateDots() {
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function clearAnimationClasses(slide) {
    slide.classList.remove("enter-next", "leave-next", "enter-prev", "leave-prev");
  }

  function show(nextIndex, userAction, direction) {
    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    if (normalizedIndex === index || animating) return;

    const currentSlide = slides[index];
    const nextSlide = slides[normalizedIndex];
    const forward = direction !== -1;
    animating = true;

    slides.forEach(clearAnimationClasses);
    nextSlide.classList.add("active", forward ? "enter-next" : "enter-prev");
    currentSlide.classList.add(forward ? "leave-next" : "leave-prev");

    window.setTimeout(() => {
      currentSlide.classList.remove("active");
      clearAnimationClasses(currentSlide);
      clearAnimationClasses(nextSlide);
      index = normalizedIndex;
      updateDots();
      animating = false;
    }, animationMs);

    if (userAction) restart();
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1, false), 4200);
  }

  renderDots();
  slides.forEach((img, i) => img.classList.toggle("active", i === index));
  updateDots();
  prev.addEventListener("click", () => show(index - 1, true, -1));
  next.addEventListener("click", () => show(index + 1, true, 1));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else restart();
  });
  restart();
})();
