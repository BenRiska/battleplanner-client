import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Home from "../../pages/Home"
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer'; 
import TOURNAMENTS from "../../fixtures/jumbotron.json"
import {FETCH_TOURNAMENTS_QUERY} from "../../utils/queries"

const mocks = [{
    request: {
        query: FETCH_TOURNAMENTS_QUERY,
        variables: {username: "test1"}
    },
    result: {
        "data": {
          "getTournaments": [
            {
                "id": "602108f47def4e0015dbbe06",
                "name": "Hi",
                "username": "test1",
                "rules": [],
                "restrictions": [],
                "participants": [
                  {
                    "id": "6021121e7def4e0015dbbe2e",
                    "name": "ben",
                    "status": true
                  },
                  {
                    "id": "60211c8e7def4e0015dbbe32",
                    "name": "john",
                    "status": true
                  },
                  {
                    "id": "60211c917def4e0015dbbe37",
                    "name": "henry",
                    "status": true
                  },
                  {
                    "id": "60211c937def4e0015dbbe3e",
                    "name": "harry",
                    "status": true
                  }
                ],
                "active": false,
                "fights": [
                  {
                    "id": "60212e727def4e0015dbbe69",
                    "fighterOne": "ben",
                    "fighterTwo": "harry",
                    "concluded": true,
                    "winner": "ben"
                  }
                ],
                "round": 2,
                "winner": "ben"
              }
            ]
        }}}]


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({}),
  }));

  afterEach(cleanup)

  describe("Home componenent", async () => {

    it("renders correctly", async () => {
        const {getByText, findByText} = render(
            <MockedProvider mocks={mocks} addTypename={false} removeTypename>
                <Router>
                    <Home/>
                </Router>
            </MockedProvider>,);


        expect(getByText("Loading")).toBeTruthy()
        const formTitle = await findByText("Create")
        expect(formTitle).toBeTruthy()
    })

})