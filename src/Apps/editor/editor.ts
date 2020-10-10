import derby from 'derby';

// import DerbyApplication from '../base';
// import models from './Models';

import EditCellComponent from './Components/editCell';
import EditSectionComponent from './Components/editSection';
import EditNoteComponent from './Components/editNote';
import RenderCellComponent from './Components/renderCell';
import RenderSectionComponent from './Components/renderSection';
import RenderNoteComponent from './Components/renderNote';

import { initializeComponents } from '../base/application';

const components = [
    EditCellComponent,
    EditSectionComponent,
    EditNoteComponent,
    RenderCellComponent,
    RenderSectionComponent,
    RenderNoteComponent
]

const app = derby.createApp('editor', __filename);

initializeComponents(app, components);

app.loadViews('/home/aananth/dev/DeNote/views/editor/Pages');

app.loadStyles('/home/aananth/dev/DeNote/views/editor/Styles');

if (derby.util.isServer) {
    var boostrap = require.resolve('bootstrap/dist/css/bootstrap.min.css');
    app.loadStyles(boostrap);
}

app.proto.create = (model) => {
    require('bootstrap');
}

export default app;