var message = prompt("Enter your message", "‎");
var counter = parseInt(prompt("How many Times ?", 10));
window.InputEvent = window.Event || window.InputEvent;
var event = new InputEvent("input", { bubbles: true });
var textbox = document.getElementsByClassName("selectable-text copyable-text iq0m558w");[1];
for (let index = 0; index < counter; index++) {
  textbox.innerHTML = message;
  textbox.dispatchEvent(event);
  document.getElementsByClassName("sendBtn")[0].click();
}