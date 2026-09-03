window.onload = function () {
    const cards = document.querySelectorAll(".card-item");
    const image = document.getElementById("chart-image");

    cards.forEach((card) => {
        card.addEventListener("click", () => {

            cards.forEach((c) => c.classList.remove("active"));


            card.classList.add("active");


            const imageSrc = card.getAttribute("data-image");
            if (imageSrc) {
                image.src = imageSrc;
            }
        });
    });
};



// const buttons = document.querySelectorAll('.button');

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         Swal.fire({
//             toast: true,
//             position: 'top',
//             icon: 'success',
//             title: 'Button Clicked!',
//             showConfirmButton: false,
//             timer: 3000,
//             timerProgressBar: true,
//             background: '#f0f9ff',
//             color: '#333',
//             customClass: {
//                 popup: 'shadow-sm rounded'
//             }
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const alertConfigs = {
        'about-us-button': {
            title: '📘 About Us',
            text: 'Learn more about our mission and values!',
            icon: 'info'
        },
        'featured-button': {
            title: '⭐ Featured',
            text: 'Check out our most popular features!',
            icon: 'success'
        },
        'get-started-button': {
            title: '🚀 Get Started',
            text: 'Let’s begin your journey with us!',
            icon: 'question'
        },
        'trustworthiness-button': {
            title: '🔒 Trust & Security',
            text: 'We prioritize your privacy and safety.',
            icon: 'warning'
        },
        'services-button': {
            title: '🛠️ Our Services',
            text: 'Discover all the services we offer.',
            icon: 'info'
        },
        'view-more-button': {
            title: '👁️ View More',
            text: 'Explore more of our awesome content.',
            icon: 'success'
        },
        'testimonial-button': {
            title: '🗣️ Testimonials',
            text: 'Hear what our customers have to say!',
            icon: 'info'
        }
    };

    Object.keys(alertConfigs).forEach(className => {
        const buttons = document.querySelectorAll(`.${className}`);
        const config = alertConfigs[className];

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                Swal.fire({
                    toast: true,
                    position: 'top',
                    title: config.title,
                    text: config.text,
                    icon: config.icon,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#f0f9ff',
                    color: '#333',
                    customClass: {
                        popup: 'shadow-sm rounded'
                    }
                });
            });
        });
    });
});


