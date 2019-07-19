import React from 'react';
import './App.css';
import ToolBar from './components/toolbar'
import MessageList from './components/messageList'

class App extends React.Component {
  state = {
    messages: [],
    allSelected:false,
    composeMessage:false,
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

  toggleMessage = () => {
    this.setState(prevState => ({
      ...prevState,
      composeMessage: !prevState.composeMessage
      }))
  };



  deleteMessages = async() => {
    const url = 'http://localhost:8082/api/messages';
    const messages = this.state.messages.filter(message => message.checked === true)
    const messageIds = this.state.messages.filter( x => x.checked === true).map(x => x.id)
    console.log(messageIds)
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({...messages, messageIds: messageIds, command: "delete"}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res.ok){
      this.setState(prevState => ({
        ...prevState,
        allSelected:false,
        messages: prevState.messages.filter(message => message.checked === false)
      }))
    }

  };

  addLabel = async (e) => {
    const url = 'http://localhost:8082/api/messages';
    const messages = this.state.messages.filter(message => message.checked === true)
    const messageIds = this.state.messages.filter( x => x.checked === true).map(x => x.id)
    const newLabel = e.target.value;
    console.log(messageIds)
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({...messages, messageIds: messageIds, command: "addLabel", label: newLabel}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(res.ok) {
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.map(message => {
          if (message.checked === true) {
            if (message.labels.includes(newLabel) === false) {
              return {
                ...message,
                labels: [...message.labels, newLabel],
                checked: false
              }
            }
          }
          return {
            ...message,
            checked: false
          }
        })
      }))
    }
  }

  removeLabel = async (e) => {
    const url = 'http://localhost:8082/api/messages';
    const messages = this.state.messages.filter(message => message.checked === true)
    const messageIds = this.state.messages.filter( x => x.checked === true).map(x => x.id)
    const newLabel = e.target.value;
    console.log(messageIds)
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({...messages, messageIds: messageIds, command: "removeLabel", label: newLabel}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok){
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
  };

  sendMessage = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8082/api/messages';
    const subject = e.target.subject.value;
    const body = e.target.body.value;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({subject:subject, body:body}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok){
      const newMessage = await res.json()
      this.setState(prevState => {
        return {
          ...prevState,
          composeMessage:false,
          messages: [...prevState.messages, newMessage]
        }
      })
    }
  }


  render (){
    return(
      <div>
        <div className='container'>
          <ToolBar messages={this.state.messages} sendMessage={this.sendMessage} composeMessage={this.state.composeMessage} toggleMessage={this.toggleMessage} toggleAllSelect={this.toggleAllSelect} allSelected={this.state.allSelected} removeLabel={this.removeLabel} addLabel={this.addLabel} changeToRead={this.changeToRead} changeToUnread={this.changeToUnread} deleteMessages={this.deleteMessages}/>
          <MessageList messages={this.state.messages} toggleStarred={this.toggleStarred} toggleSelected={this.toggleSelected}  />
        </div>

      </div>

  )
  }
}

export default App;
