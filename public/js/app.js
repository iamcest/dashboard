let auth0 = null;
// ..

const fetchAuthConfig = () => fetch("/auth_config.json");

// ..

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

// ..

window.onload = async () => {
  await configureClient();
}

// ..

window.onload = async () => {
  await configureClient();

  // NEW - update the UI state
  updateUI();
};

// NEW
const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
};

// ..

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

// public/js/app.js

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};

