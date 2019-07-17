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

  toggleStarred = e => {
    const num = e.target.id;
    console.log(num)
    this.setState(prevState => ({
        messages: prevState.messages.map(message => {
          return {
            ...message,
            starred: message.id == num ? !message.starred : message.starred
          }
        })
    }))
  };

  toggleSelected = e => {
    const num = e.target.id;
    console.log(num)
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

  render (){
    return(
      <div>
        <div className='container'>
          <ToolBar messages={this.state.messages} toggleAllSelect={this.toggleAllSelect} allSelected={this.state.allSelected}/>
          <MessageList messages={this.state.messages} toggleStarred={this.toggleStarred} toggleSelected={this.toggleSelected} />
        </div>

      </div>

  )
  }
}

export default App;
