function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.remove('hidden');
        activePage.classList.add('active');
    }
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    alert(`Welcome, ${username}! Redirecting to courses...`);
    showPage('courses-page');
});

function goToCourses() {
    showPage('courses-page');
}

function selectCourse(buttonElement) {
    const courseCard = buttonElement.closest('.course-card');
    const field = courseCard.getAttribute('data-field');
    const duration = courseCard.getAttribute('data-duration');
    const price = courseCard.getAttribute('data-price');

    document.getElementById('track-field').textContent = field;
    document.getElementById('track-duration').textContent = `Duration: ${duration}`;
    document.getElementById('track-price').textContent = `Cost: ${price}`;
    document.getElementById('dashboard-title').textContent = `📈 Your ${field} Tracking`;

    localStorage.setItem('currentProgress', 0);
    updateProgressDisplay(0);
    const updatesList = document.getElementById('updates-list');
    updatesList.innerHTML = `<li>Started tracking progress for ${field}</li>`;
    
    showPage('dashboard-page');
}
function updateProgressDisplay(progress) {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    progressBar.style.width = `${progress}%`;
    progressPercent.textContent = `${progress}%`;
}
function updateProgress(increment) {
    let currentProgress = parseInt(localStorage.getItem('currentProgress')) || 0;
    
    if (currentProgress >= 100) {
        alert("Course already completed! Great job!");
        return;
    }
    
    currentProgress += increment;
    currentProgress = Math.min(100, currentProgress);
    
    localStorage.setItem('currentProgress', currentProgress);
    updateProgressDisplay(currentProgress);

    const updatesList = document.getElementById('updates-list');
    const updateText = currentProgress === 100 
        ? '🎉Course Completed!Time to grab your certificate.' 
        : `Progress updated to ${currentProgress}%. Keep going!`;

    const newUpdate = document.createElement('li');
    newUpdate.innerHTML = updateText;
    updatesList.prepend(newUpdate);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedProgress = parseInt(localStorage.getItem('currentProgress')) || 0;
    updateProgressDisplay(savedProgress);
});