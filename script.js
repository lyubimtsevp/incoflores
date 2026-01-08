// ============================================
// INCOFLORES - Скрипты
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Слайдер географии
    initSlider();
    
    // Плавный скролл для навигации
    initSmoothScroll();
    
    // Валидация форм
    initFormValidation();
    
    // Хедер при скролле
    initHeaderScroll();
});

// === Слайдер ===
function initSlider() {
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    
    if (!prevBtn || !nextBtn || dots.length === 0) return;
    
    let currentSlide = 1;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('slide-active', 'slide-prev', 'slide-next');
            
            if (index === currentSlide) {
                slide.classList.add('slide-active');
            } else if (index === currentSlide - 1 || (currentSlide === 0 && index === totalSlides - 1)) {
                slide.classList.add('slide-prev');
            } else {
                slide.classList.add('slide-next');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('dot-active', index === currentSlide);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Автопрокрутка каждые 5 секунд
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
}

// === Плавный скролл ===
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === Валидация форм ===
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#DA6561';
                    
                    // Сброс стиля через 2 секунды
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            // Проверка телефона
            const phoneInput = this.querySelector('input[type="tel"]');
            if (phoneInput && phoneInput.value) {
                const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                    isValid = false;
                    phoneInput.style.borderColor = '#DA6561';
                }
            }
            
            // Проверка email
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#DA6561';
                }
            }
            
            if (isValid) {
                // Здесь можно добавить отправку формы
                showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.');
                this.reset();
            }
        });
    });
}

// === Уведомление ===
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: #DA6561;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(218, 101, 97, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Добавим стили анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// === Хедер при скролле ===
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// === Анимация при появлении в viewport ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    const animatedElements = document.querySelectorAll('.stat-item, .service-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Инициализация анимаций после загрузки
window.addEventListener('load', initScrollAnimations);
