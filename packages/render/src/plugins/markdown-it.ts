import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';

const md = new MarkdownIt();

export const renderMarkdown = (content: string): string => {
  md.use(emoji);

  return md.render(content);
};
