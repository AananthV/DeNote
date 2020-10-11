import { Component } from 'derby';

class EditorOptions {
    mode: number = 1; // 0 - Code, 1 - Split, 2 - Render
}

class EditorComponent extends Component<EditorOptions> {
    static view = __dirname + '/editor.html';
    static DataConstructor = EditorOptions;
    static is = "editor:editor";

    private model: any;

    private note: any;
    private mode: any;
    private title: any;

    init() {
        this.note = this.model.ref('note', this.model.scope('note._3'));
        this.title = this.model.ref('title', this.model.at('note.title'));

        this.mode = this.model.at('mode');
    }

    setMode(mode: number) {
        this.mode.set(mode);
    }
};

export default EditorComponent;