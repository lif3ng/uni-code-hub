import axios from 'axios';
const baseURL = 'https://api.github.com'

const instance = axios.create({
	baseURL
})

instance.interceptors.response.use(({
	data
}) => data)

export const getUserRepos = (user) => {
	return instance.get(`/users/${user}/repos`, {
		params: {
			sort: 'updated'
		}
	})
}
export const getRepo=(repoStr)=>{
	return instance.get(`repos/${repoStr}`)
}
