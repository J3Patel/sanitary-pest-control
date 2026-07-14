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

    // ----- SMOOTH SCROLL -----
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

            const data = {
                name: form.querySelector('input[type="text"]').value.trim(),
                phone: form.querySelector('input[type="tel"]').value.trim(),
                email: form.querySelector('input[type="email"]').value.trim(),
                service: form.querySelector('select').value,
                message: form.querySelector('textarea').value.trim()
            };

            if (!data.name || !data.phone) {
                alert('Please fill in your name and phone number.');
                return;
            }
            if (!data.service) {
                alert('Please select a service.');
                return;
            }

            const subject = encodeURIComponent(`Pest Control Inquiry from ${data.name}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nMessage: ${data.message}`
            );

            const whatsappMsg = encodeURIComponent(
                `Hi Sanitary Pest Control! I need ${data.service}.\n\nName: ${data.name}\nPhone: ${data.phone}${data.email ? '\nEmail: ' + data.email : ''}${data.message ? '\n\nMessage: ' + data.message : ''}`
            );

            const contactOptions = `
                <div style="text-align:center;padding:10px 0;">
                    <h3 style="font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;margin-bottom:16px;color:#0a1628;">How would you like to reach us?</h3>
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <a href="https://wa.me/917709395838?text=${whatsappMsg}" target="_blank" class="btn" style="background:#25D366;color:#fff;border:none;justify-content:center;padding:16px;font-size:1rem;border-radius:50px;">
                            <i class="fab fa-whatsapp" style="font-size:1.2rem;"></i> Send via WhatsApp
                        </a>
                        <a href="mailto:sanitarypc77@gmail.com?subject=${subject}&body=${body}" class="btn" style="background:#6b7f3e;color:#fff;border:none;justify-content:center;padding:16px;font-size:1rem;border-radius:50px;">
                            <i class="fas fa-envelope"></i> Send via Email
                        </a>
                        <a href="tel:+917709395838" class="btn" style="background:#0a1628;color:#fff;border:none;justify-content:center;padding:16px;font-size:1rem;border-radius:50px;">
                            <i class="fas fa-phone"></i> Call Now: 7709395838
                        </a>
                        <p style="margin-top:10px;font-size:0.8rem;color:#888;">Or call us directly: <strong>7709395838</strong> / <strong>9850094761</strong></p>
                    </div>
                </div>
            `;

            form.innerHTML = contactOptions;
        });
    }

    // ----- SCROLL REVEAL ANIMATIONS -----
    const animateElements = document.querySelectorAll(
        '.service-card, .about__stat-card, .why-card, .gallery__item, .contact__card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeUp 0.6s ease forwards`;
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
