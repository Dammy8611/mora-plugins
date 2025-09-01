// commands/qr.js
const fs = require("fs");
const path = require("path");

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, "..", "..", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

module.exports = {
  meta: {
    name: "qr",
    aliases: ["qrcode"],
    description: "Generate QR codes from text or URLs",
    usage: ".qr <text>",
    category: "utility",
    args: [
      {
        name: "text",
        type: "string",
        required: true,
        greedy: true,
        description: "Text or URL to convert to QR code",
      },
    ],
  },

  run: async ({ m, sock, args }) => {
    const jid = m.key.remoteJid;
    const text = args.text.trim();

    if (!text) {
      return sock.sendMessage(jid, {
        text: "❌ Please provide text or URL to generate QR code.\nUsage: .qr <text>",
      });
    }

    try {
      // Require qrcode inside the function after dependency is installed
      const qrcode = require("qrcode");

      // Generate filename with timestamp to avoid conflicts
      const filename = `qr_${Date.now()}.png`;
      const filepath = path.join(tempDir, filename);

      // Generate QR code and save as PNG
      await qrcode.toFile(filepath, text, {
        width: 512,
        margin: 2,
        color: {
          dark: "#000000", // Black dots
          light: "#FFFFFF", // White background
        },
      });

      // Send the QR code image
      await sock.sendMessage(jid, {
        image: { url: filepath },
        caption: `🔲 *QR Code Generated*\n📝 Text: ${
          text.length > 100 ? text.substring(0, 100) + "..." : text
        }`,
      });

      // Clean up the temporary file after sending
      setTimeout(() => {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }, 5000); // Delete after 5 seconds
    } catch (error) {
      console.error("QR generation error:", error);
      await sock.sendMessage(jid, {
        text: `❌ Failed to generate QR code: ${error.message}`,
      });
    }
  },
};
