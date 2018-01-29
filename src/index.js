const createElement = (type, props, ...args) => {
  const children = [].concat(...args)
  props = { ...props, children }
  return { type, props }
}

const instantiateComponent = element => {
  if (!element) {
    return null
  } else if (typeof element === 'string') {
    return new TextComponent(element)
  } else if (typeof element !== 'object') {
    throw new Error('wrong element type')
  } else if (typeof element.type === 'string') {
    return new DOMComponent(element)
  } else if (typeof element.type === 'function') {
    return new CompositeComponent(element)
  }
}

class TextComponent {
  constructor(element) {
    this.currentElement = element
    this.node = null
    // won't have any child
  }

  getHostNode() {
    return this.node
  }

  update(nextElement) {
    this.currentElement = nextElement
    const oldNode = this.node
    const parentNode = oldNode.parentNode
    this.node = this.mount()
    parentNode.replaceChild(this.node, oldNode)
  }

  mount() {
    const node = document.createTextNode(this.currentElement)
    this.node = node
    return node
  }
}

class DOMComponent {
  constructor(element) {
    this.currentElement = element
    this.node = null
    this.childComponentInstances = null // for get childNodes
  }

  getHostNode() {
    return this.node
  }

  calcDomProperties(nextProps) {
    const isEvent = prop => prop.startsWith('on')
    const isAttribute = prop => !isEvent(prop) && prop != 'children'

    const prevProps = this.currentElement ? this.currentElement.props : {}

    Object.keys(nextProps)
      .filter(isAttribute)
      .forEach(prop => {
        if (typeof this.node[prop] === 'object') {
          this.node[prop] = Object.assign(this.node[prop], nextProp[prop])
        } else {
          this.node[prop] = nextProps[prop]
        }
      })

    Object.keys(nextProps)
      .filter(isEvent)
      .forEach(prop => {
        const eventType = prop.toLowerCase().slice(2)
        this.node.removeEventListener(eventType, this.node[prop])
        this.node.addEventListener(eventType, nextProps[prop])
      })
  }

  constructChildNodes(nextChildElements) {
    const prevChildElements = this.currentElement
      ? this.currentElement.props.children
      : []

    const prevChildComponentInstances = this.childComponentInstances || []
    const nextChildComponentInstances = []

    const nextLen = nextChildElements.length
    const prevLen = prevChildComponentInstances.length
    const diffLen = nextLen - prevLen
    const commonLen = diffLen >= 0 ? prevLen : nextLen

    let i = 0
    while (i < commonLen) {
      let nextChildElement = nextChildElements[i]
      let prevChildElement = prevChildElements[i]

      if (nextChildElement.type === prevChildElement.type) {
        prevChildComponentInstances[i].update(nextChildElement)
        nextChildComponentInstances.push(prevChildComponentInstances[i])
      } else {
        let nextChildComponentInstance = instantiateComponent(nextChildElement)
        // replace old node with new node
        this.node.replaceChild(
          prevChildComponentInstances[i].getHostNode(),
          nextChildComponentInstance.mount()
        )
        nextChildComponentInstances.push(nextChildComponentInstance)
      }

      i++
    }

    if (diffLen > 0) {
      while (i < nextLen) {
        let nextChildElement = nextChildElements[i]
        let nextChildComponentInstance = instantiateComponent(nextChildElement)
        nextChildComponentInstances.push(nextChildComponentInstance)
        this.node.appendChild(nextChildComponentInstance.mount())
        i++
      }
    }

    if (diffLen < 0) {
      while (i < prevLen) {
        this.node.removeChild(prevChildComponentInstances[i].getHostNode())
        i++
      }
    }

    this.childComponentInstances = nextChildComponentInstances
  }

  update(nextElement) {
    this.calcDomProperties(nextElement.props)
    this.constructChildNodes(nextElement.props.children)
    this.currentElement = nextElement
    return this.node
  }

  mount() {
    const { type, props } = this.currentElement
    const node = document.createElement(type)
    this.node = node
    this.calcDomProperties(props)
    this.constructChildNodes(props.children)
    return node
  }
}

class CompositeComponent {
  constructor(element) {
    this.currentElement = element
    this.childComponentInstance = null
    this.publicInstance = null
  }

  getPublicInstance() {
    return this.publicInstance
  }

  getHostNode() {
    return this.childComponentInstance.getHostNode() // util get a text component node or dom component node
  }

  createPublicInstance() {
    const { type, props } = this.currentElement
    if (!(type.prototype && type.prototype.isReactComponent)) {
      return null
    }
    const publicInstance = new type(props)
    publicInstance.props = props
    publicInstance._internalInstance = this
    this.publicInstance = publicInstance
  }

  createChildComponentInstance() {
    const { type, props } = this.currentElement
    if (type.prototype && type.prototype.isReactComponent) {
      this.publicInstance.componentWillMount()
      this.childComponentInstance = instantiateComponent(
        this.publicInstance.render()
      )
      this.publicInstance.componentDidMount()
    } else {
      this.childComponentInstance = instantiateComponent(type(props))
    }
  }

  updateChildComponentInstances({ props: nextProps }) {
    const { type, props } = this.currentElement
    if (type.prototype && type.prototype.isReactComponent) {
      this.publicInstance.componentWillUpdate(nextProps)
      this.publicInstance.props = nextProps
      this.childComponentInstance.update(this.publicInstance.render())
      this.publicInstance.componentDidUpdate(props)
    } else {
      this.childComponentInstance.update(type(nextProps))
    }
  }

  update(nextElement) {
    if (this.currentElement.type === nextElement.type) {
      this.updateChildComponentInstances(nextElement)
      this.currentElement = nextElement
    } else {
      this.currentElement = nextElement
      const oldNode = this.getHostNode()
      const parentNode = oldNode.parentNode
      this.node = this.mount()
      parentNode.replaceChild(this.node, oldNode)
    }

    return this.node
  }

  mount() {
    this.createPublicInstance()
    this.createChildComponentInstance()

    const node = this.childComponentInstance.mount()
    return node
  }
}

class Component {
  isReactComponent = true
  setState(partialState) {
    const state = { ...(this.state || {}), ...partialState }
    this._internalInstance.update()
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}

  render() {
    throw new Error('Component must have a render method!')
  }
}

Component.prototype.isReactComponent = true

let rootInstance = null
const render = (element, containerDOM) => {
  rootInstance = reconcile(element, containerDOM, rootInstance)
}

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

export default { render, createElement, Component }
export { Component }
