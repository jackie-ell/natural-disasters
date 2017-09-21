const q = (target) => { return document.querySelector(target) }

const getData = (query) => {
  return fetch(query)
    .then(res => res.json())

}

document.addEventListener('DOMContentLoaded', () => {
  const testBtn = q('#api-test-btn')
  const testOutput = q('#api-test-output')

  const defaultQuery = q('#api-test').value

  const setOutput = (query) => {
    getData(query)
      .then(json => JSON.stringify(json,null,2))
      .then(json => testOutput.innerHTML = json)
  }

  setOutput(defaultQuery)

  testBtn.addEventListener('click', event => {
    event.preventDefault()

    let query = q('#api-test').value

    setOutput(query)
  })
})
