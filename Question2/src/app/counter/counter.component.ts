import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref, update, get } from '@angular/fire/database';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  status1: any;
  status2: any;
  status3: any;
  status4: any;
  statusword1: any;
  statusword2: any;
  statusword3: any;
  statusword4: any;
  noneticket: any;
  ticketkey: any
  ticketid: any;
  busycounter: any;
  endbusycounter: any;

  constructor(
    public database: Database
  ) {
    this.statusone()

  }

  ngOnInit(): void {
    this.statusone()
    this.statustwo()
    this.statusthree()
    this.statusfour()
  }

  onoffline(num: any) {
    switch (num) {
      case '1':
        this.counter1();
        break;
      case '2':
        this.counter2();
        break;
      case '3':
        this.counter3();
        break;
      case '4':
        this.counter4();
        break;
    }

  }

  callNext(num: any) {
    switch (num) {
      case '1':
        this.callNext1();
        break;
      case '2':
        this.callNext2();
        break;
      case '3':
        this.callNext3();
        break;
      case '4':
        this.callNext4();
        break;
    }

  }

  comCurr(num: any) {
    switch (num) {
      case '1':
        this.comCurr1();
        break;
      case '2':
        this.comCurr2();
        break;
      case '3':
        this.comCurr3();
        break;
      case '4':
        this.comCurr4();
        break;
    }

  }


  counter1() {
    if (this.status1 != true) {
      update(ref(this.database, 'counter/' + 1), {
        status: "1"
      })
      this.statusword1 = "Go offline"
    } else if (this.status1 == true) {
      update(ref(this.database, 'counter/' + 1), {
        status: "0"
      })
      this.statusword1 = "Go online"
    }
  }
  counter2() {
    if (this.status2 != true) {
      update(ref(this.database, 'counter/' + 2), {
        status: "1"
      })
      this.statusword2 = "Go offline"
    } else {
      update(ref(this.database, 'counter/' + 2), {
        status: "0"
      })
      this.statusword2 = "Go online"
    }
  }
  counter3() {
    if (this.status3 != true) {
      update(ref(this.database, 'counter/' + 3), {
        status: "1"
      })
      this.statusword3 = "Go offline"
    } else {
      update(ref(this.database, 'counter/' + 3), {
        status: "0"
      })
      this.statusword3 = "Go online"
    }
  }
  counter4() {
    if (this.status4 != true) {
      update(ref(this.database, 'counter/' + 4), {
        status: "1"
      })
      this.statusword4 = "Go offline"
    } else {
      update(ref(this.database, 'counter/' + 4), {
        status: "0"
      })
      this.statusword4 = "Go online"
    }
  }

  statusone() {
    const onedata = ref(this.database, 'counter/' + 1);
    onValue(onedata, async (snapshot) => {
      if (snapshot.val().status == "1") {
        this.status1 = true
        this.statusword1 = "Go offline"
      } else {
        this.status1 = false
        this.statusword1 = "Go online"
      }
    })
  }

  statustwo() {
    const twodata = ref(this.database, 'counter/' + 2);
    onValue(twodata, (snapshot) => {
      if (snapshot.val().status == "1") {
        this.status2 = true
        this.statusword2 = "Go offline"
      } else {
        this.status2 = false
        this.statusword2 = "Go online"
      }
    })
  }

  statusthree() {
    const threedata = ref(this.database, 'counter/' + 3);
    onValue(threedata, (snapshot) => {
      if (snapshot.val().status == "1") {
        this.status3 = true
        this.statusword3 = "Go offline"
      } else {
        this.status3 = false
        this.statusword3 = "Go online"
      }
    })
  }

  statusfour() {
    const fourdata = ref(this.database, 'counter/' + 4);
    onValue(fourdata, (snapshot) => {
      if (snapshot.val().status == "1") {
        this.status4 = true
        this.statusword4 = "Go offline"
      } else {
        this.status4 = false
        this.statusword4 = "Go online"
      }
    })
  }

  async checkcounter() {
    const data = ref(this.database, 'ticket/');
    onValue(data, (snapshot) => {
      if (snapshot.val() == null) {
        this.noneticket = true;
      } else {
        snapshot.forEach(childSnapshot => {
          for (let i = 0; i < snapshot.size; i++) {
            if (snapshot.val()[i].status == false) {
              this.noneticket = true;
            } else {
              this.noneticket = false;
            }
          }
        })
      }
    })
    if (this.noneticket != undefined) {
      await this.alertNoticket(this.noneticket);
      this.noneticket = await undefined
    }
  }

  async alertNoticket(value: boolean) {
    if (value != false) {
      await alert("No tickets in the waiting queue");
      value = await false
    }
  }

  insertcounter(counter: any) {
    let size: number;
    const dataticket =  ref(this.database, 'ticket/');
    const dataprocess =  ref(this.database, 'counterprocess/' + counter);

     onValue(dataticket, (snapshot) => {
      size = snapshot.size;
      snapshot.forEach(childSnapshot => {
        for (let i = 0; i < size; i++) {
          if (snapshot.val()[i].status != false) {
            this.ticketid = snapshot.val()[i].id
            this.ticketkey = i
          }
        }
      })
    })

     onValue(dataprocess, (snapshot2) => {
      this.busycounter = snapshot2.val().status
    })
    if (this.ticketid !=  undefined) {
      if (this.busycounter ==  false) {
         update(ref(this.database, 'counterprocess/' + counter), {
          "processid": this.ticketid,
          "status": true
        })
         update(ref(this.database, 'ticket/' + this.ticketkey), {
          "id": this.ticketid,
          "status": false
        })
        this.ticketid = undefined
        this.busycounter = undefined
      } else if (this.busycounter ==  true){
         alert("Busy !");
         this.busycounter = undefined
      }
    }
  }

  async alertBusy(value: boolean) {
    console.log(value)
    if (value != false) {
      await alert("Busy !");
      value = await false
    }
  }

  endcounter(counter: any){
    const dataprocess =  ref(this.database, 'counterprocess/' + counter);
    onValue(dataprocess, (snapshot) => {
      this.endbusycounter = snapshot.val().status
    })

    if (this.endbusycounter ==  true) {
      update(ref(this.database, 'counterprocess/' + counter), {
        "processid": "null",
        "status": false
      })
      alert("Done")
    }
  }

  callNext1() {
    this.checkcounter()
    if (this.status1 == true) {
      this.insertcounter("1")
    } 
  }

  callNext2() {
    this.checkcounter()
    if (this.status2 == true) {
      this.insertcounter("2")
    } 
  }

  callNext3() {
    this.checkcounter()
    if (this.status3 == true) {
      this.insertcounter("3")
    } 
  }

  callNext4() {
    this.checkcounter()
    if (this.status4 == true) {
      this.insertcounter("4")
    } 
  }

  comCurr1() {
    if (this.status1 == true) {
      this.endcounter("1")
    } 
  }

  comCurr2() {
    if (this.status2 == true) {
      this.endcounter("2")
    } 
  }

  comCurr3() {
    if (this.status3 == true) {
      this.endcounter("3")
    } 
  }

  comCurr4() {
    if (this.status4 == true) {
      this.endcounter("4")
    } 
  }

}
