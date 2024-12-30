const btns = document.querySelectorAll(".acc-btn");

// fn
function accordion() {
  // this = the btn | icon & bg changed
  this.classList.toggle("is-open");

  // the acc-content
  const content = this.nextElementSibling;

  // IF open, close | else open
  if (content.style.maxHeight) content.style.maxHeight = null;
  else content.style.maxHeight = content.scrollHeight + "px";
}

// event
btns.forEach((el) => el.addEventListener("click", accordion));




document.addEventListener('DOMContentLoaded', () => {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  const accordionContents = document.querySelectorAll('.accordion-content');

  // Ensure all accordion content is hidden on page load
  accordionContents.forEach(content => {
    content.style.display = 'none';
    content.style.backgroundColor = ''; // Reset background color
  });

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Close all other accordion sections
      accordionButtons.forEach(btn => {
        if (btn !== button) {
          btn.classList.remove('active');
          const content = btn.nextElementSibling;
          content.style.display = 'none';
          content.style.backgroundColor = ''; // Reset background color
        }
      });

      // Toggle the clicked accordion section
      const accordionContent = button.nextElementSibling;
      if (accordionContent.style.display === 'block') {
        accordionContent.style.display = 'none';
        accordionContent.style.backgroundColor = ''; // Reset background color
        button.classList.remove('active');
      } else {
        accordionContent.style.display = 'block';
        accordionContent.style.backgroundColor = 'rgb(184, 134, 11, 0.2)'; /* Dark Goldenrod */ // Set background color when opened
        button.classList.add('active');
      }
    });
  });
});






const navbar = document.getElementById('navbar'); 
window.addEventListener('scroll', () => { 
  if (window.scrollY > 2) {
     navbar.style.opacity = '0.8'; 
    } else { 
      navbar.style.opacity = '1'; 
    }
  });


 