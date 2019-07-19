import React from 'react'

function Message({id, subject, read, starred, labels, checked, toggleStarred, toggleSelected}) {
    return (
        <div>
            <div>

                <div className={`row message ${read ? "read" : "unread"} ${checked && "selected"}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                {checked ? <input type="checkbox" onChange={toggleSelected} id={id} checked="checked"/>: <input onChange={toggleSelected} id={id} type="checkbox"/>}
                                {/*//add onchange for checked*/}
                            </div>
                            <div className="col-xs-2">
                                {starred ? <i className="star fa fa-star" onClick={toggleStarred} id={id}></i> : <i className="star fa fa-star-o" id={id} onClick={toggleStarred}></i>}
                                {/*//add onclick to change to starred*/}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        {labels &&  labels.map((label,i) => <span key={i} className="label label-warning">{label}</span>)}
                        <a>
                            {subject}
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message