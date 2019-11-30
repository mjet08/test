module.exports = {
  version: process.env.APP_VERSION,
  GOOGLE_CLIENT_ID: '456169771371-t58rmacfpalc2q8r5sgmrakfg0151i34.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'Pb3P-kH0a3x3KR2ahERN_Nq_',
  port: process.env.PORT || 4000,
  timezone: process.env.TIMEZONE,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  authSecret: process.env.SECRET,
  authSession: {
    session: false
  }
}
