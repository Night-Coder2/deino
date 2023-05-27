module.exports = (Discord, client) => {
  require('../../counters/memberCounter')(client)
  console.log('bot is ready')
}