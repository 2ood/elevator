class Elevator {
  constructor(node){
    this.node = node;
    this.current_floor = parseInt(node.getAttribute("current_floor"));
    this.target_floor = parseInt(node.getAttribute("target_floor"));
    this.move_status = 0; // 1 if ascending, -1 descending, 0 stationary.
    this.is_door_closed = true;
  }

  /**
  check which floor should we move to.
  */

  move(target_floor, report_to){
    this.target_floor = target_floor;
    this.node.setAttribute(`target_floor`,target_floor);

    let ascend = target_floor > this.current_floor;
    this.move_status = ascend?1:-1;

    setTimeout(()=>{this.reportArrival(ascend,report_to);},1000);
  }

  reportArrival(was_ascending,report_to){
    let arrived_floor = this.node.getAttribute("target_floor");
    this.node.setAttribute('current_floor',arrived_floor);
    this.current_floor = parseInt(arrived_floor);
    this.move_status = 0;

    report_to.listenArrival(arrived_floor,was_ascending);
  }

  nextStopIs(){

    /*
    this.floor_queue.sort(function(a,b){
      if (a.target_floor > b.target_floor) return 1;
      else if(a.target_floor < b.target_floor) return -1;
      else return 0;
    });

    return
    */
  }

  stopAtNextFloor(){}
  isStoppingAt(floor_num){}

  hop_in(){

  }

  openDoor(){
    this.controlDoor(true);
    setTimeout(()=>{this.closeDoor();},3000);
  }

  closeDoor(){
    this.controlDoor(false);
    return new Promise((resolve,reject)=>{
      setTimeout(resolve,1000);
    });
  }

  controlDoor(want_to_open) {
    const doors = [].slice.call(document.getElementsByTagName("DOOR"));

    if(want_to_open) {
      this.is_door_closed = false;
      doors.forEach((door)=>{
        door.classList.add("opened");
      });
    } else {
      this.is_door_closed = true;
      doors.forEach((door)=>{
        door.classList.remove("opened");
      });
    };
  }
}

class Controller {
  constructor(elevator){
    this.elevator = elevator;
    this.descending_queue = [];
    this.ascending_queue = [];
    this.client_onboard = [];
    this.is_moving = true;
  }

  /**
  json format : {
    floor : 2, //floor the request is made.
  }
  */
  listenUpDownButton(json){
    const src_floor = parseInt(json.floor);
    if(src_floor<elevator.current_floor) {
      this.descending_queue.push(src_floor);
      let next_floor = this.checkNextStop();
      console.log(next_floor);
      if(next_floor) this.elevator.move(next_floor,this);

    } else if(src_floor>elevator.current_floor) {
      this.ascending_queue.push(src_floor);
      let next_floor = this.checkNextStop();
      console.log(next_floor);
      if(next_floor) this.elevator.move(next_floor,this);
    } else {
      this.elevator.openDoor();
    }

  }

  listenArrival(arrived_floor, was_ascending) {
    const current_floor = arrived_floor;
    let floor_node = document.querySelector(`floor[floor="${current_floor}"]`);
    let will_it_ascend = this.checkNextStop()>current_floor;
    if(was_ascending) {
      this.ascending_queue.pop();
    } else {
      this.descending_queue.pop();
    }

    console.log(`will it ascend : ${will_it_ascend}`);
    console.log(this.toJson());
    if(will_it_ascend) {
      floor_node.querySelector("bu.up").classList.remove("hold");
    } else {
      floor_node.querySelector("bu.down").classList.remove("hold");
    }

    this.elevator.openDoor();
  }

  listenTargetFloorButton(json) {
    if(json.target_floor > elevator.current_floor){

    }
  }

  checkNextStop(){
    let asc = this.ascending_queue;
    let desc = this.descending_queue;
    let current_floor = this.elevator.current_floor;
    asc.sort().reverse();
    desc.sort();

    if(this.elevator.movement>0) {
      return asc.length>0?asc[0]:current_floor;
    } else if(this.elevator.movement<0) {
      return desc.length>0?desc[0]:current_floor;
    } else {
      if(asc.length>0) {
        return asc[0];
      } else if(desc.length>0) {
        return desc[0];
      } else return current_floor;
    }
  }

  toJson() {
    return {
      elevator : this.elevator,
      descending_queue : this.descending_queue,
      ascending_queue : this.ascending_queue,
      client_onboard : this.client_onboard,
      is_moving : this.is_moving,
    };
  }
}


class Client {
  constructor(start_floor, target_floor) {
    this.start_floor = start_floor;
    this.target_floor = target_floor;
  }
}
