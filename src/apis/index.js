import { baseModule } from './config';

const APIS = {
  login: (body) => {
    return baseModule.post('/auth/login', body);
  },
  get_all_items: () => {
    return baseModule.get('/posts');
  },
};

export default APIS;
