import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // user = 'admin';
  user= {
    id: 1,
    name: 'admin'
  }
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }



  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

}
