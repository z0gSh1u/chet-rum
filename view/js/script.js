// const UserListingWorker = new Worker('UserListingWorkder.js')
const MessageListingWorker = new Worker('http://localhost:3000/js/MessageListingWorker.js')

// Block here to get username.
if (!sessionStorage.getItem('chet-rum-username')) {
  let username
  while ((username = prompt('Input your username...')).trim() === '');
  sessionStorage.setItem('chet-rum-username', username)
}

// WebSocket link.
const sio = io('http://localhost:3000')
sio.on('connect', () => {
  sio.emit('newJoin', { username: sessionStorage.getItem('chet-rum-username') })
  document.getElementById('msgSendBtn').onclick = function () {
    let content = document.getElementById('msgInput').value
    if (content.trim() !== '') {
      sio.emit('newMsg', { username: sessionStorage.getItem('chet-rum-username'), content })
    }
  }

  console.log("posted")
  MessageListingWorker.postMessage('sio')

  // sio.on('broadcastMsg', ({username, content}) => {
  //   let newLi = document.createElement('li')
  //   newLi.innerHTML = `[${username}]: ${content}`
  //   document.getElementById('msgList').appendChild(newLi)
  // })
})