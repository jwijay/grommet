// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import DOM from './DOM';
import CSSClassnames from './CSSClassnames';
import KeyboardAccelerators from './KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.DROP;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

/*
 * Drop is a utility for rendering components like drop down menus layered above
 * their initiating controls.
 */

const VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
const HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

class DropContents extends Component {
  constructor(props, context) {
    super(props, context);

    this._processTab = this._processTab.bind(this);
  }

  getChildContext () {
    return {...this.props.drop.options.context};
  }

  componentDidMount () {
    const { drop } = this.props;
    if (drop.options.focusControl) {
      this.originalFocusedElement = document.activeElement;
      if (!this.containerRef.contains(document.activeElement)) {
        this.anchorStepRef.focus();

        if (!drop.options.preventAnchorStepScroll) {
          // fix issue with browser jumping to top
          clearTimeout(this._anchorScrollTimer);
          this._anchorScrollTimer = setTimeout(() => {
            this.anchorStepRef.scrollIntoView();
          }, 10);
        }
      }

      this._keyboardHandlers = {
        tab: this._processTab
      };
      KeyboardAccelerators.startListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }
  }

  componentWillUnmount () {
    const { drop } = this.props;
    if (drop.options.focusControl) {
      KeyboardAccelerators.stopListeningToKeyboard(
        this, this._keyboardHandlers
      );

      this.originalFocusedElement.focus();
    }
  }

  _processTab (event) {
    let items = this.containerRef.getElementsByTagName('*');
    items = DOM.filterByFocusable(items);
    if (!items || items.length === 0) {
      event.preventDefault();
    } else {
      if (event.shiftKey) {
        if (event.target === items[0]) {
          items[items.length - 1].focus();
          event.preventDefault();
        }
      } else if (event.target === items[items.length - 1]) {
        items[0].focus();
        event.preventDefault();
      }
    }
  }


  render () {
    const { drop, content } = this.props;

    let anchorStep;
    if (drop.options.focusControl) {
      anchorStep = (
        <a tabIndex="-1" aria-hidden='true'
          ref={(ref) => this.anchorStepRef = ref} />
      );
    }
    return (
      <div ref={(ref) => this.containerRef = ref}>
        {anchorStep}
        {content}
      </div>
    );
  }
}

DropContents.childContextTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
  router: PropTypes.any,
  store: PropTypes.object
};

