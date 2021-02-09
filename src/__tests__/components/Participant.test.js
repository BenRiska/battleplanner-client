import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Participant from "../../components/Participant"
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer'; 

const mocks = [];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({}),
  }));


describe("Participant componenent", async () => {

    it("renders correctly with data", async () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <Participant participant={{name: "Ben"}} tournamentName={"test"}/>
                </Router>
            </MockedProvider>,);
        // console.log(component.toJSON())
        expect(component)
    })

    it("renders correctly with incorrect data", async () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <Participant participant={{}} tournamentName={"test"}/>
                </Router>
            </MockedProvider>,);
        // console.log(component.toJSON())
        expect(component)
    })

})