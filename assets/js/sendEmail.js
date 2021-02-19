// submitting the form via EmailJS 
// "from_name, from_email, project_request" are all parameters from EmailJS template form
// "contactForm.name.value - emailaddress - projectsummary" are all value names set in the contact.html contact form input name
function sendMail(contactForm) {
    emailjs.send("service_7htnork","project_resume", {
        "from_name": contactForm.name.value,
        "from_email": contactFrom.emailaddress.value,
        "project-request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("Success", response);
        },
        function(error) {
            console.log("Failed", error);
        });
        return false;
}