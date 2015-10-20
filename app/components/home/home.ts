import {Component} from 'angular2/angular2';
import {Http} from 'angular2/http';


@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css']
})
export class HomeCmp {
  constructor(public http: Http) {
  }

  search(term) {
    console.log(term.value);
    this.http.get('http://localhost:5555/api/search', {
      search: 'term=' + term.value
    })
    .map(res => res.json())
    .subscribe( res => console.log(res));
  }
}
