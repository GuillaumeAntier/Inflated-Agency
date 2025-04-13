// JavaScript pour le menu burger
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navContainer = document.querySelector('.nav-container');
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Fonction pour ouvrir/fermer le menu
    function toggleMenu() {
      const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
      burgerMenu.setAttribute('aria-expanded', !isExpanded);
      
      if (isExpanded) {
        navContainer.classList.remove('open');
        document.body.style.overflow = ''; // Réactiver le défilement
      } else {
        navContainer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement en arrière-plan
      }
    }
    
    // Gestionnaire d'événement pour le bouton burger
    burgerMenu.addEventListener('click', toggleMenu);
    
    // Fermer le menu quand on clique sur un lien
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navContainer.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
    
    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navContainer.classList.contains('open')) {
        toggleMenu();
      }
    });
    
    // Gestion de la taille de l'écran - fermer le menu si on redimensionne au-dessus de 768px
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navContainer.classList.contains('open')) {
        burgerMenu.setAttribute('aria-expanded', 'false');
        navContainer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  
    // Adaptations supplémentaires pour l'accessibilité
    navContainer.addEventListener('focusout', function(event) {
      // Si le focus sort du menu et que le menu est ouvert, vérifier si on doit le fermer
      if (navContainer.classList.contains('open') && !navContainer.contains(event.relatedTarget) && event.relatedTarget !== burgerMenu) {
        toggleMenu();
      }
    });
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
      if (form.classList.contains('newsletter-form')) {
        const emailInput = document.getElementById('newsletter-email');
        const errorMessage = document.getElementById('email-error');
        const confirmation = document.querySelector('.form-confirmation');
        
        if (!emailInput.validity.valid) {
          event.preventDefault();
          if (emailInput.validity.valueMissing) {
            errorMessage.textContent = 'Veuillez entrer une adresse email';
          } else if (emailInput.validity.typeMismatch) {
            errorMessage.textContent = 'Veuillez entrer une adresse email valide';
          }
        } else {
          event.preventDefault();
          errorMessage.textContent = '';
          emailInput.value = '';
          confirmation.textContent = 'Merci de votre inscription à notre newsletter!';
          setTimeout(() => {
            confirmation.textContent = '';
          }, 5000);
        }
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-user');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-user');
  });