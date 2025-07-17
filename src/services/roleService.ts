import apiConfig from './apiConfig';
const { axios } = apiConfig;

export interface Role {
  id: number;
  name: string;
  label?: string;
}

export const roleService = {
  async getAllRoles(): Promise<Role[]> {
    const res = await axios.get('/v1/roles');
    return res.data;
  },
};
