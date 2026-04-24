/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         MI GENERACIÓN TOUR — JAVASCRIPT PRINCIPAL               ║
 * ║         Versión producción — Vercel + Supabase                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // DETECCIÓN DE DISPOSITIVO
  // ══════════════════════════════════════════════════════════════════
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ══════════════════════════════════════════════════════════════════
  // CURSOR PERSONALIZADO (solo desktop)
  // ══════════════════════════════════════════════════════════════════
  if (!isMobile) {
    const cur  = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (cur)  { cur.style.left  = mx + 'px'; cur.style.top  = my + 'px'; }
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top  = ry + 'px'; }
      requestAnimationFrame(animRing);
    }
    animRing();
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDER DE HERO — carrusel infinito
  // ══════════════════════════════════════════════════════════════════
  (function() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    function setupInfiniteCarousel() {
      const items = Array.from(track.children);
      items.forEach(function(item) {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      requestAnimationFrame(function() {
        const halfWidth  = track.scrollWidth / 2;
        const baseSpeed  = window.innerWidth <= 768 ? 18000 : 26000;
        const duration   = Math.max(10000, halfWidth / (halfWidth / baseSpeed));
        track.style.animationDuration = Math.round(duration) + 'ms';
      });
    }

    function setupLazyImages() {
      if (!('IntersectionObserver' in window)) return;
      const lazyImgs = document.querySelectorAll('.hero__carousel img[data-src]');
      if (!lazyImgs.length) return;
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      lazyImgs.forEach(function(img) { observer.observe(img); });
    }

    document.addEventListener('visibilitychange', function() {
      const t = document.getElementById('carouselTrack');
      if (!t) return;
      t.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() { setupInfiniteCarousel(); setupLazyImages(); });
    } else {
      setupInfiniteCarousel(); setupLazyImages();
    }
  })();

  // ══════════════════════════════════════════════════════════════════
  // CANVAS REVEAL — ARQUITECTURA ADAPTATIVA
  // ══════════════════════════════════════════════════════════════════
  const container = document.getElementById('revealContainer');
  const canvas    = document.getElementById('revealCanvas');

  if (container && canvas) {
    const ctx = canvas.getContext('2d');
    const cfg = window.REVEAL_CONFIG || {
      DESKTOP_RADIUS: 80, MOBILE_AUTO_SPEED: 2000,
      MAX_DROPS: 60, MOBILE_MAX_DROPS: 20, TOUCH_THROTTLE_MS: 16, MOBILE_RADIUS: 50,
    };

    function resizeCanvas() {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
      ctx.fillStyle = '#080705';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    });

    if (!isMobile) {
      // ── DESKTOP ───────────────────────────────────────────────────
      const drops = [];
      container.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, cfg.DESKTOP_RADIUS, 0, Math.PI * 2); ctx.fill();
        if (drops.length < cfg.MAX_DROPS) {
          for (let i = 0; i < 3; i++) drops.push({ x, y, r: Math.random() * 10 + 5, alpha: 1 });
        }
      });

      (function animateDrops() {
        ctx.globalCompositeOperation = 'destination-out';
        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i]; d.r += 0.8; d.alpha -= 0.025;
          ctx.globalAlpha = Math.max(0, d.alpha);
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
          if (d.alpha <= 0) drops.splice(i, 1);
        }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(animateDrops);
      })();

      const hintEl = container.querySelector('.reveal-text p');
      if (hintEl) hintEl.textContent = 'Mueve el cursor y descúbrela';

    } else {
      // ── MOBILE: AUTO-REVEAL ────────────────────────────────────────
      container.style.cursor = 'default';
      const hintEl = container.querySelector('.reveal-text p');
      if (hintEl) hintEl.textContent = 'Desliza para descubrir';

      let autoRevealStarted = false;
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !autoRevealStarted) {
            autoRevealStarted = true;
            if (prefersReducedMotion) {
              ctx.globalCompositeOperation = 'destination-out';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              return;
            }
            const centerX = canvas.width / 2, centerY = canvas.height / 2;
            const maxRadius = Math.hypot(centerX, centerY) * 1.1;
            let startTime = null;
            (function expandReveal(ts) {
              if (!startTime) startTime = ts;
              const progress = Math.min((ts - startTime) / cfg.MOBILE_AUTO_SPEED, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.globalCompositeOperation = 'source-over';
              ctx.fillStyle = '#080705'; ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.globalCompositeOperation = 'destination-out';
              ctx.beginPath(); ctx.arc(centerX, centerY, maxRadius * eased, 0, Math.PI * 2); ctx.fill();
              ctx.globalCompositeOperation = 'source-over';
              if (progress < 1) requestAnimationFrame(expandReveal);
            })(performance.now());
          }
        });
      }, { threshold: 0.3 });
      revealObserver.observe(container);
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SCROLL REVEAL
  // ══════════════════════════════════════════════════════════════════
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const scrollObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); scrollObs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => scrollObs.observe(el));
  }

  // ══════════════════════════════════════════════════════════════════
  // PARALLAX SUTIL EN HERO (solo desktop)
  // ══════════════════════════════════════════════════════════════════
  if (!isMobile && !prefersReducedMotion) {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
          heroContent.style.opacity   = 1 - (scrolled / window.innerHeight) * 1.2;
        }
      }, { passive: true });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // UTILIDADES: VALIDACIÓN Y SANITIZACIÓN
  // ══════════════════════════════════════════════════════════════════
  const CIUDADES_VALIDAS = [
    'medellín','medellin','bogotá','bogota','cali','neiva',
    'pasto','barranquilla','villavicencio','ecuador','perú','peru','méxico','mexico'
  ];

  function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/<[^>]*>/g, '')
      .replace(/[<>"'`\\;{}()\[\]]/g, '')
      .replace(/[\x00-\x1F\x7F]/g, '')
      .trim()
      .slice(0, 200);
  }

  function esTextoValido(str) {
    return /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'\-.]+$/.test(str);
  }

  function esTelefonoValido(str) {
    return /^[+\d\s()\-]{7,20}$/.test(str);
  }

  function esCiudadValida(str) {
    const norm = str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return CIUDADES_VALIDAS.some(c => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === norm);
  }

  // ══════════════════════════════════════════════════════════════════
  // SHARED — sendToSupabase / sendToLaylo
  // ══════════════════════════════════════════════════════════════════
  async function sendToSupabase(data) {
    const cfg = window.TOUR_CONFIG && window.TOUR_CONFIG.SUPABASE;
    if (!cfg || !cfg.URL || cfg.URL.includes('TU_PROYECTO')) {
      console.warn('[Supabase] Credenciales no configuradas. Ver config.js');
      return { ok: false, error: 'supabase_not_configured' };
    }
    const payload = {
      nombre:       data.nombre       || null,
      telefono:     data.telefono     || null,
      email:        data.email        || null,
      ciudad:       data.ciudad       || null,
      compro:       data.compro       || null,
      razones:      data.razones      || null,
      otro_detalle: data.otro_detalle || null,
    };
    try {
      const res = await fetch(`${cfg.URL}/rest/v1/${cfg.TABLE}`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':         cfg.ANON_KEY,
          'Authorization': `Bearer ${cfg.ANON_KEY}`,
          'Prefer':         'return=minimal',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error('[Supabase] Error:', err);
        return { ok: false, error: err };
      }
      return { ok: true };
    } catch (err) {
      console.error('[Supabase] Network error:', err);
      return { ok: false, error: err.message };
    }
  }

  async function sendToLaylo(data) {
    const cfg = window.TOUR_CONFIG && window.TOUR_CONFIG.LAYLO;
    if (!cfg || !cfg.ENABLED || !cfg.API_KEY) return { ok: true, skipped: true };
    try {
      const res = await fetch(`${cfg.ENDPOINT}/${cfg.DROP_ID}/fans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.API_KEY}` },
        body: JSON.stringify({ phone: data.telefono, name: data.nombre, metadata: { ciudad: data.ciudad, compro: data.compro } }),
      });
      if (!res.ok) { const err = await res.text(); console.warn('[Laylo] Error:', err); return { ok: false, error: err }; }
      return { ok: true };
    } catch (err) {
      console.warn('[Laylo] Network error:', err);
      return { ok: false, error: err.message };
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // FORMULARIO HERO — Modal automático a los 5 segundos
  // Aparece al 70% del viewport, cierre SOLO con botón X
  // ══════════════════════════════════════════════════════════════════
  (function initHeroModal() {
    const overlay  = document.getElementById('heroModalOverlay');
    const card     = document.getElementById('heroModalCard');
    const closeBtn = document.getElementById('heroModalClose');
    const regForm  = document.getElementById('registrationForm');
    const feedbackEl = document.getElementById('heroFormFeedback');

    if (!overlay || !card) return;

    // Auto-abrir tras 5 segundos
    setTimeout(function() {
      overlay.classList.add('is-active');
      card.classList.add('is-visible');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
    }, 5000);

    // Cerrar SOLO con botón X
    if (closeBtn) closeBtn.addEventListener('click', function() {
      overlay.classList.remove('is-active');
      card.classList.remove('is-visible');
    });

    if (!regForm) return;

    function clearModalErrors() {
      regForm.querySelectorAll('.rf-error').forEach(el => el.remove());
    }

    function showModalError(input, msg) {
      if (!input) return;
      const group = input.closest('.rf-field-group') || input.closest('.rf-consent') || input.parentElement;
      let errEl = group.querySelector('.rf-error');
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'rf-error';
        errEl.setAttribute('role', 'alert');
        group.appendChild(errEl);
      }
      errEl.textContent = msg;
    }

    function validateModalForm() {
      clearModalErrors();
      let valid = true;

      const nameInput   = regForm.querySelector('[name="name"]');
      const phoneInput  = regForm.querySelector('[name="phone"]');
      const emailInput = regForm.querySelector('[name="email"]');
      const emailVal = sanitize(emailInput ? emailInput.value : '');
      const cityChecked = regForm.querySelector('[name="city"]:checked');
      const cityGroup   = regForm.querySelector('.rf-radios');
      const consent     = regForm.querySelector('[name="consent"]');

      const nameVal  = sanitize(nameInput  ? nameInput.value  : '');
      const phoneVal = sanitize(phoneInput ? phoneInput.value : '');

      if (!nameVal) {
        showModalError(nameInput, 'Ingresa tu nombre'); valid = false;
      } else if (!esTextoValido(nameVal)) {
        showModalError(nameInput, 'Solo letras, sin números'); valid = false;
      }

      if (!phoneVal) {
        showModalError(phoneInput, 'Ingresa tu número de WhatsApp'); valid = false;
      } else if (!esTelefonoValido(phoneVal)) {
        showModalError(phoneInput, 'Número inválido (solo dígitos, +, guiones)'); valid = false;
      }
      if (!emailVal) {
          showModalError(emailInput, 'Ingresa tu correo electrónico');
          valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          showModalError(emailInput, 'Correo inválido');
          valid = false;
        }

      if (!cityChecked) {
        const errEl = document.createElement('span');
        errEl.className = 'rf-error'; errEl.setAttribute('role', 'alert');
        errEl.textContent = 'Selecciona tu ciudad';
        if (cityGroup && cityGroup.parentElement) cityGroup.parentElement.appendChild(errEl);
        valid = false;
      }

      if (consent && !consent.checked) {
        showModalError(consent, 'Debes aceptar los términos'); valid = false;
      }

      return valid;
    }

    regForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!validateModalForm()) return;

      const btn = regForm.querySelector('.rfcard-submit');
      if (btn) { btn.classList.add('loading'); btn.disabled = true; }
      if (feedbackEl) { feedbackEl.textContent = ''; feedbackEl.className = 'rfcard-feedback'; }

      const nameInput   = regForm.querySelector('[name="name"]');
      const phoneInput  = regForm.querySelector('[name="phone"]');
      const emailInput = regForm.querySelector('[name="email"]');
      const cityChecked = regForm.querySelector('[name="city"]:checked');

      const emailVal = sanitize(emailInput ? emailInput.value : '');

      const formData = {
        nombre:   sanitize(nameInput  ? nameInput.value  : ''),
        telefono: sanitize(phoneInput ? phoneInput.value : ''),
        email:    emailVal,
        ciudad:   cityChecked ? sanitize(cityChecked.value) : '',
        compro:   null,
        razones:  null,
        otro_detalle: null,
      };

      const result = await sendToSupabase(formData);

      if (btn) { btn.classList.remove('loading'); btn.disabled = false; }

        if (result.ok || result.error === 'supabase_not_configured') {
          if (feedbackEl) {
            feedbackEl.textContent = '✓ Registro enviado correctamente.';
            feedbackEl.className = 'rfcard-feedback success';
          }
          regForm.reset();
        } else {
          if (feedbackEl) {
            feedbackEl.textContent = 'Error al enviar. Intenta de nuevo.';
            feedbackEl.className = 'rfcard-feedback err';
          }
        }
    });
  })();

  // ══════════════════════════════════════════════════════════════════
  // FORMULARIO DE INTERÉS (sección inferior de la página)
  // ══════════════════════════════════════════════════════════════════
  const form          = document.getElementById('interestForm');
  const reasonSec     = document.getElementById('reasonsSection');
  const otroSec       = document.getElementById('otroSection');
  const feedback      = document.getElementById('formFeedback');
  const submitBtn     = document.getElementById('fsbtn');
  const privacyToggle = document.getElementById('privacyToggle');
  const privacyNotice = document.getElementById('privacyPolicyText'); // -> Correción

  // Poblar política desde config
  const policyText = document.getElementById('privacyPolicyText');
  if (policyText && window.TOUR_CONFIG && window.TOUR_CONFIG.PRIVACY_POLICY) {
    policyText.innerHTML = window.TOUR_CONFIG.PRIVACY_POLICY;
  }

  if (privacyToggle && privacyNotice) {
    privacyToggle.addEventListener('click', () => {
      const hidden = privacyNotice.hidden;
      privacyNotice.hidden = !hidden;
      privacyToggle.setAttribute('aria-expanded', String(!hidden));
    });
  }

  const radioSi = form ? form.querySelector('input[name="compro"][value="si"]') : null;
  const radioNo = form ? form.querySelector('input[name="compro"][value="no"]') : null;

  function toggleReasons() {
    if (!reasonSec) return;
    const showReasons = radioNo && radioNo.checked;
    reasonSec.hidden = !showReasons;
    reasonSec.setAttribute('aria-hidden', String(!showReasons));
  }

  if (radioSi) radioSi.addEventListener('change', toggleReasons);
  if (radioNo) radioNo.addEventListener('change', toggleReasons);

  const otroCheck = form ? form.querySelector('input[name="razones"][value="otro"]') : null;
  if (otroCheck && otroSec) {
    otroCheck.addEventListener('change', () => {
      otroSec.hidden = !otroCheck.checked;
      otroSec.setAttribute('aria-hidden', String(!otroCheck.checked));
    });
  }

  function validateInterestForm() {
    let valid = true;
    form.querySelectorAll('.field-error').forEach(el => el.textContent = '');

    const nombre  = form.querySelector('#fn');
    const tel     = form.querySelector('#ft');
    const email   = form.querySelector('#fe');
    const ciudad  = form.querySelector('#fc');
    const compro  = form.querySelector('input[name="compro"]:checked');
    const consent = form.querySelector('#consent');

    const nombreVal = sanitize(nombre ? nombre.value : '');
    const telVal    = sanitize(tel    ? tel.value    : '');
    const emailVal  = sanitize(email? email.value : '');
    const ciudadVal = sanitize(ciudad ? ciudad.value : '');

    function esEmailValido(str){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
    }
    if (!emailVal){
      showError(email,'por favor ingresa tu correo');
      valid=false;
    }else if (!esEmailValido(emailVal)){
        showError(email, 'Correo inválido');
        valid = false;
      
    }

    if (!nombreVal) {
      showError(nombre, 'Por favor ingresa tu nombre'); valid = false;
    } else if (!esTextoValido(nombreVal)) {
      showError(nombre, 'El nombre solo debe contener letras'); valid = false;
    }

    if (!telVal) {
      showError(tel, 'Por favor ingresa tu teléfono'); valid = false;
    } else if (!esTelefonoValido(telVal)) {
      showError(tel, 'Número inválido (solo dígitos, +, guiones)'); valid = false;
    }

    if (!ciudadVal) {
      showError(ciudad, 'Por favor ingresa tu ciudad'); valid = false;
    } else if (!esCiudadValida(ciudadVal)) {
      showError(ciudad, 'Ciudad no válida. Opciones: Medellín, Bogotá, Cali, Neiva, Pasto, Barranquilla, Villavicencio, Ecuador, Perú, México'); valid = false;
    }

    if (!compro) {
      const rg = form.querySelector('[name="compro"]') ? form.querySelector('[name="compro"]').closest('.frow-radio') : null;
      const errEl = rg ? rg.querySelector('.field-error') : null;
      if (errEl) errEl.textContent = 'Por favor selecciona una opción';
      valid = false;
    }

    if (consent && !consent.checked) {
      const cr = consent.closest('.frow-consent');
      const errEl = cr ? cr.querySelector('.field-error') : null;
      if (errEl) errEl.textContent = 'Debes aceptar el tratamiento de datos';
      valid = false;
    }

    return valid;
  }

  function showError(input, msg) {
    if (!input) return;
    const row = input.closest('.frow');
    const errEl = row ? row.querySelector('.field-error') : null;
    if (errEl) errEl.textContent = msg;
    if (input.focus) input.focus();
  }

  function collectInterestFormData() {
    const compro      = form.querySelector('input[name="compro"]:checked');
    const razones     = Array.from(form.querySelectorAll('input[name="razones"]:checked')).map(el => el.value);
    const otroDetalle = form.querySelector('#fo');
    return {
      nombre:       sanitize(form.querySelector('#fn').value),
      telefono:     sanitize(form.querySelector('#ft').value),
      ciudad:       sanitize(form.querySelector('#fc').value),
      compro:       compro ? compro.value : null,
      razones:      razones.length ? razones : null,
      otro_detalle: (razones.includes('otro') && otroDetalle) ? sanitize(otroDetalle.value) : null,
    };
  }

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!validateInterestForm()) return;

      if (submitBtn) { submitBtn.classList.add('loading'); submitBtn.disabled = true; }
      if (feedback)  { feedback.hidden = true; feedback.className = 'form-feedback'; }

      const formData = collectInterestFormData();
      const [supabaseResult, layloResult] = await Promise.all([
        sendToSupabase(formData),
        sendToLaylo(formData),
      ]);

      if (submitBtn) { submitBtn.classList.remove('loading'); submitBtn.disabled = false; }

      if (supabaseResult.ok || supabaseResult.error === 'supabase_not_configured') {
        if (feedback) {
          feedback.textContent = supabaseResult.error === 'supabase_not_configured'
            ? '✓ Recibido (modo desarrollo — configura Supabase en config.js)'
            : '✓ ¡Listo! Te avisaremos sobre el evento. Nos vemos el 17 de septiembre.';
          feedback.classList.add('success');
          feedback.hidden = false;
        }
        form.reset();
        toggleReasons();
        if (otroSec) otroSec.hidden = true;
        if (feedback) feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        if (feedback) {
          feedback.textContent = 'Hubo un error al enviar. Por favor intenta de nuevo.';
          feedback.classList.add('error');
          feedback.hidden = false;
        }
      }

      if (layloResult && !layloResult.skipped && !layloResult.ok) {
        console.warn('[Laylo] No se pudo sincronizar. Dato guardado en Supabase.');
      }
    });
  }

  // ── Laylo Widget ──────────────────────────────────────────────────
  const layloWidget = document.getElementById('layloWidget');
  if (layloWidget && window.TOUR_CONFIG && window.TOUR_CONFIG.LAYLO && window.TOUR_CONFIG.LAYLO.ENABLED) {
    layloWidget.hidden = false;
    layloWidget.removeAttribute('aria-hidden');
    layloWidget.innerHTML = `
      <div style="font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--stone);padding:1.5rem;text-align:center;">
        Widget de Laylo — Configurar según docs/LAYLO_INTEGRATION.md
      </div>
    `;
  }

})();
