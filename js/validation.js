// form-validation.js
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector("form");
  
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
      const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
      const phone = document.querySelector('input[placeholder="Phone Number"]').value.trim();
      const email = document.querySelector('input[placeholder="Email"]').value.trim();
      const message = document.querySelector('textarea[placeholder="Your Message"]').value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!firstName || !lastName || !phone || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }
  
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      alert("Form submitted successfully!");
      // If needed, submit the form:
      // contactForm.submit();
    });
  });
  