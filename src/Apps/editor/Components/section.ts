import { Component } from 'derby';

class SectionData {
    cells: any;
    // id: any;
}

class SectionComponent extends Component<SectionData> {
    static view = '/home/aananth/dev/NoteD/views/editor/Components/section.html';
    static DataConstructor = SectionData;
    static is = 'editor-section';

    private model: any;
    private dom: any;

    private cells: any;
    private id: any;

    private section: Element;

    private resize: any = {
        started: false,
        startX: 0,
        index: 0
    }

    init() {
        this.cells = this.model.ref('cells', this.model.scope('section._6.cells'));
    }

    create() {
        this.section = document.getElementById('section-' + this.id);
    }

    swap(event: Event, i0: number, i1: number) {
        this.model.move('cells', i0, i1);
        // @ts-ignore
        this.section.children[i0 * 2].focus();
        event.stopPropagation();
    }

    incrementWidth(i0: number, i1: number, increment: number = 0.1) {
        if (this.cells.get()[i0].width >= 1.5 || this.cells.get()[i1].width <= 0.5) return;
        this.model.increment(`cells.${i0}.width`, increment);
        this.model.increment(`cells.${i1}.width`, -increment);
    }

    addCell(index: number) {
        // TODO: use constant
        const MAX_CELLS = 5;
        if (this.cells.get().length < MAX_CELLS) {
            this.cells.insert(index + 1, [{ width: 1, data: '', type: 'text' }]);

            // @ts-ignore
            this.section.children[(index + 1) * 2].focus();
        }
    }

    removeCell(index: number) {
        const numCells = this.cells.get().length;
        if (numCells > 1) {
            this.cells.remove(index);

            let focus = index;
            if (index == numCells - 1) focus = index - 1;

            // @ts-ignore
            this.section.children[focus * 2].focus();
        }
    }

    handleCellKeyDown(event: KeyboardEvent, index: number) {
        const numCells = this.cells.get().length;

        switch (event.key) {
            case 'ArrowRight':
                // Ctrl + Shift + RightArrow: Decrease Width Left
                if (event.ctrlKey && event.shiftKey && index > 0) this.incrementWidth(index - 1, index);

                // Ctrl + RightArrow: Increase Width Right
                else if (event.ctrlKey && !event.shiftKey && index < numCells - 1) this.incrementWidth(index, index + 1);

                // Shift + RightArrow: Swap with right cell
                else if (!event.ctrlKey && event.shiftKey && index < numCells - 1) this.swap(event, index, index + 1);

                // Right Arrow: Move to Right Cell (Loop)
                // @ts-ignore
                else if (!event.ctrlKey && !event.shiftKey) this.section.children[((index + numCells + 1) % numCells) * 2].focus();

                break;

            case 'ArrowLeft':
                // Ctrl + Shift + LeftArrow: Decrease Width Right
                if (event.ctrlKey && event.shiftKey && index < numCells - 1) this.incrementWidth(index + 1, index);

                // Ctrl + LeftArrow: Increase Width Left
                else if (event.ctrlKey && !event.shiftKey && index > 0) this.incrementWidth(index, index - 1);

                // Shift + LeftArrow: Swap with left cell
                else if (!event.ctrlKey && event.shiftKey && index > 0) this.swap(event, index, index - 1);

                // LeftArrow: Move to Left Cell (Loop)
                // @ts-ignore
                else if (!event.ctrlKey && !event.shiftKey) this.section.children[((index + numCells - 1) % numCells) * 2].focus();

                break;

            case 'Enter':
                // Ctrl + Enter: Insert Cell to the Right
                if (event.ctrlKey) this.addCell(index);

                break;

            case "Delete":
                // Ctrl + Delete: Delete Current Cell
                if (event.ctrlKey) this.removeCell(index);

                break;
        }
    }
}

export default SectionComponent;