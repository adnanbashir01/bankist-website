// SMOOTH SCROLLING
/*
btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    // Old Method
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth'
    // });

    // New Method
    section1.scrollIntoView({ behavior: 'smooth' });
});
*/


////////////////////// 192 - Event Propagation in Practice //////////////////////

// 1) e.target - where it is clicked
// 2) e.currentTarget - where event handler is attached
// 3) e.stopPropagation - stop the event bubbling
// 4) Event can happen at the capturing phase as well as in the bubbling phase. It is very useful for us in the bubbling Phase
// 5) It is default that event is handled in the bubbling phase. If we want the event to be handled in the capturing phase, add `true` after the callback function

////////////////////// 193 - Event Delegation - implementing page navigaiton //////////////////////

// To avoid loss of space as a 1000 of callback functions are created if we are doing with 1000 nodelist, we use Event Delegation
// Page Navigation - Method One

/* document.querySelectorAll('.nav__link').forEach(el => {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        console.log(id);
        document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' })
    })
}); */

// Page Navigation - Method Two

////////////////////// 194 - DOM TRAVERSING  //////////////////////
// 1. It is walking through the DOM
// 2. Sometimes we don't know the structure of the DOM, so we do DOM traversing to find the relevant element
// 3. element.childNodes - direct children of the element
// 3. element.children - HTML Collection of the element
// 3. element.firstChildElement
// 3. element.lastChildElement
// 3. element.parentNOde - Direct Parent Node
// 3. element.parentElement - Direct Parent Node
// 3. el.losest('element') - finds parent no matter how far it will be
// 3. element.previousElementSibling
// 3. element.nextElementSibling
// 3. If we need all the siblings, we move up ot the parent and then select all the siblings 