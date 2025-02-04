import { html } from 'lit';
import '../src/cognitive-selector.js';
import '../src/cognitive-selector-detail.js';

export default {
  title: 'PolarisMood',
  component: 'polaris-mood',
};

export const MainView = () => html`
  <polaris-mood></polaris-mood>
`;

export const DetailView = () => html`
  <polaris-mood-detail mood="high-pleasant"></polaris-mood-detail>
`; 