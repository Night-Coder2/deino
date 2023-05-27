module.exports = (Discord, client) => {
  require('../../counters/memberCount')(client)
  console.log('bot is ready')
}