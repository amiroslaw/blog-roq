(function () {
  'use strict'

  var DURATION = 1400

  function target(bar) {
    return parseFloat(bar.getAttribute('data-percent')) || 0
  }

  function fill(bar) {
    return bar.querySelector('.skillbar-bar')
  }

  function label(bar) {
    return bar.querySelector('.skillbar-percent')
  }

  function countUp(el, value) {
    var start = null
    function step(ts) {
      if (start === null) start = ts
      var progress = Math.min((ts - start) / DURATION, 1)
      var eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.round(eased * value) + '%'
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  function reveal(bar) {
    var value = target(bar)
    var track = fill(bar)
    var percent = label(bar)
    if (track) {
      track.style.width = value + '%'
    }
    if (percent) {
      countUp(percent, value)
    }
  }

  function init() {
    var bars = Array.prototype.slice.call(document.querySelectorAll('.skillbar'))
    if (!bars.length) return

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || !('IntersectionObserver' in window)) {
      bars.forEach(reveal)
      return
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.25 })

    bars.forEach(function (bar) {
      observer.observe(bar)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
