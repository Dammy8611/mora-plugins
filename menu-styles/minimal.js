// menu-styles/crystal.js
module.exports = {
  name: "crystal",

  render({ bot, categories, showDetails }) {
    const lines = [];

    // Header with crystal theme
    lines.push(`        ◊ ◊ ◊  ${bot.name || "MORA"}  ◊ ◊ ◊`);
    lines.push(`════════════════════════════════`);
    lines.push(`✦ Crystal System Information ✦`);
    lines.push(`╭─────────────────────────────╮`);
    lines.push(`│ ◈ Owner: ${bot.ownerName}`);
    lines.push(`│ ◈ Mode: ${bot.privacy ? "Public" : "Private"}`);
    lines.push(`│ ◈ Uptime: ${bot.uptime}`);
    lines.push(`│ ◈ Time: ${bot.time} • ${bot.date}`);
    lines.push(`│ ◈ Prefix: ${bot.prefix}`);
    lines.push(`│ ◈ Commands: ${bot.totalCommands}`);
    lines.push(`│ ◈ Theme: Crystal Formation`);
    lines.push(`│ ◈ Ping: ${bot.ping}ms`);
    lines.push(`╰─────────────────────────────╯`);
    lines.push("");

    // Sort commands within each category
    for (const cat of Object.keys(categories)) {
      categories[cat].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Build menu sorted by category with crystal styling
    const sortedCategories = Object.keys(categories).sort();

    for (const cat of sortedCategories) {
      const cmds = categories[cat];
      lines.push(`◊ *${cat.toUpperCase()} CRYSTAL*`);
      lines.push(`┌─────────────────────────────`);

      for (let i = 0; i < cmds.length; i++) {
        const cmd = cmds[i];
        const isLast = i === cmds.length - 1;
        const connector = isLast ? "└" : "├";
        const base = `${connector}─◈ ${bot.prefix}${cmd.name}`;
        const extra = showDetails ? ` :: ${cmd.description}` : "";
        lines.push(`${base}${extra}`);
      }
      lines.push("");
    }

    lines.push(`◊ ◊ ◊ End of Crystal Menu ◊ ◊ ◊`);

    const menuText = lines.join("\n");

    return {
      menuText,
      image: "https://files.catbox.moe/crystaltheme.jpg", // You can replace with actual crystal-themed image
    };
  },
};
