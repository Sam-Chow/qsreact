import instantiateComponent from './instantiateComponent'

const reconcile = (element, dom, instance) => {
  let nextInstance
  if (!instance) {
    nextInstance = instantiateComponent(element)
    dom.appendChild(nextInstance.mount())
  } else {
    nextInstance = instance
    nextInstance.update(element)
  }

  return nextInstance
}

let rootInstance = null
const render = (element, containerDOM) => {
  rootInstance = reconcile(element, containerDOM, rootInstance)
}


export default render
