const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    const { name, email, subject, message } = formData;

    // Validate name length
    if (name.length < 3 || name.length > 50) {
        alert('Name must be between 3 and 50 characters long.');
        return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate subject length
    if (subject.length < 3 || subject.length > 100) {
        alert('Subject must be between 3 and 100 characters long.');
        return;
    }

    // Validate message length
    if (message.length < 10) {
        alert('Message must be between 10 and 500 characters long.');
        return;
    }

    // Check if email already exists
    // try {
    //     const response = await fetch('http://localhost:8000/api/messages');
    //     const data = await response.json();

    //         if (data.some((user) => user.email === email)) {
    //             alert('Email already exists. Please try again.');
    //             return;
    //         }
    // } catch (error) {
    //     console.error('Error:', error);
    //     alert('Failed to check Emails. Please try again.');
    // }


    // Send form data to the server
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