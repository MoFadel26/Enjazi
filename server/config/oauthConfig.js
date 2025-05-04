// config/oauthConfig.js
module.exports = {
    googleCalendar: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: `${process.env.API_URL}/api/oauth/google/callback`,
      scopes: ['https://www.googleapis.com/auth/calendar']
    },
    slack: {
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      redirectUri: `${process.env.API_URL}/api/oauth/slack/callback`,
      scopes: ['channels:read', 'chat:write']
    },
    notion: {
      clientId: process.env.NOTION_CLIENT_ID,
      clientSecret: process.env.NOTION_CLIENT_SECRET,
      redirectUri: `${process.env.API_URL}/api/oauth/notion/callback`
    },
    todoist: {
        clientId: process.env.TODOIST_CLIENT_ID,
        clientSecret: process.env.TODOIST_CLIENT_SECRET,
        redirectUri: `${process.env.API_URL}/api/oauth/todoist/callback`,
        scopes: ['task:add', 'data:read']
      },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUri: `${process.env.API_URL}/api/oauth/github/callback`,
      scopes: ['repo']
    }
  };