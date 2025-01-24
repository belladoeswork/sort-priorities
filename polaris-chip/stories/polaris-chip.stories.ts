import { html, TemplateResult } from 'lit';
import '../src/polaris-chip.js';

export default {
  title: 'PolarisChip',
  component: 'polaris-chip',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <polaris-chip style="--polaris-chip-background-color: ${backgroundColor}" .header=${header}></polaris-chip>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
