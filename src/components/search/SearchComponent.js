import React, { Component } from 'react';
import icons from 'glyphicons';
import Service from '../../service/spotifyAPI';
import { Media, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { search_value: '', token: null, search_result: null, limit: 2 };
    this.onInputChange = this.onInputChange.bind(this);
    this.onLimitChange = this.onLimitChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    let _token = hash.access_token;
    if (_token) {
      this.setState({ token: _token });
    } else {
      this.props.history.push('/home')
    }
  }

  onInputChange(event) {
    this.setState({ search_value: event.target.value });
  }

  onLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  onSearch(event) {
    console.log(this.state.limit)
    if (isNaN(this.state.limit) || this.state.limit == "") {
      this.setState({ limit: 2 });
    } 
    const result = Service.getSearchResult(this.state.search_value, this.state.token, this.state.limit)
      .then(response => response.json())
      .then(search_result => this.setState({ search_result }))
      .catch(error => {
        alert("Invalid token or the token has expired")
        this.props.history.push('/home')
      });
    event.preventDefault();
  }

  render() {
    console.log(this.state.search_result)
    const { search_value, search_result } = this.state;
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <form onSubmit={this.onSearch}>
              <h4 style={{ color: 'red' }}>Search Artists, Playlists and Tracks</h4>
              <input type="text" value={this.state.search_value} onChange={this.onInputChange} style={{ marginTop: 10, marginRight: 10 }} placeholder="Type here ..." />
              Limit : <input type="text" value={this.state.limit} onChange={this.onLimitChange} style={{ marginTop: 10, marginRight: 10, width: 30 }} />
              <button>{icons.magnifyingGlass}</button>
            </form>
          </ListGroupItem>
        </ListGroup>

        <ListGroup>

          {
            search_result && search_result.artists ?
              <div>
                <ListGroupItem active>
                  <ListGroupItemHeading>Artists related to "{search_value}"</ListGroupItemHeading>
                </ListGroupItem>

                {
                  search_result.artists.items.length != 0 ?
                    <div>
                      {
                        search_result.artists.items.map((artist) => {
                          return (
                            <Media key={artist.id}>
                              <Media left href="#">
                                {
                                  artist.images.length != 0 ?
                                    <Media object src={artist.images[0].url} alt="no image" style={{ height: 250 }} /> :
                                    <Media object src="assets/images/no_image.jpg" alt="no image" style={{ height: 250 }} />
                                }
                              </Media>
                              <Media body style={{ marginLeft: 20 }}>
                                <Media heading>
                                  {artist.name}
                                </Media>
                                <h6>Followers <Badge color="secondary">{artist.followers.total}</Badge></h6>
                                <h6>Genres </h6>
                                {
                                  artist.genres.map((genres) =>
                                    <ul key={genres}>
                                      <li>{genres}</li>
                                    </ul>
                                  )
                                }<br />
                                <h6>Popularity <Badge color="secondary">{artist.popularity}</Badge></h6>
                                <a target='_blank' href={artist.external_urls.spotify}>
                                  Click here to view the artist from Spotify
                                </a>
                              </Media>
                            </Media>
                          )
                        })
                      }
                    </div> :
                    <ListGroupItem>
                      <ListGroupItemText>
                        No Artists to display
                        </ListGroupItemText>
                    </ListGroupItem>
                }
              </div>

              :
              <ListGroupItem>
                <ListGroupItemHeading>Artists</ListGroupItemHeading>
                <ListGroupItemText>
                  No Artists to display
                  </ListGroupItemText>
              </ListGroupItem>
          }



          {search_result && search_result.tracks ?
            <div>
              <ListGroupItem active>
                <ListGroupItemHeading>Tracks related to "{search_value}"</ListGroupItemHeading>
              </ListGroupItem>

              {
                search_result.tracks.items.length != 0 ?
                  <div>
                    {
                      search_result.tracks.items.map((track) => {
                        return (
                          <div key={track.id}>
                            <Media>
                              <Media body style={{ marginLeft: 20 }}>
                                <Media heading>
                                  {track.name}
                                </Media>
                                <h6>Artists </h6>
                                {
                                  track.artists.map((artist) =>
                                    <ul key={artist.id}>
                                      <li>{artist.name}</li>
                                    </ul>
                                  )
                                }<br />
                                <h6>Album name - {track.album.name} </h6>
                                <h6>Popularity <Badge color="secondary">{track.popularity}</Badge></h6>
                                <a target='_blank' href={track.preview_url}>
                                  Click here to preview the track from Spotify
                                </a>
                              </Media>
                            </Media>
                            <br />
                          </div>
                        )
                      })
                    }
                  </div> :
                  <ListGroupItem>
                    <ListGroupItemText>
                      No Tracks to display
                        </ListGroupItemText>
                  </ListGroupItem>
              }
            </div>

            : <ListGroupItem>
              <ListGroupItemHeading>Tracks</ListGroupItemHeading>
              <ListGroupItemText>
                No Tracks to display
                </ListGroupItemText>
            </ListGroupItem>}




          {search_result && search_result.playlists ?
            <div>
              <ListGroupItem active>
                <ListGroupItemHeading>Playlists related to "{search_value}"</ListGroupItemHeading>
              </ListGroupItem>

              {
                search_result.playlists.items.length != 0 ?
                  <div>
                    {
                      search_result.playlists.items.map((playlist) => {
                        return (
                          <Media key={playlist.id}>
                            <Media left href="#">
                              {
                                playlist.images.length != 0 ?
                                  <Media object src={playlist.images[0].url} alt="no image" style={{ height: 250 }} /> :
                                  <Media object src="assets/images/no_image.jpg" alt="no image" style={{ height: 250 }} />
                              }
                            </Media>
                            <Media body style={{ marginLeft: 20 }}>
                              <Media heading>
                                {playlist.name}
                              </Media>
                              <h6>Total tracks <Badge color="secondary">{playlist.tracks.total}</Badge></h6>
                              <h6>Owner name - {playlist.owner.display_name}</h6>
                              <a target='_blank' href={playlist.external_urls.spotify}>
                                Click here to view the playlist from Spotify
                                </a>
                            </Media>
                          </Media>
                        )
                      })
                    }
                  </div> :
                  <ListGroupItem>
                    <ListGroupItemText>
                      No Artists to display
                        </ListGroupItemText>
                  </ListGroupItem>
              }
            </div>

            : <ListGroupItem>
              <ListGroupItemHeading>Playlists</ListGroupItemHeading>
              <ListGroupItemText>
                No Playlists to display
                </ListGroupItemText>
            </ListGroupItem>}

        </ListGroup>

      </div>
    );
  }
}

export default Search;