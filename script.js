document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const userData = {
        name: "MƏHƏMMƏD <span class='highlight'>OSMANLI</span>",
        title: "STUDENT",
        contact: [
            { icon: "phone.png", text: "+994 51 691 51 26" },
            { icon: "email.png", text: "osmmehemmed55@gmail.com" },
            { icon: "location.png", text: "Azerbaijan/Baku" }
        ],
        socialMedia: [
            { icon: "instagram.png", text: "Mhmd.0sm" },
            { icon: "tik-tok.png", text: "maqamuqa02" },
            { icon: "github.png", text: "maqamuqa" }
        ],
        education: [
            { period: "2013 - 2024", school: "School number 32" },
            { period: "2024 - 2025", school: "AzTU - Information Security" }
        ],
        skills: ["Camera Operation", "Web Development", "UI/UX Design"],
        languages: ["Azerbaijani", "English", "Turkish"],
        profile: "Creative and detail-oriented individual with a strong passion for visual storytelling, technology, and problem-solving. Experienced in video editing, cinematography, and content creation for digital platforms, with a deep understanding of audience engagement. Simultaneously building a solid foundation in cybersecurity, ethical hacking, and network defense through academic studies and personal lab environments. Proficient in Python, C++, and web technologies such as HTML, CSS, and JavaScript. Adaptable and fast-learning, with a hands-on approach to both creative and technical challenges. Always eager to explore new tools, collaborate with diverse teams, and deliver high-quality results in dynamic environments.",
        workExperience: [
            {
                title: "Cyber Security Intern – Personal Lab Projects",
                details: ["Built and maintained a personal penetration testing lab using VirtualBox, Kali Linux, Metasploitable, and other platforms. Conducted ethical hacking simulations, vulnerability assessments, and network scanning using tools like Nmap, Burp Suite, and Wireshark. Developed hands-on experience in reconnaissance, privilege escalation, and system exploitation."]
            },
            {
                title: "Sales Associate – TrendWear Fashion",
                details: ["Jul 2019 – Sep 2021", "Assisted customers, managed inventory, and consistently exceeded monthly sales targets by 20%."]
            }
        ],
        reference: "During my internship at TechNova Solutions, I worked directly under Mr. John Parker, a Project Manager at the company. Mr. Parker played a pivotal role in helping me understand the complexities of software development and project management. His mentorship and leadership skills were instrumental in my professional growth, and he provided me with detailed feedback throughout my internship.",
        certifications: [
            {
                name: "Python for Everybody Specialization",
                description: "Completed a multi-course specialization covering Python programming fundamentals including data structures, web scraping, file handling, and basic data visualization. Applied knowledge in practical projects and exercises, strengthening understanding of logic-based problem solving and software development processes."
            },
            {
                name: "Certified Information Security Manager (CISM)",
                description: "CISM is a globally recognized certification that focuses on information security management. It is aimed at individuals who design and manage information security programs, addressing areas like risk management, governance, and incident response."
            }
        ],
        projects: [
            {
                name: "Data Encryption System",
                description: "Built a data encryption tool using Python, allowing users to securely encrypt and decrypt sensitive information."
            },
            {
                name: "Online Voting System",
                description: "Developed an online voting platform with user authentication, vote tracking, and result calculations using PHP and MySQL."
            }
        ]
    };

    // --- ADD DATA TO PAGE ---
    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `).join('');
    };

    const createCertifications = (array) => {
        return array.map(cert => `
            <p><strong>${cert.name}</strong></p>
            <p>${cert.description}</p>
        `).join('');
    };

    const createProjects = (array) => {
        return array.map(project => `
            <p><strong>${project.name}</strong></p>
            <p>${project.description}</p>
        `).join('');
    };

    document.getElementById('contactInfo').innerHTML = createList(userData.contact);
    document.getElementById('socialMedia').innerHTML = createList(userData.socialMedia);
    document.getElementById('educationInfo').innerHTML = createEducation(userData.education);
    document.getElementById('skillsInfo').innerHTML = createSkills(userData.skills);
    document.getElementById('languagesInfo').innerHTML = createSkills(userData.languages);
    document.getElementById('profileInfo').innerHTML = `<p>${userData.profile}</p>`;
    document.getElementById('workExperience').innerHTML = createWork(userData.workExperience);
    document.getElementById('referenceInfo').innerHTML = `<p>${userData.reference}</p>`;
    document.getElementById('certificationsInfo').innerHTML = createCertifications(userData.certifications);
    document.getElementById('projectsInfo').innerHTML = createProjects(userData.projects);

    // --- OLD FUNCTIONS (Edit, Save, Accordion, Zip) ---
    const editBtn = document.getElementById('editBtn');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    let isEditing = false;

    // Accordion open/close
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = "300px";
            }
        });
    });

    // Toggle edit mode
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        // Open Accordion panels
        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        // Activate all editable fields
        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        // Save
        if (!isEditing) {
            downloadFiles();
        }
    });

    // Add a new line on Enter key
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('keydown', e => {
            if (!isEditing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '<br><br>');
            }
        });
    });

    // Download the page as ZIP
    async function downloadFiles() {
        const zip = new JSZip();

        // Add HTML file
        const html = document.documentElement.outerHTML;
        zip.file("index.html", html);

        // Add CSS file
        const cssPath = Array.from(document.styleSheets).find(s => s.href && s.href.endsWith("style.css"))?.href;
        if (cssPath) {
            try {
                const response = await fetch(cssPath);
                const cssText = await response.text();
                zip.file("style.css", cssText);
            } catch (err) {
                console.warn("CSS dosyası alınamadı:", err);
            }
        }

        // Add script file
        const scriptPath = Array.from(document.scripts).find(s => s.src && s.src.endsWith("script.js"))?.src;
        if (scriptPath) {
            try {
                const response = await fetch(scriptPath);
                const scriptText = await response.text();
                zip.file("script.js", scriptText);
            } catch (err) {
                console.warn("Script dosyası alınamadı:", err);
            }
        }

        // Add photos
        const images = [...document.querySelectorAll("img")];
        for (let img of images) {
            const src = img.src;
            if (src.startsWith("blob:")) continue;
            try {
                const res = await fetch(src);
                const blob = await res.blob();
                const name = img.src.split("/").pop();
                zip.file(`photos/${name}`, blob);
            } catch (err) {
                console.warn("Resim yüklenemedi:", src);
            }
        }

        // Download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'cv.zip';
            a.click();
        });
    }
});
