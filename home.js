// Smooth scaling between 1128px and 1728px breakpoints
function handleSmoothScaling() {
    const windowWidth = window.innerWidth;
    const minWidth = 1128;
    const maxWidth = 1728;
    
    // Only apply smooth scaling between 1128px and 1728px
    // For tablet (600px-1127px), let CSS handle the layout
    // For mobile (<600px), let CSS handle the layout
    if (windowWidth < minWidth || windowWidth > maxWidth) return;
    
    const progress = (windowWidth - minWidth) / (maxWidth - minWidth);
    
    // Cache DOM elements for better performance
    const mainContainer = document.querySelector('body > div');
    if (!mainContainer) return;
    
    const leftColumn = mainContainer.children[0];
    const rightColumn = mainContainer.children[1];
    const contentSection = leftColumn?.children[1];
    const quoteSection = rightColumn?.children[0];
    const imageContainer = rightColumn?.children[1];
    
    // Main container scaling
    const paddingX = 36 + (progress * 10);
    const paddingTop = 1 + (progress * 1);     // 1px to 2px (navbar to content)
    const paddingBottom = 8 + (progress * 8);  // 8px to 16px (content to bottom)
    const gap = 40 + (progress * 10);
    
    mainContainer.style.cssText = `
        padding-left: ${paddingX}px;
        padding-right: ${paddingX}px;
        padding-top: ${paddingTop}px;
        padding-bottom: ${paddingBottom}px;
        gap: ${gap}px;
    `;
    
    // Left column scaling
    if (leftColumn) {
        const width = 415 + (progress * 107);     // 415px to 522px
        const leftGap = 180 + (progress * 47);     // 180px to 227px
        
        leftColumn.style.cssText = `
            width: ${width}px;
            gap: ${leftGap}px;
        `;
    }
    
    // Content section scaling
    if (contentSection) {
        // Description text scaling
        const description = contentSection.querySelector('p');
        if (description) {
            const fontSize = 18 + (progress * 2);
            const letterSpacing = 0.5 + (progress * 0.7);     // 0.5px to 1.2px
            const width = 320 + (progress * 90);
            
            description.style.cssText = `
                font-size: ${fontSize}px;
                letter-spacing: ${letterSpacing}px;
                width: ${width}px;
            `;
            
            // Calculate dynamic gap based on text height
            const textHeight = description.offsetHeight;
            const baseGap = 70 + (progress * 15);
            const heightCompensation = Math.max(0, (textHeight - 60) * 0.3); // Compensate for extra lines
            const contentGap = baseGap - heightCompensation;
            
            contentSection.style.gap = `${Math.max(20, contentGap)}px`;
        } else {
            const contentGap = 70 + (progress * 15);
            contentSection.style.gap = `${contentGap}px`;
        }
        
        // Social links scaling
        const socialLinks = contentSection.children[1];
        if (socialLinks) {
            const socialGap = 20 + (progress * 2);
            const socialWidth = 170 + (progress * 41);
            
            socialLinks.style.cssText = `
                gap: ${socialGap}px;
                width: ${socialWidth}px;
            `;
        }
        
        // Navigation dots scaling
        const dots = contentSection.children[2]?.querySelectorAll('.bg-white');
        if (dots) {
            const dotSize = 11 + (progress * 1);
            dots.forEach(dot => {
                dot.style.cssText = `
                    width: ${dotSize}px;
                    height: ${dotSize}px;
                `;
            });
        }
    }
    
    // Right column scaling (handled dynamically in quote section)
    
    // Quote section scaling
    if (quoteSection) {
        const quoteGap = 9 + (progress * 1);
        quoteSection.style.gap = `${quoteGap}px`;
        
        const quoteText = quoteSection.querySelector('p');
        if (quoteText) {
            const fontSize = 21 + (progress * 3);
            const letterSpacing = 1.05 + (progress * 0.15);
            
            quoteText.style.cssText = `
                font-size: ${fontSize}px;
                letter-spacing: ${letterSpacing}px;
            `;
            
            // Calculate dynamic gap compensation based on text height
            const textHeight = quoteText.offsetHeight;
            const baseGap = 60 + (progress * 0);        // Base gap between quote and images (60px constant)
            const heightCompensation = Math.max(0, (textHeight - 60) * 0.4); // Compensate for extra lines
            const adjustedGap = baseGap - heightCompensation;
            
            // Apply the adjusted gap to the right column
            if (rightColumn) {
                rightColumn.style.gap = `${Math.max(20, adjustedGap)}px`;
            }
        }
    }
    
    // Image container scaling
    if (imageContainer) {
        const imageGap = 12 + (progress * 2);
        const imageHeight = 600 + (progress * 120); // 600px to 720px
        
        imageContainer.style.cssText = `
            gap: ${imageGap}px;
            height: ${imageHeight}px;
        `;
        
        // Individual image boxes scaling
        const imageBoxes = imageContainer.querySelectorAll('.basis-0');
        const borderRadius = 14 + (progress * 2);
        imageBoxes.forEach(box => {
            box.style.borderRadius = `${borderRadius}px`;
        });
    }
}

