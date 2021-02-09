import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Restrictions from "../../components/Restrictions"
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer'; 
import tournamentData from "../../fixtures/jumbotron.json"

const mocks = [];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({}),
  }));


describe("Restrictions componenent", async () => {

    it("renders correctly", async () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <Restrictions Restrictions={tournamentData.Restrictions} tournamentName={"test"}/>
                </Router>
            </MockedProvider>,);
        // console.log(component.toJSON())
        expect(component)
    })

    it("renders correctly with incorrect data", async () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Router>
                    <Restrictions Restrictions={""} tournamentName={"test"}/>
                </Router>
            </MockedProvider>,);
        // console.log(component.toJSON())
        expect(component)
    })

})