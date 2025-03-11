// Tool categories and their tools
const toolCategories = {
    'Image Tools': [
        { name: 'Image to PNG Converter', url: '/tools/image-to-png.html', icon: 'fa-image' },
        { name: 'Image to JPG Converter', url: '/tools/image-to-jpg.html', icon: 'fa-file-image' },
        { name: 'Image Resizer', url: '/tools/image-resizer.html', icon: 'fa-expand' },
        // Add more tools...
    ],
    'SEO Tools': [
        { name: 'Meta Tag Generator', url: '/tools/meta-tag-generator.html', icon: 'fa-tags' },
        { name: 'Keyword Density Checker', url: '/tools/keyword-density.html', icon: 'fa-percentage' },
        { name: 'Sitemap Generator', url: '/tools/sitemap-generator.html', icon: 'fa-sitemap' },
        // Add more tools...
    ],
    // Add more categories...
};

// Load header and footer
document.addEventListener('DOMContentLoaded', async () => {
    // Load header
    const headerResponse = await fetch('/components/header.html');
    const headerHtml = await headerResponse.text();
    document.getElementById('header-placeholder').innerHTML = headerHtml;

    // Load footer
    const footerResponse = await fetch('/components/footer.html');
    const footerHtml = await footerResponse.text();
    document.getElementById('footer-placeholder').innerHTML = footerHtml;

    // Initialize tools display if we're on the homepage
    if (document.getElementById('categories-container')) {
        displayCategories();
        displayAllTools();
        initializeSearch();
    }
});

// Display categories in the categories section
function displayCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    Object.keys(toolCategories).forEach(category => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-lg-3 mb-4';
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${category}</h5>
                    <p class="card-text">${toolCategories[category].length} tools</p>
                    <a href="#${category.toLowerCase().replace(/\s+/g, '-')}" class="btn btn-primary">View Tools</a>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Display all tools in a grid
function displayAllTools() {
    const container = document.getElementById('tools-container');
    if (!container) return;

    Object.entries(toolCategories).forEach(([category, tools]) => {
        // Add category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'col-12 mt-4 mb-3';
        categoryHeader.innerHTML = `<h3 id="${category.toLowerCase().replace(/\s+/g, '-')}">${category}</h3>`;
        container.appendChild(categoryHeader);

        // Add tools
        tools.forEach(tool => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-lg-3 mb-4';
            col.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <i class="fas ${tool.icon} fa-2x mb-3 text-primary"></i>
                        <h5 class="card-title">${tool.name}</h5>
                        <a href="${tool.url}" class="btn btn-outline-primary">Use Tool</a>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('#tools-container .card');

        toolCards.forEach(card => {
            const toolName = card.querySelector('.card-title').textContent.toLowerCase();
            const cardParent = card.parentElement;
            
            if (toolName.includes(searchTerm)) {
                cardParent.style.display = '';
            } else {
                cardParent.style.display = 'none';
            }
        });
    });
}

// Function to load Google AdSense
function loadAdSense() {
    const adScript = document.createElement('script');
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    adScript.setAttribute('async', '');
    adScript.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(adScript);
}

// Load AdSense when the page is ready
window.addEventListener('load', loadAdSense); 