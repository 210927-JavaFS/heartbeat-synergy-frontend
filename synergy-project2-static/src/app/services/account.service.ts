import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { UserImage } from '../models/user-image';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //*********************************Spotify api variables********************************

  // groups spotify app account
  // clientId:string = 'b652928c89cc4c72b3c12c1c255bb631';
  // clientSecret:string = '3ba7579a1a7c4f09bc20a5cee2ff1849';

  // phil's spotify app account
  clientId: string = '73b711d1fcc346988ad44a364fe52b5a';
  clientSecret: string = '8047fa6e7f19446c8b719e6a2aa24170';


  requestUrl: string = 'https://api.spotify.com/v1/';
  authUrl: string = 'https://accounts.spotify.com/authorize';
  tokenUrl: string = 'https://accounts.spotify.com/api/token';

  authTokenUrl: string = '';
  authToken: string = '';

  // additional params needed to create OAUTH 2.0 token
  redirectUri: string = 'http://localhost:4200/home-page';
  callbackUrl: string = 'http://localhost:4200/home-page';
  responseType: string = 'code';
  scopes: string = 'user-library-read, user-top-read'; //can edit this to your liking

  serverUrl: string = 'http://localhost:8083/data';

  base64Credentials = btoa(this.clientId + ':' + this.clientSecret);
  authTokenBody = new URLSearchParams({ 'grant_type': 'client_credentials' });
  authTokenHeaders = new HttpHeaders({ 'Authorization': 'Basic ' + this.base64Credentials, 'Content-Type': 'application/x-www-form-urlencoded' });

  //********************************************Localhost Variables******************************* */
  constructor(private http: HttpClient) { }

  //*******************************************Spotify API Functions******************************** */

  getTokenServ(): Observable<Object> {

    return this.http.post(this.tokenUrl, this.authTokenBody, { headers: this.authTokenHeaders }) as Observable<Object>;

  }

  getAccessToken() {
    this.authTokenUrl = this.buildRequest();

    /**
     * redirects url to redirectUri value to access OAUTH token
     * (If you aren't signed into spotify, you will need to sign in)
     * 
     * Then callbackUrl triggers and redirectsUri back 
     * to our site with the newly generated access token
     * now in the url
     */
    window.location.href = this.authTokenUrl; // see above
  }


  getTokenFromUrl(): string {
    const hash = window.location.hash;

    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");

    const authTokenArray = paramsInUrl[0].split("=");
    console.log(authTokenArray[1]);
    this.authToken = authTokenArray[1];

    return this.authToken;
  }


  // build OAUTH request using implicit grant method
  buildRequest() {

    var state = 'r9XzPTQ8fjBqfwC5';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(this.clientId);
    url += '&scope=' + encodeURIComponent(this.scopes);
    url += '&redirect_uri=' + encodeURIComponent(this.redirectUri);
    url += '&state=' + encodeURIComponent(state);
    url += '&callback_url=' + encodeURIComponent(this.callbackUrl);

    return url;

  }


  // api calls
  getnewReleasesServ(token: string): Observable<Object> {
    return this.http.get(this.requestUrl + 'browse/new-releases', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) })

  }

  searchSongServ(token: string, song: string, artist: string): Observable<Object> {
    return this.http.get(this.requestUrl + 'search?q=' + song + ' ' + artist + '&type=track&market=us&offset=0&limit=5', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) })
  }

  getSongServ(token: string, songId: string): Observable<Object> {
    if (songId != null) { }
    return this.http.get(this.requestUrl + 'tracks/' + songId + '?market=us', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) })
  }


  getGenres(token: string): Observable<Object> {
    return this.http.get(this.requestUrl + 'recommendations/available-genre-seeds', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) })
  }

  // need to fix this - needs to take the OAUTH token
  getTopArtists(authToken: string): Observable<Object> {
    return this.http.get(this.requestUrl + 'me/top/artists', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json', "Accept": "application/json" }) })
  }


  searchArtistServ(token: string, artist: string): Observable<Object> {
    return this.http.get(this.requestUrl + 'search?q=' + artist + '&type=artist&market=us&offset=0&limit=5', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) })
  }

  getArtistServ(token: string, artistId: string): Observable<Object> {
    return this.http.get(this.requestUrl + 'artists/' + artistId + '?market=us', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) })
  }


  //spring data calls
  getAllUsers() {
    return this.http.get<User[]>('http://localhost:8083/data/account');
  }

  getUser(id: number) {
    return this.http.get<User>('http://localhost:8083/data/account/' + id);
  }


  //*********************************************Localhost functions******************************** */

  loginServ(username: string, password: string): Observable<any> {
    let user = {
      "username": username,
      "password": password
    }
    return this.http.post(this.serverUrl + '/login', user)

  }

  createUserServ(id: string, username: string, password: string, firstName: string, lastName: string, age: string, profileDescription: string, anthem: string, filterType: string, userType: string): Observable<any> {
    let sendUser = {
      "id": id,
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "age": parseInt(age),
      "profileDescription": profileDescription,
      "playlist": null,
      "anthem": anthem,
      "topArtists": [
        {

        }
      ],
      "topGenres": [

      ],
      "filterType": filterType,
      "userType": userType
    }
    return this.http.post(this.serverUrl + '/account', sendUser)

  }


  createUserTopArtistServ(userId:string, id: string, name: string, image: string): Observable<any> {
    let topArtists = {

      "artistId": id,
      "artistName": name,
      "artistImage": image
    }
    return this.http.post(this.serverUrl + '/account/'+userId+ '/artist', topArtists)

  }
}

    return this.http.post(this.serverUrl + '/account', sendUser)
  }

  getUserImages(id:number):Observable<UserImage[]>{
    return this.http.get<UserImage[]>(this.serverUrl + '/account/' + id + "/photo");
  }

  uploadUserImage(file:File|null, userId:number){
    if(file===null)return;
    const uploadImageData = new FormData();
    uploadImageData.append('image', file, file.name);
    return this.http.post(this.serverUrl+'/account/'+ userId+'/photo', uploadImageData, {observe:'response'});
  }
}

  


