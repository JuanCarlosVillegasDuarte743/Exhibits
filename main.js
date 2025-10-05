class Gallery {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImg');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.closeBtn = document.querySelector('.close');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.preloadImages();
    }
    
    bindEvents() {
        // Click en items de la galería
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.openModal(e.currentTarget);
            });
        });
        
        // Cerrar modal
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Cerrar modal haciendo click fuera
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }
    
    openModal(galleryItem) {
        const image = galleryItem.querySelector('.image');
        const title = galleryItem.querySelector('.overlay-content h3');
        const description = galleryItem.querySelector('.overlay-content p');
        
        this.modalImg.src = image.src;
        this.modalImg.alt = image.alt;
        this.modalTitle.textContent = title.textContent;
        this.modalDescription.textContent = description.textContent;
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Forzar reflow para asegurar la animación
        this.modal.offsetHeight;
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    preloadImages() {
        // Precarga de imágenes para mejor experiencia
        const images = document.querySelectorAll('.image');
        images.forEach(img => {
            const preload = new Image();
            preload.src = img.src;
        });
    }
}

// Efectos de scroll suave
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos de la galería para efectos al hacer scroll
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
    initScrollEffects();
});

// Versión simplificada de partículas (opcional)
function createBackgroundParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const particles = [];
    const particleCount = 30;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(102, 126, 234, ${Math.random() * 0.2})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > width) this.x = 0;
            else if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            else if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    function handleResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', handleResize);
    init();
    animate();
}

