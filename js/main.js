/* ============================================
   SANITARY PEST CONTROL — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ----- HAMBURGER MENU -----
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close nav on link click
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // ----- ACTIVE NAV LINK ON SCROLL -----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);

    // ----- HEADER SCROLL EFFECT -----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    });

    // ----- BACK TO TOP -----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- SMOOTH SCROLL FOR ANCHOR LINKS (fallback) -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----- CONTACT FORM -----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Gather form data
            const data = {
                name: form.querySelector('input[type="text"]').value.trim(),
                phone: form.querySelector('input[type="tel"]').value.trim(),
                email: form.querySelector('input[type="email"]').value.trim(),
                service: form.querySelector('select').value,
                message: form.querySelector('textarea').value.trim()
            };

            // Validate required fields
            if (!data.name || !data.phone) {
                alert('Please fill in your name and phone number.');
                return;
            }
            if (!data.service) {
                alert('Please select a service.');
                return;
            }

            // Show success state
            const btn = form.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate send via mailto fallback
            const subject = encodeURIComponent(`Pest Control Inquiry from ${data.name}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nMessage: ${data.message}`
            );
            window.location.href = `mailto:sanitarypc77@gmail.com?subject=${subject}&body=${body}`;

            // Reset after a moment
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = '#27ae60';
                btn.style.borderColor = '#27ae60';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ----- SCROLL REVEAL ANIMATIONS (Intersection Observer) -----
    const animateElements = document.querySelectorAll(
        '.service-card, .about__card, .why-card, .gallery__item, .contact__card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.animation = `fadeUp 0.6s ease ${delay}s forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // ----- KEYFRAME INJECTION -----
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

});
