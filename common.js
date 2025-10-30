// =====================================
// SHARED UTILITY FUNCTIONS
// =====================================

/**
 * Copy email to clipboard (Desktop version)
 */
function copyEmail() {
    const email = 'dylandeweydesign@gmail.com';
    const button = document.getElementById('email-copy');
    
    navigator.clipboard.writeText(email).then(() => {
        // Show copied feedback
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

/**
 * Copy email to clipboard (Mobile version - doesn't close menu)
 */
function copyEmailMobile() {
    const email = 'dylandeweydesign@gmail.com';
    const button = document.getElementById('email-copy-mobile');
    
    navigator.clipboard.writeText(email).then(() => {
        // Show copied feedback
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

/**
 * Toggle mobile menu - Simple version
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    // Toggle the 'open' class instead of 'active'
    if (menu) {
        menu.classList.toggle('open');
    }
    
    if (hamburger) {
        hamburger.classList.toggle('open');
    }
}

// Make it globally available immediately
window.toggleMobileMenu = toggleMobileMenu;

