const createElement = (type, props, ...args) => {
  const children = [].concat(...args)
  props = { ...props, children }
  return { type, props }
}

export default createElement
