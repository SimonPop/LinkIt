import React from 'react';
import './Evidence.css';

class Evidence extends React.Component {
    render() {
      return (
        <div class={this.props.name==this.props.selected_name?"p-2 m-1 shadow-xl ring-2 ring-pink-300/50":"p-2 m-1 shadow-xl ring-1 ring-emerald-900/5"}>
          <button class="bg-pink-300 hover:bg-pink-700 text-white font-bold py-1 px-3" onClick={() => this.props.onClick()}>{this.props.name}</button>
        </div>
      );
    }
  }

export default Evidence;