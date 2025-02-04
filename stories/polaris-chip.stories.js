import { html } from 'lit';
import '../src/cognitive-selector.js';

export default {
  title: 'cognitiveselector',
  component: 'cognitive-selector',
};

function Template({ title }) {
  return html`
    <cognitive-selector
      .title=${title}
    >
    </cognitive-selector>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
