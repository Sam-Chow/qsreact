import TextComponent from './TextComponent'
import DOMComponent from './DOMComponent'
import CompositeComponent from './CompositeComponent'

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

export default instantiateComponent
