import { Component } from 'derby';

class NoteListData {
    // notes: any[] = [];
}

class NoteListComponent extends Component<NoteListData> {
    static view = __dirname + '/noteList.html';
    static DataConstructor = NoteListData;
    static is = 'dashboard:note-list';

    private model: any;
    private getAttribute: any;
    private parent: any;

    private notes;
    private selectedNotebookId;
    private selectedNoteId;

    init() {
        // this.notes = this.model.ref('notes', this.model.at('notes'));
        this.selectedNotebookId = this.model.ref('selectedNotebookId', this.model.scope('_page.selectedNotebookId'));
        this.selectedNoteId = this.model.ref('selectedNoteId', this.model.scope('_page.selectedNoteId'));
    }

    createNote() {
        const title = prompt('Enter Notebook title:');

        const noteId = this.model.root.add('notes', { title: title, notebookId: this.selectedNotebookId.get(), sections: [
            {
                cells: [
                    { id: 1, width: 1, data: 'asdf', type: 'text' },
                    { id: 2, width: 1, data: 'asdfgh', type: 'text' },
                    { id: 3, width: 1, data: 'fdsa', type: 'text' }
                ]
            },
            {
                cells: [
                    { id: 1, width: 1, data: 'asdf', type: 'text' },
                    { id: 2, width: 1, data: 'asdfgh', type: 'text' },
                    { id: 3, width: 1, data: 'fdsa', type: 'text' }
                ]
            }
        ]});

        // this.selectedNotebook.push('notes', noteId);
    }

    selectNote(noteId: string) {
        this.parent.handleSelectNote(noteId);
    }
};

export default NoteListComponent;