// Interactive JavaScript functionality for UL Portal
const initialPosts = [
    {
        id: 1,
        title: "University of Layyah Holds Annual IT & Innovation Expo 2026",
        category: "Events",
        author: "Department of BS IT",
        date: "Oct 15, 2026",
        summary: "Students demonstrated cutting-edge computing projects, software applications, and network security topologies during the annual tech event.",
        content: "The Department of Information Technology at University of Layyah successfully organized the Annual IT Expo 2026. Over 50 student teams displayed innovative software solutions, networking topologies using Cisco Packet Tracer, and dynamic web solutions."
    },
    {
        id: 2,
        title: "UL Faculty Receives Higher Education Research Grant",
        category: "Research",
        author: "Research Cell",
        date: "Oct 12, 2026",
        summary: "Faculty members from Agricultural Sciences secured funding for sustainable crop productivity in arid zones.",
        content: "The Higher Education Commission (HEC) has awarded a prestigious research grant to the Faculty of Agricultural Sciences at University of Layyah to study sustainable crop productivity under climate-resilient farming techniques."
    },
    {
        id: 3,
        title: "Admissions Open for Spring Session 2026",
        category: "Campus News",
        author: "Admissions Office",
        date: "Oct 10, 2026",
        summary: "Applications are invited for undergraduate and postgraduate degree programs across all 5 faculties.",
        content: "University of Layyah announces admissions for Spring 2026 in BS Information Technology, BS Computer Science, DVM, B.Sc. Agricultural Sciences, and BBA. Eligible candidates can submit applications online via the UMS portal."
    }
];

let posts = [...initialPosts];
let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
});

function renderPosts() {
    const grid = document.getElementById('blogGrid');
    grid.innerHTML = '';

    const query = document.getElementById('blogSearch').value.toLowerCase();

    const filtered = posts.filter(post => {
        const matchesCategory = (currentCategory === 'All' || post.category === currentCategory);
        const matchesSearch = post.title.toLowerCase().includes(query) || post.summary.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No blog posts found matching your criteria.</div>`;
        return;
    }

    filtered.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-card-body">
                <span class="meta-tag">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <div class="blog-footer">
                    <span><i class="far fa-user"></i> ${post.author}</span>
                    <a class="read-more-btn" onclick="openReadModal(${post.id})">Read Article <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(cat) {
    currentCategory = cat;
    const pills = document.querySelectorAll('.category-pills .pill');
    pills.forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    renderPosts();
}

function filterPosts() {
    renderPosts();
}

// Modal handling
function openCreateModal() {
    document.getElementById('createModal').style.display = 'flex';
}

function closeCreateModal() {
    document.getElementById('createModal').style.display = 'none';
}

function openReadModal(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('readModalTitle').innerText = post.title;
    document.getElementById('readModalCategory').innerText = post.category;
    document.getElementById('readModalMeta').innerText = `By ${post.author} | ${post.date}`;
    document.getElementById('readModalContent').innerText = post.content;

    document.getElementById('readModal').style.display = 'flex';
}

function closeReadModal() {
    document.getElementById('readModal').style.display = 'none';
}

function handleCreatePost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const author = document.getElementById('postAuthor').value;
    const content = document.getElementById('postContent').value;

    const newPost = {
        id: posts.length + 1,
        title,
        category,
        author,
        date: "Just Now",
        summary: content.substring(0, 100) + "...",
        content
    };

    posts.unshift(newPost);
    renderPosts();
    closeCreateModal();
    document.getElementById('createPostForm').reset();
    alert('Article submitted and published successfully!');
}
