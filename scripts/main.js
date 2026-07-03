document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-item, .image-reveal');
    animatedElements.forEach(el => observer.observe(el));
    
    // Trigger animations for elements immediately in view on load
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);

    // 3. Product Image Parallax Effect (Micro-interaction)
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const img = card.querySelector('.product-img');
            if (!img) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage from center
            const xPercent = (x / rect.width - 0.5) * 10; // Max 5px translation
            const yPercent = (y / rect.height - 0.5) * 10;
            
            img.style.transform = `scale(1.08) translate(${xPercent}px, ${yPercent}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.product-img');
            if (img) {
                img.style.transform = 'scale(1)'; // Reset
            }
        });
    });

    // 4. Hero Slider Logic
    const sliderImages = document.querySelectorAll('#hero-slider .hero-bg-img');
    if (sliderImages.length > 1) {
        let currentSlide = 0;
        
        setInterval(() => {
            // Remove active class from current slide
            sliderImages[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % sliderImages.length;
            
            // Add active class to new slide
            sliderImages[currentSlide].classList.add('active');
        }, 5000); // Change slide every 5 seconds
    }

    // 5. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
