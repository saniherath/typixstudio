// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const honeypot = document.getElementById("honeypot").value;
  const captcha = document.getElementById("captcha").value;

  if (honeypot !== "") {
    alert("Spam detected!");
    return;
  }

  if (captcha != "7") {
    alert("Captcha incorrect. Please try again.");
    return;
  }

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all required fields.");
    return;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Message sent successfully! (Demo only, no backend configured)");
  this.reset();
});
