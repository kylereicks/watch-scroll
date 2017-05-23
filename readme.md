Monitor the visibility of a DOM element in the browser window
=============================================================

```javascript
import watchScroll from './watch-scroll';

[].forEach.call( document.getElementsByTagName( 'image' ), image => {
	new watchScroll( image ).on( { centerIsVisible: true }, function( event, visibilityStatus, watchScroll ) {
		console.log( this )
	} );
} );
```
