// =============================================================================
// CUBIT.JS
// -----------------------------------------------------------------------------
// The magic.
// =============================================================================

// =============================================================================
// TABLE OF CONTENTS
// -----------------------------------------------------------------------------
//   01. Base
// =============================================================================

// Base
// =============================================================================

(function() {

  // Variables
  // ---------

  var breakpointClasses, styleEl, ready;


  // Setup
  // -----
  // 01. Get initial breakpoints from data attribute.
  // 02. Attach resize handler

  var script = document.getElementsByTagName('script');
  script = script[script.length - 1];
  if ( script.hasAttribute('data-cubit') ) {
    setBreakpoints( JSON.parse( script.dataset.cubit ) ); // 01
  }

  if ( script.hasAttribute('data-cubit-expose-api') ) {
    window.setBreakpoints = setBreakpoints;
  }

  window.addEventListener('resize', updateSize); // 02


  // Generate Stylesheet
  // -------------------
  // 01. Create our stylesheet element.
  // 02. Clear rules from previous calls.
  // 03. Ensure our 'content' is not visible.
  // 04. Add media query rules.

  function setBreakpoints( breakpoints ) {

    ready             = false;
    breakpointClasses = [];

    try {

      if ( ! styleEl ) { // 01
        styleEl = document.createElement('style');
        styleEl.appendChild( document.createTextNode(''));
        document.head.appendChild(styleEl);
      }

      for ( var i = 0; i < styleEl.sheet.cssRules.length; i++ ) { // 02
        styleEl.sheet.deleteRule(i)
      }

      styleEl.sheet.insertRule('html:before { display: none; }', styleEl.sheet.cssRules.length); // 03

      for ( var bp in breakpoints ) { // 04
        styleEl.sheet.insertRule('@media ' + breakpoints[bp] + ' { html:before { content: "' + bp + '"; } }', styleEl.sheet.cssRules.length);
        breakpointClasses.push(bp);
      }

    } catch (e) {
      console.warn('Failed to generate stylesheet rules', e);
      return;
    }

    ready = true;

    updateSize();

  }


  // Update Size
  // -----------

  function updateSize() {

    if ( ! ready || ! breakpointClasses || ! breakpointClasses.length ) return;

    var style, updated;

    var htmlEl = document.getElementsByTagName('html')[0];

    try {
      style = window.getComputedStyle(htmlEl, '::before');
      if ( style.content ) {
        updated = style.content.replace(/["']/g, '');
      }
    } catch (e) {
      console.warn('Failed to get computed style', e);
      return;
    }

    if ( ! htmlEl.classList.contains(updated) ) {
      breakpointClasses.forEach(function(bp) {
        htmlEl.classList.remove(bp);
      });
      htmlEl.classList.add(updated);
    }

  }

})();
