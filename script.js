// ERROR HANDLING - PREVENT CRASHES
window.addEventListener('error', function(event) {
    console.error('Script error caught:', event.error);
    event.preventDefault();
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// DATA STRUCTURE - ENHANCED WITH COLLAGES
const bookData = [
    {
        type: 'cover',
        title: 'Our Story'
    },
    // JANUARY - Month 1
    {
        type: 'two-one',
        month: 'January - Month 1',
        leftImages: [
            { image: 'jan 4 - 1.jpeg', caption: 'The beginning' },
            { image: 'jan 4 - 2.jpeg', caption: 'Forever starts' }
        ],
        rightImage: {
            image: 'jan 4 - 3.jpeg',
            caption: 'With you'
        }
    },
    {
        type: 'double-page',
        month: 'January - Month 1 (Continued)',
        pages: [
            {
                image: 'jan 14 - 1.jpeg',
                caption: 'Growing closer every day'
            },
            {
                image: 'jan 14 - 2.jpeg',
                caption: 'Two hearts, one story'
            }
        ]
    },
    {
        type: 'double-page',
        month: 'January - Month 1 (finale)',
        pages: [
            {
                image: 'jan 31 - 1.jpeg',
                caption: 'From sunrise'
            },
            {
                image: 'jan 31 - 2.jpeg',
                caption: 'To sunset'
            }
        ]
    },
    // FEBRUARY - Month 2
    {
        type: 'double-page',
        month: 'February - Month 2',
        pages: [
            {
                image: 'jan 31 - 3.jpeg',
                caption: 'In your eyes'
            },
            {
                image: 'feb 15 - 1.jpeg',
                caption: 'I found home'
            }
        ]
    },
    {
        type: 'double-page',
        month: 'February - Month 2 (Continued)',
        pages: [
            {
                image: 'feb 15 - 2.jpeg',
                caption: 'Our journey, our passion'
            },
            {
                image: 'feb 15 - 3.jpeg',
                caption: 'Every chapter writes itself'
            }
        ]
    },
    // MARCH - Month 3
    {
        type: 'double-page',
        month: 'March - Month 3',
        pages: [
            {
                image: 'march 10 - 1.jpeg',
                caption: 'Spring brings new beginnings'
            },
            {
                image: 'march 19 - 1.jpeg',
                caption: 'Moments that matter most'
            }
        ]
    },
    {
        type: 'double-page',
        month: 'March - Month 3 (Continued)',
        pages: [
            {
                image: 'march 19 - 2.jpeg',
                caption: 'Forever starts'
            },
            {
                image: 'march 20 - 1.jpeg',
                caption: 'With us'
            }
        ]
    },
    {
        type: 'double-page',
        month: 'March - Month 3 (Finale)',
        pages: [
            {
                image: 'march 20 - 2.jpeg',
                caption: 'Love is a journey'
            },
            {
                image: 'april 17 - 1.jpeg',
                caption: 'Not a destination'
            }
        ]
    },
    // APRIL - Month 4
    {
        type: 'two-one-vertical',
        month: 'April - Month 4',
        leftImages: [
            { image: 'april 17 - 1.jpeg', caption: 'Four months' },
            { image: 'april 17 - 2.jpeg', caption: 'Of pure' }
        ],
        rightImage: {
            image: 'april 17 - 3.jpeg',
            caption: 'Bliss'
        }
    },
    {
        type: 'final',
        title: 'Forever Begins Here',
        message: 'Thank you for filling my life with color and love. Every moment with you is a memory I\'ll cherish forever. Here\'s to our story, the greatest love story ever told. 💕'
    }
];

let currentSpread = 0;
let isFlipping = false;
const music = document.getElementById('bgMusic');
let imagesLoaded = 0;
let totalImages = 0;

// PRELOAD IMAGES
function preloadImages() {
    const images = new Set();
    bookData.forEach(spread => {
        if (spread.type === 'double-page') {
            spread.pages.forEach(page => {
                images.add(page.image);
            });
        } else if (spread.type === 'collage') {
            spread.images.forEach(img => {
                images.add(img.image);
            });
        }
    });

    totalImages = images.size;
    if (totalImages === 0) {
        document.getElementById('loading').style.display = 'none';
        return;
    }

    images.forEach(imagePath => {
        const img = new Image();
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 300);
            }
        };
        img.onerror = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 300);
            }
        };
        img.src = imagePath;
    });
}

// RENDER BOOK - Display pages side by side
function renderBook() {
    const pagesContainer = document.getElementById('pages');
    pagesContainer.innerHTML = '';
    pagesContainer.style.display = 'flex';
    pagesContainer.style.width = '100%';
    pagesContainer.style.height = '100%';
    pagesContainer.style.gap = '0';

    // Create left page container
    const leftContainer = document.createElement('div');
    leftContainer.className = 'page-container left';
    leftContainer.id = 'left-page';

    // Create right page container
    const rightContainer = document.createElement('div');
    rightContainer.className = 'page-container right';
    rightContainer.id = 'right-page';

    pagesContainer.appendChild(leftContainer);
    pagesContainer.appendChild(rightContainer);

    // Set initial pages
    updatePages();
}

