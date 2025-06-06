/*============================================Typing animation=====================================*/
var typed = new Typed(".typing",{
    strings:["Frontend Developer","Full Stack Developer","Coding Enthusiat"],
    typespeed:100,
    backspeed:60,
    loop:true
})
/*============================================Aside=====================================*/
const nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSection = document.querySelectorAll(".section"),
totalSection = allSection.length;
for(let i=0; i<totalNavList; i++)
{
    const a = navList[i].querySelector("a");
    a.addEventListener("click",function()
    {
       removeBackSection();
        for(let j=0; j<totalNavList; j++)
        {
            if(navList[j].querySelector("a").classList.contains("active"))
            {
                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if(window.innerWidth< 1200)
        {
            asideSectionTogglerBtn()
        }
    })
}
 function  removeBackSection()
 {
    for(let i=0; i<totalNavList; i++)
    {
        allSection[i].classList.remove("back-section");
    }
 }
 function addBackSection(num)
 {
    allSection[num].classList.add("back-section");
 }
function showSection(element)
{
    for(let i=0; i<totalSection; i++)
    {
      allSection[i].classList.remove("active");
    }
    const target=element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}
function updateNav(element)
{
    for(let i=0; i<totalNavList; i++)
    {
      navList[i].querySelector("a").classList.remove("active");
      const target=element.getAttribute("href").split("#")[1];
      if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
      {
        navList[i].querySelector("a").classList.add("active");
      }
    } 
}
document.querySelector(".hire-me").addEventListener("click", function()
{
    const sectionIndex = this.getAttribute("data-section-index");
    console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click",() =>
{
    asideSectionTogglerBtn();
})
function asideSectionTogglerBtn()
{
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i=0; i<totalSection; i++)
    {
      allSection[i].classList.toggle("open");
    }
}
/* ======================= Contact Form Handling ===================== */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
  
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
  
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showFormMessage('Message sent successfully!', 'success');
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      showFormMessage('Error sending message. Please try again.', 'error');
    })
    .finally(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  });
  function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    formMessage.style.color = type === 'success' ? 'green' : 'red';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}