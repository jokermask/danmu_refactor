import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createAction, createReducer} from 'redux-act';

const start = createAction();
const success = createAction();

const reducer = createReducer({
    [start]: (state) => ({ ...state, running: true }),
    [success]: (state, result) => ({ running: false, result })
}, {
    running: false,
    result: false
});

// 1) You can use the same way as the Redux samples
// using thunk middleware
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

function fetch() {
    // We don't really need the dispatch
    // but here it is if you don't bind your actions
    return function (dispatch) {
        // state: { running: false, result: false }
        dispatch(start());
        // state: { running: true, result: false }
        return new Promise(resolve => {
            // Here, you should probably do a real async call,
            // like, you know, XMLHttpRequest or Global.fetch stuff
            setTimeout(() =>
                    resolve(1)
                , 5);
        }).then(result=>
                dispatch(success(result))
            // state: { running: false, result: 1 }
        );
    };
}

store.dispatch(fetch()).then(() => {
    // state: { running: false, result: 1 }
});

// 2) You can enjoy the redux-act binding
// and directly call the actions
const store = createStore(reducer);

start.assignTo(store);
success.assignTo(store);

function fetch() {
    // state: { running: false, result: false }
    start();
    // state: { running: true, result: false }
    return new Promise(resolve => {
        // Here, you should probably do a real async call,
        // like, you know, XMLHttpRequest or Global.fetch stuff
        setTimeout(() =>
                resolve(1)
            , 5);
    }).then(result=>
            success(result)
        // state: { running: false, result: 1 }
    );
}

fetch().then(() => {
    // state: { running: false, result: 1 }
});