(function () {
    const body = document.body;
    body.classList.add('js-enabled');

    const projectsContainer = document.getElementById('projects-container');
    const experienceList = document.getElementById('experience-list');
    const technicalFocus = document.getElementById('technical-focus');
    const aboutSummary = document.getElementById('about-summary');
    const heroName = document.getElementById('hero-name');
    const heroHeadline = document.getElementById('hero-headline');
    const heroValue = document.getElementById('hero-value');
    const heroMeta = document.getElementById('hero-meta');
    const copyrightYear = document.getElementById('copyright-year');
    const backToTopButton = document.getElementById('back-to-top');

    if (copyrightYear) {
        copyrightYear.textContent = String(new Date().getFullYear());
    }

    function isValidUrl(url) {
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
            return false;
        }
    }

    function safeArray(value) {
        return Array.isArray(value) ? value : [];
    }

    function safeText(value, fallback) {
        return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
    }

    function limitText(value, maxLength) {
        const text = safeText(value, '');
        if (!text || text.length <= maxLength) {
            return text;
        }

        const clipped = text.slice(0, maxLength).trim();
        const lastSpace = clipped.lastIndexOf(' ');
        return `${(lastSpace > 60 ? clipped.slice(0, lastSpace) : clipped).trim()}...`;
    }

    function setText(idNode, value, fallback) {
        if (idNode) {
            idNode.textContent = safeText(value, fallback);
        }
    }

    function renderProfile(profile) {
        const contact = profile && typeof profile === 'object' ? profile.contact : {};
        const location = safeText(contact && contact.location, 'Columbia, SC');

        setText(heroName, profile && profile.name, 'Ryan Caudill');
        setText(
            heroHeadline,
            profile && profile.headline,
            'Software Engineer focused on AI systems and cloud reliability'
        );
        setText(
            heroValue,
            profile && profile.valueProp,
            'I build reliable, AI-enabled software systems that reduce operational friction for real teams.'
        );
        setText(heroMeta, profile && profile.currentRole, `Software Engineer | ${location}`);
        setText(
            aboutSummary,
            profile && profile.about,
            'I specialize in practical AI and backend systems where correctness and usability both matter.'
        );

        if (experienceList) {
            const highlights = safeArray(profile && profile.experienceHighlights);
            experienceList.innerHTML = '';
            highlights.forEach((item) => {
                const card = document.createElement('article');
                card.className = 'highlight-card';

                const header = document.createElement('div');
                header.className = 'highlight-header';

                const logo = safeText(item.logo, '');
                if (logo) {
                    const image = document.createElement('img');
                    image.className = 'highlight-logo';
                    image.src = logo;
                    image.alt = safeText(item.logoAlt, `${safeText(item.title, 'Role')} logo`);
                    image.width = 58;
                    image.height = 58;
                    image.loading = 'lazy';
                    image.decoding = 'async';
                    header.appendChild(image);
                }

                const headingWrap = document.createElement('div');

                const heading = document.createElement('h3');
                heading.textContent = safeText(item.title, 'Role');

                const details = document.createElement('p');
                details.className = 'project-meta';
                details.textContent = safeText(item.details, 'No details provided.');
                headingWrap.appendChild(heading);
                headingWrap.appendChild(details);
                header.appendChild(headingWrap);

                const summary = document.createElement('p');
                summary.textContent = safeText(item.summary, 'No summary provided.');

                card.appendChild(header);
                card.appendChild(summary);
                experienceList.appendChild(card);
            });
        }

        if (technicalFocus) {
            const focusItems = safeArray(profile && profile.technicalFocus);
            technicalFocus.innerHTML = '';

            focusItems.forEach((item) => {
                const card = document.createElement('article');
                card.className = 'focus-card';

                const heading = document.createElement('h3');
                heading.textContent = safeText(item.title, 'Technical Focus');

                const summary = document.createElement('p');
                summary.textContent = safeText(item.summary, 'No summary provided.');

                const tags = document.createElement('ul');
                tags.className = 'tag-row';
                safeArray(item.examples).forEach((example) => {
                    const tag = document.createElement('li');
                    tag.className = 'tag';
                    tag.textContent = safeText(example, 'Example');
                    tags.appendChild(tag);
                });

                card.appendChild(heading);
                card.appendChild(summary);
                card.appendChild(tags);
                technicalFocus.appendChild(card);
            });
        }
    }

    function createTextSection(title, text) {
        const section = document.createElement('section');
        section.className = 'project-section';

        const heading = document.createElement('h4');
        heading.textContent = title;

        const body = document.createElement('p');
        body.textContent = text;

        section.appendChild(heading);
        section.appendChild(body);
        return section;
    }

    function createListSection(title, items, className) {
        const section = document.createElement('section');
        section.className = 'project-section';

        const heading = document.createElement('h4');
        heading.textContent = title;

        const list = document.createElement('ul');
        list.className = className;

        items.forEach((entry) => {
            const item = document.createElement('li');
            item.textContent = entry;
            list.appendChild(item);
        });

        section.appendChild(heading);
        section.appendChild(list);
        return section;
    }

    function createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.dataset.featured = project.featured ? 'true' : 'false';

        const heading = document.createElement('h3');
        heading.textContent = safeText(project.title, 'Untitled Project');

        const meta = document.createElement('p');
        meta.className = 'project-meta';
        meta.textContent = `${safeText(project.role, 'Contributor')} | ${safeText(project.period, 'Date TBD')}`;

        const teaser = document.createElement('p');
        teaser.className = 'project-teaser';
        teaser.textContent = limitText(
            safeText(project.summary, safeText(project.solution, safeText(project.problem, 'No summary available.'))),
            150
        );

        const problem = createTextSection(
            'Problem',
            limitText(safeText(project.problem, 'No problem statement provided.'), 185)
        );
        const solution = createTextSection(
            'Solution',
            limitText(safeText(project.solution, 'No solution statement provided.'), 185)
        );
        const architecture = createTextSection(
            'Architecture',
            limitText(safeText(project.architecture, 'No architecture detail provided.'), 185)
        );
        const tradeoffs = createTextSection(
            'Tradeoffs',
            limitText(safeText(project.tradeoffs, 'No tradeoff detail provided.'), 185)
        );

        const impactValues = safeArray(project.impact)
            .slice(0, 2)
            .map((value) => limitText(safeText(value, 'Impact detail'), 115));
        const metricsValues = safeArray(project.metrics)
            .slice(0, 2)
            .map((value) => limitText(safeText(value, 'Metric'), 95));
        const stackValues = safeArray(project.stack)
            .slice(0, 5)
            .map((value) => safeText(value, 'Tool'));

        const impactSection = createListSection('Impact', impactValues, 'impact-list');
        const metricsSection = metricsValues.length > 0
            ? createListSection('Metrics', metricsValues, 'metrics-list')
            : null;

        const stackSection = document.createElement('section');
        stackSection.className = 'project-section';
        const stackHeading = document.createElement('h4');
        stackHeading.textContent = 'Stack';
        const tagRow = document.createElement('ul');
        tagRow.className = 'tag-row';
        stackValues.forEach((stackItem) => {
            const tag = document.createElement('li');
            tag.className = 'tag';
            tag.textContent = stackItem;
            tagRow.appendChild(tag);
        });
        stackSection.appendChild(stackHeading);
        stackSection.appendChild(tagRow);

        const linkRow = document.createElement('ul');
        linkRow.className = 'link-row';
        const links = project.links && typeof project.links === 'object' ? project.links : {};

        const linkMap = [
            { key: 'repo', label: 'Repository' },
            { key: 'demo', label: 'Live Demo' },
            { key: 'caseStudy', label: 'Case Study' }
        ];

        linkMap.forEach((linkInfo) => {
            const url = links[linkInfo.key];
            if (typeof url === 'string' && isValidUrl(url)) {
                const li = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.textContent = linkInfo.label;
                li.appendChild(anchor);
                linkRow.appendChild(li);
            }
        });

        card.appendChild(heading);
        card.appendChild(meta);
        card.appendChild(teaser);

        const details = document.createElement('details');
        details.className = 'project-details';
        const summary = document.createElement('summary');
        summary.className = 'project-summary-toggle';
        summary.textContent = 'View full case study';

        const detailBody = document.createElement('div');
        detailBody.className = 'project-details-body';
        detailBody.appendChild(problem);
        detailBody.appendChild(solution);
        detailBody.appendChild(architecture);
        detailBody.appendChild(tradeoffs);
        detailBody.appendChild(impactSection);
        if (metricsSection) {
            detailBody.appendChild(metricsSection);
        }
        detailBody.appendChild(stackSection);
        if (linkRow.children.length > 0) {
            detailBody.appendChild(linkRow);
        }

        details.appendChild(summary);
        details.appendChild(detailBody);
        card.appendChild(details);

        return card;
    }

    function renderProjects(projects, filter) {
        if (!projectsContainer) {
            return;
        }

        projectsContainer.innerHTML = '';

        const list = filter === 'all'
            ? projects
            : projects.filter((project) => project && project.featured === true);

        if (!list.length) {
            const empty = document.createElement('article');
            empty.className = 'project-card';
            const heading = document.createElement('h3');
            heading.textContent = 'No projects available';
            const text = document.createElement('p');
            text.textContent = 'Check back shortly for updated work samples.';
            empty.appendChild(heading);
            empty.appendChild(text);
            projectsContainer.appendChild(empty);
            return;
        }

        list.forEach((project) => {
            projectsContainer.appendChild(createProjectCard(project));
        });
    }

    function setupProjectFilters(projects) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (!filterButtons.length) {
            return;
        }

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedFilter = button.getAttribute('data-filter') === 'all' ? 'all' : 'featured';
                filterButtons.forEach((btn) => {
                    const active = btn === button;
                    btn.classList.toggle('active', active);
                    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                renderProjects(projects, selectedFilter);
            });
        });
    }

    async function loadData() {
        try {
            const [profileResponse, projectsResponse] = await Promise.all([
                fetch('./data/profile.json', { cache: 'no-store' }),
                fetch('./data/projects.json', { cache: 'no-store' })
            ]);

            if (!profileResponse.ok || !projectsResponse.ok) {
                throw new Error('Could not load local content data.');
            }

            const profile = await profileResponse.json();
            const projectsPayload = await projectsResponse.json();
            const projects = safeArray(projectsPayload && projectsPayload.projects);

            renderProfile(profile);
            renderProjects(projects, 'featured');
            setupProjectFilters(projects);
        } catch (error) {
            console.error(error);
            if (projectsContainer) {
                projectsContainer.innerHTML = '';
                const failure = document.createElement('article');
                failure.className = 'project-card';
                const heading = document.createElement('h3');
                heading.textContent = 'Unable to load projects';
                const message = document.createElement('p');
                message.textContent = 'The portfolio data failed to load. Please refresh or return shortly.';
                failure.appendChild(heading);
                failure.appendChild(message);
                projectsContainer.appendChild(failure);
            }
        }
    }

    function setupBackToTop() {
        if (!backToTopButton) {
            return;
        }

        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.scrollY > 320);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function setupRevealAnimation() {
        const revealTargets = document.querySelectorAll('.reveal-on-scroll');
        if (!revealTargets.length || !('IntersectionObserver' in window)) {
            revealTargets.forEach((node) => node.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealTargets.forEach((target) => observer.observe(target));
    }

    loadData();
    setupBackToTop();
    setupRevealAnimation();
})();
