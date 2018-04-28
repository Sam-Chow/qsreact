import instantiateComponent from './instantiateComponent'

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

export default DOMComponent