export default {

  // How callers can validate a property for drop alignment which will be
  // passed to add().
  alignPropType: PropTypes.shape({
    top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
    bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
    left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
    right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
  }),

  // Add a drop component.
  //
  // control - DOM element to anchor the overlay on
  // content - React node to render
  // options - {
  //   align: {
  //     top: top|bottom
  //     bottom: top|bottom
  //     left: left|right
  //     right: left|right
  //   },
  //   className: <string>
  //   colorIndex: <string>
  // }

  add (control, content, options) {
    // normalize for older interface that just had align content
    if (options.top || options.bottom || options.left || options.right) {
      options = { align: options };
    }
    // validate align
    if (options && options.align && options.align.top &&
      VERTICAL_ALIGN_OPTIONS.indexOf(options.align.top) === -1) {
      console.warn("Warning: Invalid align.top value '" + options.align.top +
        "' supplied to Drop," +
        "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (options.align && options.align.bottom &&
      VERTICAL_ALIGN_OPTIONS.indexOf(options.align.bottom) === -1) {
      console.warn("Warning: Invalid align.bottom value '" +
        options.align.bottom +
        "' supplied to Drop," +
        "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (options.align && options.align.left &&
      HORIZONTAL_ALIGN_OPTIONS.indexOf(options.align.left) === -1) {
      console.warn("Warning: Invalid align.left value '" + options.align.left +
        "' supplied to Drop," +
        "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (options.align && options.align.right &&
      HORIZONTAL_ALIGN_OPTIONS.indexOf(options.align.right) === -1) {
      console.warn("Warning: Invalid align.right value '" +
        options.align.right +
        "' supplied to Drop," +
        "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
    }
    const align = options.align || {};

    // initialize data
    var drop = {
      control: control,
      options: {
        ...options,
        align: {
          top: align.top,
          bottom: align.bottom,
          left: align.left,
          right: align.right
        },
        responsive: options.responsive !== false ? true : options.responsive
      }
    };
    if (! drop.options.align.top && ! drop.options.align.bottom) {
      drop.options.align.top = "top";
    }
    if (! drop.options.align.left && ! drop.options.align.right) {
      drop.options.align.left = "left";
    }

    // setup DOM
    drop.container = document.createElement('div');
    drop.container.className =
      `grommet ${CLASS_ROOT} ${drop.options.className || ''}`;
    if (drop.options.colorIndex) {
      drop.container.className +=
        ` ${BACKGROUND_COLOR_INDEX}-${drop.options.colorIndex}`;
    }

    // prepend in body to avoid browser scroll issues
    document.body.insertBefore(drop.container, document.body.firstChild);

    render(<DropContents drop={drop} content={content} />, drop.container);

    drop.scrollParents = DOM.findScrollParents(drop.control);
    drop.place = this._place.bind(this, drop);
    drop.render = this._render.bind(this, drop);
    drop.remove = this._remove.bind(this, drop);

    drop.scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', drop.place);
    });

    // we intentionally skipped debounce as we believe resizing
    // will not be a common action. Also the UI looks better if the Drop
    // doesn’t lag to align with the control component.
    window.addEventListener('resize', () => {
      // we need to update scroll parents as Responsive options may change
      // the parent for the target element
      drop.scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', drop.place);
      });

      drop.scrollParents = DOM.findScrollParents(drop.control);

      drop.scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', drop.place);
      });

      drop.place();
    });

    // position content
    this._place(drop);

    return drop;
  },

  _render (drop, content) {
    const originalScrollPosition = drop.container.scrollTop;
    render(<DropContents drop={drop} content={content} />, drop.container,
      () => {
        this._place.bind(this, drop);
        // reset container to its original scroll position
        drop.container.scrollTop = originalScrollPosition;
      }
    );
  },

  _remove (drop) {
    drop.scrollParents.forEach(function (scrollParent) {
      scrollParent.removeEventListener('scroll', drop.place);
    });
    window.removeEventListener('resize', drop.place);

    unmountComponentAtNode(drop.container);
    document.body.removeChild(drop.container);
  },

  _place (drop) {
    var control = drop.control;
    var container = drop.container;
    var align = drop.options.align;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // clear prior styling
    container.style.left = '';
    container.style.width = '';
    container.style.top = '';
    container.style.maxHeight = '';

    // get bounds
    var controlRect = control.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    // set width
    var width = Math.min(
      Math.max(controlRect.width, containerRect.width), windowWidth);

    // set left position
    var left;
    if (align.left) {
      if ('left' === align.left) {
        left = controlRect.left;
      } else if ('right' === align.left) {
        left = controlRect.left - width;
      }
    } else if (align.right) {
      if ('left' === align.right) {
        left = controlRect.left - width;
      } else if ('right' === align.right) {
        left = (controlRect.left + controlRect.width) - width;
      }
    }

    if ((left + width) > windowWidth) {
      left -= ((left + width) - windowWidth);
    } else if (left < 0) {
      left = 0;
    }

    // set top position
    var top;
    var maxHeight;
    if (align.top) {
      if ('top' === align.top) {
        top = controlRect.top;
        maxHeight = Math.min(windowHeight - controlRect.top, windowHeight);
      } else {
        top = controlRect.bottom;
        maxHeight = Math.min(windowHeight - controlRect.bottom,
          windowHeight - controlRect.height);
      }
    } else if (align.bottom) {
      if ('bottom' === align.bottom) {
        top = controlRect.bottom - containerRect.height;
        maxHeight = Math.max(controlRect.bottom, 0);
      } else {
        top = controlRect.top - containerRect.height;
        maxHeight = Math.max(controlRect.top, 0);
      }
    }

    // if we can't fit it all, see if there's more room the other direction
    if (containerRect.height > maxHeight) {
      // We need more room than we have.
      if (align.top && top > (windowHeight / 2)) {
        // We put it below, but there's more room above, put it above
        if (align.top === 'bottom') {
          if (drop.options.responsive) {
            top = Math.max(controlRect.top - containerRect.height, 0);
          }
          maxHeight = controlRect.top;
        } else {
          if (drop.options.responsive) {
            top = Math.max(controlRect.bottom - containerRect.height, 0);
          }
          maxHeight = controlRect.bottom;
        }
      } else if (align.bottom && maxHeight < (windowHeight / 2)) {
        // We put it above but there's more room below, put it below
        if (align.bottom === 'bottom') {
          if (drop.options.responsive) {
            top = controlRect.top;
          }
          maxHeight = Math.min(windowHeight - top, windowHeight);
        } else {
          if (drop.options.responsive) {
            top = controlRect.bottom;
          }
          maxHeight = Math.min(windowHeight - top,
            windowHeight - controlRect.height);
        }
      }
    }

    container.style.left = `${left}px`;
    container.style.width = `${width}px`;
    // We use position:absolute and the body element's position
    // to handle mobile browsers better. We used to use position:fixed
    // but that didn't work on mobile browsers as well.
    container.style.top = `${top - bodyRect.top}px`;
    container.style.maxHeight = `${maxHeight}px`;

  }
};
