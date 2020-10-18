import { Component } from 'derby';
import axios from 'axios';

class DashboardData {
    notebooks: any[] = [];
    notes: any[] = [];
    selectedNotebook: string = "";
}

class DashboardContainer extends Component<DashboardData> {
    static view = __dirname + '/dashboard.html';
    static DataConstructor = DashboardData;
    static is = 'dashboard';

    private app: any;
    private model: any;

    private url: any;
    notebooks: any;
    notes: any;
    selectedNotebook: any;
    selectedNotebookId: any;
    notesQuery: any;
    selectedNoteId: any;
    note: any;

    init() {
        this.notebooks = this.model.ref('notebooks', this.model.scope('notebooks'));
        // this.notes = this.model.ref('notes', this.model.at('notes'));
        this.selectedNotebookId = this.model.scope('_page.selectedNotebookId');
        this.selectedNoteId = this.model.scope('_page.selectedNoteId');
    }

    create() {
        this.url = this.model.scope('$render.url').get();
    }

    handleSelectNotebook(notebookId: string) {
        this.selectedNotebookId.set(notebookId);
        this.subscribeToNoteList();
    }

    handleSelectNote(noteId: string) {
        this.selectedNoteId.set(noteId);
        this.subscribeToNote(noteId);
    }

    subscribeToNoteList() {
        if (this.notesQuery) this.notesQuery.unsubscribe();

        this.notesQuery = this.model.root.query('notes', {
            notebookId: this.selectedNotebookId.get()
        });

        this.notesQuery.subscribe((err: Error) => {
            if (err) throw err;

            this.model.removeRef('notes');
            this.notes = this.model.ref('notes', this.notesQuery);
        });
    }

    subscribeToNote(noteId: string) {
        if (this.note) this.note.unsubscribe();

        this.note = this.model.scope('notes', noteId);

        this.note.subscribe((err: Error) => {
            if (err) throw err;

            console.log(this.note.get());

            this.model.removeRef('note');
            this.model.ref('note', this.note);
        });
    }
}

export default DashboardContainer;