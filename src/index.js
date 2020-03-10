const {
  ipcRenderer,
  shell,
  remote
} = require('electron')
const darkMode = require('dark-mode')

let rangeSlider
let autoLaunch
let batteryCondition
let cycle

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('quit').addEventListener('click', () => {
    ipcRenderer.send('quit')
  })
  document.getElementById('close').addEventListener('click', () => {
    remote.getCurrentWindow().hide()
  })

  darkMode.isDark().then((dark) => {
    if (dark) {
      document.querySelector('#app').classList.add('dark')
    } else {
      document.querySelector('#app').classList.add('light')
    }
  })

  document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.info').classList.toggle('active')
  })

  document.getElementById('condition').addEventListener('click', function() {
    let infoContent = document.querySelector('.infoContent')

    document.querySelector('.info').classList.toggle('active')

    switch(batteryCondition) {
      case(1):
        infoContent.innerText = 'The battery is functioning normally.'
        break;
      case(2):
        infoContent.innerText = 'The battery is functioning normally but holds less charge than it did when it was new. You should monitor the health of the battery periodically.'
        break;
      case(3):
        infoContent.innerText = 'The battery is functioning normally but holds significantly less charge than it did when it was new. You can safely continue using your computer, but if its lowered charging capacity is affecting your experience.'
        break;
      case(4):
        infoContent.innerText = 'The battery isn’t functioning normally. You can safely use your Mac only when it\'s connected to an appropriate power adapter.'
    }
  })

  document.getElementById('cycleNumber').addEventListener('click', function() {
    let infoContent = document.querySelector('.infoContent')

    document.querySelector('.info').classList.toggle('active')

    switch(cycle) {
      case(1):
        infoContent.innerText = 'Your battery is healthy and in the first part of it\'s life.'
        break;
      case(2):
        infoContent.innerText = 'Your battery is now in the second part of it\'s life. The maximum limit for all modern Macbooks is 1000 cycles.'
        break;
      case(3):
        infoContent.innerText = 'According to Apple, all Macbook models since 2008/2009 have a cycle limit of 1000. After this limit, your battery is considered consumed.'
    }
  })
})

function iniSlider() {
  rangeSlider = document.getElementById('slider-range')

  noUiSlider.create(rangeSlider, {
    start: [0, 100],
    step: 0.01,
    range: {
      min: [0],
      max: [100]
    },
    connect: true
  })

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    const min = parseInt(values[0])
    const max = parseInt(values[1])
    document.getElementById('min-value').innerHTML = min
    document.getElementById('max-value').innerHTML = max
    ipcRenderer.send('values', {
      max,
      min
    })
  })
}

function iniLaunch() {
  autoLaunch = document.getElementById('launch')
  autoLaunch.addEventListener('change', () => ipcRenderer.send('launch', autoLaunch.checked))
}

ipcRenderer.on('values', (event, values) => {
  if (rangeSlider === undefined) iniSlider()
  rangeSlider.noUiSlider.set([values.min, values.max]);
})

ipcRenderer.on('launch', (event, checked) => {
  if (autoLaunch === undefined) iniLaunch()
  autoLaunch.checked = checked
})

ipcRenderer.on('battery', (event, value) => {
  document.getElementById('currentBattery').innerText = `${value}%`
})

ipcRenderer.on('cycleNumber', (event, value) => {
  let cycleElement = document.getElementById('cycleNumber')
  cycleElement.innerText = `${value}`

  if (parseInt(value) < 500) {
    cycleElement.classList.add('normal')
    cycle = 1
  } else if (value >= 500 && value < 1000) {
    cycleElement.classList.add('warning')
    cycle = 2
  } else if (value >= 1000) {
    cycleElement.classList.add('danger')
    cycle = 3
  }

  // https://support.apple.com/en-us/HT201585 for the last models (afetr 2008-2009) the max limit is 1000 cycles
})

ipcRenderer.on('remaining', (event, value) => {
  if (value == '') {
    value = 'calculating...'
  }
  document.getElementById('remaining').innerText = `${value}`
})

ipcRenderer.on('condition', (event, value) => {
  let conditionElement = document.getElementById('condition')
  let infoElement = document.querySelector('infocondition')
  conditionElement.innerText = `${value}`

  switch(value.trim()) {
    case("Normal"):
      conditionElement.classList.add('normal')
      batteryCondition = 1
      break;
    case("Replace Soon"):
      conditionElement.classList.add('warning')
      batteryCondition = 2
      break;
    case("Replace Now"):
      conditionElement.classList.add('danger')
      batteryCondition = 3
      break;
    case("Service Battery"):
      conditionElement.classList.add('danger')
      batteryCondition = 4
  }
})
