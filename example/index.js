import React, { Component } from 'qsreact'

let membersArray = [
  't1ger',
  'ljc',
  'pengchengfei',
  'xuluxi',
  'caiyuhao',
  'lichenxi',
  'gaocheng',
  'wangliangjing',
]

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

class App extends Component {
  handleDelete = () => {
    membersArray = membersArray.filter(member => member !== 'ljc')
    React.render(
      <App membersArray={membersArray} />,
      document.getElementById('root')
    )
  }

  handleAdd = () => {
    membersArray.push('zhoushen')
    React.render(
      <App membersArray={membersArray} />,
      document.getElementById('root')
    )
  }

  handleUpdate = () => {
    membersArray[0] = 'jianbo'
    React.render(
      <App membersArray={membersArray} />,
      document.getElementById('root')
    )
  }

  render() {
    const { membersArray } = this.props
    const renderElement = (
      <div>
        知识市场前端 ：
        <ul>
          {membersArray.map((member, index) => <li key={index}>{member}</li>)}
        </ul>
        <hr />
        <Button onClick={this.handleAdd}>add member</Button>
        <Button onClick={this.handleDelete}>delete member</Button>
        <Button onClick={this.handleUpdate}>Update</Button>
      </div>
    )

    return renderElement
  }
}

React.render(
  <App membersArray={membersArray} />,
  document.getElementById('root')
)
