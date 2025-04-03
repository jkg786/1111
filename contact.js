// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Form validation
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!contactForm.checkValidity()) {
            event.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Create and show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fas fa-check-circle fa-2x me-3"></i>
                    <div>
                        <h5 class="mb-1">Thank you for your message!</h5>
                        <p class="mb-0">We'll get back to you within 24 hours.</p>
                    </div>
                </div>
            `;
            document.body.appendChild(successMessage);
            
            // Trigger animation
            setTimeout(() => successMessage.classList.add('show'), 100);
            
            // Reset form
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => successMessage.remove(), 300);
            }, 5000);
        }, 1500);
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
}); 