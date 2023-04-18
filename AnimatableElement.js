
/**
 * Create animatable element
 * 
 * @param {string} element
 * @param {Object} animation
 * 
 * @returns {HTMLElement}
 */
export default function animateableElement (element, animation) {
    const _element = document.createElement(element);

    // Loop keys in animation object
    for (const key in animation) {
        // Check if the key is a valid key
        if (animation.hasOwnProperty(key)) {
            addEvent(_element, animation, key);
        }
    }

    return _element;
}

/**
 * Add event to element
 *  
 * @param {HTMLElement} _element
 * @param {Object} animation
 * @param {string} key
 *  
 * @returns {undefined}
 */
function addEvent(_element, animation, key) {
    // Add event listener to element
    _element.addEventListener(key.replace('on', ''), () => {
        // Check if the animation is active before adding animation
        // to prevent wierd behaviour.
        if (_element.style.animation) {
            return;
        }
        // Add animation to element
        addAnimation(_element, animation[key].type, animation[key].duration);
    });
}

/**
 * Add animation to element
 * 
 * @param {HTMLElement} element
 * @param {string} type
 * @param {number} duration
 * 
 * @returns {undefined}
 */
function addAnimation(element, type, duration) {
    // Add style to element
    element.style.animation = `${type} ${duration}ms`;
    // Remove style from element after duration
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}