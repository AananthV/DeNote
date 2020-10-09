import derby from 'derby';

// import DerbyApplication from '../base';
// import models from './Models';

import CellComponent from './Components/cell';
import SectionComponent from './Components/section';
import { initializeComponents } from '../base/application';

const components = [
    CellComponent,
    SectionComponent
]

const app = derby.createApp('editor', __filename);

initializeComponents(app, components);

app.loadViews('/home/aananth/dev/NoteD/views/editor/Pages');

app.loadStyles('/home/aananth/dev/NoteD/views/editor/Styles');

if (derby.util.isServer) {
    var boostrap = require.resolve('bootstrap/dist/css/bootstrap.min.css');
    app.loadStyles(boostrap);
}

app.proto.create = (model) => {
    require('bootstrap');
}

export default app;