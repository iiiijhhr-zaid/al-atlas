let currentPage = 'home';

function showPage(pageId) {
    // إخفاء كل الصفحات لو موجودة
    const pages = document.querySelectorAll('.page');
    if (pages.length > 0) {
        pages.forEach(page => page.classList.remove('active'));
    }

    // إظهار الصفحة المطلوبة
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }

    // تحديث روابط التنقل لو موجودة
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
            link.classList.add('active');
        }
    });

    currentPage = pageId;

    // نقل الفوتر للصفحة الفعالة لو الصفحات موجودة
    const footer = document.getElementById('footer');
    if (footer && page) {
        page.appendChild(footer);
    }

    // سكرول للأعلى
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// نقل الفوتر للصفحة الرئيسية لو موجودة
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    if (footer && homePage) {
        homePage.appendChild(footer);
    }
});

// تحريك الخلفيات (Parallax)
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length === 0) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 20;
        const yPos = (y - 0.5) * speed * 20;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

// تأثير السكول على الخلفية
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.bg-shapes');
    if (!parallax) return;

    const scrolled = window.pageYOffset;
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// تأثير ripple على العناصر الزجاجية
const glassElements = document.querySelectorAll('.glass');
if (glassElements.length > 0) {
    glassElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// إضافة keyframes للرِبل
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// التعامل مع الفورم لو موجود
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        successMsg.textContent = 'Message sent successfully!';

        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);

        this.reset();
    });
}

// إضافة animation fade in
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(fadeStyle);
