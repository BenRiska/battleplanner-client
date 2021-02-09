import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Tournament from "../../pages/Tournament"
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
                    <Tournament/>
                </Router>
            </MockedProvider>,);
        // console.log(component.toJSON())
        expect(component)
    })

})