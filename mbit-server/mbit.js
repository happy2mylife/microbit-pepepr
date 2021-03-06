// WebSocketコネクションを確立
let socket = new WebSocket('ws://192.168.0.106:8080');

socket.addEventListener('error', () => {
  console.log('サーバーへの接続に失敗しました');
});

socket.addEventListener('open', () => {
  console.log('サーバーに接続しました');
});

socket.addEventListener('message', (e) => {
  console.log(`サーバーよりメッセージを受信しました: ${e.data}`);
});


// 接続するBluetoothデバイス
let targetDevice = null;

// micro:bit ボタンサービス
const BUTTON_SERVICE = 'e95d9882-251d-470a-a062-fa1922dfa9a8';

// micro:bit ボタンAキャラクタリスティック
const BUTTON_A_DATA = 'e95dda90-251d-470a-a062-fa1922dfa9a8';

// micro:bit ボタンBキャラクタリスティック
const BUTTON_B_DATA = 'e95dda91-251d-470a-a062-fa1922dfa9a8';


function onClickStartButton() {
  if (!navigator.bluetooth) {
    alert('Web Bluetooth is not supported.');
    return;
  }

  requestDevice();
}

function onClickStopButton() {
  if (!navigator.bluetooth) {
    alert('Web Bluetooth is not supported.');
    return;
  }

  disconnect();
}

function requestDevice() {
  navigator.bluetooth
    .requestDevice({
      filters: [{ services: [BUTTON_SERVICE] }, { namePrefix: 'BBC micro:bit' }]
    })
    .then(device => {
      targetDevice = device;
      connect(targetDevice);
    })
    .catch(error => {
      alert(error);
      targetDevice = null;
    });
}

function disconnect() {
  if (targetDevice == null) {
    alert('target device is null.');
    return;
  }

  targetDevice.gatt.disconnect();
}

function connect(device) {
  device.gatt
    .connect()
    .then(server => {
      findButtonService(server);
    })
    .catch(error => {
      alert(error);
    });
}

function findButtonService(server) {
  server
    .getPrimaryService(BUTTON_SERVICE)
    .then(service => {
      findButtonACharacteristic(service);
      findButtonBCharacteristic(service);
    })
    .catch(error => {
      alert(error);
    });
}

function findButtonACharacteristic(service) {
  service
    .getCharacteristic(BUTTON_A_DATA)
    .then(characteristic => {
      startButtonANotification(characteristic);
    })
    .catch(error => {
      alert(error);
    });
}

function startButtonANotification(characteristic) {
  characteristic.startNotifications().then(char => {
    characteristic.addEventListener('characteristicvaluechanged', onButtonAChanged);
  });
}

function onButtonAChanged(event) {
  let state = event.target.value.getUint8(0, true);
  notifyPepper(1, state);
}

function findButtonBCharacteristic(service) {
  service
    .getCharacteristic(BUTTON_B_DATA)
    .then(characteristic => {
      startButtonBNotification(characteristic);
    })
    .catch(error => {
      alert(error);
    });
}

function startButtonBNotification(characteristic) {
  characteristic.startNotifications().then(char => {
    characteristic.addEventListener('characteristicvaluechanged', onButtonBChanged);
  });
}

function onButtonBChanged(event) {
  let state = event.target.value.getUint8(0, true);
  notifyPepper(2, state);
}

function notifyPepper(btn, state) {
  var data = { mbit: btn, state: state };
  socket.send(JSON.stringify(data));
}