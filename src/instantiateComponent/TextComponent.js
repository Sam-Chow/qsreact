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

export default TextComponent
