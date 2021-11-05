import { Component, OnInit } from '@angular/core';

export interface Address {
  name: string;
  location: string;
  phone: string;
  created: string;
  editName?: boolean;
  editLocation?: boolean;
  editPhone?: boolean;
}

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.scss']
})
export class AddressbookComponent implements OnInit {
  public addresses: Address[] = [];
  private checkedList: number[] = [];
  private rowsModified: number[] = [];
  constructor() { }

  ngOnInit(): void {
    this.addresses = [
      {
        name: "Kanhu",
        location: "India",
        phone: "111",
        created: "2021-01-01",
      },
      {
        name: "Bob",
        location: "US",
        phone: "222",
        created: "2021-01-02",
      },
      {
        name: "Sandy",
        location: "Canada",
        phone: "333",
        created: "2021-01-04",
      },
      {
        name: "Jimmy",
        location: "Japan",
        phone: "444",
        created: "2021-01-03",
      }
    ];
  }

  public add() {
    const newAddress = {
      name: "",
      location: "",
      phone: "",
      created: new Date().toISOString().split('T')[0],
      editName: true,
      editLocation: true,
      editPhone: true,
    };
    this.addresses = [...this.addresses, newAddress];
  }

  public check(e: any, index: number) {
    if (e.target.checked) {
      if (!this.checkedList.includes(index))
        this.checkedList.push(index);
    } else {
      if (this.checkedList.includes(index))
        this.checkedList.splice(this.checkedList.indexOf(index), 1);
    }
  }

  public delete() {
    if (this.checkedList.length > 0) {
      this.addresses = this.addresses.filter((e, i) => !this.checkedList.includes(i));
      this.checkedList = [];
    }
  }

  public update() {
    if (this.rowsModified.length > 0) {
      alert("Row " + this.rowsModified.join(",") + " modified");
    } else {
      alert("Nothing to update");
    }
    this.rowsModified = [];
  }

  public sort(column: string) {
    if (column === "name") {
      this.addresses = this.addresses.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else if (column === "location") {
      this.addresses = this.addresses.sort((a, b) => (a.location > b.location) ? 1 : ((b.location > a.location) ? -1 : 0));
    } else if (column === "phone") {
      this.addresses = this.addresses.sort((a, b) => (a.phone > b.phone) ? 1 : ((b.phone > a.phone) ? -1 : 0));
    } else if (column === "created") {
      this.addresses = this.addresses.sort((a, b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
    }
  }

  public doubleClick(e: any, index: number, column: string) {
    console.log(e, index, column);
    !this.rowsModified.includes(index) && this.rowsModified.push(index);
    if (column === "name") {
      this.addresses[index]['editName'] = true;
    } else if (column === "location") {
      this.addresses[index]['editLocation'] = true;
    } else if (column === "phone") {
      this.addresses[index]['editPhone'] = true;
    }
    this.addresses = [...this.addresses];
  }

  public onFocusout(e: any, index: number, column: string) {
    console.log(e, index, column);
    const updatedValue = e.target.value;
    if (column === "name") {
      this.addresses[index]['editName'] = false;
      this.addresses[index]['name'] = updatedValue;
    } else if (column === "location") {
      this.addresses[index]['editLocation'] = false;
      this.addresses[index]['location'] = updatedValue;
    } else if (column === "phone") {
      this.addresses[index]['editPhone'] = false;
      this.addresses[index]['phone'] = updatedValue;
    }
    this.addresses = [...this.addresses];
  }

}
