import Constants from '../utils/constants';

const Service = {
  searchUrl: (query, limit) => {
    return `${Constants.SEARCH_URL}?q=${encodeURI(query)}&type=playlist%2Ctrack%2Cartist&limit=${encodeURI(limit)}`;
  },

  tracksUrl: (artistId) => {
    return `${Constants.BASE_URL}/artists/${artistId}/top-tracks?country=US&`;
  },


  getSearchResult: (query, token, limit) => {
    let mquery = '"'+ query + '"';
    let searchUrl = Service.searchUrl(mquery, limit);
    return fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${token}` 
      }
    })
      .then(errorHandling.handleErrors,
        error => {
          var errmess = new Error(error.message);
          throw errmess;
        })
  },


  authenticate: (url) => {
    var client_id = "2d7cd23fd6984ce883ef218fd48c7adf";
    var redirect_uri = url;
    var response_type = "token";
    var scopes = [
      'user-top-read'
    ];
    window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&response_type=${response_type}&show_dialog=true`;
  }

}


const errorHandling = {
  handleErrors: (response) => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }
}

export default Service;