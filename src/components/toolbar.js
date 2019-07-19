import React from 'react';


function  ToolBar({toggleAllSelect, allSelected, messages, changeToRead, changeToUnread, deleteMessages, addLabel, removeLabel, toggleMessage, composeMessage}) {
    const read = messages.filter(message => message.read === false);
    const readCount = read.length;
    const selectedList = messages.filter(message => message.checked === true);
    let active = false;
    if (selectedList.length > 0){
        active = true
    }
    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{readCount}</span>
                        unread messages
                    </p>

                    <a className="btn btn-danger" onClick={toggleMessage}>
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        {allSelected &&  <i className="fa fa-check-square-o" onClick={toggleAllSelect}></i>}
                        {!allSelected && !active && <i className="fa fa-square-o" onClick={toggleAllSelect}/>}
                        {!allSelected && active && <i className="fa fa-minus-square-o" onClick={toggleAllSelect}></i>}
                    </button>

                    {active ?
                        <span>
                            <button className="btn btn-default" onClick={changeToRead}>
                                Mark As Read
                            </button>

                            <button className = "btn btn-default" onClick={changeToUnread}>
                                Mark As Unread
                            </button>

                            <select className="form-control label-select" onChange={addLabel}>
                                <option disabled>Apply label</option>
                                <option value="dev">dev</option>
                                <option value="personal">personal</option>
                                <option value="gschool">gschool</option>
                            </select>

                            <select className="form-control label-select" onChange={removeLabel}>
                                <option disabled>Remove label</option>
                                <option value="dev">dev</option>
                                <option value="personal">personal</option>
                                <option value="gschool">gschool</option>
                            </select>

                            <button className="btn btn-default">
                                <i className="fa fa-trash-o" onClick={deleteMessages}></i>
                            </button>
                        </span> :
                        <span>
                            <button className="btn btn-default" disabled='disabled'>
                                Mark As Read
                            </button>

                            <button className="btn btn-default" disabled="disabled">
                                Mark As Unread
                            </button>

                            <select className="form-control label-select" disabled="disabled">
                                <option selected="selected">Apply label</option>
                                <option value="dev">dev</option>
                                <option value="personal">personal</option>
                                <option value="gschool">gschool</option>
                            </select>

                            <select className="form-control label-select" disabled="disabled">
                                <option selected="selected">Remove label</option>
                                <option value="dev">dev</option>
                                <option value="personal">personal</option>
                                <option value="gschool">gschool</option>
                            </select>

                            <button className="btn btn-default" disabled="disabled">
                                <i className="fa fa-trash-o"></i>
                            </button>
                        </span>
                        }


                </div>
            </div>
            {composeMessage &&
            <div>
                <form className="form-horizontal well">
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <h4>Compose Message</h4>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="subject" placeholder="Enter a subject"
                                   name="subject"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                        <div className="col-sm-8">
                            <textarea name="body" id="body" className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="submit" value="Send" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}

export default ToolBar;