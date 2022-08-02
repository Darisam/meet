import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  if (props.showWelcomeScreen) {
    return (
      <div className="WelcomeScreen">
        <h1>Welcome to Meet</h1>
        <p className="WelcomeText">
          <strong>
            Log in to see upcoming events around the world for full-stack
            developers.
          </strong>
        </p>
        <div align="center">
          <div className="google-button">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google sign-in"
              />
            </div>
            <button
              onClick={() => {
                props.getAccessToken();
              }}
              rel="nofollow noopener"
              className="login-button"
            >
              <strong className="button-text">Sign in with google</strong>
            </button>
          </div>
        </div>
        <a
          href="https://darisam.github.io/meet/privacy.html"
          rel="nofollow noopener"
        >
          Privacy policy
        </a>
      </div>
    );
  } else {
    return null;
  }
}

export default WelcomeScreen;
