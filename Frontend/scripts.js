// ===== JAVASCRIPT FUNCTIONALITY =====

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to collect form data
function collectFormData() {
    const formData = {
        fullName: document.getElementById('fullName').value || '',
        email: document.getElementById('email').value || '',
        phone: document.getElementById('phone').value || '',
        company: document.getElementById('company').value || '',
        projectType: document.getElementById('projectType').value || '',
        budgetRange: document.getElementById('budgetRange').value || '',
        timeline: document.getElementById('timeline').value || '',
        location: document.getElementById('location').value || '',
        message: document.getElementById('message').value || '',
        newsletter: document.getElementById('newsletter').checked,
        submissionDate: new Date().toLocaleString(),
        submissionTimestamp: new Date().toISOString()
    };
    
    return formData;
}

// Function to get display values for dropdowns
function getDisplayValue(fieldId, value) {
    const element = document.getElementById(fieldId);
    if (element && element.tagName === 'SELECT') {
        const option = element.querySelector(`option[value="${value}"]`);
        return option ? option.textContent : value;
    }
    return value;
}

// Function to export to Excel
function exportToExcel() {
    const formData = collectFormData();
    
    // Check if required fields are filled
    if (!formData.fullName || !formData.email) {
        alert('Please fill in at least the required fields (Name and Email) before exporting.');
        return;
    }
    
    // Prepare data for Excel with display values
    const excelData = [
        ['Field', 'Value'],
        ['Full Name', formData.fullName],
        ['Email Address', formData.email],
        ['Phone Number', formData.phone],
        ['Company Name', formData.company],
        ['Project Type', getDisplayValue('projectType', formData.projectType)],
        ['Budget Range', getDisplayValue('budgetRange', formData.budgetRange)],
        ['Project Timeline', getDisplayValue('timeline', formData.timeline)],
        ['Project Location', formData.location],
        ['Project Details', formData.message],
        ['Newsletter Subscription', formData.newsletter ? 'Yes' : 'No'],
        ['Submission Date', formData.submissionDate]
    ];
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // Set column widths
    ws['!cols'] = [
        { width: 20 },
        { width: 50 }
    ];
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Get Started Info');
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `AfricaConstruct_GetStarted_${formData.fullName.replace(/\s+/g, '_')}_${timestamp}.xlsx`;
    
    // Save file
    XLSX.writeFile(wb, filename);
    
    // Show success message
    showNotification('Excel file downloaded successfully!', 'success');
}

// Function to export to Word
async function exportToWord() {
    const formData = collectFormData();
    
    // Check if required fields are filled
    if (!formData.fullName || !formData.email) {
        alert('Please fill in at least the required fields (Name and Email) before exporting.');
        return;
    }
    
    try {
        // Create document
        const doc = new docx.Document({
            sections: [{
                properties: {},
                children: [
                    // Header
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: "AfricaConstruct - Get Started Information",
                                bold: true,
                                size: 32,
                                color: "FF6B35"
                            })
                        ],
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { after: 400 }
                    }),
                    
                    // Submission details
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `Submission Date: ${formData.submissionDate}`,
                                italics: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),
                    
                    // Personal Information
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: "PERSONAL INFORMATION",
                                bold: true,
                                size: 24
                            })
                        ],
                        spacing: { before: 200, after: 200 }
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Full Name: ", bold: true }),
                            new docx.TextRun({ text: formData.fullName })
                        ]
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Email Address: ", bold: true }),
                            new docx.TextRun({ text: formData.email })
                        ]
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Phone Number: ", bold: true }),
                            new docx.TextRun({ text: formData.phone || 'Not provided' })
                        ]
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Company Name: ", bold: true }),
                            new docx.TextRun({ text: formData.company || 'Not provided' })
                        ]
                    }),
                    
                    // Project Information
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: "PROJECT INFORMATION",
                                bold: true,
                                size: 24
                            })
                        ],
                        spacing: { before: 400, after: 200 }
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Project Type: ", bold: true }),
                            new docx.TextRun({ text: getDisplayValue('projectType', formData.projectType) || 'Not specified' })
                        ]
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Budget Range: ", bold: true }),
                            new docx.TextRun({ text: getDisplayValue('budgetRange', formData.budgetRange) || 'Not specified' })
                        ]
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Timeline: ", bold: true }),
                            new docx.TextRun({ text: getDisplayValue('timeline', formData.timeline) || 'Not specified' })
                        ]
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Location: ", bold: true }),
                            new docx.TextRun({ text: formData.location || 'Not specified' })
                        ]
                    }),
                    
                    // Project Details
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: "PROJECT DETAILS & REQUIREMENTS",
                                bold: true,
                                size: 24
                            })
                        ],
                        spacing: { before: 400, after: 200 }
                    }),
                    
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: formData.message || 'No additional details provided.' })
                        ]
                    }),
                    
                    // Newsletter subscription
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({ text: "Newsletter Subscription: ", bold: true }),
                            new docx.TextRun({ text: formData.newsletter ? 'Yes' : 'No' })
                        ],
                        spacing: { before: 200 }
                    })
                ]
            }]
        });
        
        // Generate and save document
        const blob = await docx.Packer.toBlob(doc);
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `AfricaConstruct_GetStarted_${formData.fullName.replace(/\s+/g, '_')}_${timestamp}.docx`;
        
        saveAs(blob, filename);
        
        // Show success message
        showNotification('Word document downloaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error creating Word document:', error);
        showNotification('Error creating Word document. Please try again.', 'error');
    }
}

