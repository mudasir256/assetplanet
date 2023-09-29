import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { routes } from './routes';

// setup fake backend
import { configureFakeBackend } from './helpers';
import { isUserAuthenticated } from './helpers/authUtils';

// Themes
import './assets/scss/DefaultTheme.scss';
import 'antd/dist/antd.css';
import './App.css';
import './CustomizeTheme.css';

import PageLayout from './components/PageLayout';
import Disaster from './pages/protector/disaster/Disaster'
import DisasterCreate from './pages/protector/disaster/operations/DisasterCreate'


// Lazy loading and code splitting - 
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <React.Fragment></React.Fragment>

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

const AuthLayout = Loadable({
  loader: () => import('./components/AuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

// configure fake backend
// configureFakeBackend();

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent 
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect()(HOC);
}



/**
 * Main app component
 */
class App extends Component {
  /**
 * Returns the layout component based on different properties
 * @param {*} props 
 */
  getLayout = () => {
    // return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
    return PageLayout;
  }

  render() {
    return (
      // rendering the router with layout
      <BrowserRouter>
        {/* <React.Fragment> */}
          <Switch>
            {/* <Route exact={true} path="/l" component={Disaster}></Route>
            <Route exact={true} path="/disaster/create" component={DisasterCreate}></Route> */}

          {routes.map((route, index) => {
            return (
              <route.route
                key={index}
                path={route.path}
                exact={true}
                // exact={route.exact}
                roles={route.roles}
                disableRoles={route.disableRoles}
                component={withLayout(props => {
                  const Layout = this.getLayout();
                  return (
                    <Suspense fallback={loading()}>
                      <Layout {...props} title={route.title} route={route}>
                        <route.component {...props} />
                      </Layout>
                    </Suspense>
                  );
                })}
              />
            );
          })}
          </Switch>
        {/* </React.Fragment> */}
      </BrowserRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    // isAuthenticated: state.Auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(App);