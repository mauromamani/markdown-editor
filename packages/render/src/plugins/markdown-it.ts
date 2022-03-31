import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import taskLists from 'markdown-it-task-lists';
import mark from 'markdown-it-mark';
import hljs from 'highlight.js';

import 'highlight.js/styles/nord.css';

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err) {
        console.log(err);
      }
    }

    return '';
  },
});

export const renderMarkdown = (content: string): string => {
  md.use(emoji);
  md.use(taskLists);
  md.use(mark);

  return md.render(content);
};
