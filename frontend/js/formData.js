const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    try {
        const response = await fetch('http://localhost:8000/api/about', {
            method: 'POST',           
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)  
        });

        const data = await response.json();

        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert(data.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    }
});