if (window.location.pathname != '/') {
    let Elems = [document.getElementById('SidebarMain'), document.getElementsByClassName('Header')[0]]
    Elems.forEach((Elem) => {
        Elem.classList.add('ScrollAffectable')
    })
    const Scrollable = document.getElementsByClassName('Scrollable')[0]
    Scrollable.addEventListener('scroll', () => {
        let ScrollDistance = Scrollable.scrollTop
        Elems.forEach((CurrentElement) => {
            if (ScrollDistance > 0) {
                CurrentElement.classList.add('ScrollLowOpacity')
            } else {
                CurrentElement.classList.remove('ScrollLowOpacity')
            }
        })
    })
}
