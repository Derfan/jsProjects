import plateModule from './plate/plate';

const dnd = {
    setEvent(friend) {
        if (friend.parentNode.id.includes('rightList')) {
            plateModule.rightList.removeChild(friend);
            plateModule.leftList.appendChild(friend);
        } else {
            plateModule.leftList.removeChild(friend);
            plateModule.rightList.appendChild(friend);
        }
    },
    dragStart(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', e.target.id);

        return true;
    },
    dragOver(e) {
        e.preventDefault();
    },
    dragEnter(e) {
        e.preventDefault();

        return true;
    },
    dragDrop(e) {
        let draggableNode = document.getElementById(e.dataTransfer.getData('text'));
        
        dnd.setEvent(draggableNode);
        e.stopPropagation();

        return false;
    }
}

export default dnd;