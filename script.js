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
    fetch('https://api.github.com/users/RyanCaudill04/repos')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            const personalProjects = ['gradingagentapi', 'gradingagentfrontend', 'projectmanagementapp'];

            data.forEach(repo => {
                const project = document.createElement('div');
                project.classList.add('project');

                // Categorize projects
                let category = 'school';
                if (personalProjects.includes(repo.name.toLowerCase())) {
                    category = 'personal';
                }
                project.setAttribute('data-category', category);

                const projectName = document.createElement('h3');
                projectName.textContent = repo.name;

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

            // Project filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projects = document.querySelectorAll('.project');

            function filterProjects(filter) {
                projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            }

            // Initially show personal projects
            filterProjects('personal');

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