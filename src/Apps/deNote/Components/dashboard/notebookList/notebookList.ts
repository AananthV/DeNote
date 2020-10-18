import { Component } from 'derby';
import DashboardContainer from '../../../Containers/dashboard';

class NotebookListComponent extends Component {
    static view = __dirname + '/notebookList.html';
    static is = 'dashboard:notebook-list';

    private model: any;
    private parent: DashboardContainer;

    private notebooks: any;
    notebooksCollection: any;

    init() {
        // this.notebooks = this.model.ref('notebooks', this.model.at('notebooks'));
        this.model.ref('selectedNotebookId', this.model.scope('_page.selectedNotebookId'));
        this.notebooksCollection = this.model.scope('notebooks');
    }

    createNotebook() {
        const title = prompt('Enter Notebook title:');
        this.notebooksCollection.add({ title: title, notes: [] });
    }

    selectNotebook(notebookId: string) {
        this.parent.handleSelectNotebook(notebookId);
    }
}

export default NotebookListComponent;