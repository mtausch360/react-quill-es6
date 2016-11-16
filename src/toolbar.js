import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'
import { defaultColors, defaultItems } from './utils'


class QuillToolbar extends Component {
  static propTypes = {
    id:        PropTypes.string,
    className: PropTypes.string,
    items:     PropTypes.array
  }

  static defaultProps = {
    items: defaultItems,
    className: ''
  }

 static displayName = 'Quill Toolbar'


  getClassName = () => {
    return `quill-toolbar ${this.props.className}`
  }

  renderGroup = (item,key) => {
    return (
      <span
        key={ item.label || key }
        className={ 'ql-formats' }
      >
        { item.items.map(this.renderItem) }
      </span>
    )
  }

  renderChoiceItem = (item, key) => {
    return (
      <option
        key={ item.label || item.value || key }
        value={ item.value }
      >
        { item.label }
      </option>
    )
  }

  renderChoices = (item, key) => {
    const attrs = {
      key: item.label || key,
      title: item.label,
      className: `ql-${item.type}`
    }

    const choiceItems = item.items.map((item, key) => {
      if (item.selected) {
        attrs.defaultValue = item.value;
      }
      return this.renderChoiceItem(item, key);
    })

    return <select {...attrs} >{ choiceItems }</select>
  }

  renderButton = (item, key) => {
    const { label, value, type, children } = item
    return (
      <button
        type='button'
        key={ label || value || key }
        value={ value }
        className={ `ql-${type}` }
        title={ label }
      >
       { children }
      </button>
    )
  }

  renderAction = (item, key) => {
    const { label, value, type, children } = item
    return (
      <span
        key={ label || value || key }
        className={ `ql-${type}`}
        title={ title }
      >
        { children }
      </span>
    )
  }

  renderItem = (item, key) => {
    switch (item.type) {
      case 'group':
        return this.renderGroup(item, key)
      case 'font':
      case 'header':
      case 'align':
      case 'size':
      case 'color':
      case 'background':
        return this.renderChoices(item, key)
      case 'bold':
      case 'italic':
      case 'underline':
      case 'strike':
      case 'link':
      case 'list':
      case 'bullet':
      case 'ordered':
      case 'indent':
      case 'image':
      case 'video':
        return this.renderButton(item, key)
      default:
        return this.renderAction(item, key)
    }
  }

  render = () => {
    const { style, items } = this.props
    const children = items.map(this.renderItem)
    const __html = children.map(ReactDOMServer.renderToStaticMarkup).join('')
    return (
      <div
        className={ this.getClassName() }
        style={ style }
        dangerouslySetInnerHTML={ { __html } }
      ></div>
    )
  }
}

export default QuillToolbar
