import { Component } from 'derby';

class NoteData {
    sections: any;
    // id: any;
}

class RenderNoteComponent extends Component<NoteData> {
    static view = __dirname + '/renderNote.html';
    static DataConstructor = NoteData;
    static is = 'renderer:render-note';

    private model: any;

    private id: any;

    private note: Element;
    private sections: any;

    init() {
        this.sections = this.model.ref('sections', this.model.at('note.sections'));
    }

    create() {
        this.note = document.getElementById('note-' + this.id);
    }
}

export default RenderNoteComponent;