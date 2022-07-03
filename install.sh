echo "Iniciando a configuração do Termux..."
sleep 1
pkg update && pkg upgrade
pkg install nodejs
pkg install nodejs-Its
pkg install git
pkg install yarn
cd /sdcard
git clone: https://github.com/mobiio/darling-WABot
cd /sdcard/darling-WABot
sleep 1
echo "Termux está configurado. Agora basta digitar npm start e escanear o QR Code."
sleep 1
echo "Gostaria de entrar no meu grupo no Whatsapp?"
sleep 1
termux-open-url https://chat.whatsapp.com/GZ8Mt5AAzhkBZbqNiqfDGJ
