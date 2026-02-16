// Mobile Menu Toggle
document.querySelector('.hamburger')?.addEventListener('click', function() {
    document.querySelector('.nav-menu').style.display = 'block';
});

// Search Functionality
function searchExam() {
    let query = document.getElementById('searchInput').value.toLowerCase();
    if(query) {
        // Redirect to search results page
        window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    }
}

// Live Search Suggestions
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    let value = e.target.value.toLowerCase();
    if(value.length > 2) {
        fetchSearchSuggestions(value);
    }
});

function fetchSearchSuggestions(query) {
    // API call to get suggestions
    console.log('Searching for:', query);
}

// PDF Preview
function previewPDF(url) {
    window.open(url, '_blank');
}
