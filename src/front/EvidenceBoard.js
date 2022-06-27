import React from 'react';
import Evidence from './Evidence';
import WikiPage from './WikiPage';
import Input from './Input';
import Graph from './Graph';
import './EvidenceBoard.css';

class EvidenceBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedEvidence: null,
          selectedContent: {},
          evidences: {}
      }; 
      this.initBoard();
    }

    selectEvidence(evidence_name) {
        const evidence = this.state.evidences[evidence_name];
        const evidence_content = evidence.content;
        this.setState({selectedEvidence: evidence_name, selectedContent: evidence_content});
    }

    addAnswer(question, answer) {
      // TODO: Handle score.
      // TODO: Handle ending of the game.
      // Write answer in a new line. 
        const evidence_name = this.state.selectedEvidence;
        const evidence = this.state.evidences[evidence_name];
        const new_line = {};
        new_line[question] = answer.full_sentence.replace(answer.answer, '<b>' + answer.answer + '</b>');
        const new_evidence_content = {...evidence.content, ...new_line};
        const evidences = this.state.evidences;
        evidences[evidence_name] = {
          name: evidence_name,
          content: new_evidence_content
        };
      // Create new pages.
      answer.links.forEach(link => {
        evidences[link] = {
          content: {}
        }
      });
      // Do something for answer.victory
      this.setState({evidences: evidences, selectedContent: new_evidence_content});
    }

    /**
     * Creates the first pages as evidences
     */
    async initBoard() {
      const start_evidences = await fetch(`http://127.0.0.1:8000/init/`)
      .then(res => res.json())
      .then(
        (result) => {
          const start_evidences = {};
          result['evidence_pages'].forEach((page) => {
            start_evidences[page] = {
              content: {},
            };
          });
          return start_evidences;
        }
      );
      this.setState({evidences: start_evidences});
    }

    render() {
      return (
        <div>

          <div class="shadow-lg py-5 bg-emerald-400 text-white">
            <h1 class="font-julius text-2xl">Evidence Board</h1>
          </div>

          <Graph onNodeClick={(evidence_name) => this.selectEvidence(evidence_name)}/>

          <div class="flex flex-row">
            <div class={`w-full ${this.state.selectedEvidence ? "active" : "hidden"}`}>
              <WikiPage name={this.state.selectedEvidence} content={this.state.selectedContent} />
            </div>
          </div>

          <div class="flex flex-row search">
            <div class="basis-2/3">
              <Input selected_name={this.state.selectedEvidence} onEnter={(a, b) => this.addAnswer(a, b)} />
            </div>
          </div>

        </div>
      );
    }
  }

export default EvidenceBoard;