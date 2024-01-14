const section = document.querySelectorAll('section');
const navlink = document.querySelectorAll('.navbar .menu a');

window.onscroll = () => {
    section.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop-150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if(top < offset+height && offset < top){
            navlink.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav .${id}`).classList.add('active');
            })
        }
        
    })
}
