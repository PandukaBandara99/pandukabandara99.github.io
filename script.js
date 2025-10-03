document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: CURSOR FLARE EFFECT ---
    const flare = document.createElement('div');
    flare.classList.add('cursor-flare');
    document.body.appendChild(flare);

    window.addEventListener('mousemove', (e) => {
        // We use transform for smooth performance
        flare.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });


    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    const navLinks = document.querySelectorAll('nav a.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- PROJECT CARD EXPANSION ---
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expandableContent = button.parentElement.previousElementSibling;
            expandableContent.classList.toggle('visible');

            if (expandableContent.classList.contains('visible')) {
                button.textContent = 'Read Less';
            } else {
                button.textContent = 'Read More';
            }
        });
    });
    
    // --- ON-SCROLL FADE-IN & FADE-OUT ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('fade-out');
                entry.target.classList.add('fade-in');
            } else {
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.remove('fade-in');
                    entry.target.classList.add('fade-out');
                }
            }
        });
    }, { 
        threshold: 0.1
    });

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutDown {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(30px); }
        }
        .fade-in {
            animation: fadeInUp 1s forwards;
        }
        .fade-out {
            animation: fadeOutDown 1s forwards;
        }
    `;
    document.head.appendChild(styleSheet);
    
    document.querySelectorAll('.skill-category, .edu-card, .timeline-item, .project-card, .activity-card, .cert-card').forEach((el) => {
        el.style.opacity = 0; 
        observer.observe(el);
    });

    // =================================================================
    // --- SEQUENCED TYPING ANIMATIONS ---
    // =================================================================
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const typeName = async () => {
        const words = document.querySelectorAll('.name-animation .word');
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');

        const originalTexts = Array.from(words).map(word => {
            const text = word.textContent;
            word.textContent = '';
            return text;
        });

        for (let i = 0; i < words.length; i++) {
            const wordEl = words[i];
            const text = originalTexts[i];
            wordEl.insertAdjacentElement('afterend', cursor);

            for (const char of text) {
                wordEl.textContent += char;
                await sleep(120);
            }
            await sleep(500);
        }
    };

    const typeSlogan = async () => {
        const sloganElement = document.getElementById('slogan');
        const sloganText = "Deep interest in evolving technologies, seeking practical challenges to improve skills, expand technical knowledge, and contribute to building efficient and innovative tech solutions to solve real-world problems";
        sloganElement.textContent = '';

        for (const char of sloganText) {
            sloganElement.textContent += char;
            await sleep(30);
        }
        
        sloganElement.innerHTML += '<span class="slogan-cursor">_</span>';
    };

    const roles = [
        "BSc in Electrical & Electronic Engineering", "50+ Certifications", "Data Engineering",
        "Machine Learning & AI", "Software Engineering","ML OPs", "Content Creation" , "Data Science" , "Cloud Engineering"
    ];
    const roleTextElement = document.querySelector('.role-text');
    let roleIndex = 0;
    function updateRoleText() {
        roleTextElement.classList.remove('visible');
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleTextElement.textContent = roles[roleIndex];
            roleTextElement.classList.add('visible');
        }, 500);
    }
    
    const runAnimations = async () => {
        roleTextElement.textContent = roles[roleIndex];
        roleTextElement.classList.add('visible');
        setInterval(updateRoleText, 3000);
        
        await typeName();
        await typeSlogan();
    };

    runAnimations();

});