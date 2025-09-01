// commands/ping.js
module.exports = {
  meta: {
    name: "pingg",
    description: "Test bot responsiveness and get latency info",
    usage: ".pingg",
    category: "utility",
    args: [],
  },

  run: async ({ m, sock }) => {
    const jid = m.key.remoteJid;
    const timestamp = Number(m.messageTimestamp) * 1000;
    const now = Date.now();
    const latency = now - timestamp;

    const responseText =
      `🏓 *Pong!*\n` +
      `⏱️ Latency: ${latency}ms\n` +
      `🤖 Bot is responsive and ready!`;

    return sock.sendMessage(jid, {
      text: responseText,
    });
  },
};
