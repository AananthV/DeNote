import { Component } from 'derby';

class CellOptions {
    editing: boolean = false;
}

class CellComponent extends Component {
    static view = '/home/aananth/dev/NoteD/views/editor/Components/cell.html';
    static DataConstructor = CellOptions;
    static is = 'editor-cell';

    private model: any;
    private getAttribute: any;

    private cell: HTMLElement;
    private id: any;
    emit: any;
    parent: any;
    editing: any;
    editor: HTMLTextAreaElement;

    init() {
        this.editing = this.model.at('editing');
    }

    create() {
        this.cell = document.getElementById(`cell-${this.id}`);
        this.editor = this.cell.querySelector('textarea');
    }

    toggleEditMode() {
        this.editing.set(!this.editing.get());
        if (!this.editing.get()) this.cell.focus();
        else this.editor.focus();
    }

    handleKeyDown(event: KeyboardEvent, element: HTMLElement, index: number) {
        const editing = this.editing.get();
        if (event.key === 'i' && event.ctrlKey) {
            this.toggleEditMode();
        } else if (!editing) {
            this.parent.handleCellKeyDown(event, index, );
        }
    }
}

export default CellComponent;