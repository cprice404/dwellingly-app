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
  <div className="main page page--signin">
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
    <section className="signup--email width-wrapper">
      <SignupFormComponent />
    </section>
    <section className="signup--google width-wrapper">
      <div className="allCaps separator">{intl.formatMessage(COMMON.CONJUNCTION_OR)}</div>
      <h2 className="align-left">
        {intl.formatMessage(SIGNUP.INSTRUCTIONS_GOOGLE)}
      </h2>
      <LoginWithGoogle />
    </section>
    <section className="width-wrapper">
      <p className="signup-conditions align-left">{intl.formatMessage(SIGNUP.INSTRUCTIONS)} <Link to="/terms-conditions">{intl.formatMessage(TERMS.TITLE)}</Link> {intl.formatMessage(COMMON.CONJUNCTION_AND)} <Link to="/privacy-policy">{intl.formatMessage(PRIVACY.TITLE_STANDALONE)}</Link>.</p>
    </section>
  </div>
);

Signup.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Signup);

