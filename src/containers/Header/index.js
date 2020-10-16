import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { authActions } from '../../store/actions';

import history from '../../lib/history';

import Button from '../../components/Button';
import Icon from '../../components/Icon';

import './Header.css';

class Header extends Component {
  state = {
    navbarOpen: false
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      navbarOpen: !prevState.navbarOpen
    }));
  };

  render() {
    const navbarOpen = this.state.navbarOpen ? 'is-active' : '';
    return (
      <nav className="navbar is-link">
        <div className="navbar-brand">
          <NavLink
            className="navbar-item title is-marginless is-paddingless"
            to="/"
          >
            <span>Mega Emag</span>
          </NavLink>

          <div
            role="button"
            className={`navbar-burger ${navbarOpen}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleNavbar}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>
        <div className={`navbar-menu ${navbarOpen}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.props.authenticated ? (
                  <React.Fragment>
                    <Button
                      text="Cos"
                      type="primary"
                      onClick={() => history.push('/checkout')}
                    />
                    <Button
                      text="Profil"
                      type="light"
                      onClick={() => history.push('/profile')}
                    />
                    <Button
                      text="Log out"
                      type="light"
                      onClick={() => this.props.logout()}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button
                      text="Logare"
                      type="light"
                      onClick={() => history.push('/login')}
                    />
                    <Button
                      text="Inregistrare"
                      type="light"
                      onClick={() => history.push('/register')}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
