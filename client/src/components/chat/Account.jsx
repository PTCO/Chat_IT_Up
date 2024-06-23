import React from "react";
import ReactMarkdown  from 'react-markdown';

class Account extends React.Component {
    state = {
        consent: false,
        data: `* Lost of all User chat sessions`
    }

    render(){
        return(
            <>
                <div className="btn d-flex align-items-center colorFullBorders p-2 rounded mt-2 w-100" onClick={ e => this.setState({consent: !this.state.consent})}>
                    <button className="btn rounded py-2 px-3 text-white me-2"><i class="fa-solid fa-user-minus"></i></button>
                    <h3 className="m-0">Delete Account</h3>
                </div>
                <div className={`${!this.state.consent ? 'd-none':null}`}>
                    <h2 className="border-bottom border-2 pb-2 mb-3">Delete Consent</h2>
                    <p>Are you sure you would like to delete your account?</p>
                    <p>Delete your <b>"Account"</b> results in:</p>
                    <ReactMarkdown >
                        {this.state.data}
                    </ReactMarkdown >
                    <p></p>
                </div>
            </>
        );
    }
}

export default Account;