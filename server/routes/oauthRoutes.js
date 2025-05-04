// routes/oauthRoutes.js
const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/protectRoute');
const crypto = require('crypto');
const oauthConfig = require('../config/oauthConfig');

// Initialize the controller
const oauthController = {
  // Connect function that handles all services
  connect: (req, res) => {
    const { service } = req.params;
    const state = crypto.randomBytes(16).toString('hex');
    
    // Store state in cookie instead of session
    res.cookie('oauthState', state, { 
      httpOnly: true, 
      maxAge: 10 * 60 * 1000, // 10 minutes
      sameSite: 'lax'
    });
    
    let authUrl;
    
    switch(service) {
      case 'google':
        const googleConfig = oauthConfig.googleCalendar;
        authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleConfig.clientId}&redirect_uri=${encodeURIComponent(googleConfig.redirectUri)}&scope=${encodeURIComponent(googleConfig.scopes.join(' '))}&response_type=code&state=${state}&access_type=offline&prompt=consent`;
        break;
        
      case 'slack':
        const slackConfig = oauthConfig.slack;
        authUrl = `https://slack.com/oauth/authorize?client_id=${slackConfig.clientId}&redirect_uri=${encodeURIComponent(slackConfig.redirectUri)}&scope=${slackConfig.scopes.join(',')}&state=${state}`;
        break;
        
      case 'notion':
        const notionConfig = oauthConfig.notion;
        authUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${notionConfig.clientId}&redirect_uri=${encodeURIComponent(notionConfig.redirectUri)}&response_type=code&state=${state}`;
        break;
        
      case 'todoist':
        const todoistConfig = oauthConfig.todoist;
        authUrl = `https://todoist.com/oauth/authorize?client_id=${todoistConfig.clientId}&redirect_uri=${encodeURIComponent(todoistConfig.redirectUri)}&scope=${todoistConfig.scopes.join(',')}&state=${state}`;
        break;
        
      case 'github':
        const githubConfig = oauthConfig.github;
        authUrl = `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}&redirect_uri=${encodeURIComponent(githubConfig.redirectUri)}&scope=${githubConfig.scopes.join(',')}&state=${state}`;
        break;
        
      default:
        return res.status(400).json({ message: 'Invalid service' });
    }
    
    res.redirect(authUrl);
  },
  
  // Placeholder callback handlers - implement these in a separate controller file
  googleCallback: (req, res) => {
    // Implement Google callback
    res.redirect('http://localhost:3000/settings/integrations?success=Google_connected');
  },
  
  slackCallback: (req, res) => {
    // Implement Slack callback
    res.redirect('http://localhost:3000/settings/integrations?success=Slack_connected');
  },
  
  notionCallback: (req, res) => {
    // Implement Notion callback
    res.redirect('http://localhost:3000/settings/integrations?success=Notion_connected');
  },
  
  todoistCallback: (req, res) => {
    // Implement Todoist callback
    res.redirect('http://localhost:3000/settings/integrations?success=Todoist_connected');
  },
  
  githubCallback: (req, res) => {
    // Implement GitHub callback
    res.redirect('http://localhost:3000/settings/integrations?success=GitHub_connected');
  },
  
  // Disconnect handler
  disconnect: (req, res) => {
    const { service } = req.params;
    // Implement disconnect logic
    res.status(200).json({ message: `${service} disconnected successfully` });
  }
};

// Initiate OAuth flow
router.get('/:service/connect', protectRoute, oauthController.connect);

// OAuth callbacks
router.get('/google/callback', oauthController.googleCallback);
router.get('/slack/callback', oauthController.slackCallback);
router.get('/notion/callback', oauthController.notionCallback);
router.get('/todoist/callback', oauthController.todoistCallback);
router.get('/github/callback', oauthController.githubCallback);

// Disconnect a service
router.delete('/:service/disconnect', protectRoute, oauthController.disconnect);

module.exports = router;