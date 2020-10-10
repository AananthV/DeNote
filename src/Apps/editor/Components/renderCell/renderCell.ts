import { Component } from 'derby';
import marked from 'marked';

class CellOptions {
    // editing: boolean = false;
    data: string = '';
    type: string = '';
    width: number = 1;
    index: number = 0;
}

class RenderCellComponent extends Component {
    static view = __dirname + '/renderCell.html';
    static DataConstructor = CellOptions;
    static is = 'editor:render-cell';

    private model: any;
    private getAttribute: any;

    private cell: HTMLElement;
    private id: any;
    emit: any;
    parent: any;
    data: any;
    type: any;
    width: any;
    index: any;
    cellData: HTMLDivElement;

    init() {
        // Attributes passed from section
        this.data = this.model.ref('data', this.model.at('cell.data'));
        this.type = this.model.ref('type', this.model.at('cell.type'));
        this.width = this.model.ref('width', this.model.at('cell.width'));
        this.index = this.model.at('index');
    }

    create() {
        this.cell = document.getElementById(`cell-${this.id}`);

        // Set Up reactive markdown rendering
        this.model.start('markdownData', this.data, this.getMarkdown);
    }

    getMarkdown(data: string) {
        // TODO: Sanitize html;
        return marked(data);
    }
}

export default RenderCellComponent;