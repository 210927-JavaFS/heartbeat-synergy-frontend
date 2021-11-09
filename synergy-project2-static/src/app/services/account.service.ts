import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //*********************************Spotify api variables********************************

  // groups spotify app account
  // clientId:string = 'b652928c89cc4c72b3c12c1c255bb631';
  // clientSecret:string = '3ba7579a1a7c4f09bc20a5cee2ff1849';

  // phil's spotify app account
  clientId:string = '73b711d1fcc346988ad44a364fe52b5a';
  clientSecret:string = '8047fa6e7f19446c8b719e6a2aa24170';


  requestUrl:string = 'https://api.spotify.com/v1/';
  authUrl:string = 'https://accounts.spotify.com/authorize';
  tokenUrl:string = 'https://accounts.spotify.com/api/token';

  token2Url:string = '';

  // additional params needed to create OAUTH 2.0 token
  redirectUri:string = 'http://localhost:4200'; 
  callbackUrl:string = 'http://localhost:4200'; 
  responseType:string = 'code';
  scopes:string = 'user-library-read'; //can edit this to your liking

serverUrl:string = 'http://localhost:8083';

  base64Credentials = btoa(this.clientId+':'+this.clientSecret);
  authTokenBody = new URLSearchParams({'grant_type':'client_credentials'});
  authTokenHeaders = new HttpHeaders({'Authorization':'Basic ' +this.base64Credentials, 'Content-Type': 'application/x-www-form-urlencoded' });

  //********************************************Localhost Variables******************************* */
  constructor(private http:HttpClient) { }

  //*******************************************Spotify API Functions******************************** */

  getTokenServ():Observable<Object> {
    
    return this.http.post(this.tokenUrl, this.authTokenBody, { headers: this.authTokenHeaders }) as Observable<Object>;

  }

  getAccessToken(){
    this.token2Url = this.buildRequest();
    
    /**
     * redirects url to redirectUri value to access OAUTH token
     * (If you aren't signed into spotify, you will need to sign in)
     * 
     * Then callbackUrl triggers and redirectsUri back 
     * to our site with the newly generated access token
     * now in the url
     */
    window.location.href = this.token2Url; // see above
    console.log(this.token2Url); // janky solution just for testing

  }

  // build OAUTH request using implicit grant method
  buildRequest(){

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


  getnewReleasesServ(token:string):Observable<Object> {
    return this.http.get(this.requestUrl + 'browse/new-releases', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})

  }

  searchSongServ(token:string, song:string, artist:string):Observable<Object> {
    return this.http.get(this.requestUrl + 'search?q=' +song+ ' ' + artist+'&type=track&market=us&offset=0&limit=5', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})
  }

  getSongServ(token:string, songId:string):Observable<Object> {
    return this.http.get(this.requestUrl +'tracks/'+songId +'?market=us', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})
  }


  getGenres(token:string):Observable<Object> {
    return this.http.get(this.requestUrl + 'recommendations/available-genre-seeds', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})
  }

  // need to fix this - needs to take the OAUTH token
  getTopArtists(token:string):Observable<Object>{
    return this.http.get(this.requestUrl + 'recommendations/me/top/artists?limit=5', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})
 }
 
    
  searchArtistServ(token:string, artist:string):Observable<Object> {
    return this.http.get(this.requestUrl + 'search?q=' +artist+ '&type=artist&market=us&offset=0&limit=5', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})
  }

  getArtistServ(token:string, artistId:string):Observable<Object> {
    return this.http.get(this.requestUrl +'artists/'+artistId +'?market=us', {headers: new HttpHeaders({'Authorization': 'Bearer '+token })})
  }

  //*********************************************Localhost functions******************************** */

 loginServ(username:string, password:string):boolean {
    return true
  }



  
}
