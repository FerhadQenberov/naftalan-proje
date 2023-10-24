// data picker section

$(function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'center',
    locale: { format: 'DD.MM.YYYY' },
    minDate: new Date(),
  })
})

const filter = document.querySelector('.ebcf_modal')
function filterOpen() {
  filter.classList.toggle('hidden')
}

// Increment

function increment(type) {
  event.preventDefault()
  let inputId = type + '-count'
  let input = document.getElementById(inputId)
  let currentValue = parseInt(input.value)
  if (!isNaN(currentValue)) {
    input.value = currentValue + 1
  }
}
// Decrement count

function decrement(type) {
  event.preventDefault()
  let inputId = type + '-count'
  let input = document.getElementById(inputId)
  let currentValue = parseInt(input.value)
  if (!isNaN(currentValue)) {
    if ((type === 'adults' || type === 'room') && currentValue > 1) {
      input.value = currentValue - 1
    } else if (type === 'children' && currentValue > 0) {
      input.value = currentValue - 1
    }
  }
}

// Sanatoriya sele=-cted

const adultsInput = document.getElementById('adults-count')
const childrenInput = document.getElementById('children-count')
const roomInput = document.getElementById('room-count')
const modalSubmitButton = document.getElementById('modalSubmitBtn')
const personAll = document.getElementById('sanatoria-personAll')

function modalSave() {
  let adultsValue = adultsInput.value
  let childrenValue = childrenInput.value
  let roomValue = roomInput.value
  personAll.value = `${adultsValue}-boyuk-${childrenValue}-usaq-${roomValue}otaq`

  adultsInput.value = 1
  childrenInput.value = 0
  roomInput.value = 0
  filter.classList.add('hidden')
}

const submitFunc = async (event) => {
  event.preventDefault()

  const sanatoriaPlace = document.getElementById('sanatoriaPlace')?.value
  const sanatoriaDate = document.getElementById('sanatoria-date')?.value

  const adultsValue = adultsInput.value
  const childrenValue = childrenInput.value
  const roomValue = roomInput.value
  const personAllValue = `${adultsValue}-boyuk-${childrenValue}-usaq-${roomValue}otaq`

  const data = {
    sanatoriaPlace,
    sanatoriaDate,
    personAllValue,
  }

  try {
    const res = await fetch('http://localhost:5000/data', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Server error')
    }

    const responseBody = await res.json()

    console.log('Data posted successfully:', responseBody)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

const filterSubmitBtn = document.getElementById('filterSubmitBtn')
filterSubmitBtn.addEventListener('click', submitFunc)
