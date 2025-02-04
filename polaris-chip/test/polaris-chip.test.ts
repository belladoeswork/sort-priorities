import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { PolarisChip } from '../src/cognitive-selector.js';
import '../src/cognitive-selector.js';

describe('PolarisChip', () => {
  let element: PolarisChip;
  beforeEach(async () => {
    element = await fixture(html`<cognitive-selector></cognitive-selector>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
