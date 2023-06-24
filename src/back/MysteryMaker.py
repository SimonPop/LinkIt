import wikipediaapi
from transformers import pipeline
import networkx as nx
from networkx.readwrite import json_graph
from bs4 import BeautifulSoup
import requests

class MysteryMaker():
    def __init__(self):
        self.origin_color = "#d3346e"
        self.graph = nx.Graph()
        self.wiki_wiki = wikipediaapi.Wikipedia('en')
        self.target_page = self.init_target_page()
        self.evidence_pages = self.init_evidences()
        # Init model.
        self.model = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

    def get_graph(self):
        return json_graph.node_link_data(self.graph)

    def init_target_page(self):
        page_target = self.get_random_page_title()
        return self.wiki_wiki.page(page_target)
    
    def get_random_page_title(self) -> str:
        """Get a random page title from wikipedia."""
        title = None
        while title is None:
            r = requests.get("https://en.wikipedia.org/wiki/Special:Random")
            soup = BeautifulSoup(r.text) 
            main_title = soup.find("span", {"class": "mw-page-title-main"})
            if not main_title is None:
                title = main_title.text
        return title

    def answer_question(self, page_name, question):
        page = self.evidence_pages[page_name]
        context = page.summary[:1000]
        links = page.links
        # self.model look for answer in the page text.
        output = self.model(question = question, context = context)
        start = output['start']
        end = output['end']
        answer = output['answer']
        # Get the whole sentence.
        full_sentence = self.full_sentence(start, end, context) # TODO 
        # Check if hyper link is in the sentence.
        links = self.hyperlink_in(full_sentence, links)
        # Create a new page if so
        for link in links:
            if link not in self.evidence_pages:
                self.evidence_pages[link] = self.wiki_wiki.page(link)
            self.graph.add_edge(link, page_name)
        return {
            **output,
            'links': links,
            'full_sentence': full_sentence,
            'victory': self.evaluate_victory()
        }

    def full_sentence(self, start, end, context):
        sentences = context.split('.')
        count = 0
        for sentence in sentences:
            count += len(sentence)
            if count >= start:
                return sentence
        return None

    def hyperlink_in(self, full_sentence, links):
        found_links = []
        for link in links:
            if link in full_sentence:
                found_links.append(link)
        return found_links

    def init_evidences(self):
        page_1 = self.get_random_page_title()
        page_2 = self.get_random_page_title()
        page_3 = self.get_random_page_title()

        pages =[page_1, page_2, page_3]

        self.graph.add_nodes_from(pages, color=self.origin_color)
        nx.set_node_attributes(self.graph, dict([(p, p) for p in pages]), 'label')

        return dict([(page, self.wiki_wiki.page(page)) for page in pages])

    def evaluate_victory(self):
        return nx.is_connected(self.graph) and self.target_page.title in self.graph.nodes
    
    def replay(self):
        self.graph = nx.Graph()
        self.wiki_wiki = wikipediaapi.Wikipedia('en')
        self.target_page = self.init_target_page()
        self.evidence_pages = self.init_evidences()