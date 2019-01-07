import {
  createUser,
  createTeam,
  authMail,
  login,
  createTempApi,
} from '../Api';
import { setGlobal } from 'reactn';

export default async function (api, socket, state, global) {
  // this.state = {
  //   teamAmount: 1,
  //   teamName: '',
  //   teamPassword: '',
  //   teamGame: '',
  //   teamAge: 0,
  //   teamMemberAmount: 1,
  // };
  for(let i = 0; i < state.teamAmount; i++) {
    const userInfo = await createUser(api, `${state.teamName}${i}L@${state.teamName}.com`, state.teamPassword);
    if (userInfo instanceof Error) {
      console.log('error while creating user', userInfo);
      throw userInfo;
    }
    console.log('user created', userInfo);
    await authMail(socket, userInfo);
    const leaderToken = (await login(api, `${state.teamName}${i}L@${state.teamName}.com`, state.teamPassword)).token;
    const tempApi = createTempApi(leaderToken);
    const teamData = {
      gameId: state.teamGame,
      name: `${state.teamName}${i}`,
      introduction: 'no introduction'
    };
    const teamInfo = await createTeam(tempApi, teamData);
    if (teamInfo instanceof Error) {
      console.log('error while creating team', teamInfo);
      throw teamInfo;
    }

  }
}