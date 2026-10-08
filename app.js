
    // Reveal content in small groups as it enters the viewport.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      document.querySelectorAll('main > section').forEach(section => {
        Array.from(section.children).forEach((element, index) => {
          // Keep the opening introduction immediately visible.
          if (section === document.querySelector('main > section')) return;
          element.classList.add('reveal-pending');
          element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 65}ms`);
          revealObserver.observe(element);
        });
      });
      reducedMotion.addEventListener('change', event => {
        if (event.matches) {
          document.querySelectorAll('.reveal-pending').forEach(element => element.classList.add('is-visible'));
          revealObserver.disconnect();
        }
      });
    }

    const topButton = document.getElementById('back-to-top');
    topButton.addEventListener('click', () => {
      document.querySelector('header a').focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    });
    const progressBar = document.querySelector('.scroll-progress');
    const sections = Array.from(document.querySelectorAll('main > section[id]'));
    const navigationLinks = document.querySelectorAll('header nav a[href^="#"]');
    let scrollFramePending = false;
    const updateScroll = () => {
      const showTopButton = window.scrollY > 300;
      topButton.classList.toggle('is-visible', showTopButton);
      topButton.setAttribute('aria-hidden', String(!showTopButton));
      topButton.tabIndex = showTopButton ? 0 : -1;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
      let currentSection = '';
      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= window.innerHeight * .35) currentSection = section.id;
      });
      navigationLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSection}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      scrollFramePending = false;
    };
    const scheduleScrollUpdate = () => {
      if (!scrollFramePending) {
        scrollFramePending = true;
        requestAnimationFrame(updateScroll);
      }
    };
    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
    window.addEventListener('resize', scheduleScrollUpdate);
    window.addEventListener('load', scheduleScrollUpdate);
    updateScroll();

    const deliveryPicker = document.getElementById('quote-delivery');
    const closeDeliveryPicker = (restoreFocus = false) => {
      deliveryPicker.open = false;
      if (restoreFocus) deliveryPicker.querySelector('summary').focus();
    };
    deliveryPicker.addEventListener('change', event => {
      if (event.target.name !== 'delivery') return;
      document.getElementById('delivery-selected').textContent = event.target.dataset.label;
      document.getElementById('delivery-icon').textContent = event.target.dataset.icon;
    });
    deliveryPicker.querySelectorAll('input').forEach(input => {
      input.addEventListener('click', () => closeDeliveryPicker(true));
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          closeDeliveryPicker(true);
        }
      });
    });
    deliveryPicker.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeDeliveryPicker(true);
    });
    document.addEventListener('click', event => {
      if (!deliveryPicker.contains(event.target)) closeDeliveryPicker();
    });
    deliveryPicker.addEventListener('focusout', event => {
      if (!deliveryPicker.contains(event.relatedTarget)) closeDeliveryPicker();
    });

    document.querySelectorAll('[data-service]').forEach(link => {
      link.addEventListener('click', () => {
        const radio = Array.from(document.querySelectorAll('input[name="projectType"]')).find(input => input.value === link.dataset.service);
        if (radio) radio.checked = true;
      });
    });

    const contactConfirmation = document.getElementById('contact-confirmation');
    const contactConfirmOpen = document.getElementById('contact-confirm-open');
    const confirmGmail = url => {
      const compose = new URL(url);
      const recipient = compose.searchParams.get('to') || 'villamorstephen903@gmail.com';
      const subject = compose.searchParams.get('su') || '';
      const body = compose.searchParams.get('body') || '';
      const emailUri = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const android = /Android/i.test(navigator.userAgent);
      const mobile = android || /iPhone|iPad|iPod/i.test(navigator.userAgent);
      contactConfirmOpen.href = android
        ? `intent:${emailUri.slice(7)}#Intent;scheme=mailto;action=android.intent.action.SENDTO;package=com.google.android.gm;end`
        : mobile ? emailUri : url;
      contactConfirmOpen.target = mobile ? '_self' : '_blank';
      document.getElementById('contact-confirm-title').textContent = mobile ? 'Open your email app?' : 'Open Gmail?';
      contactConfirmOpen.textContent = android ? 'Open Gmail app' : mobile ? 'Open email app' : 'Open Gmail';
      document.getElementById('contact-confirm-description').textContent = mobile
        ? 'Your phone will be asked to open a compose message with your project details. Your portfolio and form stay here. On iPhone, your default email app handles this request.'
        : 'Gmail will open in a new tab with your message ready to review. Your portfolio and project details will stay here.';
      const fallback = document.getElementById('contact-email-fallback');
      fallback.href = emailUri;
      fallback.hidden = !mobile;
      fallback.style.display = mobile ? 'block' : 'none';
      contactConfirmation.showModal();
    };
    contactConfirmOpen.addEventListener('click', () => contactConfirmation.close());
    document.getElementById('contact-email-fallback').addEventListener('click', () => contactConfirmation.close());
    document.querySelectorAll('a[href^="https://mail.google.com/"]').forEach(link => {
      if (link === contactConfirmOpen) return;
      link.addEventListener('click', event => {
        event.preventDefault();
        confirmGmail(link.href);
      });
    });

    // Prepare the quote in the selected contact app; the visitor sends it.
    document.getElementById('quote-form').addEventListener('submit', event => {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const name = fields.get('clientName').trim();
      const nameInput = document.getElementById('quote-name');
      nameInput.setCustomValidity(name ? '' : 'Please enter your name.');
      if (!nameInput.reportValidity()) return;
      const projectType = fields.get('projectType');
      const subject = `Quote request: ${projectType}`;
      const body = `Name: ${name}\nProject type: ${projectType}\n\n${fields.get('details').trim()}`;
      const delivery = fields.get('delivery');
      if (delivery === 'gmail') {
        confirmGmail(`https://mail.google.com/mail/?view=cm&fs=1&to=villamorstephen903%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      } else if (delivery === 'sms') {
        const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
        window.location.href = `sms:+639703652552${separator}body=${encodeURIComponent(subject + '\n\n' + body)}`;
      } else {
        window.location.href = `mailto:villamorstephen903@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    });
    document.getElementById('quote-name').addEventListener('input', event => event.target.setCustomValidity(''));

    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuIcon.textContent = isHidden ? 'menu' : 'close';
        mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
      });

      // Close mobile menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          menuIcon.textContent = 'menu';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Carousel desktop & keyboard navigation
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (carousel && prevBtn && nextBtn) {
      const getScrollStep = () => {
        const firstItem = carousel.querySelector('.snap-item');
        return firstItem ? firstItem.offsetWidth + 16 : 380;
      };

      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }
  