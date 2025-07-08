// Sélection des éléments
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

// Fonction pour afficher la page active et cacher les autres
function showPage(pageId) {
    sections.forEach(section => {
        if (section.id === pageId) {
            section.classList.remove('page-inactive');
            section.classList.add('page-active', 'fade-in');
        } else {
            section.classList.remove('page-active', 'fade-in');
            section.classList.add('page-inactive');
        }
    });
}

// Navigation mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile après avoir cliqué sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Identifier la section cible
        const targetId = link.getAttribute('href').substring(1);
        
        // Afficher la page correspondante
        showPage(targetId);
        
        // Mettre à jour la classe active sur les liens de navigation
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Fermer le menu mobile si ouvert
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Faire défiler vers la section (en haut de la page)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Animation des barres de compétences
const skillSection = document.getElementById('competences');
const progressBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Animation lors du chargement de la page compétences
navLinks.forEach(link => {
    if (link.getAttribute('href') === '#competences') {
        link.addEventListener('click', animateSkills);
    }
});

// Gestion des boutons "En savoir plus" des projets
document.addEventListener('click', (e) => {
    if (e.target.matches('.project-more-btn') || e.target.closest('.project-more-btn')) {
        const button = e.target.closest('.project-more-btn');
        const projectId = button.getAttribute('data-project');
        const details = document.getElementById(`${projectId}-details`);
        const chevron = button.querySelector('i');
        
        if (details) {
            // Toggle des classes active
            details.classList.toggle('active');
            button.classList.toggle('active');
            
            // Changer le texte du bouton
            if (details.classList.contains('active')) {
                button.innerHTML = `Réduire <i class="fas fa-chevron-down"></i>`;
            } else {
                button.innerHTML = `En savoir plus <i class="fas fa-chevron-down"></i>`;
            }
        }
    }
});

// Gestion du formulaire de contact
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simuler l'envoi d'un formulaire
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler une réponse de serveur après 2 secondes
        setTimeout(() => {
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Initialisation: afficher la page d'accueil par défaut
document.addEventListener('DOMContentLoaded', () => {
    showPage('accueil');
});