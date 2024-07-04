// Function to hide elements with class 'card-footer'
function hideCardFooterElements() {
    const elements = document.querySelectorAll('.card-footer');
    elements.forEach(element => {
        element.style.display = 'none';
    });
}

hideCardFooterElements();

// Use a MutationObserver to hide elements that are added later
const observer = new MutationObserver(hideCardFooterElements);

observer.observe(document.body, { childList: true, subtree: true });
