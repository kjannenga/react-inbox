import React from 'react';


function  ToolBar({toggleAllSelect, allSelected, messages, changeToRead, changeToUnread, deleteMessages}) {
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

                            <select className="form-control label-select">
                                <option>Apply label</option>
                                <option value="dev">dev</option>
                                <option value="personal">personal</option>
                                <option value="gschool">gschool</option>
                            </select>

                            <select className="form-control label-select">
                                <option>Remove label</option>
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
                                <option>Apply label</option>
                                <option value="dev">dev</option>
                                <option value="personal">personal</option>
                                <option value="gschool">gschool</option>
                            </select>

                            <select className="form-control label-select" disabled="disabled">
                                <option>Remove label</option>
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
        </div>
    )
}

export default ToolBar;