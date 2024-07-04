// Function to load saved settings and update the UI
function loadSettings() {
    chrome.storage.sync.get({
        hideCardFooter: true,
        hideImgFluid: true
    }, function(items) {
        document.getElementById('hideCardFooter').value = items.hideCardFooter ? 1 : 0;
        document.getElementById('hideImgFluid').value = items.hideImgFluid ? 1 : 0;
        updateStatus();
    });
}

// Function to update status display
function updateStatus() {
    document.getElementById('hideCardFooterStatus').textContent = document.getElementById('hideCardFooter').value == 1 ? 'True' : 'False';
    document.getElementById('hideImgFluidStatus').textContent = document.getElementById('hideImgFluid').value == 1 ? 'True' : 'False';
}

// Function to save settings and reload the current tab
function saveSettingsAndReload() {
    const hideCardFooter = document.getElementById('hideCardFooter').value == 1;
    const hideImgFluid = document.getElementById('hideImgFluid').value == 1;
    chrome.storage.sync.set({
        hideCardFooter: hideCardFooter,
        hideImgFluid: hideImgFluid
    }, function() {
        // Notify content script to reapply settings and reload page
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'reapplySettings' }, function() {
                chrome.tabs.reload(tabs[0].id); // Reload the tab
            });
        });
        alert('Settings saved');
    });
}

// Load settings and update status when the popup is opened
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', updateStatus);
    });

    // Save settings and reload page on Save button click
    document.getElementById('save').addEventListener('click', saveSettingsAndReload);
});
