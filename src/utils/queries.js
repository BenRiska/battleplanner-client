import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    email
    username
    createdAt
    token
  }
}
`;

export const REGISTER_USER = gql`
mutation register(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
) {
  register(
    registerInput: {
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    }
  ) {
    id
    email
    username
    createdAt
    token
  }
}
`;

export const FETCH_TOURNAMENTS_QUERY = gql`
query ($username: String!){
getTournaments(username: $username){
  name
  rules
  username
  restrictions
  participants{
    name
    status
  }
  round
  active
}
}
`;

export const FETCH_TOURNAMENT_QUERY = gql`
query getTournament($tournamentName: String!){
getTournament(tournamentName: $tournamentName){
  name
  username
  rules
  restrictions
  participants{
    name
    status
  }
  active
  fights{
    fighterOne
    fighterTwo
    concluded
    winner
  }
  round
  winner
}
}
`

export const DELETE_PARTICIPANT = gql`
mutation ($name: String!, $tournamentName: String!){
deleteParticipant(name: $name, tournamentName: $tournamentName){
  name
  username
  rules
  restrictions
  participants{
    name
    status
  }
}
}
`

export const ADD_PARTICIPANT = gql`
mutation addParticipant($tournamentName: String!, $name: String!){
    addParticipant(tournamentName: $tournamentName, name: $name){
    name
    username
    rules
    restrictions
    participants {
        name
        status
    }
  }
}
`

export const DELETE_TOURNAMENT_QUERY = gql`
mutation($tournamentName: String!){
    deleteTournament(tournamentName: $tournamentName){
      name
      rules
      username
      restrictions
      participants{
        name
        status
      }
      round
      active
    }
  }

`

export const START_GAME_QUERY = gql`
mutation($tournamentName: String!){
  startGame(tournamentName: $tournamentName){
    name
    fights{
      fighterOne
      fighterTwo
      concluded
    }
    round
  }
}
`

export const DELETE_RESTRICTION = gql`
mutation ($restriction: String!, $tournamentName: String!){
deleteRestriction(restriction: $restriction, tournamentName: $tournamentName){
  name
  username
  rules
  restrictions
  participants{
    name
    status
  }
}
}
`

export const ADD_RESTRICTION = gql`
mutation($tournamentName: String!, $restriction: String!){
    addRestriction(tournamentName: $tournamentName, restriction: $restriction){
    name
    username
    rules
    restrictions
  }
}
`

export const START_NEXT_ROUND_QUERY = gql`
mutation($tournamentName: String!){
startNextRound(tournamentName: $tournamentName){
name
username
rules
restrictions
participants{
  name
  status
}
active
fights{
  fighterOne
  fighterTwo
  concluded
  winner
}
round
winner
}
}
`

export const DELETE_RULE = gql`
mutation ($rule: String!, $tournamentName: String!){
deleteRule(rule: $rule, tournamentName: $tournamentName){
  name
  username
  rules
  restrictions
  participants{
    name
    status
  }
}
}`

export const ADD_RULE = gql`
mutation($tournamentName: String!, $rule: String!){
    addRule(tournamentName: $tournamentName, rule: $rule){
    name
    username
    rules
  }
}
`

export const CREATE_TOURNAMENT = gql`
mutation createTournament(
    $tournamentName: String!
    ){
       createTournament(
           tournamentName: $tournamentName
       ){
       name
       username
       round
       rules
       restrictions
       participants{
       name
       status
       }
       active
   }
}
`;

export const END_FIGHT_QUERY = gql`
mutation($tournamentName: String!, $winner: String!){
endFight(tournamentName: $tournamentName, winner: $winner){
name
username
rules
restrictions
participants{
  name
  status
}
active
fights{
  fighterOne
  fighterTwo
  concluded
  winner
}
round
winner
}
}
`