// Throttled resize handler for better performance
let resizeTimeout;
function throttledResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleSmoothScaling, 16); // ~60fps
}

// Initialize and listen for resize
handleSmoothScaling();
window.addEventListener('resize', throttledResize);

// Breakpoint viewer functionality removed - no longer needed

// Note: copyEmail(), copyEmailMobile(), and toggleMobileMenu() are now in common.js

// GSAP Animations
function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    console.log('GSAP loaded, initializing animations...');
    
    // Simple approach: animate the main content container
    const mainContent = document.querySelector(".main-content");
    const tabletContent = document.querySelector(".tablet-content");
    const mobileContent = document.querySelector(".mobile-content");
    
    // Determine which content is visible based on screen size
    let visibleContent;
    if (window.innerWidth >= 1128) {
        visibleContent = mainContent;
    } else if (window.innerWidth >= 600) {
        visibleContent = tabletContent;
    } else {
        visibleContent = mobileContent;
    }
    
    if (visibleContent) {
        console.log('Animating visible content:', visibleContent.className);
        console.log('Window width:', window.innerWidth);
        
        // Set initial state
        gsap.set(visibleContent, { opacity: 0, y: 50 });
        console.log('Set initial state for:', visibleContent);
        
        // Animate in
        gsap.to(visibleContent, {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            onComplete: () => console.log('Main content animation complete')
        });
        
        // Animate child elements with stagger
        const childElements = visibleContent.querySelectorAll('.intro-title, .intro-description, .social-links, .nav-dots, .quote-section, .image-container');
        console.log('Found child elements:', childElements.length);
        
        if (childElements.length > 0) {
            gsap.from(childElements, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3,
                onComplete: () => console.log('Child elements animation complete')
            });
        }
    } else {
        console.log('No visible content found!');
    }
}

// Test GSAP immediately
console.log('Testing GSAP availability:', typeof gsap);
if (typeof gsap !== 'undefined') {
    console.log('GSAP is available, testing basic animation...');
    
    // Test animation on body to make sure GSAP is working
    gsap.to("body", {duration: 0.1, backgroundColor: "#151515"});
    
    // Test animation on the logo
    gsap.from("div[class*='bg-[#ff2525]']", {duration: 0.5, scale: 0, ease: "back.out(1.7)"});
    
} else {
    console.error('GSAP is not loaded!');
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing animations...');
        // Add a small delay to ensure everything is rendered
        setTimeout(() => {
            initAnimations();
        }, 100);
    });
} else {
    // DOM is already ready
    console.log('DOM already ready, initializing animations...');
    // Add a small delay to ensure everything is rendered
    setTimeout(() => {
        initAnimations();
    }, 100);
}

