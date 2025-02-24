import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/priority-sort.js';

describe('priority-sort', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<priority-sort></priority-sort>`);
  });

  it('renders a h2', () => {
    const h2 = element.shadowRoot.querySelector('h2');
    expect(h2).to.exist;
    expect(h2.textContent).to.equal('Sort your priorities in life at the moment?');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
}); 