// UPDATE PAGES - Load current spread
function updatePages() {
    const spread = bookData[currentSpread];
    const leftContainer = document.getElementById('left-page');
    const rightContainer = document.getElementById('right-page');

    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';

    if (spread.type === 'cover') {
        // For the cover page, show iframe on left and letter on right
        const leftIframe = document.createElement('div');
        leftIframe.style.cssText = 'width: 100%; height: 100%; overflow: auto; background: white; border-radius: 0px; padding: 0; margin: 0;';
        
        const iframe = document.createElement('iframe');
        iframe.src = 'gay.html';
        iframe.style.cssText = 'width: 100%; height: 100%; border: none; display: block;';
        
        leftIframe.appendChild(iframe);
        leftContainer.appendChild(leftIframe);

        // Right side letter
        const rightLetter = document.createElement('div');
        rightLetter.style.cssText = `
            width: 100%;
            height: 100%;
            background: var(--coconut-cream);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            overflow-y: auto;
        `;
        
        const letterContent = document.createElement('div');
        letterContent.style.cssText = `
            text-align: center;
            max-width: 90%;
            font-family: 'Georgia', serif;
            color: #4a4a4a;
        `;
        
        const letterTitle = document.createElement('h2');
        letterTitle.textContent = 'Dear Maemae,';
        letterTitle.style.cssText = `
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: #8b6f47;
            font-weight: 400;
            letter-spacing: 1px;
        `;
        
        const letterText = document.createElement('p');
        letterText.textContent = 'You are the reason my heart smiles. In every moment, every laugh, every quiet embrace, I find myself falling for you all over again. This book is a collection of our memories, our story, and the love we share. Thank you for being my greatest. I\'m sorry for any times I may have hurt you, and I promise to always cherish and love you with all that I am. Here\'s to us, forever and always.';
        letterText.style.cssText = `
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 20px;
            font-style: italic;
            color: #6b6b6b;
        `;
        
        const letterSignature = document.createElement('p');
        letterSignature.textContent = 'Forever yours my love';
        letterSignature.style.cssText = `
            font-size: 1.1rem;
            font-style: italic;
            color: #8b6f47;
            margin-top: 30px;
        `;
        
        letterContent.appendChild(letterTitle);
        letterContent.appendChild(letterText);
        letterContent.appendChild(letterSignature);
        rightLetter.appendChild(letterContent);
        rightContainer.appendChild(rightLetter);
    } else if (spread.type === 'double-page') {
        // Create left page
        const leftPage = createPageElement(spread.pages[0], 'page-left');
        leftContainer.appendChild(leftPage);

        // Create right page
        const rightPage = createPageElement(spread.pages[1], 'page-right');
        rightContainer.appendChild(rightPage);
    } else if (spread.type === 'two-one') {
        // Create left side with 2 images
        const leftTwoImages = createTwoImagesElement(spread, 'two-images-left');
        leftContainer.appendChild(leftTwoImages);

        // Create right side with 1 full image
        const rightOneImage = createPageElement(spread.rightImage, 'one-image-right');
        rightContainer.appendChild(rightOneImage);
    } else if (spread.type === 'two-one-vertical') {
        // Create left side with 2 images stacked vertically
        const leftTwoImages = createTwoImagesVerticalElement(spread, 'two-images-left');
        leftContainer.appendChild(leftTwoImages);

        // Create right side with 1 full image
        const rightOneImage = createPageElement(spread.rightImage, 'one-image-right');
        rightContainer.appendChild(rightOneImage);
    } else if (spread.type === 'collage') {
        // Create left collage
        const leftCollage = createCollageElement(spread, 'collage-left');
        leftContainer.appendChild(leftCollage);

        // Create right collage (blank/cream colored)
        const rightBlank = document.createElement('div');
        rightBlank.style.cssText = 'background: var(--coconut-cream); width: 100%; height: 100%;';
        rightContainer.appendChild(rightBlank);
    } else if (spread.type === 'final') {
        const finalPage = createFinalElement(spread);
        leftContainer.appendChild(finalPage);
        
        // Create flower animation on right side
        const rightFlowers = document.createElement('div');
        rightFlowers.style.cssText = `
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to bottom, #060825 0%, #000 50%);
            margin: 0;
            padding: 0;
            overflow: hidden;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add HTML structure
        rightFlowers.innerHTML = `
            <style>
                .ground {
                    width: 100vmin;
                    aspect-ratio: 1.5;
                    overflow: visible;
                    position: relative;
                    transform-origin: center center;
                    transform: scale(2);
                    animation: shrink 1.5s ease-in forwards 4s;
                }
                .flower-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .flower-container:nth-child(2) { top: 45%; left: 30%; width: 8%; }
                .flower-container:nth-child(3) { top: 45%; left: 70%; width: 8%; }
                .flower-container:nth-child(4) { top: 85%; left: 95%; width: 20%; }
                .flower-container:nth-child(5) { top: 130%; left: 30%; width: 30%; }
                .flower-container:nth-child(6) { top: 60%; left: 10%; width: 12%; }
                .flower-container:nth-child(7) { top: 20%; left: 15%; width: 6%; }
                .flower-container:nth-child(8) { top: 15%; left: 35%; width: 5%; }
                .flower-container:nth-child(9) { top: 26%; left: 85%; width: 7%; }
                .flower-container:nth-child(10) { top: 22%; left: 60%; width: 6.5%; }
                .flower-container { width: 10%; aspect-ratio: 16; container-type: inline-size; filter: drop-shadow(0 0 25cqi #ffd85faa); justify-items: center; align-content: center; transform-origin: bottom center; }
                .flower-top { width: 50cqi; aspect-ratio: 1.5; position: relative; z-index: 1; position: absolute; bottom: 100%; left: 50%; transform: translate(-50%, 50%); }
                .flower-circle { width: 30cqi; aspect-ratio: 1.5; border-radius: 50%; background-color: #ffe4a0; box-shadow: inset 0px -3cqi 3cqi #aa7a0266; position: absolute; scale: 0; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 100% 100% 100% 100%/90% 90% 90% 90%; filter: drop-shadow(0 0 15cqi #ffd85f); transform-origin: top left; }
                .flower-petal { width: 80%; aspect-ratio: 1; background-color: #ffe4a0; background-image: linear-gradient(135deg, #ff6236 20%, #ffd85f 80%); position: absolute; opacity: 0; }
                .flower-petal__1 { bottom: 42%; right: 65%; border-radius: 0px 100% 5% 100%/0px 100% 5% 100%; transform: rotate(-10deg) scale(0.82); }
                .flower-petal__2 { bottom: 42%; left: 65%; border-radius: 0px 100% 5% 100%/0px 100% 5% 100%; transform: rotate(100deg) scale(0.82); }
                .flower-petal__3 { bottom: 40%; left: 10%; border-radius: 0px 100% 50% 100%/0px 100% 50% 100%; transform: rotate(45deg) scale(0.8); }
                .flower-petal__4 { top: -10%; left: 80%; border-radius: 0px 100% 0% 100%/0px 100% 0% 100%; transform: rotate(135deg) scale(0.9); }
                .flower-petal__5 { top: -10%; right: 70%; border-radius: 0px 100% 0% 100%/0px 100% 0% 100%; transform: rotate(315deg) scale(0.9); }
                .flower-petal__6 { top: 50%; right: 65%; border-radius: 0px 100% 10% 100%/0px 100% 5% 100%; transform: rotate(270deg) scale(1.1); }
                .flower-petal__7 { top: 50%; left: 65%; border-radius: 0px 100% 10% 100%/0px 100% 5% 100%; transform: rotate(180deg) scale(1.1); }
                .flower-petal__8 { top: 50%; left: 10%; border-radius: 0px 100% 50% 100%/0px 100% 30% 100%; transform: rotate(225deg) scale(1); }
                .flower-light { width: 3cqi; aspect-ratio: 1; position: absolute; border-radius: 50%; opacity: 0; }
                .flower-light:nth-child(odd) { background-color: #ffe4a0; filter: blur(2cqi) drop-shadow(0 0 5cqi #ffd85f); }
                .flower-light:nth-child(even) { background-color: #ff6236; filter: blur(2cqi) drop-shadow(0 0 5cqi #ff6236); }
                .flower-light__1 { top: 10%; left: 20%; scale: 0.8; }
                .flower-light__2 { top: 20%; left: 80%; scale: 1.2; }
                .flower-light__3 { top: 30%; left: 50%; scale: 1.5; }
                .flower-light__4 { top: 40%; left: 10%; }
                .flower-light__5 { top: 50%; left: 90%; scale: 2; }
                .flower-light__6 { top: 60%; left: 30%; }
                .flower-light__7 { top: 70%; left: 40%; scale: 0.5; }
                .flower-light__8 { top: 60%; left: 60%; }
                .flower-bottom { width: 6%; aspect-ratio: 0.02; left: 47%; top: 50%; }
                .flower-stem { width: 100%; height: 100%; transform: scaleY(0); background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(87, 42, 25, 0.2)), linear-gradient(to top, transparent 10%, #da580099, #da580099); border-radius: 50px 50px 0 0; transform-origin: bottom center; }
                .flower-leaf { width: 40%; aspect-ratio: 2.5; position: absolute; scale: 0; opacity: 0; }
                .flower-leaf:nth-child(even) { right: 55%; background-image: linear-gradient(120deg, #d86100aa 0%, #da580000 90%); border-radius: 0% 100% 0% 100%/0% 100% 0% 100%; transform-origin: bottom right; }
                .flower-leaf:nth-child(odd) { left: 55%; background-image: linear-gradient(300deg, #d86100aa 0%, #da580000 90%); border-radius: 100% 0% 100% 0%/100% 0% 100% 0%; transform-origin: bottom left; }
                .flower-leaf__2 { top: 25%; transform: rotate(-15deg) scale(1); }
                .flower-leaf__1 { top: 31%; transform: rotate(15deg) scale(1); }
                .flower-leaf__4 { top: 37%; transform: rotate(-15deg) scale(1.2); }
                .flower-leaf__3 { top: 43%; transform: rotate(15deg) scale(1.2); }
                .flower-leaf__6 { top: 50%; transform: rotate(-15deg) scale(1.5); }
                .flower-leaf__5 { top: 56%; transform: rotate(15deg) scale(1.5); }
                .flower-grass { position: absolute; bottom: -20cqi; width: 80cqi; height: 120cqi; opacity: 0; scale: 0; mask-image: linear-gradient(to top, transparent 15%, #fff 50%); }
                .flower-grass:nth-child(odd) { right: 55%; border-top-right-radius: 100%; border-right: 5cqi solid #d86100aa; transform-origin: bottom right; }
                .flower-grass:nth-child(even) { left: 55%; border-top-left-radius: 100%; border-left: 5cqi solid #d86100aa; transform-origin: bottom left; }
                .flower-grass__3 { left: 70% !important; width: 75cqi; height: 100cqi; }
                .flower-grass__4 { right: 70% !important; width: 75cqi; height: 90cqi; }
                .animate.flower-container { animation: flower-rotate 12s linear infinite; }
                .animate .flower-circle { animation: grass-grow 0.25s ease-in forwards 3s; }
                .animate .flower-petal { animation: petal-grow 0.5s ease-in forwards, flower-rotate 3s linear infinite; }
                .animate .flower-petal__3 { animation-delay: 3.2s; }
                .animate .flower-petal__2 { animation-delay: 3.3s; }
                .animate .flower-petal__4 { animation-delay: 3.4s; }
                .animate .flower-petal__7 { animation-delay: 3.5s; }
                .animate .flower-petal__8 { animation-delay: 3.6s; }
                .animate .flower-petal__6 { animation-delay: 3.7s; }
                .animate .flower-petal__5 { animation-delay: 3.8s; }
                .animate .flower-petal__1 { animation-delay: 3.9s; }
                .animate .flower-stem { animation: stem-grow 3s ease-in forwards; }
                .animate .flower-grass { animation: grass-grow 1s ease-in forwards 1.5s, flower-rotate 6s linear infinite; }
                .animate .flower-leaf { animation: grass-grow 0.75s ease-in forwards, flower-rotate 6s linear infinite; }
                .animate .flower-leaf__2 { animation-delay: 2s; }
                .animate .flower-leaf__1 { animation-delay: 1.9s; }
                .animate .flower-leaf__4 { animation-delay: 1.8s; }
                .animate .flower-leaf__3 { animation-delay: 1.65s; }
                .animate .flower-leaf__6 { animation-delay: 1.5s; }
                .animate .flower-leaf__5 { animation-delay: 1.25s; }
                .animate .flower-light { animation: light-float 5s ease-in-out infinite; }
                .animate .flower-light__1 { animation-delay: 4.7s; }
                .animate .flower-light__2 { animation-delay: 5.2s; }
                .animate .flower-light__3 { animation-delay: 5.7s; }
                .animate .flower-light__4 { animation-delay: 6.2s; }
                .animate .flower-light__5 { animation-delay: 6.7s; }
                .animate .flower-light__6 { animation-delay: 7.2s; }
                .animate .flower-light__7 { animation-delay: 7.7s; }
                .animate .flower-light__8 { animation-delay: 8.2s; }
                @keyframes petal-grow { 0% { scale: 0; opacity: 0.8; } 50% { scale: 1; opacity: 0.8; } 75% { scale: 1.1; opacity: 0.8; } 90% { scale: 0.9; opacity: 0.8; } 100% { scale: 1; opacity: 0.8; } }
                @keyframes grass-grow { 100% { opacity: 1; scale: 1; } }
                @keyframes stem-grow { 0% { border-radius: 10%; } 100% { transform: scaleY(1); } }
                @keyframes flower-rotate { 0%,100% { rotate: 0deg; } 25% { rotate: 5deg; } 75% { rotate: -5deg; } }
                @keyframes shrink { 100% { transform: scale(1); } }
                @keyframes light-float { 0% { opacity: 0; transform: translate(0, 0); } 25% { opacity: 1; transform: translate(20cqi, -25cqi); } 50% { opacity: 1; transform: translate(0, -50cqi); } 75% { opacity: 1; transform: translate(-20cqi, -75cqi); } 100% { opacity: 0; transform: translate(0, -100cqi); } }
            </style>
            <div class="ground">
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
            </div>
        `;
        
        rightContainer.appendChild(rightFlowers);
        
        // Run the flower animation script
        setTimeout(() => {
            rightFlowers.querySelectorAll('.flower-container').forEach(el => {
                el.innerHTML = `<div class="flower-top">
                    <div class="flower-petal flower-petal__1"></div>
                    <div class="flower-petal flower-petal__2"></div>
                    <div class="flower-petal flower-petal__3"></div>
                    <div class="flower-petal flower-petal__4"></div>
                    <div class="flower-petal flower-petal__5"></div>
                    <div class="flower-petal flower-petal__6"></div>
                    <div class="flower-petal flower-petal__7"></div>
                    <div class="flower-petal flower-petal__8"></div>
                    <div class="flower-circle"></div>
                    <div class="flower-light flower-light__1"></div>
                    <div class="flower-light flower-light__2"></div>
                    <div class="flower-light flower-light__3"></div>
                    <div class="flower-light flower-light__4"></div>
                    <div class="flower-light flower-light__5"></div>
                    <div class="flower-light flower-light__6"></div>
                    <div class="flower-light flower-light__7"></div>
                    <div class="flower-light flower-light__8"></div>
                </div>
                <div class="flower-bottom">
                    <div class="flower-stem"></div>
                    <div class="flower-leaf flower-leaf__1"></div>
                    <div class="flower-leaf flower-leaf__2"></div>
                    <div class="flower-leaf flower-leaf__3"></div>
                    <div class="flower-leaf flower-leaf__4"></div>
                    <div class="flower-leaf flower-leaf__5"></div>
                    <div class="flower-leaf flower-leaf__6"></div>
                    <div class="flower-grass flower-grass__1"></div>
                    <div class="flower-grass flower-grass__2"></div>
                    <div class="flower-grass flower-grass__3"></div>
                    <div class="flower-grass flower-grass__4"></div>
                </div>`;
            });
            
            const flowers = Array.from(rightFlowers.querySelectorAll('.flower-container'));
            const animatedClass = 'animate';
            
            flowers[0].classList.add(animatedClass);
            
            setTimeout(() => {
                for (let i = 1; i <= 2 && i < flowers.length; i++) {
                    flowers[i].classList.add(animatedClass);
                }
                
                let remaining = flowers.slice(3);
                const interval = setInterval(() => {
                    if (remaining.length === 0) {
                        clearInterval(interval);
                        return;
                    }
                    
                    const randomIndex = Math.floor(Math.random() * remaining.length);
                    const el = remaining.splice(randomIndex, 1)[0];
                    el.classList.add(animatedClass);
                }, 500);
            }, 3000);
        }, 100);
    } else if (spread.type === 'collage') {
        const finalPage = createFinalElement(spread);
        leftContainer.appendChild(finalPage);
        
        // Create flower animation on right side
        const rightFlowers = document.createElement('div');
        rightFlowers.style.cssText = `
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to bottom, #060825 0%, #000 50%);
            margin: 0;
            padding: 0;
            overflow: hidden;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add HTML structure
        rightFlowers.innerHTML = `
            <style>
                .ground {
                    width: 100vmin;
                    aspect-ratio: 1.5;
                    overflow: visible;
                    position: relative;
                    transform-origin: center center;
                    transform: scale(2);
                    animation: shrink 1.5s ease-in forwards 4s;
                }
                .flower-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .flower-container:nth-child(2) { top: 45%; left: 30%; width: 8%; }
                .flower-container:nth-child(3) { top: 45%; left: 70%; width: 8%; }
                .flower-container:nth-child(4) { top: 85%; left: 95%; width: 20%; }
                .flower-container:nth-child(5) { top: 130%; left: 30%; width: 30%; }
                .flower-container:nth-child(6) { top: 60%; left: 10%; width: 12%; }
                .flower-container:nth-child(7) { top: 20%; left: 15%; width: 6%; }
                .flower-container:nth-child(8) { top: 15%; left: 35%; width: 5%; }
                .flower-container:nth-child(9) { top: 26%; left: 85%; width: 7%; }
                .flower-container:nth-child(10) { top: 22%; left: 60%; width: 6.5%; }
                .flower-container { width: 10%; aspect-ratio: 16; container-type: inline-size; filter: drop-shadow(0 0 25cqi #ffd85faa); justify-items: center; align-content: center; transform-origin: bottom center; }
                .flower-top { width: 50cqi; aspect-ratio: 1.5; position: relative; z-index: 1; position: absolute; bottom: 100%; left: 50%; transform: translate(-50%, 50%); }
                .flower-circle { width: 30cqi; aspect-ratio: 1.5; border-radius: 50%; background-color: #ffe4a0; box-shadow: inset 0px -3cqi 3cqi #aa7a0266; position: absolute; scale: 0; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 100% 100% 100% 100%/90% 90% 90% 90%; filter: drop-shadow(0 0 15cqi #ffd85f); transform-origin: top left; }
                .flower-petal { width: 80%; aspect-ratio: 1; background-color: #ffe4a0; background-image: linear-gradient(135deg, #ff6236 20%, #ffd85f 80%); position: absolute; opacity: 0; }
                .flower-petal__1 { bottom: 42%; right: 65%; border-radius: 0px 100% 5% 100%/0px 100% 5% 100%; transform: rotate(-10deg) scale(0.82); }
                .flower-petal__2 { bottom: 42%; left: 65%; border-radius: 0px 100% 5% 100%/0px 100% 5% 100%; transform: rotate(100deg) scale(0.82); }
                .flower-petal__3 { bottom: 40%; left: 10%; border-radius: 0px 100% 50% 100%/0px 100% 50% 100%; transform: rotate(45deg) scale(0.8); }
                .flower-petal__4 { top: -10%; left: 80%; border-radius: 0px 100% 0% 100%/0px 100% 0% 100%; transform: rotate(135deg) scale(0.9); }
                .flower-petal__5 { top: -10%; right: 70%; border-radius: 0px 100% 0% 100%/0px 100% 0% 100%; transform: rotate(315deg) scale(0.9); }
                .flower-petal__6 { top: 50%; right: 65%; border-radius: 0px 100% 10% 100%/0px 100% 5% 100%; transform: rotate(270deg) scale(1.1); }
                .flower-petal__7 { top: 50%; left: 65%; border-radius: 0px 100% 10% 100%/0px 100% 5% 100%; transform: rotate(180deg) scale(1.1); }
                .flower-petal__8 { top: 50%; left: 10%; border-radius: 0px 100% 50% 100%/0px 100% 30% 100%; transform: rotate(225deg) scale(1); }
                .flower-light { width: 3cqi; aspect-ratio: 1; position: absolute; border-radius: 50%; opacity: 0; }
                .flower-light:nth-child(odd) { background-color: #ffe4a0; filter: blur(2cqi) drop-shadow(0 0 5cqi #ffd85f); }
                .flower-light:nth-child(even) { background-color: #ff6236; filter: blur(2cqi) drop-shadow(0 0 5cqi #ff6236); }
                .flower-light__1 { top: 10%; left: 20%; scale: 0.8; }
                .flower-light__2 { top: 20%; left: 80%; scale: 1.2; }
                .flower-light__3 { top: 30%; left: 50%; scale: 1.5; }
                .flower-light__4 { top: 40%; left: 10%; }
                .flower-light__5 { top: 50%; left: 90%; scale: 2; }
                .flower-light__6 { top: 60%; left: 30%; }
                .flower-light__7 { top: 70%; left: 40%; scale: 0.5; }
                .flower-light__8 { top: 60%; left: 60%; }
                .flower-bottom { width: 6%; aspect-ratio: 0.02; left: 47%; top: 50%; }
                .flower-stem { width: 100%; height: 100%; transform: scaleY(0); background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(87, 42, 25, 0.2)), linear-gradient(to top, transparent 10%, #da580099, #da580099); border-radius: 50px 50px 0 0; transform-origin: bottom center; }
                .flower-leaf { width: 40%; aspect-ratio: 2.5; position: absolute; scale: 0; opacity: 0; }
                .flower-leaf:nth-child(even) { right: 55%; background-image: linear-gradient(120deg, #d86100aa 0%, #da580000 90%); border-radius: 0% 100% 0% 100%/0% 100% 0% 100%; transform-origin: bottom right; }
                .flower-leaf:nth-child(odd) { left: 55%; background-image: linear-gradient(300deg, #d86100aa 0%, #da580000 90%); border-radius: 100% 0% 100% 0%/100% 0% 100% 0%; transform-origin: bottom left; }
                .flower-leaf__2 { top: 25%; transform: rotate(-15deg) scale(1); }
                .flower-leaf__1 { top: 31%; transform: rotate(15deg) scale(1); }
                .flower-leaf__4 { top: 37%; transform: rotate(-15deg) scale(1.2); }
                .flower-leaf__3 { top: 43%; transform: rotate(15deg) scale(1.2); }
                .flower-leaf__6 { top: 50%; transform: rotate(-15deg) scale(1.5); }
                .flower-leaf__5 { top: 56%; transform: rotate(15deg) scale(1.5); }
                .flower-grass { position: absolute; bottom: -20cqi; width: 80cqi; height: 120cqi; opacity: 0; scale: 0; mask-image: linear-gradient(to top, transparent 15%, #fff 50%); }
                .flower-grass:nth-child(odd) { right: 55%; border-top-right-radius: 100%; border-right: 5cqi solid #d86100aa; transform-origin: bottom right; }
                .flower-grass:nth-child(even) { left: 55%; border-top-left-radius: 100%; border-left: 5cqi solid #d86100aa; transform-origin: bottom left; }
                .flower-grass__3 { left: 70% !important; width: 75cqi; height: 100cqi; }
                .flower-grass__4 { right: 70% !important; width: 75cqi; height: 90cqi; }
                .animate.flower-container { animation: flower-rotate 12s linear infinite; }
                .animate .flower-circle { animation: grass-grow 0.25s ease-in forwards 3s; }
                .animate .flower-petal { animation: petal-grow 0.5s ease-in forwards, flower-rotate 3s linear infinite; }
                .animate .flower-petal__3 { animation-delay: 3.2s; }
                .animate .flower-petal__2 { animation-delay: 3.3s; }
                .animate .flower-petal__4 { animation-delay: 3.4s; }
                .animate .flower-petal__7 { animation-delay: 3.5s; }
                .animate .flower-petal__8 { animation-delay: 3.6s; }
                .animate .flower-petal__6 { animation-delay: 3.7s; }
                .animate .flower-petal__5 { animation-delay: 3.8s; }
                .animate .flower-petal__1 { animation-delay: 3.9s; }
                .animate .flower-stem { animation: stem-grow 3s ease-in forwards; }
                .animate .flower-grass { animation: grass-grow 1s ease-in forwards 1.5s, flower-rotate 6s linear infinite; }
                .animate .flower-leaf { animation: grass-grow 0.75s ease-in forwards, flower-rotate 6s linear infinite; }
                .animate .flower-leaf__2 { animation-delay: 2s; }
                .animate .flower-leaf__1 { animation-delay: 1.9s; }
                .animate .flower-leaf__4 { animation-delay: 1.8s; }
                .animate .flower-leaf__3 { animation-delay: 1.65s; }
                .animate .flower-leaf__6 { animation-delay: 1.5s; }
                .animate .flower-leaf__5 { animation-delay: 1.25s; }
                .animate .flower-light { animation: light-float 5s ease-in-out infinite; }
                .animate .flower-light__1 { animation-delay: 4.7s; }
                .animate .flower-light__2 { animation-delay: 5.2s; }
                .animate .flower-light__3 { animation-delay: 5.7s; }
                .animate .flower-light__4 { animation-delay: 6.2s; }
                .animate .flower-light__5 { animation-delay: 6.7s; }
                .animate .flower-light__6 { animation-delay: 7.2s; }
                .animate .flower-light__7 { animation-delay: 7.7s; }
                .animate .flower-light__8 { animation-delay: 8.2s; }
                @keyframes petal-grow { 0% { scale: 0; opacity: 0.8; } 50% { scale: 1; opacity: 0.8; } 75% { scale: 1.1; opacity: 0.8; } 90% { scale: 0.9; opacity: 0.8; } 100% { scale: 1; opacity: 0.8; } }
                @keyframes grass-grow { 100% { opacity: 1; scale: 1; } }
                @keyframes stem-grow { 0% { border-radius: 10%; } 100% { transform: scaleY(1); } }
                @keyframes flower-rotate { 0%,100% { rotate: 0deg; } 25% { rotate: 5deg; } 75% { rotate: -5deg; } }
                @keyframes shrink { 100% { transform: scale(1); } }
                @keyframes light-float { 0% { opacity: 0; transform: translate(0, 0); } 25% { opacity: 1; transform: translate(20cqi, -25cqi); } 50% { opacity: 1; transform: translate(0, -50cqi); } 75% { opacity: 1; transform: translate(-20cqi, -75cqi); } 100% { opacity: 0; transform: translate(0, -100cqi); } }
            </style>
            <div class="ground">
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
                <div class="flower-container"></div>
            </div>
        `;
        
        rightContainer.appendChild(rightFlowers);
        
        // Run the flower animation script
        setTimeout(() => {
            rightFlowers.querySelectorAll('.flower-container').forEach(el => {
                el.innerHTML = `<div class="flower-top">
                    <div class="flower-petal flower-petal__1"></div>
                    <div class="flower-petal flower-petal__2"></div>
                    <div class="flower-petal flower-petal__3"></div>
                    <div class="flower-petal flower-petal__4"></div>
                    <div class="flower-petal flower-petal__5"></div>
                    <div class="flower-petal flower-petal__6"></div>
                    <div class="flower-petal flower-petal__7"></div>
                    <div class="flower-petal flower-petal__8"></div>
                    <div class="flower-circle"></div>
                    <div class="flower-light flower-light__1"></div>
                    <div class="flower-light flower-light__2"></div>
                    <div class="flower-light flower-light__3"></div>
                    <div class="flower-light flower-light__4"></div>
                    <div class="flower-light flower-light__5"></div>
                    <div class="flower-light flower-light__6"></div>
                    <div class="flower-light flower-light__7"></div>
                    <div class="flower-light flower-light__8"></div>
                </div>
                <div class="flower-bottom">
                    <div class="flower-stem"></div>
                    <div class="flower-leaf flower-leaf__1"></div>
                    <div class="flower-leaf flower-leaf__2"></div>
                    <div class="flower-leaf flower-leaf__3"></div>
                    <div class="flower-leaf flower-leaf__4"></div>
                    <div class="flower-leaf flower-leaf__5"></div>
                    <div class="flower-leaf flower-leaf__6"></div>
                    <div class="flower-grass flower-grass__1"></div>
                    <div class="flower-grass flower-grass__2"></div>
                    <div class="flower-grass flower-grass__3"></div>
                    <div class="flower-grass flower-grass__4"></div>
                </div>`;
            });
            
            const flowers = Array.from(rightFlowers.querySelectorAll('.flower-container'));
            const animatedClass = 'animate';
            
            flowers[0].classList.add(animatedClass);
            
            setTimeout(() => {
                for (let i = 1; i <= 2 && i < flowers.length; i++) {
                    flowers[i].classList.add(animatedClass);
                }
                
                let remaining = flowers.slice(3);
                const interval = setInterval(() => {
                    if (remaining.length === 0) {
                        clearInterval(interval);
                        return;
                    }
                    
                    const randomIndex = Math.floor(Math.random() * remaining.length);
                    const el = remaining.splice(randomIndex, 1)[0];
                    el.classList.add(animatedClass);
                }, 500);
            }, 3000);
        }, 100);
    }

    // Update counter
    document.getElementById('currentPage').textContent = currentSpread + 1;
    document.getElementById('totalPages').textContent = bookData.length - 1;

    // Update button states
    document.getElementById('prevBtn').disabled = currentSpread === 0;
    document.getElementById('nextBtn').disabled = currentSpread >= bookData.length - 1;
}

// CREATE PAGE ELEMENT
function createPageElement(pageData, className) {
    const page = document.createElement('div');
    page.className = `page-content ${className}`;

    const img = document.createElement('img');
    img.className = 'page-image';
    img.src = pageData.image;
    img.alt = pageData.caption;
    img.style.cursor = 'pointer';
    img.onclick = (e) => {
        e.stopPropagation();
        openImageModal(pageData.image, pageData.caption);
    };

    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';

    if (pageData.caption) {
        const caption = document.createElement('div');
        caption.className = 'page-caption';
        caption.textContent = pageData.caption;
        overlay.appendChild(caption);
    }

    page.appendChild(img);
    page.appendChild(overlay);
    return page;
}

// CREATE TWO IMAGES ELEMENT
function createTwoImagesElement(spread, className) {
    const container = document.createElement('div');
    container.className = `page-content two-images-container ${className}`;
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 0;
        height: 100%;
        width: 100%;
        position: relative;
    `;

    // Add month header
    const header = document.createElement('div');
    header.className = 'collage-header';
    header.textContent = spread.month;
    header.style.cssText = `
        flex-shrink: 0;
        padding: 12px 8px;
        background: rgba(0,0,0,0.08);
        text-align: center;
        font-size: 0.85rem;
        letter-spacing: 2px;
        width: 100%;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    `;
    container.appendChild(header);

    // Create image container - horizontal layout (fills remaining space)
    const imagesWrapper = document.createElement('div');
    imagesWrapper.style.cssText = `
        display: flex;
        flex-direction: row;
        gap: 0;
        flex: 1;
        overflow: hidden;
        padding: 0;
        width: 100%;
    `;

    // First image: 200px width
    const item1 = document.createElement('div');
    item1.className = 'two-image-item';
    item1.style.cssText = `
        width: 200px;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 0;
        flex-shrink: 0;
    `;

    const img1 = document.createElement('img');
    img1.src = spread.leftImages[0].image;
    img1.alt = spread.leftImages[0].caption;
    img1.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        background: var(--coconut-cream);
        cursor: pointer;
    `;
    img1.onclick = (e) => {
        e.stopPropagation();
        openImageModal(spread.leftImages[0].image, spread.leftImages[0].caption);
    };

    const caption1 = document.createElement('div');
    caption1.className = 'collage-caption';
    caption1.textContent = spread.leftImages[0].caption;
    caption1.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        color: white;
        padding: 12px 6px 8px;
        font-size: 0.8rem;
        font-style: italic;
        text-align: center;
        font-weight: 400;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s ease;
        width: 100%;
    `;

    const overlay1 = document.createElement('div');
    overlay1.className = 'image-overlay';
    overlay1.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 12px 6px;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const caption1Copy = document.createElement('div');
    caption1Copy.className = 'page-caption';
    caption1Copy.textContent = spread.leftImages[0].caption;
    caption1Copy.style.cssText = `
        color: white;
        font-size: 0.75rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        line-height: 1.4;
        margin: 0;
        font-style: italic;
        font-weight: 400;
        text-align: center;
    `;
    overlay1.appendChild(caption1Copy);

    item1.appendChild(img1);
    item1.appendChild(overlay1);

    item1.addEventListener('mouseenter', () => {
        overlay1.style.opacity = '1';
    });
    item1.addEventListener('mouseleave', () => {
        overlay1.style.opacity = '0';
    });

    imagesWrapper.appendChild(item1);

    // Second image: 400px width
    const item2 = document.createElement('div');
    item2.className = 'two-image-item';
    item2.style.cssText = `
        width: 400px;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 0;
        flex-shrink: 0;
    `;

    const img2 = document.createElement('img');
    img2.src = spread.leftImages[1].image;
    img2.alt = spread.leftImages[1].caption;
    img2.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        background: var(--coconut-cream);
        cursor: pointer;
    `;
    img2.onclick = (e) => {
        e.stopPropagation();
        openImageModal(spread.leftImages[1].image, spread.leftImages[1].caption);
    };

    const caption2 = document.createElement('div');
    caption2.className = 'collage-caption';
    caption2.textContent = spread.leftImages[1].caption;
    caption2.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        color: white;
        padding: 12px 6px 8px;
        font-size: 0.8rem;
        font-style: italic;
        text-align: center;
        font-weight: 400;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s ease;
        width: 100%;
    `;

    const overlay2 = document.createElement('div');
    overlay2.className = 'image-overlay';
    overlay2.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 12px 6px;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const caption2Copy = document.createElement('div');
    caption2Copy.className = 'page-caption';
    caption2Copy.textContent = spread.leftImages[1].caption;
    caption2Copy.style.cssText = `
        color: white;
        font-size: 0.75rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        line-height: 1.4;
        margin: 0;
        font-style: italic;
        font-weight: 400;
        text-align: center;
    `;
    overlay2.appendChild(caption2Copy);

    item2.appendChild(img2);
    item2.appendChild(overlay2);

    item2.addEventListener('mouseenter', () => {
        overlay2.style.opacity = '1';
    });
    item2.addEventListener('mouseleave', () => {
        overlay2.style.opacity = '0';
    });

    imagesWrapper.appendChild(item2);

    container.appendChild(imagesWrapper);
    return container;
}

// CREATE TWO IMAGES VERTICAL ELEMENT
function createTwoImagesVerticalElement(spread, className) {
    const container = document.createElement('div');
    container.className = `page-content two-images-container ${className}`;
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 0;
        height: 100%;
        width: 100%;
        position: relative;
    `;

    // Add month header
    const header = document.createElement('div');
    header.className = 'collage-header';
    header.textContent = spread.month;
    header.style.cssText = `
        flex-shrink: 0;
        padding: 12px 8px;
        background: rgba(0,0,0,0.08);
        text-align: center;
        font-size: 0.85rem;
        letter-spacing: 2px;
        width: 100%;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    `;
    container.appendChild(header);

    // Create image container - vertical layout (stacked)
    const imagesWrapper = document.createElement('div');
    imagesWrapper.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 0;
        flex: 1;
        overflow: hidden;
        padding: 0;
        width: 100%;
    `;

    // First image: top half
    const item1 = document.createElement('div');
    item1.className = 'two-image-item';
    item1.style.cssText = `
        width: 100%;
        height: 50%;
        position: relative;
        overflow: hidden;
        border-radius: 0;
        flex-shrink: 0;
    `;

    const img1 = document.createElement('img');
    img1.src = spread.leftImages[0].image;
    img1.alt = spread.leftImages[0].caption;
    img1.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        background: var(--coconut-cream);
        cursor: pointer;
    `;
    img1.onclick = (e) => {
        e.stopPropagation();
        openImageModal(spread.leftImages[0].image, spread.leftImages[0].caption);
    };

    const overlay1 = document.createElement('div');
    overlay1.className = 'image-overlay';
    overlay1.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 12px 6px;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const caption1Copy = document.createElement('div');
    caption1Copy.className = 'page-caption';
    caption1Copy.textContent = spread.leftImages[0].caption;
    caption1Copy.style.cssText = `
        color: white;
        font-size: 0.75rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        line-height: 1.4;
        margin: 0;
        font-style: italic;
        font-weight: 400;
        text-align: center;
    `;
    overlay1.appendChild(caption1Copy);

    item1.appendChild(img1);
    item1.appendChild(overlay1);

    item1.addEventListener('mouseenter', () => {
        overlay1.style.opacity = '1';
    });
    item1.addEventListener('mouseleave', () => {
        overlay1.style.opacity = '0';
    });

    imagesWrapper.appendChild(item1);

    // Second image: bottom half
    const item2 = document.createElement('div');
    item2.className = 'two-image-item';
    item2.style.cssText = `
        width: 100%;
        height: 50%;
        position: relative;
        overflow: hidden;
        border-radius: 0;
        flex-shrink: 0;
    `;

    const img2 = document.createElement('img');
    img2.src = spread.leftImages[1].image;
    img2.alt = spread.leftImages[1].caption;
    img2.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        background: var(--coconut-cream);
        cursor: pointer;
    `;
    img2.onclick = (e) => {
        e.stopPropagation();
        openImageModal(spread.leftImages[1].image, spread.leftImages[1].caption);
    };

    const overlay2 = document.createElement('div');
    overlay2.className = 'image-overlay';
    overlay2.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 12px 6px;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const caption2Copy = document.createElement('div');
    caption2Copy.className = 'page-caption';
    caption2Copy.textContent = spread.leftImages[1].caption;
    caption2Copy.style.cssText = `
        color: white;
        font-size: 0.75rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        line-height: 1.4;
        margin: 0;
        font-style: italic;
        font-weight: 400;
        text-align: center;
    `;
    overlay2.appendChild(caption2Copy);

    item2.appendChild(img2);
    item2.appendChild(overlay2);

    item2.addEventListener('mouseenter', () => {
        overlay2.style.opacity = '1';
    });
    item2.addEventListener('mouseleave', () => {
        overlay2.style.opacity = '0';
    });

    imagesWrapper.appendChild(item2);

    container.appendChild(imagesWrapper);
    return container;
}

// CREATE COLLAGE ELEMENT
function createCollageElement(spread, className) {
    const page = document.createElement('div');
    page.className = `page-content collage ${spread.layout === 'triple' ? 'triple' : ''} ${className}`;

    // Add month header
    const header = document.createElement('div');
    header.className = 'collage-header';
    header.textContent = spread.month;
    page.appendChild(header);

    // Add images
    spread.images.forEach(imgData => {
        const item = document.createElement('div');
        item.className = 'collage-item';

        const img = document.createElement('img');
        img.src = imgData.image;
        img.alt = imgData.caption;
        img.style.cursor = 'pointer';
        img.onclick = (e) => {
            e.stopPropagation();
            openImageModal(imgData.image, imgData.caption);
        };

        const caption = document.createElement('div');
        caption.className = 'collage-caption';
        caption.textContent = imgData.caption;

        item.appendChild(img);
        item.appendChild(caption);
        page.appendChild(item);
    });

    return page;
}

// CREATE FINAL PAGE ELEMENT
function createFinalElement(spread) {
    const page = document.createElement('div');
    page.className = 'page-content final-page-content';

    const message = document.createElement('div');
    message.className = 'final-message';

    const title = document.createElement('h2');
    title.textContent = spread.title;

    const text = document.createElement('p');
    text.textContent = spread.message;

    const hearts = document.createElement('div');
    hearts.className = 'hearts';
    hearts.textContent = '💕 ✨ 💕';

    message.appendChild(title);
    message.appendChild(text);
    message.appendChild(hearts);
    page.appendChild(message);

    return page;
}

// NAVIGATE
function nextPage() {
    if (!isFlipping && currentSpread < bookData.length - 1) {
        isFlipping = true;
        currentSpread++;
        updatePages();
        setTimeout(() => { isFlipping = false; }, 700);
    }
}

function previousPage() {
    if (!isFlipping && currentSpread > 0) {
        isFlipping = true;
        currentSpread--;
        updatePages();
        setTimeout(() => { isFlipping = false; }, 700);
    }
}

// OPEN BOOK
function openBook() {
    document.getElementById('coverPage').classList.add('hidden');
    document.getElementById('bookContainer').classList.add('active');
    
    // Show navigation buttons and page counter
    document.getElementById('prevBtn').style.display = 'flex';
    document.getElementById('nextBtn').style.display = 'flex';
    document.querySelector('.page-counter').style.display = 'block';
    
    setTimeout(() => {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay blocked');
                document.getElementById('musicBtn').classList.remove('playing');
            }).then(() => {
                document.getElementById('musicBtn').classList.add('playing');
            });
        }
    }, 500);
}

// MUSIC CONTROL
function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (music.paused) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                btn.classList.add('playing');
            }).catch(error => {
                console.log('Play failed:', error);
            });
        }
    } else {
        music.pause();
        btn.classList.remove('playing');
    }
}

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') previousPage();
    if (e.key === ' ') {
        e.preventDefault();
        toggleMusic();
    }
});

// TOUCH SWIPE
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextPage();
        else previousPage();
    }
});

// VISIBILITY CHANGE
document.addEventListener('visibilitychange', () => {
    if (document.hidden && !music.paused) {
        music.pause();
    }
});

// INITIALIZE
window.addEventListener('load', () => {
    preloadImages();
    renderBook();
    // Attempt to autoplay music (may be blocked by browser)
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay blocked, waiting for user interaction');
        });
    }
});

// Resume music playback on user interaction if autoplay was blocked
document.addEventListener('click', () => {
    if (music.paused) {
        music.play().catch(error => console.log('Could not play music'));
    }
}, { once: true });

// IMAGE MODAL FUNCTIONS
function openImageModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal(event) {
    const modal = document.getElementById('imageModal');
    // Close only if clicking on the background or the close button
    if (!event || event.target === modal || event.target.classList.contains('modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

