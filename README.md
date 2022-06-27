# Link'It

Web application for a detetive game based on NLP and graphs.

## 💡 Principle

The player begins with 3 unknown Wikipedia pages that all share a common point (a fourth page from which all pages have been originally linked). 

By asking questions about the pages, the player can gain insight about the page content and therefore try to find the common page shared by all initial points.

Everytime an answer to a question includes a Wikipedia hyperlink, another page is made available to the player, thus creating a kind of evidence board.

The game ends when the player has found the root page and linked it to every initial pages.

## 📁 Data

The data used comes from Wikipedia which is queried through its Python api `wikipediaapi`.

## ⚡ Question-Answering model

The NLP model behind this game comes from [HuggingFace](https://huggingface.co/).

Only a pre-trained model has been used since no supervised data has been acquired, and the model already has a good enough performance.

Model and frontend are linked using [FastAPI](https://fastapi.tiangolo.com/).

## 💻 Web application

The application uses ReactJs, Tailwind CSS and is built around a D3.js network using [react-d3-graph](https://github.com/danielcaldas/react-d3-graph).