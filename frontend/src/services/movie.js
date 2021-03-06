import http from '../http-common';

class MovieDataService{

    getAll(page) {
        return http.get(`?page=${page}`);
      }
    
      get(id) {
        return http.get(`/id/${id}`);
      }
    
      find(query, by = "name", page) {
        return http.get(`?${by}=${query}&page=${page}`);
      } 
    
      createReview(data) {
        return http.post("/review", data);
      }
    
      updateReview(data) {
        return http.put("/review", data);
      }
    
      deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
      }
    
    }
    
    export default new MovieDataService();