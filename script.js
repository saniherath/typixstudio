'use strict';
//WhatsApp Number
const WHATSAPP_NUMBER = '+94751810675';

//display email and address
const CONTACT_EMAIL = 'hello@typixstudio.lk';
const CONTACT_PHONE = '+94 75 181 0675';
const CONTACT_ADDRESS = 'Kandy, Sri Lanka';

//Social links
const FACEBOOK_URL = 'https://facebook.com/typixstudio';
const INSTAGRAM_URL = 'https://instagram.com/typixstudio';

//Tagline
const TAGLINE = 'Design. Create. Inspire.';

/* =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const elEmail = document.getElementById('contactEmail');
  const elPhone = document.getElementById('contactPhone');
  const elAddress = document.getElementById('contactAddress');
  const elYear = document.getElementById('year');
  const elTag = document.getElementById('animatedTagline');
  const fb = document.getElementById('facebookLink');
  const ig = document.getElementById('instagramLink');

  if (elEmail) {
    elEmail.textContent = CONTACT_EMAIL;
    elEmail.setAttribute('href', 'mailto:' + CONTACT_EMAIL);
  }
  if (elPhone) elPhone.textContent = CONTACT_PHONE;
  if (elAddress) elAddress.textContent = CONTACT_ADDRESS;
  if (elYear) elYear.textContent = new Date().getFullYear();
  if (elTag) elTag.textContent = TAGLINE;
  if (fb) fb.setAttribute('href', FACEBOOK_URL);
  if (ig) ig.setAttribute('href', INSTAGRAM_URL);

  // Set WhatsApp links
  const makeWa = (num) => {
    const cleaned = String(num).replace(/[^0-9]/g, '');
    return 'https://wa.me/' + encodeURIComponent(cleaned);
  };
  const waUrl = makeWa(WHATSAPP_NUMBER);
  const wpFloat = document.getElementById('whatsappFloat');
  const heroCta = document.getElementById('heroCta');
  const topCta = document.getElementById('topWhatsappCta');
  if (wpFloat) wpFloat.setAttribute('href', waUrl);
  if (heroCta) heroCta.setAttribute('href', waUrl);
  if (topCta) topCta.setAttribute('href', waUrl);

  // CAPTCHa initial set (simple math)
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  const captchaA = document.getElementById('captchaA');
  const captchaB = document.getElementById('captchaB');
  const captchaField = document.getElementById('captcha');
  if (captchaA) captchaA.textContent = a;
  if (captchaB) captchaB.textContent = b;
  if (captchaField) captchaField.dataset.expected = String(a + b);

  // Contact form handling (client-side)
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Basic sanitization helper
  function sanitize(s) {
    return String(s).replace(/<[^>]*>?/gm, '').trim();
  }

  if (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      // Honeypot check
      const hp = document.getElementById('hp_field');
      if (hp && hp.value) {
        if (formStatus) formStatus.textContent = 'Spam detected.';
        return;
      }

      const name = sanitize(document.getElementById('name').value || '');
      const email = sanitize(document.getElementById('email').value || '');
      const message = sanitize(document.getElementById('message').value || '');
      const captcha = sanitize(document.getElementById('captcha').value || '');
      const expected = document.getElementById('captcha').dataset.expected || '';

      // validation
      if (!name || name.length < 2) { if (formStatus) formStatus.textContent = 'Please enter your name.'; return; }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) { if (formStatus) formStatus.textContent = 'Please enter a valid email.'; return; }
      if (!message || message.length < 6) { if (formStatus) formStatus.textContent = 'Message is too short.'; return; }
      if (captcha !== expected) { if (formStatus) formStatus.textContent = 'Incorrect anti-spam answer.'; return; }

      // mailto fallback (client-side only)
      const subject = encodeURIComponent('Inquiry from website: ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + CONTACT_PHONE + '\nAddress: ' + CONTACT_ADDRESS + '\n\nMessage:\n' + message);
      const mailto = 'mailto:' + encodeURIComponent(CONTACT_EMAIL) + '?subject=' + subject + '&body=' + body;

      // Open mailto using anchor
      const aEl = document.createElement('a');
      aEl.href = mailto;
      aEl.target = '_blank';
      aEl.rel = 'noopener noreferrer';
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);

      if (formStatus) formStatus.textContent = 'Email client opened — please send the message to complete.';

      // reset some fields and regenerate captcha
      document.getElementById('message').value = '';
      document.getElementById('captcha').value = '';
      const a2 = Math.floor(Math.random() * 8) + 1;
      const b2 = Math.floor(Math.random() * 8) + 1;
      if (captchaA) captchaA.textContent = a2;
      if (captchaB) captchaB.textContent = b2;
      if (captchaField) captchaField.dataset.expected = String(a2 + b2);
    });
  }

  // whatsapp float
  const wpButton = document.getElementById('whatsappFloat');
  if (wpButton) {
    wpButton.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') this.click();
    });
  }

  //reveal elements when scrolled into view
  const reveals = document.querySelectorAll('.service-card, .why-item, .split-text, .hero-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('reveal');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));
});
