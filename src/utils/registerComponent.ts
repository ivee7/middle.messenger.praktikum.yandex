import Block from './Block';
import * as Handlebars from 'handlebars/runtime';

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, ({ data, hash }: any) => {
    const component = new Component(hash);

    if (!data.root.children) {
      data.root.children = {};
    }

    data.root.children[component.id] = component;

    return `<div data-id='${component.id}'></div>`;
  });
}
