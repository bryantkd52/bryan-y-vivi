(() => {
  const intro = document.getElementById('intro');
  const openButton = document.getElementById('openInvitation');
  const content = document.getElementById('siteContent');
  const audio = document.getElementById('weddingAudio');
  const audioToggle = document.getElementById('audioToggle');
  let opened = false;

  const startAudio = async () => {
    try {
      audio.volume = 0.55;
      await audio.play();
      audioToggle.classList.remove('is-paused');
      audioToggle.setAttribute('aria-pressed', 'true');
      audioToggle.setAttribute('aria-label', 'Pausar música');
    } catch (_) {
      audioToggle.classList.add('is-paused');
      audioToggle.setAttribute('aria-pressed', 'false');
      audioToggle.setAttribute('aria-label', 'Reproducir música');
    }
  };

  openButton.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    startAudio();
    intro.classList.add('is-opening');

    window.setTimeout(() => {
      content.classList.add('is-visible');
      content.setAttribute('aria-hidden', 'false');
      audioToggle.classList.add('is-visible');
    }, 2500);

    window.setTimeout(() => {
      intro.classList.add('is-finished');
      document.body.classList.remove('is-locked');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 3850);
  });

  audioToggle.addEventListener('click', async () => {
    if (audio.paused) {
      await startAudio();
    } else {
      audio.pause();
      audioToggle.classList.add('is-paused');
      audioToggle.setAttribute('aria-pressed', 'false');
      audioToggle.setAttribute('aria-label', 'Reproducir música');
    }
  });

  const weddingDate = new Date('2026-11-17T10:00:00-05:00').getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdown = document.getElementById('countdown');
  const countdownMessage = document.getElementById('countdownMessage');

  const pad = (value) => String(value).padStart(2, '0');
  const updateCountdown = () => {
    const diff = weddingDate - Date.now();
    if (diff <= 0) {
      countdown.hidden = true;
      countdownMessage.hidden = false;
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    daysEl.textContent = String(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  document.querySelectorAll('.reveal:not(.reveal--hero)').forEach((el) => observer.observe(el));

  let ticking = false;
  const applyParallax = () => {
    const y = window.scrollY;
    document.querySelectorAll('.verse-flower').forEach((el) => {
      el.style.transform = `translateY(${Math.min(y * 0.025, 28)}px) rotate(198deg)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });
})();