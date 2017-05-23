/**
 * Exports a class object to monitor the visibility of a DOM element in the browser window
 * and initialize functions based on that visibility.
 *
 * @summary Monitor the visibility of a DOM element in the browser window.
 *
 * @since 0.1.0
 *
 * @class watchScroll
 * @classdesc Monitor the visibility of a DOM element in the browser window.
 */
export default class {

	/**
	 * @summary Constructor: Setup initial data and optionally initialize watch process.
	 *
	 * @since 0.1.0
	 *
	 * @class watchScroll
	 *
	 * @see setupEvents
	 * @see checkPosition
	 *
	 * @param {DOMNode} element - The element to monitor.
	 * @param {string|object} conditions -  Optional. A string "all" or an object with one or more of the attributes top, right, bottom, left, centerIsVisible, or visibility, and the values full, partial, overflow, or hidden.
	 * @param {function} callbackTrue - Optional. The callback function if the conditions are met.
	 * @param {function} callbackFalse - Optional. The callback function if the conditions are not met.
	 * @param {boolean} onEveryScrollEvent - Optional. If true, fire callbackTrue or callbackFalse on every scroll event.
	 * @return {object} Returns the constructed class object.
	 */
	constructor( element, conditions, callbackTrue, callbackFalse, onEveryScrollEvent ) {

		/**
		 * The element to watch.
		 *
		 * @since 0.1.0
		 * @property {DOMNode} element - The element to watch.
		 */
		this.element = element;

		/**
		 * The current visibility of the target element.
		 *
		 * @since 0.1.0
		 * @property {object} status - An object defining the visibility status of the target element.
		 */
		this.status = {
			top: null,
			right: null,
			bottom: null,
			left: null,
			centerIsVisible: null,
			visibility: null
		};

		/**
		 * The current visibility of the target element.
		 *
		 * @since 0.1.0
		 * @property {boolean|string} conditionsMatch - A string "all" or a boolean value. True if the conditions are matched.
		 */
		this.conditionsMatch = 'string' === typeof conditions ? 'all' : null;

		/**
		 * The conditions to check against.
		 *
		 * @since 0.1.0
		 * @property {string||object} conditions - A string "all" or an object with one or more of the attributes top, right, bottom, left, centerIsVisible, or visibility, and the values full, partial, overflow, or hidden.
		 */
		this.conditions = conditions;

		/**
		 * The callback function if the conditions are met.
		 *
		 * @since 0.1.0
		 * @property {function} callbackTrue - The callback function if the conditions are met.
		 */
		this.callbackTrue = callbackTrue;

		/**
		 * The callback function if the conditions are not met.
		 *
		 * @since 0.1.0
		 * @property {function} callbackFalse - The callback function if the conditions are not met.
		 */
		this.callbackFalse = callbackFalse;

		/**
		 * If true, fire callbackTrue or callbackFalse on every scroll event.
		 *
		 * @since 0.1.0
		 * @property {boolean} onEveryScrollEvent - If true, fire callbackTrue or callbackFalse on every scroll event.
		 */
		this.onEveryScrollEvent = onEveryScrollEvent;

		if ( ! this.element ) {
			return;
		}

		if ( this.conditions && ( this.callbackTrue || this.callbackFalse ) ) {
			this.setupEvents();
			this.checkPosition();
		}

		return this;
	}

	/**
	 * @summary Set the conditions to fire callbackTrue or callbackFalse.
	 *
	 * @since 0.1.0
	 *
	 * @class watchScroll
	 *
	 * @see setupEvents
	 * @see checkPosition
	 *
	 * @param {string|object} conditions -  Optional. A string "all" or an object with one or more of the attributes top, right, bottom, left, centerIsVisible, or visibility, and the values full, partial, overflow, or hidden.
	 * @param {function} callbackTrue - Optional. The callback function if the conditions are met.
	 * @param {function} callbackFalse - Optional. The callback function if the conditions are not met.
	 * @param {boolean} onEveryScrollEvent - Optional. If true, fire callbackTrue or callbackFalse on every scroll event.
	 * @return {object} Returns the constructed class object.
	 */
	on( conditions, callbackTrue, callbackFalse, onEveryScrollEvent ) {
		this.conditionsMatch = 'string' === typeof conditions ? 'all' : null;
		this.conditions = conditions;
		this.callbackTrue = callbackTrue;
		this.callbackFalse = callbackFalse;
		this.onEveryScrollEvent = onEveryScrollEvent;

		if ( ! this.element ) {
			return;
		}

		if ( this.conditions && ( this.callbackTrue || this.callbackFalse ) ) {
			this.setupEvents();
			this.checkPosition();
		}

		return this;
	}

