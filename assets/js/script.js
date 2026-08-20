$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- FormSubmit to mail contact form data -->
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        const formElement = this;
        const submitBtn = $(this).find('button[type="submit"]');
        const originalBtnText = submitBtn.html();
        submitBtn.html('Sending... <i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);

        fetch("https://formsubmit.co/ajax/principal.scopa@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: $("input[name='name']").val(),
                email: $("input[name='email']").val(),
                phone: $("input[name='phone']").val(),
                message: $("textarea[name='message']").val(),
                _subject: "New Portfolio Message for Dr. Vishweshwar",
                _template: "table",
                _captcha: "false"
            })
        })
        .then(response => response.json())
        .then(data => {
            formElement.reset();
            alert("Thank you! Your message has been sent successfully to principal.scopa@gmail.com.");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Thank you! Your message is being sent.");
            formElement.submit();
        })
        .finally(() => {
            submitBtn.html(originalBtnText).prop('disabled', false);
        });
    });
    // <!-- FormSubmit to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Dr. Dharashive Vishweshwar";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["pharmacology", "pharmaceutical research", "academic leadership", "drug development", "clinical evaluations"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("./skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(categories) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    let skillHTML = "";
    
    if (categories.length > 0 && categories[0].category) {
        categories.forEach(cat => {
            let accentColor = cat.color || '#00bcd4';
            let subSkillsHTML = "";
            cat.skills.forEach(skill => {
                let iconElement = skill.icon.startsWith("http") 
                    ? `<img src="${skill.icon}" alt="${skill.name}" onerror="this.onerror=null; this.outerHTML='<i class=\\'fas fa-pills\\' style=\\'color:${accentColor}; font-size: 1.8rem;\\'></i>';" />`
                    : `<i class="${skill.icon}" style="color: ${accentColor}; font-size: 1.8rem;"></i>`;
                
                subSkillsHTML += `
                <div class="subskill-box">
                  <span class="subskill-icon">${iconElement}</span>
                  <span class="subskill-name">${skill.name}</span>
                </div>`;
            });

            let catIcon = cat.icon ? `<i class="${cat.icon}"></i>` : '';

            skillHTML += `
            <div class="category-column-card" style="--cat-accent: ${accentColor};">
              <div class="category-top">
                <div class="category-icon-wrapper">
                  ${catIcon}
                </div>
                <h3 class="category-title">${cat.category}</h3>
              </div>
              <div class="category-divider"></div>
              <div class="subskills-list">
                ${subSkillsHTML}
              </div>
            </div>`;
        });
    } else {
        categories.forEach(skill => {
            skillHTML += `
            <div class="subskill-box">
              <span class="subskill-icon"><i class="fas fa-pills" style="font-size: 1.8rem;"></i></span>
              <span class="subskill-name">${skill.name}</span>
            </div>`;
        });
    }
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    if (!projects || projects.length === 0) return;
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) return;
    // render if project items exist in json
}

fetchData().then(data => {
    if (data && data.length > 0) {
        showSkills(data);
    }
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.skills .category-column-card', { interval: 150 });
    }
}).catch(err => {
    console.warn("Using pre-rendered skills from HTML:", err);
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.skills .category-column-card', { interval: 150 });
    }
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}




/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .category-column-card', { interval: 150 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL RESEARCH */
srtop.reveal('.research .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });