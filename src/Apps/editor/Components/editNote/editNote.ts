import { Component } from 'derby';

class NoteData {
    sections: any;
    // id: any;
}

class EditNoteComponent extends Component<NoteData> {
    static view = __dirname + '/editNote.html';
    static DataConstructor = NoteData;
    static is = 'editor:edit-note';

    private model: any;
    private dom: any;

    private sections: any;
    private id: any;

    private note: Element;

    init() {
        this.sections = this.model.ref('sections', this.model.at('note.sections'));
    }

    create() {
        this.note = document.getElementById('note-' + this.id);
    }

    swap(event: Event, i0: number, i1: number) {
        // this.model.move('cells', i0, i1);
        // // @ts-ignore
        // this.Note.children[i0 * 2].focus();
        // event.stopPropagation();
    }

    addSection(sectionIndex: number) {
        this.sections.insert(sectionIndex + 1, [{ cells: [{ width: 1, data: '', type: 'text' }] }]);

        // @ts-ignore
        this.note.children[(sectionIndex + 1) * 2].children[0].focus();
    }

    removeSection(sectionIndex: number) {
        const numSections = this.sections.get().length;
        if (numSections > 1) {
            this.sections.remove(sectionIndex);

            let focus = sectionIndex;
            if (sectionIndex == numSections - 1) focus = sectionIndex - 1;
    
            // @ts-ignore
            this.note.children[focus * 2].children[0].focus();
        }
    }

    focusSection(event: KeyboardEvent, sectionIndex: number, cellIndex: number = 0) {
        const numSections = this.sections.get().length;

        const sectionId = ((sectionIndex + numSections) % numSections);
        const cellId = Math.min(cellIndex, this.sections.at(`${sectionId}.cells`).get().length - 1);

        // @ts-ignore
        this.note.children[sectionId * 2].children[cellId * 2].focus();

        event.preventDefault();
    }

    handleSectionKeyDown(event: KeyboardEvent, sectionIndex: number, cellIndex: number) {
        const numSections = this.sections.get().length;

        switch (event.key) {
            case 'ArrowUp':

                // ArrowUp: Move to Section Above
                if (!event.ctrlKey && !event.shiftKey && sectionIndex > 0) 
                    this.focusSection(event, sectionIndex - 1, cellIndex);

                break;

            case 'ArrowDown':

                // ArrowDown: Move to Section Below
                if (!event.ctrlKey && !event.shiftKey && sectionIndex < numSections - 1) 
                    this.focusSection(event, sectionIndex + 1, cellIndex);

                break;

            case 'Enter':
                // Ctrl + Shift + Enter: Add Section Below
                if (!event.ctrlKey && event.shiftKey) this.addSection(sectionIndex);

                break;

            case 'Delete':
                // Ctrl + Shift + Delete: Remove Section
                if (!event.ctrlKey && event.shiftKey) this.removeSection(sectionIndex);

                break;
        }
    }
}

export default EditNoteComponent;