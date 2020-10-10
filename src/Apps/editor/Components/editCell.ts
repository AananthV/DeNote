import { Component } from 'derby';

class CellOptions {
    editing: boolean = false;
}

class EditCellComponent extends Component {
    static view = '/home/aananth/dev/DeNote/views/editor/Components/editCell.html';
    static DataConstructor = CellOptions;
    static is = 'editor:edit-cell';

    private model: any;
    private getAttribute: any;

    private cell: HTMLElement;
    private id: any;
    emit: any;
    parent: any;
    editing: any;
    editor: HTMLTextAreaElement;
    data: any;
    type: any;
    width: any;
    index: any;

    init() {
        // Attributes passed from section
        this.data = this.model.ref('data', this.model.at('cell.data'));
        this.type = this.model.ref('type', this.model.at('cell.type'));
        this.width = this.model.ref('width', this.model.at('cell.width'));
        this.index = this.model.at('index');

        // Cell Options
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

    handleKeyDown(event: KeyboardEvent, element: HTMLElement) {
        // TODO: Tab to indent
        const editing = this.editing.get();
        if (event.key === 'i' && event.ctrlKey) {
            this.toggleEditMode();
        } else if (!editing) {
            this.parent.handleCellKeyDown(event, this.index.get());
        }
    }
}

export default EditCellComponent;