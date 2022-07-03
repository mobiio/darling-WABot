// português, espanol, english

let lang = require("./config").lang;
const readmore = require(__dirname + "/../../lib/Utils").readmore;

exports.wait =
lang === "pt" ? "⏳ Aguarde..."
	: lang === "es" ? "⏳ Sostener..."
		: lang === "en" ? "⏳ Wait..."
			: undefined;

exports.onlyAdmin =
	lang === "pt" ? "Apenas admins de grupo podem usar esse comando"
		: lang === "es" ? "Solo los administradores de grupo pueden usar este comando"
			: lang === "en" ? "Only group admins can use this command"
				: undefined;

exports.onlyOwner =
	lang === "pt" ? "Apenas o dono do bot pode usar esse comando"
		: lang === "es" ? "Solo el propietario del bot puede usar este comando"
			: lang === "en" ? "Only the bot owner can use this command"
				: undefined;

exports.botNotAdmin =
	lang === "pt" ? "O bot não é admin, logo não pode executar esse comando"
		: lang === "es" ? "El bot no es administrador, por lo que no puede ejecutar este comando"
			: lang === "en" ? "The bot is not admin, so it can't run this command"
				: undefined;


exports.tagAnyone =
	lang === "pt" ? "Mencione alguém ou responda uma mensagem"
		: lang === "es" ? "Mencionar a alguien o responder a un mensaje"
			: lang === "en" ? "Mention someone or reply to a message"
				: undefined;

exports.missARGS =
	lang === "pt" ? "Insira um texto depois do comando"
		: lang === "es" ? "Insertar texto después del comando"
			: lang === "en" ? "Insert text after the command"
				: undefined;

exports.cantRemoveGroupOwner =
	lang === "pt" ? "Eu não posso remover o criador do grupo"
		: lang === "es" ? "No puedo eliminar al creador del grupo."
			: lang === "en" ? "I can't remove group creator"
				: undefined;

