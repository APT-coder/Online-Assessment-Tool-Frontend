export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '3e9c1906-7312-4d14-9d96-d7f3482190d1',
      authority: 'https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft-ppe.com/v1.0/me',
  },
};
