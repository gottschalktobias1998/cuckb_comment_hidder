// Function to hide elements with the specified class
function hideElementsWithClass(className) {
    const elements = document.querySelectorAll(`.${className.split(' ').join('.')}`);
    elements.forEach(element => {
        element.style.display = 'none';
    });
}

// Function to load settings and apply the hiding logic
function applySettings() {
    chrome.storage.sync.get({
        hideCardFooter: true,
        hideImgFluid: true
    }, function(items) {
        if (items.hideCardFooter) {
            hideElementsWithClass('card-footer');
        }
        if (items.hideImgFluid) {
            hideElementsWithClass('img-fluid img-thumbnail');
        }
    });
}

// Initial call to apply settings to already present elements
applySettings();

// Use a MutationObserver to apply settings to newly added elements
const observer = new MutationObserver(applySettings);
observer.observe(document.body, { childList: true, subtree: true });

// Listen for messages to reapply settings
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'reapplySettings') {
        applySettings();
    }
});
