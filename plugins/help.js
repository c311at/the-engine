'use strict'


exports.init = (bot, prefs) => {

    bot.register.command('help', {
        help: "You are here!",
        fn: msg => {
            var command = msg.args.toLowerCase();

            if (command !== "") {
                if (bot.functions.hasOwnProperty(command)) {
                    if ("help" in bot.functions[command]) {
                        return msg.reply.text(bot.functions[command].help, {
                            parseMode: 'markdown',
                            asReply: msg.chat.type !== 'private',
                        });
                    } else {
                        return "There's no help yet for the " + command + " command, sorry.";
                    }
                } else {
                    return "The command " + command + " wasn't found.";
                }
            } else {
                return msg.reply.text(help, {
                    parseMode: 'markdown',
                    asReply: msg.chat.type !== 'private',
                });
            }
        }
    })

    let commands

    process.nextTick(() => {
        commands = Object.keys(bot.functions)
            .sort()
            .map(command => `\`/${command}\``)
            .join('\n');
    });

    bot.register.command('commands', {
        help: "Lists all commands provided by the bot.",
        fn: msg => {
            bot.api.sendMessage(msg.chat.id, commands, {
                reply: msg.message_id,
                parseMode: "markdown"
            });
        }
    });
}
