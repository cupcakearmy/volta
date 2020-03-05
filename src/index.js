const {
  ipcRenderer,
  shell,
  remote
} = require('electron')
const darkMode = require('dark-mode')

let rangeSlider
let autoLaunch

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
  document.getElementById('currentBattery').innerText = `${value}`
})
