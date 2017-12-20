// const dnd = {
//     init() {
//         // this.setEvent();
//         this.dragStart(event);
//         this.dragOver(event);
//         this.dragEnter(event);
//         this.dragDrop(event);
//     },
//     dragStart(event) {
//         event.dataTransfer.effectAllowed = 'move';
//         event.dataTransfer.setData('text', event.target.closest('li').id);

//         return true;
//     },
//     dragOver(event) {
//         event.preventDefault();
//     },
//     dragEnter(event) {
//         event.preventDefault();

//         return true;
//     },
//     dragDrop(event) {
//         let draggableNode = document.getElementById(
//             event.dataTransfer.getData('text')
//         );

//         setEvent(draggableNode);
//         event.stopPropagation();

//         return false;
//     }
// }

// export default dnd;