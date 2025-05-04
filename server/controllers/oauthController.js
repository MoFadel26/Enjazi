// controllers/oauthController.js
const User = require('../models/userSchema');
const axios = require('axios');
const querystring = require('querystring');
const oauthConfig = require('../config/oauthConfig');

// Initiate OAuth flow
exports.connect = (req, res) => {
  const { service } = req.params;
  const config = oauthConfig[service];
  
  if (!config) {
    return res.status(400).json({
      status: 'error',
      message: `Unsupported service: ${service}`
    });
  }
  
  // Store user ID in cookie instead of session
  res.cookie('oauth_user_id', req.user._id.toString(), {
    httpOnly: true,
    maxAge: 30 * 60 * 1000, // 30 minutes
    sameSite: 'lax'
  });
  
  // Build authorization URL
  let authUrl;
  
  switch(service) {
    case 'googleCalendar':
      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&scope=${config.scopes.join(' ')}&access_type=offline&prompt=consent`;
      break;
    case 'slack':
      authUrl = `https://slack.com/oauth/v2/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(',')}&user_scope=`;
      break;
    case 'notion':
      authUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code`;
      break;
    case 'todoist':
      authUrl = `https://todoist.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(',')}&state=${req.user._id}`;
      break;
    case 'github':
      authUrl = `https://github.com/login/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(' ')}`;
      break;
    default:
      return res.status(400).json({
        status: 'error',
        message: `Unsupported service: ${service}`
      });
  }
  
  // Add state parameter for security
  const state = Math.random().toString(36).substring(2);
  res.cookie('oauth_state', state, {
    httpOnly: true,
    maxAge: 30 * 60 * 1000, // 30 minutes
    sameSite: 'lax'
  });
  
  // Add state to URL if not already included
  if (!authUrl.includes('state=')) {
    authUrl += `&state=${state}`;
  }
  
  res.redirect(authUrl);
};

// OAuth callback handlers
exports.googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const config = oauthConfig.googleCalendar;
    
    // Verify state to prevent CSRF
    if (state !== req.cookies.oauth_state) {
      return res.redirect('/settings/integrations?error=Invalid_state_parameter');
    }
    
    // Get user ID from cookie
    const userId = req.cookies.oauth_user_id;
    if (!userId) {
      return res.redirect('/settings/integrations?error=Authentication_session_expired');
    }
    
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    });
    
    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    
    // Get user info
    const userInfoResponse = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    const email = userInfoResponse.data.email;
    
    // Update user's integration settings
    await User.findByIdAndUpdate(userId, {
      $set: {
        'settings.integrations.googleCalendar': {
          connected: true,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: new Date(Date.now() + expires_in * 1000),
          email
        }
      }
    });
    
    // Clear cookies
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_user_id');
    
    res.redirect('/settings/integrations?success=Google_Calendar_connected_successfully');
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/settings/integrations?error=Failed_to_connect_Google_Calendar');
  }
};

exports.slackCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const config = oauthConfig.slack;
    
    // Verify state to prevent CSRF
    if (state !== req.cookies.oauth_state) {
      return res.redirect('/settings/integrations?error=Invalid_state_parameter');
    }
    
    // Get user ID from cookie
    const userId = req.cookies.oauth_user_id;
    if (!userId) {
      return res.redirect('/settings/integrations?error=Authentication_session_expired');
    }
    
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://slack.com/api/oauth.v2.access', 
      querystring.stringify({
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const { access_token, team } = tokenResponse.data;
    
    // Update user's integration settings
    await User.findByIdAndUpdate(userId, {
      $set: {
        'settings.integrations.slack': {
          connected: true,
          accessToken: access_token,
          teamId: team.id,
          teamName: team.name,
          userId: tokenResponse.data.authed_user.id
        }
      }
    });
    
    // Clear cookies
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_user_id');
    
    res.redirect('/settings/integrations?success=Slack_connected_successfully');
  } catch (error) {
    console.error('Slack OAuth error:', error);
    res.redirect('/settings/integrations?error=Failed_to_connect_Slack');
  }
};

