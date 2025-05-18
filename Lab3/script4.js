document.addEventListener('DOMContentLoaded', () => {
    const userData = {
        name: "Osmanlı <span class='highlight'>Məhəmməd</span>",
        title: "Tələbə",
        contact: [
            { icon: "phone.png", text: "+994 051 691 51 26" },
            { icon: "email.png", text: "osmmehemmed55@gmail.com" },
            { icon: "location.png", text: "Lökbatan Qobu park yaşayış massivi" }
        ],
        socialMedia:[],
        education: [
            { period: "2024 - 2025", school: "Azərbaycan Texniki Universiteti - İnformasiya Təhlükəsizliyi" }
        ],
        skills: ["Python", "HTML, CSS"],
        languages: ["Azərbaycan - C1", "English - C1", "Türk - B2"],
        profile: "Məsuliyyətli, öyrənməyə açıq və texnologiyaya böyük maraq göstərən bir tələbəyəm. İT sahəsində biliklərimi daima inkişaf etdirməyə çalışıram. Komanda ilə işləməkdə çevik, yeni bilikləri tez mənimsəyən və problemlərin həllinə analitik yanaşan biriyəm. Gələcək karyeramda informasiya təhlükəsizliyi sahəsində peşəkar olmaq əsas məqsədimdir.",
        workExperience: [
            { title: "", details: ["Tərcüməçi-1 il təcrübə"] }
        ],
       
        certifications: [
            {
                name: "Google Kibertəhlükəsizlik Peşəkar Sertifikatı",
                description: "Bu peşəkar səviyyəli sertifikata şəbəkə, əməliyyat sistemləri, sistem administrasiyası, insidentlərə reaksiya və təhlükəsizlik alətləri üzrə təlimlər daxildir. O, həmçinin kibertəhlükələrin müəyyən edilməsi və azaldılması, SIEM alətlərindən istifadə və təhlükəsizlik qeydlərinin təhlili üzrə praktiki laboratoriyaları əhatə edib."
            }
        ],
        projects: [
            {
                name: "CyberAware: Fişinq Simulyasiya Aləti",
                description: "Təşkilatlara təhlükəsiz mühitdə işçilərin məlumatlılığını sınamağa imkan verən təhsil məqsədləri üçün Python əsaslı fişinq simulyasiya aləti hazırlayıb. Hər bir test mərhələsi üçün ətraflı hesabatlar hazırlanmışdır."
            }
        ],
    };

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none; padding-left: 0;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none; padding-left: 0;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
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

    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;
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

    const accordionBtns = document.querySelectorAll('.accordion-btn');
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

    const editBtn = document.getElementById('editBtn');
    let isEditing = false;
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        if (!isEditing) {
            alert("Dəyişikliklər yadda saxlanıldı!");
        }
    });

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

    const form = document.getElementById('infoForm');

    function loadFormData() {
        const saved = localStorage.getItem('formData');
        if (!saved) return;
        const data = JSON.parse(saved);
        Object.keys(data).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = data[key];
        });
    }

    function validateForm() {
        let valid = true;

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const birthdate = form.birthdate.value;
        const message = form.message.value.trim();

        if (!name) {
            document.getElementById('errorName').textContent = "Adınızı daxil edin";
            valid = false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('errorEmail').textContent = "Düzgün email daxil edin";
            valid = false;
        }

        if (!phone || !/^\+?\d{9,15}$/.test(phone.replace(/\s+/g, ''))) {
            document.getElementById('errorPhone').textContent = "Düzgün telefon nömrəsi daxil edin";
            valid = false;
        }

        if (!birthdate) {
            document.getElementById('errorBirthdate').textContent = "Doğum tarixinizi seçin";
            valid = false;
        }

        if (!message) {
            document.getElementById('errorMessage').textContent = "Mesajınızı yazın";
            valid = false;
        }

        return valid;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (validateForm()) {
            const formData = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                birthdate: form.birthdate.value,
                message: form.message.value.trim()
            };
            localStorage.setItem('formData', JSON.stringify(formData));

            alert("Form məlumatları yadda saxlanıldı!");
            form.reset();
        }
    });

    loadFormData();
});