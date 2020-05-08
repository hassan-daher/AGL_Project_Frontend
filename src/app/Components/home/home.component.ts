import {Component, OnInit} from '@angular/core';
import {HomeOptionsModel} from '../../Models/HomeOptionsModel';
import {Router} from '@angular/router';

// const options: Array<HomeOptionsModel> = [
//   {name: 'Lost & Found',  description: 'Lost something?'},
//   {name: 'Lost & Found',  description: 'Lost something?'},
//   {name: 'Lost & Found',  description: 'Lost something?'}
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  options: Array<HomeOptionsModel> = [
    {
      name: 'Lost & Found',
      description: 'Did you lose something on campus or find something left or forgotten? Submit or check lost items here!',
      icon: 'work'
    },
    {
      name: 'Resources',
      description: 'Are you searching for some documents or some old exams? Click here to search or upload documents to ' +
        'help the students community!',
      icon: 'file_copy'
    },
    {
      name: 'Study Buddy',
      description: 'Need help with a subject, or you have an exam that you need help to study for? ' +
        'Click here to search for a study buddy!',
      icon: 'people'
    },
    {
      name: 'Q&A',
      description: 'Have any question? Click here to post a question to the student community ',
      icon: 'question_answer'
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToOption(name) {
    switch (name) {
      case 'Lost & Found':
        this.router.navigate(['lostAndFound']);
        break;
      case 'Resources':
        this.router.navigate(['resources']);
        break;
      default:
        this.router.navigate(['welcome']);
        break;
    }
  }
}
