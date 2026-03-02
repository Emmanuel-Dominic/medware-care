// Equipment Data - All 9 items from Medware catalog
const equipmentData = [
    {
        name: 'Wheelchairs',
        category: 'Mobility',
        description: 'Manual and powered wheelchairs for independent mobility and comfort.',
        inStock: 48
    },
    {
        name: 'Transfer Chairs',
        category: 'Mobility',
        description: 'Specialized chairs for safe patient transfer and mobility assistance.',
        inStock: 32
    },
    {
        name: 'Hospital Beds',
        category: 'Hospital',
        description: 'Adjustable electric hospital beds with pressure relief systems.',
        inStock: 28
    },
    {
        name: 'Oxygen Concentrators',
        category: 'Respiratory',
        description: 'Portable and stationary oxygen therapy equipment for home care.',
        inStock: 35
    },
    {
        name: 'Walking Frames',
        category: 'Mobility',
        description: 'Walkers with and without wheels for safe mobility support.',
        inStock: 56
    },
    {
        name: 'Patient Monitors',
        category: 'Diagnostic',
        description: 'Advanced vital signs monitoring systems for continuous patient care.',
        inStock: 52
    },
    {
        name: 'Suction Machines',
        category: 'Medical Support',
        description: 'Portable and stationary suction equipment for respiratory care.',
        inStock: 20
    },
    {
        name: 'Commodes',
        category: 'Mobility',
        description: 'Comfortable and hygienic commode chairs for home and facility use.',
        inStock: 42
    },
    {
        name: 'Ward Screens',
        category: 'Hospital',
        description: 'Privacy screens and portable dividers for patient care areas.',
        inStock: 65
    },
];

// Render Equipment Cards
function renderEquipmentCards() {
    const container = document.getElementById('equipmentCards');
    
    equipmentData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="equipment-card">
                <div class="p-4 pb-3">
                    <div class="equipment-badge">${item.category}</div>
                    <h5 class="fw-600 mb-2">${item.name}</h5>
                    <p class="text-muted small mb-3">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="badge bg-success text-white">${item.inStock} Available</small>
                        <a href="#contact" class="btn btn-primary btn-sm">Request</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offset = 80; // Account for sticky header
                const top = target.offsetTop - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Submission Handler
function setupFormHandler() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            const name = inputs[0].value;
            const phone = inputs[1].value;
            const equipment = inputs[2].value;
            
            if (name && phone && equipment) {
                const message = `Thank you, ${name}!\n\nWe've received your request:\n\n${equipment}\n\nOur team will contact you at ${phone} shortly.\n\nBest regards,\nThe Medware Team`;
                alert(message);
                form.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
}

// Active nav link on scroll
function setupActiveNavLink() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.market-card, .service-card-white, .why-card, .process-step, .equipment-card').forEach(el => {
        observer.observe(el);
    });
}

// Close mobile menu when clicking outside
function setupMobileMenuClose() {
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        const toggler = document.querySelector('.navbar-toggler');
        const collapse = document.querySelector('.navbar-collapse');
        
        if (collapse && collapse.classList.contains('show')) {
            if (!navbar.contains(event.target)) {
                toggler.click();
            }
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler.offsetParent !== null) { // Only if visible
                toggler.click();
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderEquipmentCards();
    setupSmoothScroll();
    setupFormHandler();
    setupScrollAnimations();
    setupActiveNavLink();
    setupMobileMenuClose();
});
