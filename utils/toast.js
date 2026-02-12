// ========== TOAST NOTIFICATION ==========

const Toast = {
    show: function(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const toastIcon = toast.querySelector('i');
        
        toastMessage.textContent = message;
        
        // Set color based on type
        if (type === 'success') {
            toastIcon.style.color = '#c17b4c';
            toastIcon.className = 'fas fa-check-circle';
            toast.style.borderLeftColor = '#c17b4c';
        } else if (type === 'error') {
            toastIcon.style.color = '#b45f4a';
            toastIcon.className = 'fas fa-exclamation-circle';
            toast.style.borderLeftColor = '#b45f4a';
        } else if (type === 'info') {
            toastIcon.style.color = '#8b7355';
            toastIcon.className = 'fas fa-info-circle';
            toast.style.borderLeftColor = '#8b7355';
        } else if (type === 'warning') {
            toastIcon.style.color = '#e6b800';
            toastIcon.className = 'fas fa-exclamation-triangle';
            toast.style.borderLeftColor = '#e6b800';
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
};