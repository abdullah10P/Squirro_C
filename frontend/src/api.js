// Squiro code challenge

const hit_api = 'http://localhost:3000/stores'


export const getStores = async () => {
    const response = await fetch(hit_api);
    const data = await response.json();
    if (!data) {
        throw new Error(data.message);
    }
    return data
};


