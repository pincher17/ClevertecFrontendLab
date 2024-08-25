import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },

})

const accessToken = localStorage.getItem('accessToken');


if (!accessToken) {

    console.error('Access token not found in localStorage');
} else {

    /* instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; */
}

const config = {
    withCredentials: true
};

export const userApi = {
    registerUser(email, password) {
        return instance.post(`auth/registration`, { email, password })
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    authUser(email, password) {
        return instance.post(`auth/login`, { email, password })
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    checkEmail(email) {
        return instance.post(`auth/check-email`, { email })
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    confirmEmail(email, code) {
        return instance.post(`auth/confirm-email`, { email, code }, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    changePassword(password, confirmPassword) {
        return instance.post(`auth/change-password`, { password, confirmPassword }, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getFeedback(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get('/feedback', config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    sendFeedback(accessToken, message, rating) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.post('/feedback', {message, rating}, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },

    getTrainings(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get('/training', config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },

    createTrainings(accessToken, training) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.post('/training', training, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    changeTrainings(accessToken, trainingId, training) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.put(`/training/${trainingId}`, training, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },

    trainingList(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/catalogs/training-list`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getProfile(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/user/me`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    putChangesProfile(accessToken, profile) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.put('/user', profile, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getTariffList(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/catalogs/tariff-list`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    updateTariff(accessToken, tariffParametres) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.post('/tariff', tariffParametres, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getTrainingPals(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/catalogs/training-pals`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getUserJointTrainingListRandom(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/catalogs/user-joint-training-list`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    sendInvite(accessToken, to, trainingId) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.post(`/invite`, {to, trainingId}, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getInvite(accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/invite`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    getUserJointTrainingPopular(accessToken, typeTraining) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.get(`/catalogs/user-joint-training-list?trainingType=${typeTraining}`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    replyInvite(accessToken, id, status) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.put(`/invite`, {id, status}, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
    deleteInvite(accessToken, id) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
    
        return instance.delete(`/invite/${id}`, config)
            .then(response => {
                return response.data; 
            })
            .catch(error => {
                throw error; 
            });
    },
};