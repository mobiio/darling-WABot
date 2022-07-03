![banner](https://github.com/mobiio/darling-WABot/blob/main/Custom/media/image/banner.png)

<h1 align="center">
     Darling WABot
</h1>

<p align="center">WhatsApp Bot construído com <a href="https://github.com/adiwajshing/Baileys">Baileys</a></p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=Status&message=EM%20DESENVOLVIMENTO&color=orange)

---

Esse bot é um projeto <b>Open Source</b>, então considere apoiá-lo e se torne um [colaborador](#colaborador)! Qualquer ajuda é sempre bem vinda.<br><br>
Esse bot foi construído com Baileys 4.2.0, e pode suportar tanto conexões Legacy quanto MD. Ele conta com uma variedade de funções, e você pode utilizá-las da forma que desejar.

---
Conteúdos
=================
* [Features](#features)
* [Instalação](#instalacao)
  * [pré requisitos](#prerequisitos)
  * [termux](#termux)
* [Como usar](#comousar)
  * [envio de mensagens](#evmsg)
  * [gerenciamento de grupo](#evgroup)
* [Contribuidores](#contribuidores)
* [Fale comigo](#falecomigo)
---

<h1 id="features">Features</h1>

os itens não selecionados estão em `desenvolvimento`

### envio de mensagens
- [x] mensagens de texto
- [x] sticker
- [x] imagem
- [x] video
- [x] audio
- [x] botões
- [x] lista
- [x] template
- [x] contatos
- [x] localização
- [x] reações
- [ ] arquivos pdf/zip
- [ ] catálogos

### gerenciamento da conta
- [ ] Alterar foto de perfil
- [ ] Alterar recado
- [ ] Excluir próprias mensagens
- [ ] Fixar chat
- [ ] Arquivar/Desarquivar chat
- [ ] Silenciar chat
- [ ] Limpar chat

### gerenciamento de grupo
- [x] alterar foto do grupo
- [x] alterar nome do grupo
- [x] alterar descrição do grupo
- [x] enviar link de convite
- [x] revogar link de convite
- [x] bloquear configurações (apenas adms podem alterar dados do grupo)
- [x] desbloquear configurações (todos podem alterar dados do grupo)
- [x] fechar grupo
- [x] abrir grupo
- [x] criar novo grupo
- [x] despromover adm
- [x] promover adm
- [x] banir
- [x] adicionar
- [x] sair do grupo
- [x] entrar pelo código de convite
- [x] pegar informações de outros grupos pelo código
- [x] marcar todos

### proteção
ative isso conforme suas necessidades. 
- [x] anti link
- [x] anti números estrangeiros (Não me interprete mau, algumas pessoas usam números falsos para entrar em grupos)
- [x] anti outros bots (boões, listas, templates)
- [x] anti mensagens de texto longas (+3500 caracteres)
- [x] anti marcação (remove se alguém marcar muitas pessoas na mesma mensagem)

### comandos adicionais
O foco desse bot é ser uma "base", então considere isso mais como um extra:
- [x] download música/vídeo do youtube
- [x] criar sticker (com e sem zoom)
- [x] filtros de áudio
---

<h1 id="instalacao">Instalação</h1>

<h2 id="prerequisitos">pré requisitos</h2>

* <a href="https://m.apkpure.com/br/termux/com.termux">Termux</a> atualizado
* ter dois celulares à disposição (ou um pc)
* dois whatsapps (duas contas)

<h2 id="termux">termux</h2>

Após baixar o termux abra-o e digite, respectivamente:
* termux-setup-storage
* ls
* cd /sdcard
* pkg upgrade && pkg update
  * se por acaso a instalação pausar, apenas dê enter para continuar
* pkg install nodejs
* pkg install nodejs-Its
* pkg install git
* pkg install yarn
* git clone: https://github.com/mobiio/darling-WABot

O bot será baixado no seu armazenamento interno.
Digite `cd /sdcard/darling-WABot` e `npm start` para iniciar.

Um QR Code será gerado no terminal.
Você deverá abrir o whatsapp do bot, clicar em `...` > `aparelhos conectados` > `conectar dispostivo`.
Use um segundo celular para tirar a foto do QR, e então escaneá-lo (Ou tire um print e escaneie pelo PC).
Quando conectado, um ícone do Chrome com a legenda "Baileys" aparecerá em `aparelhos conectados`. Use `#menu` para dar uma olhada nos comandos.

---

<h1 id="comousar">Como usar</h1>

Ao enviar uma mensagem, o objeto `msgdata` é exibido no console. Ele contém a seguinte estrutura:

```javascript
const msgdata = {
messageType: "conversation", // tipo da mensagem
gid: "xxx@g.us", // id do grupo
sid: "xxx@whatsapp.net", // id da pessoa
pushname: "gabriel", //nome da pessoa
userPicture: "https://pps.whatsapp.net/xxx", // foto de perfil da pessoa
userBio: "hi i am using whatsapp", // recado/bio da pessoa
id: "55xxx55", // id da mensagem
time: ["mon", "27/Jun/2022", "12:13:36"], // hora de envio
text: "hello", // conteúdo da mensagem
quoted: false, // responde alguém
mentioned: false // marcou alguém
}

console.log("Seu nome é " + msgdata.pushname)
// => "Seu nome é gabriel"
```
Também temos o `groupdata` object, que retorna os dados do grupo:
```javascript
const groupdata = {
  gid: 'xxx@g.us', // id do grupo
  name: 'My friend's group!', // nome do grupo
  desc: 'My group's desc!', // descrição do grupo
  picture: 'https://pps.whatsapp.net/xxx', // foto do grupo
  creation: [ 'Sun', '15/May/2022', '14:22:19' ], // data de criação
  config: { restrict: true, announce: false, ephereralDuration: undefined }, // configurações
  owner: [ 'xxx@s.whatsapp.net' ], // criador do grupo
  admins: ["xxx@s.whatsapp.net"], // admins do grupo
  members: [ // membros do grupo
    "xxz@s.whatsapp.net",
    "xxy@s.whatsapp.net",
  ]
}

console.log("O seu grupo foi criado " + groupdata.creation[0] + ", " + groupdata.creation[1] + " às " + groupdata.creation[2])
// => "O seu grupo foi criado Sun, 15/May/2022 às 14:22:19"
```
Use o `msgdata` e o `groupdata` para coletar os dados com facilidade.

Para enviar uma mensagem de texto, você pode fazer como no exemplo abaixo:
```javascript
const { sendMessage, sendImage, sendSticker, /*... importe o resto*/ } = require ("...diretório/Baileys/lib/sendMessage");

const options = { sock, mek, groupdata, msgdata, gid, sid }

const messageConfig = {
text: "Hello World",
quoted: mek // responder à mensagem
}
sendMessage(options, messageConfig)
```
o `messageConfig` pode conter os seguintes parâmetros:
```javascript
const messageConfig = {
text: "Hello Nodejs!", // para mensagens de texto
caption: "Hello World", // para mensagens de mídia
url: "https://someimage.jpeg", // envie uma imagem pela URL
path: __dirname + "/diretório/image.jpeg", // envie uma imagem armazenada no dispositivo
isForward: true, // mensagem com tag encaminhada
forwardScore: 999, // quantidade de encaminhamentos
mentioned: ["xxx@s.whatsapp.net"], // mencione alguém
ptt: true, // envia áudios como notas de voz
likeHuman: true // "digitando" e "gravando áudio..." antes de enviar mensagens
}
// messageConfig pode conter outros parâmetros, dependendo do tipo de mensagem (como contatos e localização, por exemplo)

exampleMessage(options, messageConfig)
// ou
exampleMessage(options, {
text: "Hi"
// adicione mais parâmetros
});
```
<h2 id="evmsg">envio de mensagens</h2>
Veja como é fácil enviar mensagens com Darling Bot!

```javascript
// text message
sendMessage(options, {
text: `Olá ${msgdata.pushname}`,
likeHuman: true,
quoted: mek
});

// sticker message
sendSticker(options, {
path: __dirname + "/example.webp",
quoted: mek,
});

// image message 
sendImage(options, {
url: "https://someimage.jpeg",
quoted: mek,
caption: "Isso é uma imagem da web",
mentioned: [sid]
});

// video message
sendVideo(options, {
path: __dirname + "/example.mp4",
quoted: mek,
caption: "Vídeo armazenado no dispositivo"
});

// gif message
sendGif(options, {
path: __dirname + "/example.mp4", // você precisa enviar um .mp4 (O whatsapp vai convertê-lo em Gif)
quoted: mek,
caption: "Vídeo armazenado no dispositivo"
})

// audio message
sendAudio(options, {
path: __dirname + "/example.mp3",
quoted: mek,
likeHuman: true,
ptt: true
});

// buttons message
let buttonOptions = [
{ buttonId: "*Id", buttonText: "botão 1" },
{ buttonId: "*id2", buttonText: "botão 2" }
];

sendButton(options, {
text: "Uma mensagem de botões",
footer: "Legenda", // é o texto opaco/legenda do botão
quoted: mek,
buttonOptions
});

sendButton(options, {
path: __dirname + "/example.jpg",
caption: "Uma mensagem de botões com foto",
footer: "Legenda",
quoted: mek,
buttonOptions
});

// list message
let itens = [
{ title: "Opção 1", rowId: "*id1", description: "descrição do item 1" },
{ title: "Opção 2", rowId: "*id2", description: "descrição do item 2" }
];

sendList(options, {
title: "Título",
text: "Texto",
footer: "Legenda",
buttonText: "Botão",
itens,
quoted: mek
});

// template message
let template = [
{ urlButton: { displayText: "Visite meu github!", url: "https://github.com/mobiio" } },
{ callButton: { displayText: "Me ligue!", phoneNumber: "+55(99)7777-7777" } },
{ quickReplyButton: { displayText: "Um botão", id: "*id desse botão" } },
];

sendTemplate(options, {
text: "Template",
footer: "Legenda",
template
});

sendTemplate(options, {
path: __dirname + "/example.jpg",
caption: "Template com imagem",
footer: "Legenda",
template
});

// contact message
sendContact(options, {
contact: {
name: "meu contato",
fone: "5588777777",
org: "Bot Inc™"
},
quoted: mek
});
		
// location message
sendLocation(options, {
latitude: 40.689248,
longitude: -74.044515,
quoted: mek
});

// react
sendReact(options, {
emoji: "👍"
});

```

<h2 id="evgroup">gerenciamento de grupo</h2>

```javascript
// alterar nome do grupo
await groupUpdateName(options, { text: "Novo nome do grupo" });

// alterar descrição
await groupUpdateDescription(options, { text: "Nova descrição do grupo" });

// código de convite do grupo
let groupCode = await getGroupCode(options, {});
reply(groupCode); // const reply = (text) => { sendMessage(options, {text, quoted: mek}) }

// revogar código de convite do grupo
let revokeCode = await revokeGroupInviteCode(options, {});
reply("Link do Grupo redefinido.\n\nNovo Link: " + revokeCode);

// mudar as configurações do grupo para que apenas admins possam alterar dados do grupo
await groupSettingChange(options, { action: "lock" }) //lock, unlock

// fechar o grupo para apenas admins enviarem mensagens
await groupSettingChange(options, { action: "close" }); //close, open

// alterar imagem do grupo
await updateGroupPicture(options, { path: __dirname + "example.jpeg" });

// criar um novo grupo e adicionar membros
await groupCreate(options, { name: "Meu novo grupo", participants: [sid] });

// promover a admin
await groupPromote(options, { participants: [sid] });

// remover cargo admin
await groupDemote(options, { participants: [sid] });

// remover alguém do grupo
await groupRemove(options, { participants: [sid] });

// adicionar alguém ao grupo
await groupAdd(options, { participants: [sid] });

// sair do grupo
groupLeave(options, {});

// entrar em grupo pelo link
acceptInviteCode(options, "https://chat.whatsapp.com/xxx");

// entrar em um grupo pela mensagem de convite
acceptInviteMessage(options, { from: sid, code: "https://chat.whatsapp/xxx" }) 

// ler dados de um grupo pelo link de convite
let infoFromCode = await inviteCodeInfo(options, "https://chat.whatsapp/xxx");
console.log(infoFromCode)

```

Darling WABot é um projeto grátis e sem fins lucrativos.
O desenvolvedor desse projeto não se responsabiliza por qualquer mau uso ou garantias desse projeto (vide LICENCE)

---

<h2 id="contribuidores">☕ Contribuidores</h2>

[<img src="https://avatars.githubusercontent.com/u/108313655?s=400&u=e12c48b21ba07d8bf38353da768448994b1f00d7&v=4" width=115><br><sub>mobiio</sub>](https://github.com/mobiio) 

---

## <h2 id="falecomigo">Fale comigo</h2>

<!-- <a href="mailto:example@gmail.com?"><img src="https://img.shields.io/badge/gmail-%23DD0031.svg?&style=for-the-badge&logo=gmail&logoColor=white"/>  -->
<!-- <a href="https://youtube.com/channel/UCGGHT-j0Xr96O15yDcBQa7g"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"/></a> -->
</a> <a href="https://chat.whatsapp.com/GZ8Mt5AAzhkBZbqNiqfDGJ"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>
---
