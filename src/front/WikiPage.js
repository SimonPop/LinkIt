import React from 'react';
import './WikiPage.css';

class WikiPage extends React.Component {
    render() {
      return (
        <div class="m-5 bg-white shadow-xl ring-1 ring-gray-900/5">
          <div class="py-1 bg-emerald-400 text-white">
           <h1>{this.props.name}</h1>
          </div>
          <div  class="p-5">
          <table>
            <thead>
              <tr>
                <th class="border border-emerald-300 px-2 bg-emerald-400 text-white">Question</th>
                <th class="border border-emerald-300 px-2 bg-emerald-400 text-white">Answer</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.props.content).map((key) =>
                      <tr key={key}>
                        <td class="border border-emerald-300 px-2">{key}</td>
                        <td class="border border-emerald-300 px-2">{this.props.content[key]}</td>
                      </tr>
              )}
            </tbody>
        </table>
        </div>
        </div>
      );
    }
  }

export default WikiPage;