exports.menu = `
𝑫𝑨𝑹𝑳𝑰𝑵𝑮 𝑾𝑨𝑩𝑶𝑻 🚀
𝑏𝑎𝑠𝑒 𝑝𝑎𝑟𝑎 𝑏𝑜𝑡𝑠 𝑑𝑒 𝑤ℎ𝑎𝑡𝑠𝑎𝑝𝑝 

Isso é um exemplo de como utilizar a lib do Baileys.
Utilize esse bot como base para montar o seu, seja para atendimentos a clientes ou apenas para diversão.
Visite meu github: https://github.com/mobiio/darling-WABot
whatsapp: https://chat.whatsapp.com/GZ8Mt5AAzhkBZbqNiqfDGJ

${readmore}
𝙀𝙓𝙀𝙈𝙋𝙇𝙊𝙎
𝑢𝑠𝑒-𝑜𝑠 𝑐𝑜𝑚𝑜 𝑏𝑎𝑠𝑒 𝑝𝑎𝑟𝑎 𝑐𝑟𝑖𝑎𝑟 𝑠𝑒𝑢𝑠 𝑝𝑟𝑜𝑝𝑟𝑖𝑜𝑠 𝑐𝑜𝑚𝑎𝑛𝑑𝑜𝑠

𝑝𝑟𝑒𝑓𝑖𝑥𝑜 𝑢𝑡𝑖𝑙𝑖𝑧𝑎𝑑𝑜: [ # ]
𝑢𝑠𝑒 #comando 𝑝𝑎𝑟𝑎 𝑒𝑥𝑒𝑐𝑢𝑡𝑎𝑟 𝑢𝑚 𝑐𝑜𝑚𝑎𝑛𝑑𝑜

𝐸𝑁𝑉𝐼𝑂 𝐷𝐸 𝑀𝐸𝑁𝑆𝐴𝐺𝐸𝑁𝑆:

• message

• sticker

• image

• video

• audio

• button

• list

• template

• contact

• location

• react

𝐺𝐸𝑅𝐸𝑁𝐶𝐼𝐴𝑀𝐸𝑁𝑇𝑂 𝐷𝑂 𝐺𝑅𝑈𝑃𝑂:

• groupname
𝑡𝑟𝑜𝑐𝑎 𝑜 𝑛𝑜𝑚𝑒 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜

• groupdesc 
𝑡𝑟𝑜𝑐𝑎 𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑐𝑎𝑜 𝑑𝑜  𝑔𝑟𝑢𝑝𝑜

• groupcode 
𝑙𝑖𝑛𝑘 𝑑𝑒 𝑐𝑜𝑛𝑣𝑖𝑡𝑒 𝑔𝑟𝑢𝑝𝑜

• revokegroupcode
𝑟𝑒𝑣𝑜𝑔𝑎𝑟 𝑜 𝑙𝑖𝑛𝑘

• grouplock 
𝑎𝑝𝑒𝑛𝑎𝑠 𝑎𝑑𝑚𝑖𝑛𝑠 𝑝𝑜𝑑𝑒𝑚 𝑒𝑑𝑖𝑡𝑎𝑟 𝑑𝑎𝑑𝑜𝑠 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜

• groupunlock 
𝑡𝑜𝑑𝑜𝑠 𝑝𝑜𝑑𝑒𝑚 𝑒𝑑𝑖𝑡𝑎𝑟 𝑑𝑎𝑑𝑜𝑠 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜

• groupclose 
𝑓𝑒𝑐ℎ𝑎𝑟 𝑔𝑟𝑢𝑝𝑜

• groupopen
𝑎𝑏𝑟𝑖𝑟 𝑔𝑟𝑢𝑝𝑜

• grouppic
𝑎𝑙𝑡𝑒𝑟𝑎𝑟 𝑓𝑜𝑡𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜

• newgroup
𝑐𝑟𝑖𝑎 𝑢𝑚 𝑛𝑜𝑣𝑜 𝑔𝑟𝑢𝑝𝑜

• demote
𝑟𝑒𝑚𝑜𝑣𝑒 𝑎𝑑𝑚

• promote
𝑎𝑑𝑑 𝑎𝑑𝑚

• ban 
𝑟𝑒𝑚𝑜𝑣𝑒𝑟

• add
𝑎𝑑𝑖𝑐𝑖𝑜𝑛𝑎𝑟

• leave
𝑠𝑎𝑖𝑟 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜

• join 
𝑒𝑛𝑡𝑟𝑎𝑟 𝑒𝑚 𝑢𝑚 𝑔𝑟𝑢𝑝𝑜

• infofromcode
𝑝𝑒𝑔𝑎𝑟 𝑖𝑛𝑓𝑜𝑟𝑚𝑎𝑐𝑜𝑒𝑠 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜 𝑝𝑒𝑙𝑜 𝑙𝑖𝑛𝑘

• tag
𝑚𝑎𝑟𝑐𝑎𝑟 𝑡𝑜𝑑𝑜𝑠

• antitag
𝑖𝑚𝑝𝑒𝑑𝑒 𝑞𝑢𝑒 𝑎𝑙𝑔𝑢𝑒𝑚 𝑚𝑎𝑟𝑞𝑢𝑒 𝑚𝑢𝑖𝑡𝑎𝑠 𝑝𝑒𝑠𝑠𝑜𝑎𝑠 𝑛𝑎 𝑚𝑒𝑠𝑚𝑎 𝑚𝑒𝑛𝑠𝑎𝑔𝑒𝑚

• antifake
𝑖𝑚𝑝𝑒𝑑𝑒 𝑞𝑢𝑒 𝑛𝑢𝑚𝑒𝑟𝑜𝑠 𝑒𝑠𝑡𝑟𝑎𝑛𝑔𝑒𝑖𝑟𝑜𝑠 𝑒𝑛𝑡𝑟𝑒𝑚 𝑛𝑜 𝑔𝑟𝑢𝑝𝑜

• antilink
𝑖𝑚𝑝𝑒𝑑𝑒 𝑞𝑢𝑒 𝑎𝑙𝑔𝑢𝑒𝑚 𝑒𝑛𝑣𝑖𝑒 𝑙𝑖𝑛𝑘𝑠 𝑛𝑜 𝑔𝑟𝑢𝑝𝑜

• antispecial
𝑖𝑚𝑝𝑒𝑑𝑒 𝑞𝑢𝑒 𝑎𝑙𝑔𝑢𝑒𝑚 𝑒𝑛𝑣𝑖𝑒 𝑚𝑒𝑛𝑠𝑎𝑔𝑒𝑛𝑠 𝑑𝑒 𝐵𝑜𝑡𝑜𝑒𝑠, 𝑙𝑖𝑠𝑡𝑎𝑠 𝑜𝑢 𝑐𝑎𝑡𝑎𝑙𝑜𝑔𝑜𝑠

• antitrava
𝑖𝑚𝑝𝑒𝑑𝑒 𝑡𝑒𝑥𝑡𝑜𝑠 𝑠𝑢𝑝𝑒𝑟𝑖𝑜𝑟𝑒𝑠 𝑎 3500 𝑐𝑎𝑟𝑎𝑐𝑡𝑒𝑟𝑒𝑠

𝑂𝑈𝑇𝑅𝑂𝑆:
• msgdata

• groupdata

𝐸𝑋𝑇𝑅𝐴𝑆:
𝑎 𝑝𝑟𝑜𝑝𝑜𝑠𝑡𝑎 𝑑𝑒𝑠𝑠𝑒 𝑝𝑟𝑜𝑗𝑒𝑡𝑜 𝑛ã𝑜 é 𝑠𝑒𝑟 𝑚𝑢𝑖𝑡𝑜 𝑐𝑜𝑚𝑝𝑙𝑒𝑥𝑜, 𝑚𝑎𝑠 𝑎𝑑𝑖𝑐𝑖𝑜𝑛𝑒𝑖 𝑎𝑙𝑔𝑢𝑚𝑎𝑠 𝑐𝑜𝑖𝑠𝑎𝑠 𝑞𝑢𝑒 𝑝𝑜𝑑𝑒𝑚 𝑛𝑜𝑠 𝑑𝑖𝑣𝑒𝑟𝑡𝑖𝑟:

• play
𝑜𝑢ça 𝑠𝑢𝑎 𝑚ú𝑠𝑖𝑐𝑎 𝑜𝑢 𝑣𝑖𝑑𝑒𝑜 𝑓𝑎𝑣𝑜𝑟𝑖𝑡𝑜 

• effect
𝑓𝑖𝑙𝑡𝑟𝑜𝑠 𝑑𝑒 𝑎𝑢𝑑𝑖𝑜 

• stk
𝑓𝑎ç𝑎 𝑢𝑚 𝑠𝑡𝑖𝑐𝑘𝑒𝑟

• crop
𝑓𝑎𝑐𝑎 𝑢𝑚 𝑠𝑡𝑖𝑐𝑘𝑒𝑟 𝑐𝑜𝑚 𝑧𝑜𝑜𝑚

🤖 Darling bot
feito com ❤️
`;
