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
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menu && hamburger) {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