	/**
	 * @summary Call the passed function on every scroll event.
	 *
	 * @since 0.1.0
	 *
	 * @class watchScroll
	 *
	 * @see setupEvents
	 * @see checkPosition
	 *
	 * @param {function} callbackTrue - Optional. The callback function if the conditions are met.
	 * @return {object} Returns the constructed class object.
	 */
	always( callbackTrue ) {
		this.conditionsMatch = 'all';
		this.conditions = 'all';
		this.callbackTrue = callbackTrue;

		if ( ! this.element ) {
			return;
		}

		if ( this.conditions && ( this.callbackTrue || this.callbackFalse ) ) {
			this.setupEvents();
			this.checkPosition();
		}

		return this;
	}

	/**
	 * @summary Setup scroll and resize events.
	 *
	 * Check the element position on every scroll and resize event.
	 *
	 * @since 0.1.0
	 *
	 * @class watchScroll
	 *
	 * @see checkPosition
	 *
	 * @return {null}
	 */
	setupEvents() {

		/**
		 * A reference to checkPosition that can be canceled via the cancel function.
		 *
		 * @since 0.1.0
		 * @property {function} scrollHandler - checkPosition.
		 */
		this.scrollHandler = ( event ) => this.checkPosition( event );
		if ( window.addEventListener ) {
			window.addEventListener( 'scroll', this.scrollHandler, false );
			window.addEventListener( 'resize', this.scrollHandler, false );
		} else if ( window.attachEvent ) {
			window.attachEvent( 'onscroll', this.scrollHandler );
			window.attachEvent( 'onresize', this.scrollHandler );
		}
	}

	/**
	 * @summary Cancel the watch events on scroll and resize.
	 *
	 * @since 0.1.0
	 *
	 * @class watchScroll
	 *
	 * @return {null}
	 */
	cancel() {
		if ( window.addEventListener ) {
			window.removeEventListener( 'scroll', this.scrollHandler, false );
			window.removeEventListener( 'resize', this.scrollHandler, false );
		} else if ( window.attachEvent ) {
			window.dettachEvent( 'onscroll', this.scrollHandler );
			window.dettachEvent( 'onresize', this.scrollHandler );
		}
	}

	/**
	 * @summary Set the status object, check against the conditions object, and fire callbackTrue or callbackFalse as appropriate.
	 *
	 * @since 0.1.0
	 *
	 * @class watchScroll
	 *
	 * @return {null}
	 */
	checkPosition( event ) {
		const elementPosition = this.element.getBoundingClientRect(),
		previousStatus = JSON.parse( JSON.stringify( this.status ) ),
		centerPoint = {
			x: ( elementPosition.left + elementPosition.right ) / 2,
			y: ( elementPosition.top + elementPosition.bottom ) / 2
		};
		let conditionsMatch = true,
		statusChange = false;

		this.status.top = ( elementPosition.top >= 0 && elementPosition.top <= window.innerHeight );
		this.status.bottom = ( elementPosition.bottom >= 0 && elementPosition.bottom <= window.innerHeight );
		this.status.right = ( elementPosition.right >= 0 && elementPosition.right <= window.innerWidth );
		this.status.left = ( elementPosition.left >= 0 && elementPosition.left <= window.innerWidth );
		this.status.centerIsVisible = ( centerPoint.x >= 0 && centerPoint.y >= 0 && centerPoint.x <= window.innerWidth && centerPoint.y <= window.innerHeight );

		if ( this.status.top && this.status.bottom && this.status.left && this.status.right ) {
			this.status.visibility = 'full';
		} else if ( this.status.top < 0 && this.status.bottom > window.innerHeight && this.status.left < 0 && this.status.right > window.innerWidth ) {
			this.status.visibility = 'overflow';
		} else if ( ( this.status.top || this.status.bottom ) && ( this.status.left || this.status.right ) ) {
			this.status.visibility = 'partial';
		} else {
			this.status.visibility = 'hidden';
		}

		if ( 'all' === this.conditionsMatch || 'all' === this.conditions ) {
			for ( let side in this.status ) {
				if ( previousStatus[side] !== this.status[side] ) {
					statusChange = true;
					break;
				}
			}
		} else if ( 'object' === typeof this.conditions ) {
			for ( let side in this.conditions ) {
				if ( 'hidden' === this.conditions[side] && false !== this.status[side] || ( 'hidden' !== this.conditions[side] && this.status[side] !== ( this.conditions[side] ? true : false ) ) ) {
					conditionsMatch = false;
					statusChange = true;
					break;
				}
			}
		}
		if ( ( ( 'boolean' === typeof this.conditionsMatch || null === this.conditionsMatch ) && conditionsMatch !== this.conditionsMatch ) || this.onEveryScrollEvent || ( 'all' === this.conditions && statusChange ) ) {
			if ( 'all' !== this.conditionsMatch ) {
				this.conditionsMatch = conditionsMatch;
			}
			if ( this.conditionsMatch && 'function' === typeof this.callbackTrue ) {
				this.callbackTrue.call( this.element, event, this.status, this );
			} else if ( ! this.conditionsMatch && 'function' === typeof this.callbackFalse ) {
				this.callbackFalse.call( this.element, event, this.status, this );
			}
		}
	}
}
