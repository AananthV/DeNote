import { Component } from 'derby';

class SectionData {
    cells: any;
    index: number;
}

class RenderSection extends Component<SectionData> {
    static view = __dirname + '/renderSection.html';
    static DataConstructor = SectionData;
    static is = 'editor:render-section';

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
}

export default RenderSection;