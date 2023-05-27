module.exports = (Discord, client, app) => {
  require('../../counters/memberCounter')(Discord, client, app)
  console.log('bot is ready')
}