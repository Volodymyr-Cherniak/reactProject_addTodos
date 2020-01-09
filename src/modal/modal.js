import React from "react";
import './modal.css'


export default class Modal extends React.Component {
  state = {
    isOpen: false
  };

  render() {
    return(
      <React.Fragment>
        <button onClick={() => this.setState({isOpen: true})}>Info</button>

        {this.state.isOpen && (
          <div className='modal'>
            <div className='modal-body'>
              <h1>Створіть свій список</h1>
              <p>В цьому додатку ви можете скласти свій список покупок, це дуже легко)</p>
              <button onClick={() => this.setState({isOpen: false})}>Закрити</button>
            </div>

          </div>
        )}
      </React.Fragment>
    )
  }
}
