const elev_buttons = document.querySelectorAll("elevator bu");
const floor_buttongroups = document.querySelectorAll("floor buttongroup");

const elev_open = document.getElementById("open");
const elev_close = document.getElementById("close");

elev_open.addEventListener("click",openDoor);
elev_close.addEventListener("click",closeDoor);


function openDoor(evt){controlDoor(true);}
function closeDoor(evt){controlDoor(false);}

function controlDoor(want_to_open) {
  const doors = [].slice.call(document.getElementsByTagName("DOOR"));

  if(want_to_open) {
    doors.forEach((door)=>{
      door.classList.add("opened");
    });
  } else {
    doors.forEach((door)=>{
      door.classList.remove("opened");
    });
  }
}