exports.notionCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const config = oauthConfig.notion;
    
    // Verify state to prevent CSRF
    if (state !== req.cookies.oauth_state) {
      return res.redirect('/settings/integrations?error=Invalid_state_parameter');
    }
    
    // Get user ID from cookie
    const userId = req.cookies.oauth_user_id;
    if (!userId) {
      return res.redirect('/settings/integrations?error=Authentication_session_expired');
    }
    
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://api.notion.com/v1/oauth/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri
    }, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });
    
    const { access_token, workspace_id, workspace_name } = tokenResponse.data;
    
    // Update user's integration settings
    await User.findByIdAndUpdate(userId, {
      $set: {
        'settings.integrations.notion': {
          connected: true,
          accessToken: access_token,
          workspaceId: workspace_id,
          workspaceName: workspace_name
        }
      }
    });
    
    // Clear cookies
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_user_id');
    
    res.redirect('/settings/integrations?success=Notion_connected_successfully');
  } catch (error) {
    console.error('Notion OAuth error:', error);
    res.redirect('/settings/integrations?error=Failed_to_connect_Notion');
  }
};

exports.todoistCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const config = oauthConfig.todoist;
    
    // Verify state to prevent CSRF
    if (state !== req.cookies.oauth_state) {
      return res.redirect('/settings/integrations?error=Invalid_state_parameter');
    }
    
    // Get user ID from cookie
    const userId = req.cookies.oauth_user_id;
    if (!userId) {
      return res.redirect('/settings/integrations?error=Authentication_session_expired');
    }
    
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://todoist.com/oauth/access_token', {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri
    });
    
    const { access_token } = tokenResponse.data;
    
    // Get user info
    const userInfoResponse = await axios.get('https://api.todoist.com/rest/v2/user', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    // Update user's integration settings
    await User.findByIdAndUpdate(userId, {
      $set: {
        'settings.integrations.todoist': {
          connected: true,
          accessToken: access_token,
          userId: userInfoResponse.data.id
        }
      }
    });
    
    // Clear cookies
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_user_id');
    
    res.redirect('/settings/integrations?success=Todoist_connected_successfully');
  } catch (error) {
    console.error('Todoist OAuth error:', error);
    res.redirect('/settings/integrations?error=Failed_to_connect_Todoist');
  }
};

exports.githubCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const config = oauthConfig.github;
    
    // Verify state to prevent CSRF
    if (state !== req.cookies.oauth_state) {
      return res.redirect('/settings/integrations?error=Invalid_state_parameter');
    }
    
    // Get user ID from cookie
    const userId = req.cookies.oauth_user_id;
    if (!userId) {
      return res.redirect('/settings/integrations?error=Authentication_session_expired');
    }
    
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const { access_token } = tokenResponse.data;
    
    // Get user info
    const userInfoResponse = await axios.get('https://api.github.com/user', {
      headers: { 
        'Authorization': `token ${access_token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // Update user's integration settings
    await User.findByIdAndUpdate(userId, {
      $set: {
        'settings.integrations.github': {
          connected: true,
          accessToken: access_token,
          username: userInfoResponse.data.login
        }
      }
    });
    
    // Clear cookies
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_user_id');
    
    res.redirect('/settings/integrations?success=GitHub_connected_successfully');
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect('/settings/integrations?error=Failed_to_connect_GitHub');
  }
};

// Disconnect a service
exports.disconnect = async (req, res) => {
  try {
    const { service } = req.params;
    const userId = req.user._id;
    
    // Validate service
    if (!oauthConfig[service]) {
      return res.status(400).json({
        status: 'error',
        message: `Unsupported service: ${service}`
      });
    }
    
    // Reset integration to default state
    const updateField = `settings.integrations.${service}`;
    const update = { $set: { [updateField]: { connected: false } } };
    
    await User.findByIdAndUpdate(userId, update);
    
    res.status(200).json({
      status: 'success',
      message: `${service} disconnected successfully`
    });
  } catch (error) {
    console.error(`Error disconnecting ${req.params.service}:`, error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};