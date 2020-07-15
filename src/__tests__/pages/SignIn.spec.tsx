import React from 'react';
import { render } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn page', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />);

    const inputEmailElement = getByPlaceholder('E-mail');
    const passwordEmailElement = getByPlaceholder('E-mail');

    expect(inputEmailElement).toBeTruthy();
    expect(passwordEmailElement).toBeTruthy();
  });
});