// Function to send email notifications
async function sendEmailNotifications(formData) {
    try {
        // Email to admin (you)
        const adminEmailParams = {
            to_email: 'qmary85@gmail.com', // Your email
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            company: formData.company || 'Not provided',
            project_type: getDisplayValue('projectType', formData.projectType) || 'Not specified',
            budget_range: getDisplayValue('budgetRange', formData.budgetRange) || 'Not specified',
            timeline: getDisplayValue('timeline', formData.timeline) || 'Not specified',
            location: formData.location || 'Not specified',
            message: formData.message || 'No additional details provided',
            newsletter: formData.newsletter ? 'Yes' : 'No',
            submission_date: formData.submissionDate
        };
        
        // Send admin notification
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_ADMIN_TEMPLATE_ID', adminEmailParams);
        
        // Email to customer (thank you message)
        const customerEmailParams = {
            to_email: formData.email,
            to_name: formData.fullName,
            company_name: 'AfricaConstruct'
        };
        
        // Send customer thank you email
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_CUSTOMER_TEMPLATE_ID', customerEmailParams);
        
        return true;
    } catch (error) {
        console.error('Error sending emails:', error);
        return false;
    }
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Enhanced form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = collectFormData();
    
    // Show loading state
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
    button.disabled = true;
    
    try {
        // Send email notifications
        const emailSent = await sendEmailNotifications(formData);
        
        // Show success message
        button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Success!';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            
            if (emailSent) {
                showNotification('Thank you for your interest! We\'ve sent you a confirmation email and will be in touch soon to help make your construction dreams come true! 🚀', 'success');
            } else {
                showNotification('Form submitted successfully! However, there was an issue sending the confirmation email. We\'ll still be in touch soon! 🚀', 'success');
            }
            
            // Reset form after successful submission
            this.reset();
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        button.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Error';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            
            showNotification('There was an error submitting your form. Please try again or contact us directly.', 'error');
        }, 2000);
    }
});

// Export button event listeners
document.getElementById('exportExcel').addEventListener('click', exportToExcel);
document.getElementById('exportWord').addEventListener('click', exportToWord);

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 32, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 32, 46, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            
            // Animate progress bar
            if (entry.target.querySelector('.progress-bar')) {
                setTimeout(() => {
                    entry.target.querySelector('.progress-bar').style.width = '72%';
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe service cards and features
document.querySelectorAll('.service-card, .features-visual, .stat-item').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
const counters = document.querySelectorAll('.stats h3.num-increase');

const startCounter = (counter) => {
    counter.innerText = '0';  // Reset each time
    const target = +counter.getAttribute('data-target');
    const increment = target / 200;
    const showPlus = counter.getAttribute('data-plus') === 'true';

    const updateCounter = () => {
        const current = parseFloat(counter.innerText.replace('+', '')); // Remove + if present
        if (current < target) {
            const nextValue = current + increment;
            counter.innerText = target >= 100 ? Math.ceil(nextValue) : nextValue.toFixed(1);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target >= 100 ? target : target.toFixed(1);
            if (showPlus) counter.innerText += '+';
        }
    };

    updateCounter();
};

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => startCounter(counter));
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
observer2.observe(statsSection);
