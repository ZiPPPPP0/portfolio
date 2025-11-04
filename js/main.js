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

// Gestion du modal pour les projets
let currentModal = null;

// Fonction pour créer le modal
function createModal(projectData) {
    // Supprimer l'ancien modal s'il existe
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Créer le nouveau modal
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${projectData.title}</h3>
                    <button class="modal-close" aria-label="Fermer">&times;</button>
                </div>
                <div class="modal-body">
                    ${projectData.content}
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    currentModal = document.querySelector('.modal-overlay');

    // Activer le modal après un court délai pour l'animation
    setTimeout(() => {
        currentModal.classList.add('active');
    }, 10);

    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';

    // Ajouter les écouteurs d'événements
    attachModalListeners();
}

// Fonction pour fermer le modal
function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('active');

        setTimeout(() => {
            currentModal.remove();
            currentModal = null;
            document.body.style.overflow = '';
        }, 300);
    }
}

// Attacher les écouteurs d'événements au modal
function attachModalListeners() {
    // Fermeture par le bouton X
    const closeBtn = currentModal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);

    // Fermeture par clic sur l'overlay
    currentModal.addEventListener('click', (e) => {
        if (e.target === currentModal) {
            closeModal();
        }
    });

    // Fermeture par la touche Escape
    document.addEventListener('keydown', function escapeListener(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeListener);
        }
    });
}

// Données des projets (contenu des détails)
const projectsData = {
    'podologue': {
        title: 'Site web pour une podologue',
        content: `
            <h4>Détails du projet</h4>
            <ul>
                <li><strong>Technologies utilisées :</strong> HTML, CSS, JavaScript. Hébergeur : O2Switch, FileZilla pour la mise en service sur l'hébergeur</li>
                <li><strong>Durée :</strong> 2 semaines</li>
                <li><strong>Fonctionnalités :</strong> Site vitrine responsive, présentation des services, HTTPS</li>
                <li><strong>Objectifs :</strong> Créer une présence en ligne professionnelle pour attirer de nouveaux patients. Accessible sur la première page de recherche.</li>
            </ul>
            <p><strong>Défis relevés :</strong> Adapter le design aux besoins spécifiques du secteur médical tout en conservant une interface moderne et accessible.</p>
        `
    },
    'rftg': {
        title: 'Application de réservation de DVD - RFTG',
        content: `
            <h4>Détails du projet</h4>
            <ul>
                <li><strong>Technologies utilisées :</strong> PHP, MySQL, Java, XML, REST API, Android Studio</li>
                <li><strong>Durée :</strong> Projet en cours</li>
                <li><strong>Modules :</strong> Gestion des réservations, authentification, interface mobile et web</li>
                <li><strong>Objectif :</strong> Créer un système complet de gestion de DVD pour un parc à thème</li>
            </ul>
            <p><strong>Défis techniques :</strong> communication entre l'application mobile et le serveur via une API REST sécurisée, gestion multi-interface (web + mobile) et synchronisation des données avec la base MySQL.</p>
        `
    }
};

// Gestion des boutons "En savoir plus"
document.addEventListener('click', (e) => {
    if (e.target.matches('.project-more-btn') || e.target.closest('.project-more-btn')) {
        const button = e.target.closest('.project-more-btn');
        const projectId = button.getAttribute('data-project');

        if (projectsData[projectId]) {
            createModal(projectsData[projectId]);
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