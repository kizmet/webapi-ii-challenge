import React, { createContext } from 'react'
import { push } from 'connected-react-router'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Badge, Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import { fetchAsync, updateAsyncId,addAsync,deleteAsync } from '../../modules/posts'
import {fetchAsyncComments} from '../../modules/comments'
import { bindActionCreators } from 'redux'




const EditableContext = createContext()

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    )
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], editingKey: '', post: [], count : 10 }
    this.columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: '10%',
        editable: false,
        render: (text, record ) => {
          const id = ''
          return (
            <a
            onClick={() => this.props.history.push(`/${record.id}`)} 
              >{record.id}</a>
            )
        }
      },
      {
        title: 'title',
        dataIndex: 'title',
        width: '45%',
        editable: true
      },
      {
        title: 'contents',
        dataIndex: 'contents',
        width: '25%',
        editable: true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state
          const editable = this.isEditing(record)
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record)}
                    style={{ marginRight: 8 }}>
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.id)}
                >
                <a style={{ marginRight: 8 }}>Cancel</a>
              </Popconfirm>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.delete(record.id)}>
                <a>Delete</a>
              </Popconfirm>              
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record)}>
              Edit
            </a>
          )
        }
      }
    ]
  }

  componentDidMount() {
    const { fetchAsync } = this.props
    this.fetchData(fetchAsync)
  }

  fetchData = async fetchAsync => {
    try {
      await fetchAsync()
      await this.setState({ data: this.props.posts, editingKey: '' })
    } catch (err) {
      console.log('error occured', err)
    }
  }
  isEditing = record => record.id === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  save(form, record) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      //const index = newData.findIndex(item => record.id === item.id)
      const index = this.props.posts.findIndex(item => record.id === item.id)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        const change = {
          ...item,
          ...row
        }
        this.setState({ data: newData, editingKey: '' })
        this.props.updateAsyncId({
          ...item,
          ...row
        })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingKey: '' })
        this.props.addAsync(row);
      }
    })
  }

  edit(record) {
    this.setState({ ...this.state, post: record, editingKey: record.id })
  }

  delete(record) {
    const newData = this.state.data.filter(item => item.id !== record)
    this.setState({ ...this.state, data: newData })
    this.props.deleteAsync(record);
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      id: count ,
      title: 'title',
      contents: 'contents'
    }
    this.setState({
      data: [...this.state.data, newData],
      count: count + 1,
      editingKey: count
    })
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    }

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'id' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })

    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}>
          Add a row
        </Button>

        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            bordered
            rowKey={record => record.id}
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel
            }}
          />
        </EditableContext.Provider>
      </div>
    )
  }
}

const Home = Form.create()(EditableTable)

const mapStateToProps = ({ posts, comments }) => ({
  posts: posts.posts,
  isFetching: posts.isFetching,
  comments: comments.comments,
  isCommentFetching: comments.isCommentFetching

})


export default connect(
  mapStateToProps,
  { fetchAsync, updateAsyncId, addAsync,deleteAsync,fetchAsyncComments }
)(Home)
