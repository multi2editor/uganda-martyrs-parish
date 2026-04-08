importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: AIzaSyC9RLVgVSsO337rTcgsozc-NcB0z3VJmpg,
  authDomain: uganda-martyrs-parish.firebaseapp.com,
  projectId: uganda-martyrs-parish,
  messagingSenderId: 1028182330524,
  appId: "1:1028182330524:web:71ba918fb1f615eea03159", 
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification
  self.registration.showNotification(title, {
    body,
    icon: '/logo.webp',
    badge: '/logo.webp'
  })
})