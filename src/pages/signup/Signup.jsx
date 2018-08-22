import React from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import SignupFormComponent from '../../components/signup-form/SignUpForm';
import LoginWithGoogle from '../../components/login/LoginWithGoogle';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import { COMMON, PRIVACY, SIGNUP, TERMS } from '../../translations/messages';
import { SETTINGS } from '../../constants/constants';

import './Signup.scss';

const Signup = ({intl}) => (
  <div className="page page--signin">
    <Header>
      {() => (
        <div>
          <Navigation />
          <Header.Label 
            label={intl.formatMessage(SIGNUP.TITLE, {org: SETTINGS.ORGANIZATION, appname: SETTINGS.APP_NAME})} 
            type="basic" />
        </div>
      )}
    </Header>
    <section className="main width-wrapper">
    <SignupFormComponent />
      <p className="signup-conditions align-left">{intl.formatMessage(SIGNUP.INSTRUCTIONS)} <Link to="/terms-conditions">{intl.formatMessage(TERMS.TITLE)}</Link> {intl.formatMessage(COMMON.CONJUNCTION_AND)} <Link to="/privacy-policy">{intl.formatMessage(PRIVACY.TITLE_STANDALONE)}</Link>.</p>
    </section>
    <section className="main width-wrapper">
      <h2 className="instructions--google align-left">
        {intl.formatMessage(SIGNUP.INSTRUCTIONS_GOOGLE)}
      </h2>
      <LoginWithGoogle />
    </section>
  </div>
);

Signup.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Signup);

