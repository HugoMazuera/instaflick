import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import imageReducer from './images';
import commentsReducer from './comments';
import userReducer from './user';
import image_likes_reducer from './image-likes';

const rootReducer = combineReducers({
	session,
	images: imageReducer,
	comments: commentsReducer,
	user: userReducer,
	likes: image_likes_reducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;