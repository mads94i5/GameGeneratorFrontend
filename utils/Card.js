import animateableElement from "./AnimatableElement.js";

/**
 * Card component.
 * 
 * @param {Object} options
 * 
 * @returns {HTMLElement}
 */
export default function Card(options) {
    const wrapper = animateableElement('div', options.animation);

    // Add classes to wrapper
    wrapper.classList.add('card');
    wrapper.classList.add(`${options.type}`);

    if (options.header) {
        createCardTextElement('header', 'card-header', options.header, wrapper);
    }

    if (options.image) {
        createCardImageElement('card-image', options.image, wrapper);
    }

    if (options.body) {
        createCardTextElement('div', 'card-body', options.body, wrapper);
    }

    if (options.footer) {
        createCardTextElement('footer', 'card-footer', options.footer, wrapper);
    }

    if (options.href) {
        wrapper.classList.add('card-clickable');
        wrapper.onclick = () => {
            window.router.navigate(options.href);
        };
    }

    return wrapper;
}

function createCardTextElement(element, className, innerHTML, wrapper) {
    const _element = document.createElement(element);
    _element.className = className;
    _element.innerHTML = innerHTML;
    wrapper.appendChild(_element);
}

function createCardImageElement(className, src, wrapper) {
    const image = document.createElement('img');
    image.className = className;
    image.src = src;
    wrapper.appendChild(image);
}
