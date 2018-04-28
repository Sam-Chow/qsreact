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

export default Component
