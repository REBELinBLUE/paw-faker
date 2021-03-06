import { use, expect } from 'chai';
import dirtyChai from 'dirty-chai';

import FakerDynamicValue from '../src/FakerDynamicValue';

use(dirtyChai);

describe('FakerDynamicValue', () => {
  let dynamicValues;

  beforeEach(() => {
    dynamicValues = new FakerDynamicValue();
  });

  it('Should return the title', () => {
    expect(dynamicValues.title()).to.be.equal(FakerDynamicValue.title);
  });

  it('Should return empty text when no method or category are set', () => {
    expect(dynamicValues.text()).to.be.empty();
  });

  it('Should return empty text when no method is set', () => {
    dynamicValues.category = 'internet';

    expect(dynamicValues.text()).to.be.empty();
  });

  it('Should return empty text when no category is set', () => {
    dynamicValues.method = 'password';

    expect(dynamicValues.text()).to.be.empty();
  });

  it('Should return return the category and method when both are set', () => {
    dynamicValues.category = 'internet';
    dynamicValues.method = 'password';

    expect(dynamicValues.text()).to.be.equal('internet.password()');
  });

  it('Should return return the category and method with options when all are set', () => {
    dynamicValues.category = 'internet';
    dynamicValues.method = 'password';
    dynamicValues.options = '15, true';

    expect(dynamicValues.text()).to.be.equal('internet.password(15, true)');
  });

  // FIXME: This should use a spy rather than use the real class as now we are
  // testing something outside the scope of this test
  it('Should call the FakerGenerator', () => {
    dynamicValues.locale = 'en';
    dynamicValues.category = 'random';
    dynamicValues.method = 'number';
    dynamicValues.options = '{ min: 10, max: 10 }';

    const result = dynamicValues.evaluate();

    expect(result).to.be.equal(10);
  });
});
