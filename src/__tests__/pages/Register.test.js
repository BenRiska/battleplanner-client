import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Register from "../../pages/Register"
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer'; 

const mocks = [];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({}),
  }));



  describe("Register componenent", async () => {

    it("renders correctly", () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <Register/>
                </Router>
            </MockedProvider>,);
        // console.log(component.toJSON())
        expect(component)
    })

})