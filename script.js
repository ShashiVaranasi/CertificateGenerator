let currentFormData = {};
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    resetForm();
}
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    const btnText = document.getElementById('loginBtnText');

    btnText.textContent = 'Signing In...';
    
    setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
            showNotification('Login Successful! Welcome back!', 'success');
            showPage('generatePage');
            document.getElementById('loginForm').reset();
        } else {
            errorDiv.textContent = 'Invalid username or password. Please try again.';
            errorDiv.style.display = 'block';
        }
        btnText.textContent = 'Sign In';
    }, 1000);
});

function showForgotPassword() {
    showNotification('Please contact your administrator for password reset assistance.', 'info');
}

document.getElementById('courseCompleted').addEventListener('change', function() {
    const courseInfo = document.getElementById('courseInfo');
    const courseDescription = document.getElementById('courseDescription');
    const value = this.value;

    if (value) {
        courseInfo.style.display = 'block';
        switch(value) {
            case 'FSN':
                courseDescription.textContent = 'This certificate will include subcourses: HTML5, CSS3, JavaScript, and modern web development practices.';
                break;
            case 'ML':
                courseDescription.textContent = 'This certificate covers machine learning algorithms, neural networks, and practical AI applications.';
                break;
            case 'DS':
                courseDescription.textContent = 'This certificate includes data analysis, statistical methods, and data visualization techniques.';
                break;
        }
    } else {
        courseInfo.style.display = 'none';
    }
});

function generateCertificate() {
    const studentName = document.getElementById('studentName').value.trim();
    const organizationName = document.getElementById('organizationName').value.trim();
    const courseCompleted = document.getElementById('courseCompleted').value;

    if (!studentName || !organizationName || !courseCompleted) {
        showNotification('Please fill in all required fields to generate the certificate.', 'error');
        return;
    }

    currentFormData = {
        studentName,
        organizationName,
        courseCompleted
    };

    const certificate = createCertificate(currentFormData);
    document.getElementById('certificateContainer').innerHTML = certificate;

    document.getElementById('certificateForm').style.display = 'none';
    document.getElementById('certificateDisplay').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Your Certificate';
    document.getElementById('generateBtn').style.display = 'none';
    document.getElementById('printBtn').style.display = 'inline-flex';
    document.getElementById('newBtn').style.display = 'inline-flex';

    showNotification('Certificate generated successfully!', 'success');
}

function createCertificate(data) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const courseDetails = getCourseDetails(data.courseCompleted);
    const subcourseHtml = courseDetails.subcourses.length > 0 ? 
        `<div class="subcourses">
            <p style="color: #6b7280; margin-bottom: 1rem;">Including mastery of:</p>
            <div style="display: flex; justify-content: center; gap: 2rem;">
                ${courseDetails.subcourses.map(sub => `
                    <div class="subcourse">
                        <div class="subcourse-logo ${sub.class}">${sub.name}</div>
                        <div class="subcourse-badge ${sub.badgeClass}">${sub.name}</div>
                    </div>
                `).join('')}
            </div>
        </div>` : '';

    return `
        <div class="certificate">
            <div class="certificate-header">
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
                    <div class="logo-icon">CP</div>
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; color: #3b82f6; margin: 0;">CertifyPro</h1>
                        <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">Professional Certificate Authority</p>
                    </div>
                </div>
                <div style="width: 96px; height: 4px; background: linear-gradient(to right, #3b82f6, #2563eb); margin: 0 auto; border-radius: 2px;"></div>
            </div>

            <div class="text-center mb-6">
                <h2 class="certificate-title">CERTIFICATE OF COMPLETION</h2>
                <p class="certificate-subtitle">This is to certify that</p>
            </div>

            <div class="text-center mb-6">
                <div class="certificate-name">${data.studentName}</div>
                <p style="color: #6b7280; margin-top: 1rem;">has successfully completed the comprehensive</p>
            </div>

            <div class="text-center mb-6">
                <div class="certificate-course">${courseDetails.title}</div>
                <p style="font-size: 1.25rem; color: #6b7280; margin-top: 0.5rem;">${courseDetails.subtitle}</p>
                ${subcourseHtml}
            </div>

            <div class="text-center mb-6">
                <p style="color: #6b7280;">under the guidance of</p>
                <div class="certificate-org">${data.organizationName}</div>
            </div>

            <div class="certificate-footer">
                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="color: #3b82f6;">📅</span>
                        <span style="font-weight: 600; color: #374151;">Date Issued:</span>
                    </div>
                    <p style="color: #111827; font-weight: 600; margin: 0;">${currentDate}</p>
                </div>

                <div class="text-center">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <span style="color: #059669;">🛡️</span>
                        <span style="font-size: 0.875rem; color: #6b7280;">Verified & Authentic</span>
                    </div>
                    <div style="color: #fbbf24;">⭐⭐⭐⭐⭐</div>
                </div>

                <div class="text-right">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="color: #3b82f6;">🏆</span>
                        <span style="font-weight: 600; color: #374151;">Certificate ID:</span>
                    </div>
                    <p style="color: #111827; font-family: monospace; font-size: 0.875rem; margin: 0;">
                        CP-${data.courseCompleted}-${Date.now().toString().slice(-6)}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function getCourseDetails(courseCode) {
    switch(courseCode) {
        case 'FSN':
            return {
                title: 'Full Stack Web Development',
                subtitle: 'Complete Frontend & Backend Mastery',
                subcourses: [
                    { name: 'HTML5', class: 'html-logo', badgeClass: 'html-badge' },
                    { name: 'CSS3', class: 'css-logo', badgeClass: 'css-badge' },
                    { name: 'JavaScript', class: 'js-logo', badgeClass: 'js-badge' }
                ]
            };
        case 'ML':
            return {
                title: 'Machine Learning',
                subtitle: 'Advanced AI & ML Techniques',
                subcourses: []
            };
        case 'DS':
            return {
                title: 'Data Science',
                subtitle: 'Data Analysis & Visualization',
                subcourses: []
            };
        default:
            return {
                title: 'Professional Course',
                subtitle: 'Comprehensive Training Program',
                subcourses: []
            };
    }
}

function printCertificate() {
    window.print();
}

function resetForm() {
    document.getElementById('certificateForm').style.display = 'block';
    document.getElementById('certificateDisplay').style.display = 'none';
    document.getElementById('modalTitle').textContent = 'Generate Certificate';
    document.getElementById('generateBtn').style.display = 'inline-flex';
    document.getElementById('printBtn').style.display = 'none';
    document.getElementById('newBtn').style.display = 'none';
    document.getElementById('studentName').value = '';
    document.getElementById('organizationName').value = '';
    document.getElementById('courseCompleted').value = '';
    document.getElementById('courseInfo').style.display = 'none';
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#059669';
            break;
        case 'error':
            notification.style.background = '#dc2626';
            break;
        case 'info':
            notification.style.background = '#2563eb';
            break;
        default:
            notification.style.background = '#6b7280';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        hideModal(e.target.id);
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            hideModal(activeModal.id);
        }
    }
});