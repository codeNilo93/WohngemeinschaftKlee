
        // Select all hamburger buttons and navigation menus
        const hamburgerBtns = document.querySelectorAll('.hamburger');
        const navMenus = document.querySelectorAll('.nav-menu');

        // Loop through each hamburger button to attach an event listener
        hamburgerBtns.forEach((hamburger, index) => {
            hamburger.addEventListener('click', () => {
                // Toggle the 'active' class on the current button
                hamburger.classList.toggle('active');
                // Toggle the 'active' class on the corresponding menu
                navMenus[index].classList.toggle('active');
            });
        });