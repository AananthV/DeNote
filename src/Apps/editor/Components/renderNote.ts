import { Component } from 'derby';

class NoteData {
    sections: any;
    // id: any;
}

class RenderNoteComponent extends Component<NoteData> {
    static view = '/home/aananth/dev/DeNote/views/editor/Components/renderNote.html';
    static DataConstructor = NoteData;
    static is = 'editor:render-note';

    private model: any;

    private id: any;

    private note: Element;
    private sections: any;

    init() {
        this.sections = this.model.ref('sections', this.model.scope('note._3.sections'));
    }

    create() {
        this.note = document.getElementById('note-' + this.id);
    }
}

export default RenderNoteComponent;