import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
      default: class {
        emit = eventBusMock.emit;
        on = eventBusMock.on;
      }
  }
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {}
  //@ts-ignore
  let block = null;

  beforeEach(() => {
    //@ts-ignore
    block = new ComponentMock({});
  });

  it('should fire init event on initialization',  () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('Block contains id', () => {
    //@ts-ignore
    expect(block.id).to.be.a('string');
  });

  it('setProps() works correct', () => {
    //@ts-ignore
    block.setProps({ text: 'text' });

    //@ts-ignore
    expect(block.props).to.have.property('text');
  });

  it('Получение контента блока не возвращает null', () => {
    //@ts-ignore
    expect(block.getContent()).to.be.not.null;
  });
});
