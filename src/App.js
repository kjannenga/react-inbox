import React from 'react';
import './App.css';
import ToolBar from './components/toolbar'
import MessageList from './components/messageList'

class App extends React.Component {
  state = {
    messages: [],
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

  render (){
    return(
      <div>
        <div className='container'>
          <ToolBar />
          <MessageList messages={this.state.messages} toggleStarred={this.toggleStarred} toggleSelected={this.toggleSelected} />
        </div>

      </div>

  )
  }
}

export default App;
