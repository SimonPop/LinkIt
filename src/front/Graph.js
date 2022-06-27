import { Graph } from "react-d3-graph";
import React from 'react';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


  class EvidenceGraph extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            graph: {nodes: [], links: []}
        }
        this.updateGraph = this.updateGraph.bind(this);
      }

      updateGraph() {
                fetch(`http://127.0.0.1:8000/graph/`)
                  .then(res => res.json())
                  .then(
                    (result) => {
                        this.setState({graph: {nodes: result.nodes, links: result.links}});
                    }
                  );
        }

      render() {
          const myConfig = {
            nodeHighlightBehavior: true,
            node: {
              color: "#34D399",
              size: 120,
              highlightStrokeColor: "#185B42",
            },
            link: {
              highlightColor: "lightblue",
            },
            width: window.innerWidth
          };

        return (
            <div class='w-full content-center'>
              <div class='border-dashed border-emerald-600 border-2 m-4'>
                <Graph
                    id="graph-id"
                    data={this.state.graph}
                    config={myConfig}
                    onClickNode={this.props.onNodeClick}
                    />
                </div>
                <button onClick={this.updateGraph} class="text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                  <FontAwesomeIcon icon={faCircleNodes} />
                </button>
            </div>
        );
      }
  }

export default EvidenceGraph;