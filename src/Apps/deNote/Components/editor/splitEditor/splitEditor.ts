import { Component } from 'derby';

class EditorOptions {
    mode: number = 1; // 0 - Code, 1 - Split, 2 - Render
}

class EditorComponent extends Component<EditorOptions> {
    static view = __dirname + '/splitEditor.html';
    static DataConstructor = EditorOptions;
    static is = "editor:split-editor";

    private model: any;

    private note_id: any;
    private note: any;
    private mode: any;
    private title: any;

    init() {
        // this.note_id = this.model.scope('_page.note_id').get();
        // this.note = this.model.ref('note', this.model.scope(`notes.${this.note_id}`));
        this.title = this.model.ref('title', this.model.at('note.title'));

        this.mode = this.model.at('mode');
    }

    setMode(mode: number) {
        this.mode.set(mode);
    }
};

export default EditorComponent;