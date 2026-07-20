/* ============================================================
   Page behaviour: nav state, mobile menu, reveals, hero video,
   and the live "open now" clock.
   ============================================================ */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav: solid once the page scrolls under it ---------- */
  const navWrap = document.getElementById('navWrap');
  const onScroll = () => navWrap.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileNav');

  const setNav = open => {
    drawer.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    document.body.classList.toggle('nav-open', open);
  };

  toggle.addEventListener('click', () => setNav(drawer.hidden));
  drawer.addEventListener('click', e => { if (e.target.tagName === 'A') setNav(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) setNav(false); });
  // The drawer is a mobile affordance; leaving it open through a resize to
  // desktop would lock body scroll with no visible way to release it.
  matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) setNav(false); });

  /* ---------- reveal on scroll ---------- */
  // The hidden state lives behind this class, so it only ever exists while
  // this script is running and able to undo it.
  const revealAll = () =>
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));

  if (reduced || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    document.documentElement.classList.add('js-reveal');

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        obs.unobserve(en.target);   // reveal once, not on every pass
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    // Observed after menu.js has injected its cards, so those reveal too.
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Watchdog. Some embedded webviews and reader modes never deliver
    // intersection callbacks; without this the page below the hero would stay
    // blank forever. Four seconds is long past a normal reveal and still short
    // enough that a stuck visitor is not left staring at nothing.
    setTimeout(() => {
      if (!document.querySelector('.reveal.in')) {
        document.documentElement.classList.remove('js-reveal');
        revealAll();
      }
    }, 4000);
  }

  /* ---------- hero video ---------- */
  const video = document.getElementById('heroVideo');
  if (video) {
    if (reduced) {
      // Stop at the poster. The loop is the page's whole idea, so honouring
      // the preference means not playing it at all.
      video.removeAttribute('autoplay');
      video.pause();
    } else {
      // Safari and some in-app browsers reject autoplay until the tab is
      // visible or the user has interacted. Retry rather than sit on a
      // frozen first frame.
      const play = () => video.play().catch(() => {});
      play();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) play();
      });
      addEventListener('pointerdown', play, { once: true });

      // Nothing to show but the gradient if the file is missing, which is
      // the state before build-loop.ps1 has been run.
      video.addEventListener('error', () => { video.style.display = 'none'; }, true);
    }
  }

  /* ---------- live clock ---------- */
  // The whole pitch is "we never close", so show it rather than assert it:
  // the restaurant's local time, ticking, next to a green dot.
  const badge = document.getElementById('liveBadge');
  const text  = document.getElementById('liveText');
  if (badge && text) {
    const fmt = new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul',   // the visitor may be anywhere; the kitchen is not
      hour: '2-digit', minute: '2-digit'
    });
    const tick = () => { text.textContent = `Şu an açık · ${fmt.format(new Date())}`; };
    tick();
    badge.hidden = false;
    setInterval(tick, 30000);
  }
})();
