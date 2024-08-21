function locomotivescrolltrigg(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

}

function textsplitting(){
    var allH1 = document.querySelectorAll("#page2 h1")
allH1.forEach(function(elem){
    var clutter = ""
    var h1Text = elem.textContent
    var splitedText = h1Text.split("")
    splitedText.forEach(function(e){
    clutter += `<span>${e}</span>`
    })
    elem.innerHTML = clutter
})
}

function gsapAnimation(){
    gsap.to("#page2 h1 span",{
        color:"#efefb6",
        stagger:0.1,
        scrollTrigger:{
            trigger:"#page2 h1",
            scroller:"#main",
            markers: true,
            start:"top 50%",
            end:"top -10%",
            scrub:2
        }
    })
}

textsplitting()
gsapAnimation()
locomotivescrolltrigg()
