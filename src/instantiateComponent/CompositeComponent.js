import instantiateComponent from './instantiateComponent'

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

export default CompositeComponent
