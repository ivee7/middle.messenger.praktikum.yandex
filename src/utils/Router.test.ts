import Router, { BlockConstructable } from './Router'
import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';

describe('Router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  }

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('.use() should return Router instance', () => {
    const result = Router.use('/', BlockMock as typeof Block);

    expect(result).to.eq(Router);
  });

  it('.back() should render a page on history back action', () => {
      Router
        .use('/', BlockMock as typeof Block)
        .start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
  });

  it(".go() should render current URL", () => {
    const expectedResult = "/test";
    Router.go(expectedResult);

    expect(window.location.href).be.eq(`http://localhost:3000${expectedResult}`);
  });

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock as typeof Block)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
