// Viewport dimensions function (commented out - no viewport elements in HTML)
// function updateBreakpoint() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     document.getElementById('viewport-width').textContent = width;
//     document.getElementById('viewport-height').textContent = height;
// }

// Note: copyEmail() and toggleMobileMenu() are now in common.js

// GSAP Staggered Experiment Cards Animation
function initExperimentAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Staggered animation for experiment cards
    gsap.from(".experiment-card", {
        duration: 1.2,
        y: 100,
        opacity: 0,
        scale: 0.9,
        stagger: 0.08, // 0.08s delay between each card
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".experiments-grid",
            start: "top 80%", // Start when grid hits 80% of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animate experiment titles with a slight delay
    gsap.from(".experiment-title", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".experiments-grid",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animate experiment labels
    gsap.from(".experiment-label", {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".experiments-grid",
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
        }
    });
}

// Initialize experiment animations
initExperimentAnimations();

// Simple GSAP Overlay Animation
function initSimpleOverlay() {
    console.log('Initializing simple overlay...');
    
    // Create overlay HTML structure
    const overlayHTML = `
        <div id="simple-overlay" class="fixed inset-0 bg-black bg-opacity-90 z-50 hidden" style="z-index: 9999;">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div id="overlay-content" class="bg-white rounded-lg w-[90vw] h-[90vh] overflow-hidden relative flex flex-col" style="z-index: 10000;">
                    <button id="close-overlay" class="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 shadow-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div id="overlay-body" class="flex-1 overflow-y-auto p-8">
                        <!-- Content will be dynamically inserted here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add overlay to body
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    
    // Get overlay elements
    const overlay = document.getElementById('simple-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const overlayContent = document.getElementById('overlay-content');
    const overlayBody = document.getElementById('overlay-body');
    
    // Add click handlers to experiment cards
    const experimentCards = document.querySelectorAll('.experiment-card');
    console.log(`Found ${experimentCards.length} experiment cards`);
    
    experimentCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const experimentName = card.getAttribute('data-name');
            console.log(`Clicked on experiment: ${experimentName}`);
            showSimpleOverlay(experimentName);
        });
    });
    
    // Close overlay handlers
    closeBtn.addEventListener('click', hideSimpleOverlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideSimpleOverlay();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            hideSimpleOverlay();
        }
    });
    
    function showSimpleOverlay(experimentName) {
        console.log(`Showing overlay for: ${experimentName}`);
        
        if (!overlay || !overlayBody) {
            console.error('Overlay elements not found');
            return;
        }
        
        // Set overlay content based on experiment
        overlayBody.innerHTML = getSimpleExperimentContent(experimentName);
        
        // Show overlay with GSAP animation
        overlay.classList.remove('hidden');
        
        // GSAP animation - optimized for performance
        if (typeof gsap !== 'undefined') {
            gsap.set(overlay, { opacity: 0 });
            gsap.set(overlayContent, { scale: 0.9, y: 20, force3D: true });
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
                force3D: true
            });
            
            gsap.to(overlayContent, {
                scale: 1,
                y: 0,
                duration: 0.25,
                ease: "power2.out",
                delay: 0.05,
                force3D: true
            });
        } else {
            // Fallback if GSAP is not available
            overlay.style.opacity = '1';
            overlayContent.style.transform = 'scale(1) translateY(0) translateZ(0)';
        }
    }
    
    function hideSimpleOverlay() {
        if (typeof gsap !== 'undefined') {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.15,
                ease: "power2.in",
                force3D: true,
                onComplete: () => {
                    overlay.classList.add('hidden');
                }
            });
            
            gsap.to(overlayContent, {
                scale: 0.95,
                y: 10,
                duration: 0.15,
                ease: "power2.in",
                force3D: true
            });
        } else {
            // Fallback if GSAP is not available
            overlay.style.opacity = '0';
            overlayContent.style.transform = 'scale(0.95) translateY(10px) translateZ(0)';
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 150);
        }
    }
    
    function getSimpleExperimentContent(experimentName) {
        const content = {
            'TacoMix': {
                title: 'Taco Mix',
                subheading: 'Strategic re-brand and brand guidelines created for a small taco shop in Harlem New York',
                images: [
                    'images/Taco-Mix/cover.avif',
                    'images/Taco-Mix/strategy_cover.avif',
                    'images/Taco-Mix/strategy.avif',
                    'images/Taco-Mix/mission.avif',
                    'images/Taco-Mix/values.avif',
                    'images/Taco-Mix/tagline.avif',
                    'images/Taco-Mix/logos.avif',
                    'images/Taco-Mix/b&wlogos.avif',
                    'images/Taco-Mix/logodonts.avif',
                    'images/Taco-Mix/typefaces.avif',
                    'images/Taco-Mix/branddesign.avif',
                    'images/Taco-Mix/colorpallete.avif',
                    'images/Taco-Mix/photoboard.avif',
                    'images/Taco-Mix/alldayallnight.avif',
                    'images/Taco-Mix/products.avif',
                    'images/Taco-Mix/app.avif',
                    'images/Taco-Mix/cardreader.avif',
                    'images/Taco-Mix/door.avif',
                    'images/Taco-Mix/toc.avif'
                ]
            },
            'DailyUi': {
                title: 'Daily UI',
                subheading: '100 Days of UI Design',
                images: [
                    'images/DailyUi/01.avif',
                    'images/DailyUi/02.avif',
                    'images/DailyUi/03.avif',
                    'images/DailyUi/04.mp4',
                    'images/DailyUi/05.avif',
                    'images/DailyUi/06.avif',
                    'images/DailyUi/07.avif',
                    'images/DailyUi/08.avif',
                    'images/DailyUi/010.avif',
                    'images/DailyUi/012.mp4',
                    'images/DailyUi/13.avif',
                    'images/DailyUi/014.avif',
                    'images/DailyUi/015.avif',
                    'images/DailyUi/016.avif',
                    'images/DailyUi/017.avif',
                    'images/DailyUi/018.avif',
                    'images/DailyUi/019.avif',
                    'images/DailyUi/020.avif'
                ]
            },
            'Strukt': {
                title: 'Strukt',
                subheading: 'UI Design & Motion',
                images: [
                    'images/Strukt/logo.avif',
                    'images/Strukt/moodboard.avif',
                    'images/Strukt/description.avif',
                    'images/Strukt/6_1_midterm-part-3-DylanDeweyWidick.mp4'
                ]
            },
            'EnableZone': {
                title: 'EnableZone',
                subheading: 'UI/UX & Product Design',
                images: [
                    'images/enablezone/logo.avif',
                    'images/enablezone/namediscovery.avif',
                    'images/enablezone/persona01.avif',
                    'images/enablezone/persona02.avif',
                    'images/enablezone/introducing.avif',
                    'images/enablezone/wecan.avif',
                    'images/enablezone/3partsolution.avif',
                    'images/enablezone/stats.avif',
                    'images/enablezone/colors.avif',
                    'images/enablezone/typography.avif',
                    'images/enablezone/mockup.avif',
                    'images/enablezone/Mockup 1.avif',
                    'images/enablezone/iPhone Mockups.avif'
                ]
            },
            'Bridge': {
                title: 'Bridge',
                subheading: 'AI-Powered Design',
                images: [
                    'images/Bridge/poster.avif',
                    'images/Bridge/posterondesk.avif',
                    'images/Bridge/posterinuse.avif',
                    'images/Bridge/persona.avif',
                    'images/Bridge/needs.avif',
                    'images/Bridge/howcanwe.avif',
                    'images/Bridge/hmw.avif',
                    'images/Bridge/oldman.avif',
                    'images/Bridge/complication.avif',
                    'images/Bridge/Dynamic.avif',
                    'images/Bridge/colorpallete.avif',
                    'images/Bridge/mockup.avif'
                ]
            },
            'SWDDS': {
                title: 'SWDDS',
                subheading: 'Branding & Web Design',
                images: []
            },
            'Blast': {
                title: 'Blast',
                subheading: 'Dynamic Branding',
                images: []
            },
            'ReelRegs': {
                title: 'Reel Regs',
                subheading: 'UI/UX & Product Design',
                images: [
                    'images/reel-regulations/mockup_reel.avif',
                    'images/reel-regulations/mockup_reels.avif',
                    'images/reel-regulations/reel_regulations_mockuo.avif'
                ]
            },
            'UjU': {
                title: 'UjU',
                subheading: 'Creative UI/UX',
                images: [
                    'images/UjU/uju_logo.avif',
                    'images/UjU/UjU_mockup.avif',
                    'images/UjU/uju_thumbnail.avif',
                    'images/UjU/[ujuani].mp4'
                ]
            },
            'DonDiary': {
                title: 'Don Diary',
                subheading: 'Full Stack Development',
                images: [
                    'images/Don-Diary/home.avif',
                    'images/Don-Diary/observation.avif',
                    'images/Don-Diary/progress.avif'
                ]
            },
            'Type01': {
                title: 'Type 01',
                subheading: 'Harsh typographic lessons from a pupil of Armin Hoffman and Wolfgang Wiengart. These explorations completely changed me as a designer and set me on a path of truly understanding typography.',
                images: [
                    'images/Typography/prototypeface.avif',
                    'images/Typography/shapes.avif',
                    'images/Typography/classification.avif',
                    'images/Typography/class1.avif',
                    'images/Typography/class2.avif',
                    'images/Typography/class3.avif',
                    'images/Typography/kerning.avif',
                    'images/Typography/kerning2.avif',
                    'images/Typography/kerning3.avif',
                    'images/Typography/kerning4.avif',
                    'images/Typography/kerning5.avif',
                    'images/Typography/kerning6.avif',
                    'images/Typography/kerning7.avif',
                    'images/Typography/typesetting.avif',
                    'images/Typography/typesetting2.avif',
                    'images/Typography/typesetting3.avif',
                    'images/Typography/typesetting4.avif',
                    'images/Typography/paragraphs.avif'
                ]
            },
            'ExportEm': {
                title: 'Export em',
                subheading: 'Vibe Coded Figma Plug in for exporting frames onto one PDF with printing controls. Made for the old school physical ideators who want to mark up a piece of paper with a red pen or post things on a wall.',
                images: [
                    'images/Figma Plug in/presets.mp4',
                    'images/Figma Plug in/margins and gutter.mp4',
                    'images/Figma Plug in/amount of frames.mp4'
                ]
            }
        };
        
        const experiment = content[experimentName] || {
            title: experimentName,
            subheading: 'Design Project',
            images: []
        };
        
        let imagesHTML = '';
        if (experiment.images.length > 0) {
            imagesHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12">
                    ${experiment.images.map(image => {
                        if (image.endsWith('.mp4')) {
                            return `
                                <div class="process-image-container">
                                    <video autoplay muted loop playsinline class="process-image">
                                        <source src="${image}" type="video/mp4">
                                    </video>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="process-image-container">
                                    <img src="${image}" alt="${experiment.title}" class="process-image">
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            `;
        } else {
            imagesHTML = `
                <div class="mt-12 p-8 bg-gray-100 rounded-lg text-center">
                    <p class="text-gray-600">Gallery images coming soon</p>
                </div>
            `;
        }
        
        return `
            <div class="text-left">
                <h1 class="intro-title-text mb-6 text-gray-800">${experiment.title}</h1>
                <p class="text-xl text-gray-600 mb-8">${experiment.subheading}</p>
                ${imagesHTML}
            </div>
        `;
    }
}

// Initialize simple overlay when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing simple overlay...');
    try {
        initSimpleOverlay();
        console.log('Simple overlay initialized successfully');
    } catch (error) {
        console.error('Error initializing simple overlay:', error);
    }
});