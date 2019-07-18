import React from 'react';
import './App.css';
import ToolBar from './components/toolbar'
import MessageList from './components/messageList'

class App extends React.Component {
  state = {
    messages: [],
    allSelected:false,
  };
  componentDidMount = async () => {
    const res = await fetch('http://localhost:8082/api/messages');
    const json = await res.json();
    this.setState({
      messages: json.map((message) => {
        let checked = false
        return {
          ...message,
          checked
        }
      })
    })
    console.log(this.state)
  };

  // toggleStarred = e => {
  //   const num = e.target.id;
  //   console.log(num)
  //   this.setState(prevState => ({
  //       messages: prevState.messages.map(message => {
  //         return {
  //           ...message,
  //           starred: message.id == num ? !message.starred : message.starred
  //         }
  //       })
  //   }))
  // };


  toggleStarred = async (e) => {
    const num = e.target.id;
    const message = this.state.messages.find(message => message.id == num);
    console.log(message)
    const url = 'http://localhost:8082/api/messages';
    const res = await fetch(url,{
      method:"PATCH",
      body: JSON.stringify({...message, messageIds: [num], command:"star"}),
      headers: {
        'Content-Type': 'application/json'}
      })
    if(res.ok) {
      console.log(res)
      this.setState(prevState => ({
        messages: prevState.messages.map(message => {
          return {
            ...message,
            starred: message.id == num ? !message.starred : message.starred
          }
        })
      }))
    }
  };

  changeToRead = async () => {
    const url = 'http://localhost:8082/api/messages';
    const messages = this.state.messages.filter(message => message.checked === true)
    const messageIds = this.state.messages.filter( x => x.checked === true).map(x => x.id)
    console.log(messageIds)
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({...messages, messageIds: messageIds, command: "read", read:true}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      this.setState(prevState => ({
        ...prevState,
        allSelected: false,
        messages: prevState.messages.map(message => {
          if (message.checked === true) {
            return {
              ...message,
              read: true,
              checked: false
            }
          }
          return {
            ...message
          }
        })
      }))
    }
  };

  changeToUnread = async () => {
    const url = 'http://localhost:8082/api/messages';
    const messages = this.state.messages.filter(message => message.checked === true)
    const messageIds = this.state.messages.filter( x => x.checked === true).map(x => x.id)
    console.log(messageIds)
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({...messages, messageIds: messageIds, command: "read"}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      this.setState(prevState => ({
        ...prevState,
        allSelected: false,
        messages: prevState.messages.map(message => {
          if (message.checked === true) {
            return {
              ...message,
              read: false,
              checked: false
            }
          }
          return {
            ...message
          }
        })
      }))
    }
  };

  toggleSelected = e => {
    const num = e.target.id;
    this.setState(prevState => ({
      messages: prevState.messages.map(message => {
        return {
          ...message,
          checked: message.id == num ? !message.checked : message.checked
        }
      })
    }))
  };

  toggleAllSelect = () => {
    this.setState(prevState => ({
      ...prevState,
      allSelected: !this.state.allSelected,
      messages: prevState.messages.map(message => {
        return {
          ...message,
          checked: !this.state.allSelected
        }
      })
    }))
  };



  deleteMessages = () => {
    this.setState(prevState => ({
      ...prevState,
      allSelected:false,
      messages: prevState.messages.filter(message => message.checked === false)
    }))
  };

  addLabel = (e) => {
    const newLabel = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.map(message => {
        if (message.checked === true){
          if (message.labels.includes(newLabel) === false){
            return{
              ...message,
              labels: [...message.labels, newLabel],
              checked:false
            }
          }
        }return{
          ...message,
          checked:false
        }
      })
    }))
  }

  removeLabel = (e) => {
    const newLabel = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.map(message => {
        if (message.checked === true){
          if (message.labels.includes(newLabel) === true){
            return{
              ...message,
              labels: message.labels.filter(label => label !== newLabel),
              checked:false
            }
          }
        }return{
          ...message,
          checked:false
        }
      })
    }))
  }


  render (){
    return(
      <div>
        <div className='container'>
          <ToolBar messages={this.state.messages} toggleAllSelect={this.toggleAllSelect} allSelected={this.state.allSelected} removeLabel={this.removeLabel} addLabel={this.addLabel} changeToRead={this.changeToRead} changeToUnread={this.changeToUnread} deleteMessages={this.deleteMessages}/>
          <MessageList messages={this.state.messages} toggleStarred={this.toggleStarred} toggleSelected={this.toggleSelected} />
        </div>

      </div>

  )
  }
}

export default App;
