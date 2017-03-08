import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import App from './components/App.jsx';
import Cart from './components/Cart.jsx';
import Comic from './components/Comic.jsx';

render((
<Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="/cart" name="cart" component={Cart}/>
        <Route path="/comics/:id" name="comic" component={Comic}/>
    </Route>
    <Redirect from="/*" to="/" />
</Router>
), document.getElementById('app'));
