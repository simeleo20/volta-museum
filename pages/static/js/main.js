document.addEventListener("DOMContentLoaded", () => {
    // Variabili per il controllo dello scroll
    let lastScrollTop = 0
    const header = document.getElementById("site-header")
    const scrollThreshold = 100 // Soglia di scroll prima di nascondere l'header
  
    // Gestione dello scroll per nascondere/mostrare l'header
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
      // Se stiamo scrollando più in basso della soglia e più in basso della posizione precedente
      if (scrollTop > scrollThreshold && scrollTop > lastScrollTop) {
        header.classList.add("header-hidden")
      }
      // Se stiamo scrollando verso l'alto
      else if (scrollTop < lastScrollTop) {
        header.classList.remove("header-hidden")
      }
  
      lastScrollTop = scrollTop
    })
  
    // Gestione dei menu a tendina su dispositivi touch
    const menuItems = document.querySelectorAll(".has-submenu")
  
    menuItems.forEach((item) => {
      // Su dispositivi touch, il primo click apre il menu, il secondo segue il link
      let isOpen = false
  
      item.addEventListener("click", (e) => {
        // Verifica se è un dispositivo touch
        if (window.matchMedia("(max-width: 768px)").matches) {
          if (!isOpen) {
            e.preventDefault()
            isOpen = true
  
            // Chiudi tutti gli altri menu aperti
            menuItems.forEach((otherItem) => {
              if (otherItem !== item) {
                otherItem.querySelector(".submenu").style.display = "none"
              }
            })
  
            // Apri questo menu
            item.querySelector(".submenu").style.display = "block"
          }
        }
      })
  
      // Resetta lo stato quando il mouse esce
      item.addEventListener("mouseleave", () => {
        isOpen = false
      })
    })
  })
  