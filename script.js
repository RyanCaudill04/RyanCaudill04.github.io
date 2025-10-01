document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fetch and display GitHub projects
    Promise.all([
        fetch('https://api.github.com/users/RyanCaudill04/repos').then(r => r.json()),
        fetch('https://api.github.com/repos/csce585-mlsystems/DermaLite').then(r => r.json())
    ])
        .then(([userRepos, dermaLiteRepo]) => {
            const projectsContainer = document.getElementById('projects-container');

            // Define pinned projects
            const pinnedProjects = {
                'dermalite': { repo: dermaLiteRepo, isPinned: true },
                'projectmanagementapp': { isPinned: true },
                'gradingagent': { isPinned: true, merged: ['gradingagentapi', 'gradingagentfrontend'] }
            };

            // Track which repos to skip (already merged into GradingAgent)
            const skipRepos = ['gradingagentapi', 'gradingagentfrontend'];

            // Process user repos
            userRepos.forEach(repo => {
                if (skipRepos.includes(repo.name.toLowerCase())) {
                    return; // Skip the old separated repos
                }

                const project = document.createElement('div');
                project.classList.add('project');

                const repoKey = repo.name.toLowerCase();
                const isPinned = pinnedProjects[repoKey]?.isPinned;

                project.setAttribute('data-pinned', isPinned ? 'true' : 'false');

                const projectName = document.createElement('h3');
                projectName.textContent = repo.name;

                // Add stars for pinned projects
                if (isPinned) {
                    const stars = document.createElement('span');
                    stars.classList.add('pinned-stars');
                    stars.innerHTML = '★';
                    project.appendChild(stars);
                }

                const projectDescription = document.createElement('p');
                projectDescription.textContent = repo.description || 'No description available.';

                const projectLink = document.createElement('a');
                projectLink.href = repo.html_url;
                projectLink.textContent = 'View on GitHub';
                projectLink.target = '_blank';

                project.appendChild(projectName);
                project.appendChild(projectDescription);
                project.appendChild(projectLink);

                projectsContainer.appendChild(project);
            });

            // Add DermaLite project
            const dermaProject = document.createElement('div');
            dermaProject.classList.add('project');
            dermaProject.setAttribute('data-pinned', 'true');

            const stars = document.createElement('span');
            stars.classList.add('pinned-stars');
            stars.innerHTML = '★';
            dermaProject.appendChild(stars);

            const dermaName = document.createElement('h3');
            dermaName.textContent = dermaLiteRepo.name;

            const dermaDesc = document.createElement('p');
            dermaDesc.textContent = dermaLiteRepo.description || 'No description available.';

            const dermaLink = document.createElement('a');
            dermaLink.href = dermaLiteRepo.html_url;
            dermaLink.textContent = 'View on GitHub';
            dermaLink.target = '_blank';

            dermaProject.appendChild(dermaName);
            dermaProject.appendChild(dermaDesc);
            dermaProject.appendChild(dermaLink);

            projectsContainer.appendChild(dermaProject);

            // Project filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projects = document.querySelectorAll('.project');

            function filterProjects(filter) {
                projects.forEach(project => {
                    if (filter === 'pinned') {
                        project.style.display = project.getAttribute('data-pinned') === 'true' ? 'block' : 'none';
                    } else {
                        project.style.display = 'block';
                    }
                });
            }

            // Initially show pinned projects
            filterProjects('pinned');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Set active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filter = button.getAttribute('data-filter');
                    filterProjects(filter);
                });
            });
        })
        .catch(error => console.error('Error fetching projects:', error));

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});