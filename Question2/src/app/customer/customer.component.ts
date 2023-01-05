import { AbstractType, Component, OnInit } from '@angular/core';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { v4 as uuidv4 } from "uuid";
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  latest_serving_num: any = null;
  latest_issuedd_num: any;
  color1 = "red";
  color2 = "red";
  color3 = "red";
  color4 = "red";
  dot1 = "green";
  dot2 = "green";
  dot3 = "green";
  dot4 = "green";

  size: any;

  constructor(
    public database: Database
  ) { }

  ngOnInit(): void {
    this.OfflineOne()
    this.OfflineTwo()
    this.OfflineThree()
    this.OfflineFour()
    this.processlight() 
    this.checknumber()
    this.readnumber()
  }

  checknumber() {
    if (this.latest_issuedd_num == null) {
      this.latest_issuedd_num = "-latest_issuedd_num-"
    }
    if (this.latest_serving_num == null) {
      this.latest_serving_num = "-latest_serving_num-"
    }
  }

  readnumber() {
    const data = ref(this.database, 'ticket/');
    onValue(data, (snapshot) => {
        snapshot.forEach(childSnapshot => {
        for (let i = 0; i < snapshot.size; i++) {
          if(snapshot.val()[i].status == false){
            this.latest_issuedd_num = "-latest_issuedd_num-"
          }else[
            this.latest_issuedd_num = snapshot.val()[i].id
          ]
        }
      })
    })
  }

  processlight() {
    const counter1 = ref(this.database, 'counterprocess/1');
    const counter2 = ref(this.database, 'counterprocess/2');
    const counter3 = ref(this.database, 'counterprocess/3');
    const counter4 = ref(this.database, 'counterprocess/4');

    onValue(counter1, (snapshot) => {
      if(snapshot.val().status== true){
        this.dot1 = "red"
        this.latest_serving_num = snapshot.val().processid
      }else if(snapshot.val().status== false){
        this.dot1 = "green"
      }
    })
    onValue(counter2, (snapshot) => {
      if(snapshot.val().status== true){
        this.dot2 = "red"
        this.latest_serving_num = snapshot.val().processid
      }else if(snapshot.val().status== false){
        this.dot2 = "green"
      }
    })
    onValue(counter3, (snapshot) => {
      if(snapshot.val().status== true){
        this.dot3 = "red"
        this.latest_serving_num = snapshot.val().processid
      }else if(snapshot.val().status== false){
        this.dot3 = "green"
      }

    })
    onValue(counter4, (snapshot) => {
      if(snapshot.val().status== true){
        this.dot4 = "red"
        this.latest_serving_num = snapshot.val().processid
      }else if(snapshot.val().status== false){
        this.dot4 = "green"
      }

    })

  }

  OfflineOne() {
    const onedata = ref(this.database, 'counter/' + 1);
    onValue(onedata, async (snapshot) => {
      if (snapshot.val().status == "1") {
        this.color1 = "pink"
      } else {
        this.color1 = "grey"
      }
    })
  }

  OfflineTwo() {
    const onedata = ref(this.database, 'counter/' + 2);
    onValue(onedata, async (snapshot) => {
      if (snapshot.val().status == "1") {
        this.color2 = "pink"
      } else {
        this.color2 = "grey"
      }
    })
  }

  OfflineThree() {
    const onedata = ref(this.database, 'counter/' + 3);
    onValue(onedata, async (snapshot) => {
      if (snapshot.val().status == "1") {
        this.color3 = "pink"
      } else {
        this.color3 = "grey"
      }
    })
  }

  OfflineFour() {
    const onedata = ref(this.database, 'counter/' + 4);
    onValue(onedata, async (snapshot) => {
      if (snapshot.val().status == "1") {
        this.color4 = "pink"
      } else {
        this.color4 = "grey"
      }
    })
  }

  getlatest_issuedd_num() {
    this.latest_issuedd_num = uuidv4();

    const data = ref(this.database, 'ticket/');
    onValue(data, (snapshot) => {
      this.size = snapshot.size
    })


    if (this.size != null) {
      set(ref(this.database, "ticket/" + this.size), {
        id: this.latest_issuedd_num,
        status:true
      })
    }


  }
}
