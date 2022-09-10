const elev_buttons = document.querySelectorAll("elevator bu");
const floor_buttongroups = document.querySelectorAll("floor buttongroup");

const elev_open = document.getElementById("open");
const elev_close = document.getElementById("close");

const holdables = [].slice.call(document.getElementsByClassName("holdable"));

const floor_button_up = [].slice.call(document.querySelectorAll("bu.up"));
const floor_button_down = [].slice.call(document.querySelectorAll("bu.down"));

const elevator_node = document.getElementById("elevator");
const elevator = new Elevator(elevator_node);
const controller = new Controller(elevator);

floor_button_up.forEach((bu)=>{
  bu.addEventListener("click",controlFloorButtonUp);
});
floor_button_down.forEach((bu)=>{
  bu.addEventListener("click",controlFloorButtonDown);
});

elev_open.addEventListener("click",()=>{controller.openDoor();});
elev_close.addEventListener("click",()=>{controller.closeDoor();});



/*
const test_button = document.getElementById("test-button");
test_button.addEventListener("click",(evt)=>{
});
*/


function controlFloorButtonUp(evt) {
  let src = evt.srcElement;
  const this_floor = parseInt(src.parentNode.parentNode.getAttribute("floor"));
  console.log(`calling from ${this_floor}`);
  if(src.classList.contains("hold")){
    src.classList.remove("hold");
  } else {
    src.classList.add("hold");
    controller.listenUpDownButton({
      floor : this_floor
    });
  }

}

function controlFloorButtonDown(evt) {
  let src = evt.srcElement;
  const this_floor = parseInt(evt.srcElement.parentNode.parentNode.getAttribute("floor"));
  console.log(`calling from ${this_floor}`);
  if(src.classList.contains("hold")){
    src.classList.remove("hold");
  } else {
    src.classList.add("hold");
    controller.listenUpDownButton({
      floor :this_floor
    });

  };
}
