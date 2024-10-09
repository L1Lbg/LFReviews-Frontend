export default function triggerError(){
    let elem = document.getElementById("ErrorPopup");
    elem.classList.add("ErrorPopup-Animate");
    setTimeout(() => {
      elem.classList.remove("ErrorPopup-Animate");
    }, 5000);
}