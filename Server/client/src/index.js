import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import configureStore from './components/redux/store/configureStore'
const store=configureStore()
const ele =(
    <Provider store={store}>
        <App/>
    </Provider>
)
ReactDOM.render(ele, document.getElementById('root'));
