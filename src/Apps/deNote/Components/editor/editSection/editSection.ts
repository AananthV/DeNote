import { Component } from 'derby';

class SectionData {
    cells: any;
    // id: any;
}

class EditSectionComponent extends Component<SectionData> {
    static view = __dirname + '/editSection.html';
    static DataConstructor = SectionData;
    static is = 'editor:edit-section';

    private model: any;
    private dom: any;
    private getAttribute: any;

    private cells: any;
    private id: any;

    private section: Element;
    index: any;
    parent: any;

    init() {
        // Attributes from note
        this.cells = this.model.ref('cells', this.model.at('section.cells'));
        this.index = this.model.at('index');
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

    addCell(cellIndex: number) {
        // TODO: use constant
        const MAX_CELLS = 5;
        if (this.cells.get().length < MAX_CELLS) {
            this.cells.insert(cellIndex + 1, [{ width: 1, data: '', type: 'text' }]);

            // @ts-ignore
            this.section.children[(cellIndex + 1) * 2].focus();
        }
    }

    removeCell(cellIndex: number) {
        const numCells = this.cells.get().length;
        if (numCells > 1) {
            this.cells.remove(cellIndex);

            let focus = cellIndex;
            if (cellIndex == numCells - 1) focus = cellIndex - 1;

            // @ts-ignore
            this.section.children[focus * 2].focus();
        }
    }

    focusCell(cellIndex: number) {
        const numCells = this.cells.get().length;

        // @ts-ignore
        this.section.children[((cellIndex + numCells) % numCells) * 2].focus();
    }

    handleCellKeyDown(event: KeyboardEvent, cellIndex: number) {
        const numCells = this.cells.get().length;

        switch (event.key) {
            case 'ArrowRight':
                // Ctrl + Shift + RightArrow: Decrease Width Left
                if (event.ctrlKey && event.shiftKey && cellIndex > 0) this.incrementWidth(cellIndex - 1, cellIndex);

                // Ctrl + RightArrow: Increase Width Right
                else if (event.ctrlKey && !event.shiftKey && cellIndex < numCells - 1) this.incrementWidth(cellIndex, cellIndex + 1);

                // Shift + RightArrow: Swap with right cell
                else if (!event.ctrlKey && event.shiftKey && cellIndex < numCells - 1) this.swap(event, cellIndex, cellIndex + 1);

                // Right Arrow: Move to Right Cell (Loop)
                else if (!event.ctrlKey && !event.shiftKey) this.focusCell(cellIndex + 1);

                break;

            case 'ArrowLeft':
                // Ctrl + Shift + LeftArrow: Decrease Width Right
                if (event.ctrlKey && event.shiftKey && cellIndex < numCells - 1) this.incrementWidth(cellIndex + 1, cellIndex);

                // Ctrl + LeftArrow: Increase Width Left
                else if (event.ctrlKey && !event.shiftKey && cellIndex > 0) this.incrementWidth(cellIndex, cellIndex - 1);

                // Shift + LeftArrow: Swap with left cell
                else if (!event.ctrlKey && event.shiftKey && cellIndex > 0) this.swap(event, cellIndex, cellIndex - 1);

                // LeftArrow: Move to Left Cell (Loop)
                else if (!event.ctrlKey && !event.shiftKey) this.focusCell(cellIndex - 1);

                break;

            case 'Enter':
                // Ctrl + Enter: Insert Cell to the Right
                if (event.ctrlKey && !event.shiftKey) this.addCell(cellIndex);

                break;

            case "Delete":
                // Ctrl + Delete: Delete Current Cell
                if (event.ctrlKey && !event.shiftKey) this.removeCell(cellIndex);

                break;
        }

        this.parent.handleSectionKeyDown(event, this.index.get(), cellIndex)
    }
}

export default EditSectionComponent;