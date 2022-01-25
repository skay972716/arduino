const {Router} = require('express');
const router = Router();
const webpush = require('../webpush');
let pushSubscripton;

//Suscribiendose a las notificaciones
router.post('/subscription', async (req, res) => {
  pushSubscripton = req.body;
  res.status(201).json();
});

router.post('/new-message', async (req, res) => {
  const payload = JSON.stringify({
    title: 'Evento Critico',
    message: 'La temperatura esta muy alta. Revisar los componentes',
  });
  res.status(200).json();
  try {
    await webpush.sendNotification(pushSubscripton, payload);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
